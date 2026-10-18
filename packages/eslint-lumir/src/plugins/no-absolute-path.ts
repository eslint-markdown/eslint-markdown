/**
 * @fileoverview Source code for no-absolute-path rule.
 * @license MIT Copied from `eslint-plugin-import-x` package.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/rules/no-absolute-path.ts
 */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Ben Mosher
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-disable
  typescript/array-type,
  typescript/ban-ts-comment,
  func-names,
  prefer-destructuring
*/
// @ts-nocheck -- TODO: Code was simply copied and pasted. Type annotations will be modified later.

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import path from 'node:path';
import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type MessageId = 'absolute';

type Visitor = (
  source: TSESTree.StringLiteral,
  importer:
    | TSESTree.ImportDeclaration
    | TSESTree.ExportNamedDeclaration
    | TSESTree.ExportAllDeclaration
    | TSESTree.CallExpression
    | TSESTree.ImportExpression
    | TSESTree.StringLiteral,
) => void;

interface ModuleOptions {
  amd?: boolean;
  commonjs?: boolean;
  esmodule?: boolean;
  ignore?: Array<RegExp | string>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Returns an object of node visitors that will call 'visitor' with every
 * discovered module path.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/utils/module-visitor.ts
 */
function moduleVisitor(visitor: Visitor, options?: ModuleOptions) {
  const ignore = options?.ignore;
  const amd = !!options?.amd;
  const commonjs = !!options?.commonjs;
  // if esmodule is not explicitly disabled, it is assumed to be enabled
  const esmodule = !!{ esmodule: true, ...options }.esmodule;

  const ignoreRegExps = ignore == null ? [] : ignore.map(p => new RegExp(p));

  function checkSourceValue(
    source: TSESTree.StringLiteral | null | undefined,
    importer:
      | TSESTree.ImportDeclaration
      | TSESTree.ExportNamedDeclaration
      | TSESTree.ExportAllDeclaration
      | TSESTree.CallExpression
      | TSESTree.ImportExpression
      | TSESTree.StringLiteral,
  ) {
    if (source == null) {
      return;
    }

    // handle ignore
    if (ignoreRegExps.some(re => re.test(String(source.value)))) {
      return;
    }

    // fire visitor
    visitor(source, importer);
  }

  // for import-y declarations
  function checkSource(
    node:
      | TSESTree.ImportDeclaration
      | TSESTree.ExportNamedDeclaration
      | TSESTree.ExportAllDeclaration,
  ) {
    checkSourceValue(node.source, node);
  }

  // for esmodule dynamic `import()` calls
  function checkImportCall(node: TSESTree.Node) {
    let modulePath;
    // refs https://github.com/estree/estree/blob/HEAD/es2020.md#importexpression
    if (node.type === 'ImportExpression') {
      modulePath = node.source;
    } else if (node.type === 'CallExpression') {
      // @ts-expect-error this structure is from an older version of eslint
      if (node.callee.type !== 'Import') {
        return;
      }
      if (node.arguments.length !== 1) {
        return;
      }

      modulePath = node.arguments[0];
    } else {
      throw new TypeError('this should be unreachable');
    }

    if (modulePath.type !== 'Literal') {
      return;
    }

    if (typeof modulePath.value !== 'string') {
      return;
    }

    checkSourceValue(modulePath, node);
  }

  // for CommonJS `require` calls
  // adapted from @mctep: https://git.io/v4rAu
  function checkCommon(call: TSESTree.CallExpression) {
    if (call.callee.type !== 'Identifier') {
      return;
    }
    if (call.callee.name !== 'require') {
      return;
    }
    if (call.arguments.length !== 1) {
      return;
    }

    const modulePath = call.arguments[0];

    if (modulePath.type !== 'Literal') {
      return;
    }
    if (typeof modulePath.value !== 'string') {
      return;
    }

    checkSourceValue(modulePath, call);
  }

  function checkAMD(call: TSESTree.CallExpression) {
    if (call.callee.type !== 'Identifier') {
      return;
    }
    if (call.callee.name !== 'require' && call.callee.name !== 'define') {
      return;
    }
    if (call.arguments.length !== 2) {
      return;
    }

    const modules = call.arguments[0];
    if (modules.type !== 'ArrayExpression') {
      return;
    }

    for (const element of modules.elements) {
      if (!element) {
        continue;
      }

      if (element.type !== 'Literal') {
        continue;
      }

      if (typeof element.value !== 'string') {
        continue;
      }

      if (element.value === 'require' || element.value === 'exports') {
        continue; // magic modules: https://github.com/requirejs/requirejs/wiki/Differences-between-the-simplified-CommonJS-wrapper-and-standard-AMD-define#magic-modules
      }

      checkSourceValue(element, element);
    }
  }

  const visitors = {} as TSESLint.RuleListener;

  if (esmodule) {
    Object.assign(visitors, {
      ImportDeclaration: checkSource,
      ExportNamedDeclaration: checkSource,
      ExportAllDeclaration: checkSource,
      CallExpression: checkImportCall,
      ImportExpression: checkImportCall,
    });
  }

  if (commonjs || amd) {
    const currentCallExpression = visitors.CallExpression;
    visitors.CallExpression = function (call) {
      if (currentCallExpression) {
        currentCallExpression(call);
      }
      if (commonjs) {
        checkCommon(call);
      }
      if (amd) {
        checkAMD(call);
      }
    };
  }

  return visitors;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Static analysis',
      description: 'Forbid import of modules using absolute paths.',
      url: 'https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/no-absolute-path.md',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          commonjs: { type: 'boolean' },
          amd: { type: 'boolean' },
          esmodule: { type: 'boolean' },
          ignore: { type: 'array', minItems: 1, uniqueItems: true },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      absolute: 'Do not import modules using an absolute path',
    },
  },
  create(context) {
    const options = { esmodule: true, commonjs: true, ...context.options[0] };
    return moduleVisitor(source => {
      if (typeof source.value !== 'string' || !path.isAbsolute(source.value)) {
        return;
      }
      context.report({
        node: source,
        messageId: 'absolute',
        fix(fixer) {
          // node.js and web imports work with posix style paths ("/")
          let relativePath = path.posix.relative(
            path.dirname(context.physicalFilename),
            source.value,
          );
          if (!relativePath.startsWith('.')) {
            relativePath = `./${relativePath}`;
          }
          return fixer.replaceText(source, JSON.stringify(relativePath));
        },
      });
    }, options);
  },
};

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default rule;
