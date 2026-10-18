/**
 * @fileoverview Source code for no-empty-named-blocks rule.
 * @license MIT Copied from `eslint-plugin-import-x` package.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/rules/no-empty-named-blocks.ts
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
  @typescript-eslint/ban-ts-comment,
  @typescript-eslint/no-shadow,
  prefer-destructuring
*/
// @ts-nocheck -- TODO: Code was simply copied and pasted. Type annotations will be modified later.

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function getEmptyBlockRange(tokens: TSESTree.Token[], index: number) {
  const token = tokens[index];
  const nextToken = tokens[index + 1];
  const prevToken = tokens[index - 1];
  let start = token.range[0];
  const end = nextToken.range[1];

  // Remove block tokens and the previous comma
  if (
    prevToken.value === ',' ||
    prevToken.value === 'type' ||
    prevToken.value === 'typeof'
  ) {
    start = prevToken.range[0];
  }

  return [start, end] as const;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Helpful warnings',
      description: 'Forbid empty named import blocks.',
      url: 'https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/no-empty-named-blocks.md',
    },
    fixable: 'code',
    hasSuggestions: true,
    messages: {
      emptyNamed: 'Unexpected empty named import block',
      unused: 'Remove unused import',
      emptyImport: 'Remove empty import block',
    },
  },
  create(context) {
    const importsWithoutNameds: TSESTree.ImportDeclaration[] = [];

    return {
      ImportDeclaration(node) {
        if (!node.specifiers.some(x => x.type === 'ImportSpecifier')) {
          importsWithoutNameds.push(node);
        }
      },

      'Program:exit'(program: TSESTree.Program) {
        const importsTokens = importsWithoutNameds.map(
          node =>
            [
              node,
              program.tokens!.filter(
                x => x.range[0] >= node.range[0] && x.range[1] <= node.range[1],
              ),
            ] as const,
        );

        const pTokens = program.tokens || [];

        for (const [node, tokens] of importsTokens) {
          for (const token of tokens) {
            const idx = pTokens.indexOf(token);
            const nextToken = pTokens[idx + 1];

            if (nextToken && token.value === '{' && nextToken.value === '}') {
              const hasOtherIdentifiers = tokens.some(
                token =>
                  token.type === 'Identifier' &&
                  token.value !== 'from' &&
                  token.value !== 'type' &&
                  token.value !== 'typeof',
              );

              // If it has no other identifiers it's the only thing in the import, so we can either remove the import
              // completely or transform it in a side-effects only import
              if (hasOtherIdentifiers) {
                context.report({
                  node,
                  messageId: 'emptyNamed',
                  fix(fixer) {
                    return fixer.removeRange(getEmptyBlockRange(pTokens, idx));
                  },
                });
              } else {
                context.report({
                  node,
                  messageId: 'emptyNamed',
                  suggest: [
                    {
                      messageId: 'unused',
                      fix(fixer) {
                        // Remove the whole import
                        return fixer.remove(node);
                      },
                    },
                    {
                      messageId: 'emptyImport',
                      fix(fixer) {
                        // Remove the empty block and the 'from' token, leaving the import only for its side
                        // effects, e.g. `import 'mod'`
                        const { sourceCode } = context;
                        const fromToken = pTokens.find(t => t.value === 'from')!;
                        const importToken = pTokens.find(t => t.value === 'import')!;
                        const hasSpaceAfterFrom = sourceCode.isSpaceBetween!(
                          fromToken,
                          sourceCode.getTokenAfter(fromToken)!,
                        );
                        const hasSpaceAfterImport = sourceCode.isSpaceBetween!(
                          importToken,
                          sourceCode.getTokenAfter(fromToken)!,
                        );

                        const [start] = getEmptyBlockRange(pTokens, idx);
                        const [, end] = fromToken.range;
                        const range = [start, hasSpaceAfterFrom ? end + 1 : end] as const;

                        return fixer.replaceTextRange(
                          range,
                          hasSpaceAfterImport ? '' : ' ',
                        );
                      },
                    },
                  ],
                });
              }
            }
          }
        }
      },
    };
  },
};

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default rule;
