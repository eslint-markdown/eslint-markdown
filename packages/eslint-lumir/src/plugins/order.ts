/**
 * @fileoverview Source code for order rule.
 * @license MIT Copied from `eslint-plugin-import-x` package.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/rules/order.ts
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
  consistent-return,
  no-restricted-properties,
  no-useless-return,
  prefer-destructuring,
  prefer-exponentiation-operator
*/
// @ts-nocheck -- TODO: Code was simply copied and pasted. Type annotations will be modified later.

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { existsSync } from 'node:fs';
import { createRequire, isBuiltin } from 'node:module';
import path from 'node:path';
import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';
import { minimatch, type MinimatchOptions } from 'minimatch';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Types used by this rule, adapted from `eslint-plugin-import-x`.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/types.ts
 */
type ImportType =
  | 'internal'
  | 'absolute'
  | 'builtin'
  | 'parent'
  | 'index'
  | 'sibling'
  | 'external'
  | 'unknown'
  | 'object'
  | 'type';
type Arrayable<T> = T | readonly T[];
type RuleContext<TMessageIds extends string = string> = TSESLint.RuleContext<
  TMessageIds,
  readonly unknown[]
>;

interface PathGroup {
  pattern: string;
  group: ImportType;
  patternOptions?: MinimatchOptions;
  position?: 'before' | 'after';
}

type ExportAndImportKind = 'value' | 'type';
type NewLinesOptions = 'always' | 'always-and-inside-groups' | 'ignore' | 'never';
type NamedTypes = 'mixed' | 'types-first' | 'types-last';

interface NamedOptions {
  enabled?: boolean;
  import?: boolean;
  export?: boolean;
  require?: boolean;
  cjsExports?: boolean;
  types?: NamedTypes;
}

interface AlphabetizeOptions {
  caseInsensitive: boolean;
  order: 'ignore' | 'asc' | 'desc';
  orderImportKind: 'ignore' | 'asc' | 'desc';
}

type ImportEntryType = 'import:object' | 'import' | 'require' | 'export';
type LiteralNodeValue = string | number | bigint | boolean | RegExp | null;

interface ImportEntry {
  type: ImportEntryType;
  node: TSESTree.Node & {
    importKind?: ExportAndImportKind;
    exportKind?: ExportAndImportKind;
  };
  value: LiteralNodeValue;
  alias?: string;
  kind?: ExportAndImportKind;
  displayName?: LiteralNodeValue;
}

interface ImportEntryWithRank extends ImportEntry {
  rank: number;
  isMultiline?: boolean;
}

interface RanksPathGroup {
  pattern: string;
  patternOptions?: MinimatchOptions;
  group: string;
  position?: number;
}

type RanksGroups = Record<string, number>;

interface Ranks {
  omittedTypes: string[];
  groups: RanksGroups;
  pathGroups: RanksPathGroup[];
  maxPosition: number;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// NOTE: A few lines from this point onward were vibe-coded.

const packagePaths = new WeakMap<RuleContext, string>();
const resolveErrors = new WeakSet<RuleContext>();
const indexFiles = new Set(['.', './', './index', './index.js']);

/**
 * Find the nearest package directory, adapted from the upstream package-path/pkg-up helpers.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/utils/pkg-up.ts
 */
function getContextPackagePath(context: RuleContext): string {
  let directory = packagePaths.get(context);
  if (directory) {
    return directory;
  }
  directory = path.dirname(path.resolve(context.cwd, context.physicalFilename));
  while (!existsSync(path.join(directory, 'package.json'))) {
    const parent = path.dirname(directory);
    if (parent === directory) {
      directory = context.cwd;
      break;
    }
    directory = parent;
  }
  packagePaths.set(context, directory);
  return directory;
}

/**
 * Retain resolver-next support; use Node resolution instead of the upstream resolver loader.
 * Node resolution does not implement legacy resolver options, TS paths, or Webpack aliases.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/utils/resolve.ts
 */
function resolveImport(name: string, context: RuleContext): string | null | undefined {
  const { settings, physicalFilename } = context;
  if (settings['import/core-modules']?.includes(name)) {
    return null;
  }
  const configured = settings['import/resolver-next'];
  if (configured) {
    try {
      const resolvers = Array.isArray(configured) ? configured : [configured];
      for (const [index, resolver] of resolvers.entries()) {
        if (resolver?.interfaceVersion !== 3 || typeof resolver.resolve !== 'function') {
          throw new TypeError(
            `${resolver?.name || `settings['import/resolver-next'][${index}]`} is not a valid import resolver for import/order!`,
          );
        }
        const resolved = resolver.resolve(name, physicalFilename);
        if (resolved.found) {
          return resolved.path;
        }
      }
    } catch (error) {
      if (!resolveErrors.has(context)) {
        context.report({
          message: `Resolve error: ${error instanceof Error ? error.message : String(error)}`,
          loc: { line: 1, column: 0 },
        });
        resolveErrors.add(context);
      }
    }
    return undefined;
  }
  if (isBuiltin(name) || name.startsWith('data:')) {
    return null;
  }
  try {
    return createRequire(path.resolve(context.cwd, physicalFilename)).resolve(name);
  } catch {
    return undefined;
  }
}

/**
 * Classify import sources in the same order as the upstream import-type helper.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/utils/import-type.ts
 */
function importType(name: LiteralNodeValue, context: RuleContext): ImportType {
  const { settings } = context;
  const modulePath = typeof name === 'string' ? resolveImport(name, context) : null;
  if (typeof name === 'string') {
    const internalScope = settings['import/internal-regex'];
    if (internalScope && new RegExp(internalScope).test(name)) {
      return 'internal';
    }
    if (path.isAbsolute(name)) {
      return 'absolute';
    }
    const base = /^@[^/]+\/?[^/]+/.test(name)
      ? name.split('/').slice(0, 2).join('/')
      : name.split('/')[0];
    const extras = settings['import/core-modules'] || [];
    if (!modulePath && name && (isBuiltin(base) || extras.includes(base))) {
      return 'builtin';
    }
    if (/^\.\.$|^\.\.[/\\]/.test(name)) {
      return 'parent';
    }
    if (indexFiles.has(name)) {
      return 'index';
    }
    if (/^\.[/\\]/.test(name)) {
      return 'sibling';
    }
  }
  if (modulePath) {
    const packagePath = getContextPackagePath(context);
    const relativePath = path.relative(packagePath, modulePath);
    const folders = settings['import/external-module-folders'] || ['node_modules'];
    if (
      relativePath.startsWith('..') ||
      folders.some(
        folder =>
          !path.relative(path.resolve(packagePath, folder), modulePath).startsWith('..'),
      )
    ) {
      return 'external';
    }
    if (!relativePath.startsWith('../')) {
      return 'internal';
    }
  }
  if (typeof name === 'string' && (/^\w/.test(name) || /^@[^/]+\/?[^/]+/.test(name))) {
    return 'external';
  }
  return 'unknown';
}

// NOTE: End of the vibe-coded section.
// --------------------------------------------------------------------------------

/**
 * Read the name of an identifier or a string literal specifier.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/utils/get-value.ts
 */
function getValue(node: TSESTree.Identifier | TSESTree.StringLiteral): string {
  switch (node.type) {
    case 'Identifier': {
      return node.name;
    }
    case 'Literal': {
      return node.value;
    }
    default: {
      throw new Error(`Unsupported node type: ${(node as TSESTree.Node).type}`);
    }
  }
}

/**
 * Check whether a call is `require()` with a single string literal argument.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/src/utils/static-require.ts
 */
function isStaticRequire(node: TSESTree.CallExpression): boolean {
  return (
    node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal' &&
    typeof node.arguments[0].value === 'string'
  );
}

// This is a **non-spec compliant** but works in practice replacement of `object.groupby` package.
const groupBy = <T>(array: T[], grouper: (curr: T, index: number) => string | number) =>
  array.reduce<Record<string, T[]>>((acc, curr, index) => {
    const key = grouper(curr, index);
    (acc[key] ||= []).push(curr);
    return acc;
  }, {});

const categories = {
  named: 'named',
  import: 'import',
  exports: 'exports',
} as const;

type Category = keyof typeof categories;

const defaultGroups = ['builtin', 'external', 'parent', 'sibling', 'index'] as const;
const unassignedImportsTopRank = Number.NEGATIVE_INFINITY;

// REPORTING AND FIXING

function reverse(array: ImportEntryWithRank[]): ImportEntryWithRank[] {
  return array.map(v => ({ ...v, rank: -v.rank })).reverse();
}

function getTokensOrCommentsAfter(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Node,
  count: number,
) {
  let currentNodeOrToken: TSESTree.Node | TSESTree.Token | null = node;
  const result: (TSESTree.Node | TSESTree.Token)[] = [];
  for (let i = 0; i < count; i++) {
    currentNodeOrToken = sourceCode.getTokenAfter(currentNodeOrToken, {
      includeComments: true,
    });
    if (currentNodeOrToken == null) {
      break;
    }
    result.push(currentNodeOrToken);
  }
  return result;
}

function getTokensOrCommentsBefore(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Node,
  count: number,
) {
  let currentNodeOrToken: TSESTree.Node | TSESTree.Token | null = node;
  const result: (TSESTree.Node | TSESTree.Token)[] = [];
  for (let i = 0; i < count; i++) {
    currentNodeOrToken = sourceCode.getTokenBefore(currentNodeOrToken, {
      includeComments: true,
    });
    if (currentNodeOrToken == null) {
      break;
    }
    result.push(currentNodeOrToken);
  }
  return result.reverse();
}

function takeTokensAfterWhile(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Node,
  condition: (nodeOrToken: TSESTree.Node | TSESTree.Token) => boolean,
) {
  const tokens = getTokensOrCommentsAfter(sourceCode, node, 100);
  const result: (TSESTree.Node | TSESTree.Token)[] = [];
  for (const token of tokens) {
    if (condition(token)) {
      result.push(token);
    } else {
      break;
    }
  }
  return result;
}

function takeTokensBeforeWhile(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Node,
  condition: (nodeOrToken: TSESTree.Node | TSESTree.Token) => boolean,
) {
  const tokens = getTokensOrCommentsBefore(sourceCode, node, 100);
  const result: (TSESTree.Node | TSESTree.Token)[] = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (condition(tokens[i])) {
      result.push(tokens[i]);
    } else {
      break;
    }
  }
  return result.reverse();
}

function findOutOfOrder(imported: ImportEntryWithRank[]) {
  if (imported.length === 0) {
    return [];
  }
  let maxSeenRankNode = imported[0];
  return imported.filter(importedModule => {
    const res = importedModule.rank < maxSeenRankNode.rank;
    if (maxSeenRankNode.rank < importedModule.rank) {
      maxSeenRankNode = importedModule;
    }
    return res;
  });
}

function findRootNode(node: TSESTree.Node) {
  let parent = node;
  while (
    parent.parent != null &&
    (!('body' in parent.parent) || parent.parent.body == null)
  ) {
    parent = parent.parent;
  }
  return parent;
}

function findEndOfLineWithComments(sourceCode: TSESLint.SourceCode, node: TSESTree.Node) {
  const tokensToEndOfLine = takeTokensAfterWhile(
    sourceCode,
    node,
    commentOnSameLineAs(node),
  );
  const endOfTokens =
    tokensToEndOfLine.length > 0
      ? tokensToEndOfLine[tokensToEndOfLine.length - 1].range[1]
      : node.range[1];
  let result = endOfTokens;
  for (let i = endOfTokens; i < sourceCode.text.length; i++) {
    if (sourceCode.text[i] === '\n') {
      result = i + 1;
      break;
    }
    if (
      sourceCode.text[i] !== ' ' &&
      sourceCode.text[i] !== '\t' &&
      sourceCode.text[i] !== '\r'
    ) {
      break;
    }
    result = i + 1;
  }
  return result;
}

function commentOnSameLineAs(node: TSESTree.Node) {
  return (token: TSESTree.Node | TSESTree.Token) =>
    (token.type === 'Block' || token.type === 'Line') &&
    token.loc.start.line === token.loc.end.line &&
    token.loc.end.line === node.loc.end.line;
}

function findStartOfLineWithComments(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Node,
) {
  const tokensToEndOfLine = takeTokensBeforeWhile(
    sourceCode,
    node,
    commentOnSameLineAs(node),
  );
  const startOfTokens =
    tokensToEndOfLine.length > 0 ? tokensToEndOfLine[0].range[0] : node.range[0];
  let result = startOfTokens;
  for (let i = startOfTokens - 1; i > 0; i--) {
    if (sourceCode.text[i] !== ' ' && sourceCode.text[i] !== '\t') {
      break;
    }
    result = i;
  }
  return result;
}

function findSpecifierStart(sourceCode: TSESLint.SourceCode, node: TSESTree.Node) {
  let token: TSESTree.Token;

  do {
    token = sourceCode.getTokenBefore(node)!;
  } while (token.value !== ',' && token.value !== '{');

  return token.range[1];
}

function findSpecifierEnd(sourceCode: TSESLint.SourceCode, node: TSESTree.Node) {
  let token: TSESTree.Token;

  do {
    token = sourceCode.getTokenAfter(node)!;
  } while (token.value !== ',' && token.value !== '}');

  return token.range[0];
}

function isRequireExpression(
  expr?: TSESTree.Expression | null,
): expr is TSESTree.CallExpression {
  return (
    expr != null &&
    expr.type === 'CallExpression' &&
    expr.callee != null &&
    'name' in expr.callee &&
    expr.callee.name === 'require' &&
    expr.arguments != null &&
    expr.arguments.length === 1 &&
    expr.arguments[0].type === 'Literal'
  );
}

function isSupportedRequireModule(node: TSESTree.Node) {
  if (node.type !== 'VariableDeclaration') {
    return false;
  }
  if (node.declarations.length !== 1) {
    return false;
  }
  const decl = node.declarations[0];
  const isPlainRequire =
    decl.id &&
    (decl.id.type === 'Identifier' || decl.id.type === 'ObjectPattern') &&
    isRequireExpression(decl.init);
  const isRequireWithMemberExpression =
    decl.id &&
    (decl.id.type === 'Identifier' || decl.id.type === 'ObjectPattern') &&
    decl.init != null &&
    decl.init.type === 'CallExpression' &&
    decl.init.callee != null &&
    decl.init.callee.type === 'MemberExpression' &&
    isRequireExpression(decl.init.callee.object);
  return isPlainRequire || isRequireWithMemberExpression;
}

function isPlainImportModule(node: TSESTree.Node): node is TSESTree.ImportDeclaration {
  return (
    node.type === 'ImportDeclaration' &&
    node.specifiers != null &&
    node.specifiers.length > 0
  );
}

function isUnassignedImport(node: ImportEntry) {
  return node.node.type === 'ImportDeclaration' && node.node.specifiers.length === 0;
}

function isPlainImportEquals(
  node: TSESTree.Node,
): node is TSESTree.TSImportEqualsDeclaration & {
  moduleReference: TSESTree.TSExternalModuleReference;
} {
  return (
    node.type === 'TSImportEqualsDeclaration' &&
    'expression' in node.moduleReference &&
    !!node.moduleReference.expression
  );
}

function isCJSExports(context: RuleContext, node: TSESTree.Expression) {
  if (
    node.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    node.property.type === 'Identifier' &&
    node.object.name === 'module' &&
    node.property.name === 'exports'
  ) {
    return !context.sourceCode
      .getScope(node)
      .variables.some(variable => variable.name === 'module');
  }
  if (node.type === 'Identifier' && node.name === 'exports') {
    return !context.sourceCode
      .getScope(node)
      .variables.some(variable => variable.name === 'exports');
  }
}

function getNamedCJSExports(context: RuleContext, node: TSESTree.Node) {
  if (node.type !== 'MemberExpression') {
    return;
  }
  const result: string[] = [];
  let root: TSESTree.Expression = node;
  let parent!: TSESTree.Expression;
  while (root.type === 'MemberExpression') {
    if (root.property.type !== 'Identifier') {
      return;
    }
    result.unshift(root.property.name);
    parent = root;
    root = root.object;
  }

  if (isCJSExports(context, root)) {
    return result;
  }

  if (isCJSExports(context, parent)) {
    return result.slice(1);
  }
}

function canCrossNodeWhileReorder(node: TSESTree.Node) {
  return (
    isSupportedRequireModule(node) ||
    isPlainImportModule(node) ||
    isPlainImportEquals(node)
  );
}

function canReorderItems(firstNode: TSESTree.Node, secondNode: TSESTree.Node) {
  const parent = firstNode.parent;
  if (!parent || !('body' in parent) || !Array.isArray(parent.body)) {
    return false;
  }
  const body: TSESTree.Node[] = parent.body;
  const [firstIndex, secondIndex] = [
    body.indexOf(firstNode),
    body.indexOf(secondNode),
  ].sort();
  const nodesBetween = parent.body.slice(firstIndex, secondIndex + 1);
  for (const nodeBetween of nodesBetween) {
    if (!canCrossNodeWhileReorder(nodeBetween)) {
      return false;
    }
  }
  return true;
}

function makeImportDescription(node: ImportEntry) {
  if (node.type === 'export') {
    if (node.node.exportKind === 'type') {
      return 'type export';
    }
    return 'export';
  }
  if (node.node.importKind === 'type') {
    return 'type import';
  }
  // @ts-expect-error - flow type
  if (node.node.importKind === 'typeof') {
    return 'typeof import';
  }
  return 'import';
}

function fixOutOfOrder(
  context: RuleContext,
  firstNode: ImportEntry,
  secondNode: ImportEntry,
  order: 'before' | 'after',
  category: Category,
) {
  const isNamed = category === categories.named;
  const isExports = category === categories.exports;
  const { sourceCode } = context;

  const { firstRoot, secondRoot } = isNamed
    ? { firstRoot: firstNode.node, secondRoot: secondNode.node }
    : {
        firstRoot: findRootNode(firstNode.node),
        secondRoot: findRootNode(secondNode.node),
      };

  const { firstRootStart, firstRootEnd, secondRootStart, secondRootEnd } = isNamed
    ? {
        firstRootStart: findSpecifierStart(sourceCode, firstRoot),
        firstRootEnd: findSpecifierEnd(sourceCode, firstRoot),
        secondRootStart: findSpecifierStart(sourceCode, secondRoot),
        secondRootEnd: findSpecifierEnd(sourceCode, secondRoot),
      }
    : {
        firstRootStart: findStartOfLineWithComments(sourceCode, firstRoot),
        firstRootEnd: findEndOfLineWithComments(sourceCode, firstRoot),
        secondRootStart: findStartOfLineWithComments(sourceCode, secondRoot),
        secondRootEnd: findEndOfLineWithComments(sourceCode, secondRoot),
      };

  if (firstNode.displayName === secondNode.displayName) {
    if (firstNode.alias) {
      firstNode.displayName = `${firstNode.displayName} as ${firstNode.alias}`;
    }
    if (secondNode.alias) {
      secondNode.displayName = `${secondNode.displayName} as ${secondNode.alias}`;
    }
  }

  const firstDesc = makeImportDescription(firstNode);
  const secondDesc = makeImportDescription(secondNode);

  // FIXME: find out why this happens, upstream doesn't have this check
  if (firstNode.displayName === secondNode.displayName && firstDesc === secondDesc) {
    return;
  }

  const firstImport = `${firstDesc} of \`${firstNode.displayName}\``;
  const secondImport = `\`${secondNode.displayName}\` ${secondDesc}`;

  const messageOptions = {
    messageId: 'order',
    data: { firstImport, secondImport, order },
  } as const;

  if (isNamed) {
    const firstCode = sourceCode.text.slice(firstRootStart, firstRoot.range[1]);
    const firstTrivia = sourceCode.text.slice(firstRoot.range[1], firstRootEnd);
    const secondCode = sourceCode.text.slice(secondRootStart, secondRoot.range[1]);
    const secondTrivia = sourceCode.text.slice(secondRoot.range[1], secondRootEnd);

    if (order === 'before') {
      const trimmedTrivia = secondTrivia.trimEnd();
      const gapCode = sourceCode.text.slice(firstRootEnd, secondRootStart - 1);
      const whitespaces = secondTrivia.slice(trimmedTrivia.length);
      context.report({
        node: secondNode.node,
        ...messageOptions,
        fix: fixer =>
          fixer.replaceTextRange(
            [firstRootStart, secondRootEnd],
            `${secondCode},${trimmedTrivia}${firstCode}${firstTrivia}${gapCode}${whitespaces}`,
          ),
      });
    } else if (order === 'after') {
      const trimmedTrivia = firstTrivia.trimEnd();
      const gapCode = sourceCode.text.slice(secondRootEnd + 1, firstRootStart);
      const whitespaces = firstTrivia.slice(trimmedTrivia.length);
      context.report({
        node: secondNode.node,
        ...messageOptions,
        fix: fixes =>
          fixes.replaceTextRange(
            [secondRootStart, firstRootEnd],
            `${gapCode}${firstCode},${trimmedTrivia}${secondCode}${whitespaces}`,
          ),
      });
    }
  } else {
    const canFix = isExports || canReorderItems(firstRoot, secondRoot);
    let newCode = sourceCode.text.slice(secondRootStart, secondRootEnd);

    if (newCode[newCode.length - 1] !== '\n') {
      newCode = `${newCode}\n`;
    }

    if (order === 'before') {
      context.report({
        node: secondNode.node,
        ...messageOptions,
        fix: canFix
          ? fixer =>
              fixer.replaceTextRange(
                [firstRootStart, secondRootEnd],
                newCode + sourceCode.text.slice(firstRootStart, secondRootStart),
              )
          : null,
      });
    } else if (order === 'after') {
      context.report({
        node: secondNode.node,
        ...messageOptions,
        fix: canFix
          ? fixer =>
              fixer.replaceTextRange(
                [secondRootStart, firstRootEnd],
                sourceCode.text.slice(secondRootEnd, firstRootEnd) + newCode,
              )
          : null,
      });
    }
  }
}

function reportOutOfOrder(
  context: RuleContext,
  imported: ImportEntryWithRank[],
  outOfOrder: ImportEntryWithRank[],
  order: 'before' | 'after',
  category: Category,
) {
  for (const imp of outOfOrder) {
    fixOutOfOrder(
      context,
      imported.find(importedItem => importedItem.rank > imp.rank)!,
      imp,
      order,
      category,
    );
  }
}

function makeOutOfOrderReport(
  context: RuleContext,
  imported: ImportEntryWithRank[],
  category: Category,
) {
  const outOfOrder = findOutOfOrder(imported);
  if (outOfOrder.length === 0) {
    return;
  }

  // There are things to report. Try to minimize the number of reported errors.
  const reversedImported = reverse(imported);
  const reversedOrder = findOutOfOrder(reversedImported);
  if (reversedOrder.length < outOfOrder.length) {
    reportOutOfOrder(context, reversedImported, reversedOrder, 'after', category);
    return;
  }
  reportOutOfOrder(context, imported, outOfOrder, 'before', category);
}

const compareString = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

/** Some parsers (languages without types) don't provide ImportKind */
const DEFAULT_IMPORT_KIND = 'value';

const getNormalizedValue = (node: ImportEntry, toLowerCase?: boolean) => {
  const value = String(node.value);
  return toLowerCase ? value.toLowerCase() : value;
};

const RELATIVE_DOTS = new Set(['.', '..']);

function getSorter(alphabetizeOptions: AlphabetizeOptions) {
  const multiplier = alphabetizeOptions.order === 'asc' ? 1 : -1;
  const orderImportKind = alphabetizeOptions.orderImportKind;
  const multiplierImportKind =
    orderImportKind !== 'ignore' &&
    (alphabetizeOptions.orderImportKind === 'asc' ? 1 : -1);

  return function importsSorter(nodeA: ImportEntry, nodeB: ImportEntry) {
    const importA = getNormalizedValue(nodeA, alphabetizeOptions.caseInsensitive);
    const importB = getNormalizedValue(nodeB, alphabetizeOptions.caseInsensitive);
    let result = 0;

    if (!importA.includes('/') && !importB.includes('/')) {
      result = compareString(importA, importB);
    } else {
      const A = importA.split('/');
      const B = importB.split('/');
      const a = A.length;
      const b = B.length;

      for (let i = 0; i < Math.min(a, b); i++) {
        // Skip comparing the first path segment, if they are relative segments for both imports
        const x = A[i];
        const y = B[i];
        if (i === 0 && RELATIVE_DOTS.has(x) && RELATIVE_DOTS.has(y)) {
          // Sibling and parent imports can share a group, so compare full paths to keep the comparator transitive (matches upstream)
          if (x !== y) {
            result = compareString(importA, importB);
            break;
          }
          continue;
        }
        result = compareString(x, y);
        if (result) {
          break;
        }
      }

      if (!result && a !== b) {
        result = a < b ? -1 : 1;
      }
    }

    result = result * multiplier;

    // In case the paths are equal (result === 0), sort them by importKind
    if (!result && multiplierImportKind) {
      result =
        multiplierImportKind *
        compareString(
          nodeA.node.importKind || DEFAULT_IMPORT_KIND,
          nodeB.node.importKind || DEFAULT_IMPORT_KIND,
        );
    }

    return result;
  };
}

function mutateRanksToAlphabetize(
  imported: ImportEntryWithRank[],
  alphabetizeOptions: AlphabetizeOptions,
) {
  const groupedByRanks = groupBy(imported, item => item.rank);

  const sorterFn = getSorter(alphabetizeOptions);

  // sort group keys so that they can be iterated on in order
  const groupRanks = Object.keys(groupedByRanks).sort((a, b) => +a - +b);

  // sort imports locally within their group
  for (const groupRank of groupRanks) {
    groupedByRanks[groupRank].sort(sorterFn);
  }

  // assign globally unique rank to each import
  let newRank = 0;
  const alphabetizedRanks = groupRanks.reduce<Record<string, number>>(
    (acc, groupRank) => {
      for (const importedItem of groupedByRanks[groupRank]) {
        acc[`${importedItem.value}|${importedItem.node.importKind}`] =
          Number.parseInt(groupRank, 10) + newRank;
        newRank += 1;
      }
      return acc;
    },
    {},
  );

  // mutate the original group-rank with alphabetized-rank
  for (const importedItem of imported) {
    importedItem.rank =
      alphabetizedRanks[`${importedItem.value}|${importedItem.node.importKind}`];
  }
}

// DETECTING

function computePathRank(
  ranks: RanksGroups,
  pathGroups: RanksPathGroup[],
  path: string,
  maxPosition: number,
) {
  for (const { pattern, patternOptions, group, position = 1 } of pathGroups) {
    if (minimatch(path, pattern, patternOptions || { nocomment: true })) {
      return ranks[group] + position / maxPosition;
    }
  }
}

function computeRank(
  context: RuleContext,
  ranks: Ranks,
  importEntry: ImportEntry,
  excludedImportTypes: Set<ImportType>,
  isSortingTypesGroup?: boolean,
) {
  let impType: ImportType;
  let rank: number | undefined;

  const isTypeGroupInGroups = !ranks.omittedTypes.includes('type');
  const isTypeOnlyImport = importEntry.node.importKind === 'type';
  const isExcludedFromPathRank =
    isTypeOnlyImport && isTypeGroupInGroups && excludedImportTypes.has('type');

  if (importEntry.type === 'import:object') {
    impType = 'object';
  } else if (isTypeOnlyImport && isTypeGroupInGroups && !isSortingTypesGroup) {
    impType = 'type';
  } else {
    impType = importType(importEntry.value, context);
  }

  if (!excludedImportTypes.has(impType) && !isExcludedFromPathRank) {
    rank =
      typeof importEntry.value === 'string'
        ? computePathRank(
            ranks.groups,
            ranks.pathGroups,
            importEntry.value,
            ranks.maxPosition,
          )
        : undefined;
  }

  if (rank === undefined) {
    rank = ranks.groups[impType];

    if (rank === undefined) {
      return -1;
    }
  }

  if (isTypeOnlyImport && isSortingTypesGroup) {
    rank = ranks.groups.type + rank / 10;
  }

  if (importEntry.type !== 'import' && !importEntry.type.startsWith('import:')) {
    rank += 100;
  }

  return rank;
}

function registerNode(
  context: RuleContext,
  importEntry: ImportEntry,
  ranks: Ranks,
  imported: ImportEntryWithRank[],
  excludedImportTypes: Set<ImportType>,
  isSortingTypesGroup?: boolean,
  rankOverride?: number,
) {
  const rank =
    rankOverride ??
    computeRank(context, ranks, importEntry, excludedImportTypes, isSortingTypesGroup);
  if (rank !== -1) {
    let importNode = importEntry.node;

    if (
      importEntry.type === 'require' &&
      importNode.parent?.parent?.type === 'VariableDeclaration'
    ) {
      importNode = importNode.parent.parent;
    }

    imported.push({
      ...importEntry,
      rank,
      isMultiline: importNode.loc.end.line !== importNode.loc.start.line,
    });
  }
}

function getRequireBlock(node: TSESTree.Node) {
  let n = node;
  // Handle cases like `const baz = require('foo').bar.baz`
  // and `const foo = require('foo')()`
  while (
    (n.parent?.type === 'MemberExpression' && n.parent.object === n) ||
    (n.parent?.type === 'CallExpression' && n.parent.callee === n)
  ) {
    n = n.parent;
  }
  if (
    n.parent?.type === 'VariableDeclarator' &&
    n.parent.parent.type === 'VariableDeclaration' &&
    n.parent.parent.parent.type === 'Program'
  ) {
    return n.parent.parent.parent;
  }
}

const types: ImportType[] = [
  'builtin',
  'external',
  'internal',
  'unknown',
  'parent',
  'sibling',
  'index',
  'object',
  'type',
];

// Creates an object with type-rank pairs.
// Example: { index: 0, sibling: 1, parent: 1, external: 1, builtin: 2, internal: 2 }
// Will throw an error if it contains a type that does not exist, or has a duplicate
function convertGroupsToRanks(groups: readonly Arrayable<ImportType>[]) {
  const rankObject = groups.reduce(
    (res, group, index) => {
      for (const groupItem of ([group] as const).flat()) {
        if (!types.includes(groupItem)) {
          throw new Error(
            `Incorrect configuration of the rule: Unknown type \`${JSON.stringify(groupItem)}\``,
          );
        }
        if (res[groupItem] !== undefined) {
          throw new Error(
            `Incorrect configuration of the rule: \`${groupItem}\` is duplicated`,
          );
        }
        res[groupItem] = index * 2;
      }
      return res;
    },
    {} as Record<ImportType, number>,
  );

  const omittedTypes = types.filter(type => rankObject[type] === undefined);

  const ranks = omittedTypes.reduce((res, type) => {
    res[type] = groups.length * 2;
    return res;
  }, rankObject);

  return { groups: ranks, omittedTypes };
}

function convertPathGroupsForRanks(pathGroups: PathGroup[]) {
  const after: Record<string, number> = {};
  const before: Record<string, number[]> = {};

  const transformed = pathGroups.map((pathGroup, index) => {
    const { group, position: positionString } = pathGroup;
    let position = 0;
    if (positionString === 'after') {
      if (!after[group]) {
        after[group] = 1;
      }
      position = after[group]++;
    } else if (positionString === 'before') {
      if (!before[group]) {
        before[group] = [];
      }
      before[group].push(index);
    }

    return { ...pathGroup, position };
  });

  let maxPosition = 1;

  for (const group of Object.keys(before)) {
    const groupLength = before[group].length;
    for (const [index, groupIndex] of before[group].entries()) {
      transformed[groupIndex].position = -1 * (groupLength - index);
    }
    maxPosition = Math.max(maxPosition, groupLength);
  }

  for (const key of Object.keys(after)) {
    const groupNextPosition = after[key];
    maxPosition = Math.max(maxPosition, groupNextPosition - 1);
  }

  return {
    pathGroups: transformed,
    maxPosition: maxPosition > 10 ? Math.pow(10, Math.ceil(Math.log10(maxPosition))) : 10,
  };
}

function fixNewLineAfterImport(context: RuleContext, previousImport: ImportEntry) {
  const prevRoot = findRootNode(previousImport.node);
  const tokensToEndOfLine = takeTokensAfterWhile(
    context.sourceCode,
    prevRoot,
    commentOnSameLineAs(prevRoot),
  );

  let endOfLine = prevRoot.range[1];
  if (tokensToEndOfLine.length > 0) {
    endOfLine = tokensToEndOfLine[tokensToEndOfLine.length - 1].range[1];
  }
  return (fixer: TSESLint.RuleFixer) =>
    fixer.insertTextAfterRange([prevRoot.range[0], endOfLine], '\n');
}

function removeNewLineAfterImport(
  context: RuleContext,
  currentImport: ImportEntry,
  previousImport: ImportEntry,
) {
  const { sourceCode } = context;
  const prevRoot = findRootNode(previousImport.node);
  const currRoot = findRootNode(currentImport.node);
  const rangeToRemove = [
    findEndOfLineWithComments(sourceCode, prevRoot),
    findStartOfLineWithComments(sourceCode, currRoot),
  ] as const;
  if (/^\s*$/.test(sourceCode.text.slice(rangeToRemove[0], rangeToRemove[1]))) {
    return (fixer: TSESLint.RuleFixer) => fixer.removeRange(rangeToRemove);
  }
  return;
}

function makeNewlinesBetweenReport(
  context: RuleContext<MessageId>,
  imported: ImportEntryWithRank[],
  newlinesBetweenImports_: NewLinesOptions,
  newlinesBetweenTypeOnlyImports_: NewLinesOptions,
  distinctGroup: boolean,
  isSortingTypesGroup?: boolean,
  isConsolidatingSpaceBetweenImports?: boolean,
  disableUnassignedImportFixes?: boolean,
) {
  const getNumberOfEmptyLinesBetween = (
    currentImport: ImportEntry,
    previousImport: ImportEntry,
  ) =>
    context.sourceCode.lines
      .slice(previousImport.node.loc.end.line, currentImport.node.loc.start.line - 1)
      .filter(line => line.trim().length === 0).length;
  const getIsStartOfDistinctGroup = (
    currentImport: ImportEntryWithRank,
    previousImport: ImportEntryWithRank,
  ) =>
    currentImport.rank !== previousImport.rank &&
    currentImport.rank - 1 >= previousImport.rank;
  let previousImport = imported[0];

  for (const currentImport of imported.slice(1)) {
    const shouldDisableFix =
      disableUnassignedImportFixes &&
      (isUnassignedImport(previousImport) || isUnassignedImport(currentImport));
    const emptyLinesBetween = getNumberOfEmptyLinesBetween(currentImport, previousImport);

    const isStartOfDistinctGroup = getIsStartOfDistinctGroup(
      currentImport,
      previousImport,
    );

    const isTypeOnlyImport = currentImport.node.importKind === 'type';
    const isPreviousImportTypeOnlyImport = previousImport.node.importKind === 'type';

    const isNormalImportNextToTypeOnlyImportAndRelevant =
      isTypeOnlyImport !== isPreviousImportTypeOnlyImport && isSortingTypesGroup;

    const isTypeOnlyImportAndRelevant = isTypeOnlyImport && isSortingTypesGroup;

    // In the special case where newlinesBetweenImports and consolidateIslands
    // want the opposite thing, consolidateIslands wins
    const newlinesBetweenImports =
      isSortingTypesGroup &&
      isConsolidatingSpaceBetweenImports &&
      (previousImport.isMultiline || currentImport.isMultiline) &&
      newlinesBetweenImports_ === 'never'
        ? 'always-and-inside-groups'
        : newlinesBetweenImports_;

    // In the special case where newlinesBetweenTypeOnlyImports and
    // consolidateIslands want the opposite thing, consolidateIslands wins
    const newlinesBetweenTypeOnlyImports =
      isSortingTypesGroup &&
      isConsolidatingSpaceBetweenImports &&
      (isNormalImportNextToTypeOnlyImportAndRelevant ||
        previousImport.isMultiline ||
        currentImport.isMultiline) &&
      newlinesBetweenTypeOnlyImports_ === 'never'
        ? 'always-and-inside-groups'
        : newlinesBetweenTypeOnlyImports_;

    const isNotIgnored =
      (isTypeOnlyImportAndRelevant && newlinesBetweenTypeOnlyImports !== 'ignore') ||
      (!isTypeOnlyImportAndRelevant && newlinesBetweenImports !== 'ignore');

    if (isNotIgnored) {
      const shouldAssertNewlineBetweenGroups =
        ((isTypeOnlyImportAndRelevant || isNormalImportNextToTypeOnlyImportAndRelevant) &&
          (newlinesBetweenTypeOnlyImports === 'always' ||
            newlinesBetweenTypeOnlyImports === 'always-and-inside-groups')) ||
        (!isTypeOnlyImportAndRelevant &&
          !isNormalImportNextToTypeOnlyImportAndRelevant &&
          (newlinesBetweenImports === 'always' ||
            newlinesBetweenImports === 'always-and-inside-groups'));

      const shouldAssertNoNewlineWithinGroup =
        ((isTypeOnlyImportAndRelevant || isNormalImportNextToTypeOnlyImportAndRelevant) &&
          newlinesBetweenTypeOnlyImports !== 'always-and-inside-groups') ||
        (!isTypeOnlyImportAndRelevant &&
          !isNormalImportNextToTypeOnlyImportAndRelevant &&
          newlinesBetweenImports !== 'always-and-inside-groups');

      const shouldAssertNoNewlineBetweenGroup =
        !isSortingTypesGroup ||
        !isNormalImportNextToTypeOnlyImportAndRelevant ||
        newlinesBetweenTypeOnlyImports === 'never';

      const isTheNewlineBetweenImportsInTheSameGroup =
        (distinctGroup && currentImport.rank === previousImport.rank) ||
        (!distinctGroup && !isStartOfDistinctGroup);

      // Let's try to cut down on linting errors sent to the user
      let alreadyReported = false;

      if (shouldAssertNewlineBetweenGroups) {
        if (currentImport.rank !== previousImport.rank && emptyLinesBetween === 0) {
          if (distinctGroup || isStartOfDistinctGroup) {
            alreadyReported = true;
            context.report({
              node: previousImport.node,
              messageId: 'oneLineBetweenGroups',
              fix: shouldDisableFix
                ? null
                : fixNewLineAfterImport(context, previousImport),
            });
          }
        } else if (
          emptyLinesBetween > 0 &&
          shouldAssertNoNewlineWithinGroup &&
          isTheNewlineBetweenImportsInTheSameGroup
        ) {
          alreadyReported = true;
          context.report({
            node: previousImport.node,
            messageId: 'noLineWithinGroup',
            fix: shouldDisableFix
              ? null
              : removeNewLineAfterImport(context, currentImport, previousImport),
          });
        }
      } else if (emptyLinesBetween > 0 && shouldAssertNoNewlineBetweenGroup) {
        alreadyReported = true;
        context.report({
          node: previousImport.node,
          messageId: 'noLineBetweenGroups',
          fix: shouldDisableFix
            ? null
            : removeNewLineAfterImport(context, currentImport, previousImport),
        });
      }

      if (!alreadyReported && isConsolidatingSpaceBetweenImports) {
        if (emptyLinesBetween === 0 && currentImport.isMultiline) {
          context.report({
            node: previousImport.node,
            messageId: 'oneLineBetweenTheMultiLineImport',
            fix: shouldDisableFix ? null : fixNewLineAfterImport(context, previousImport),
          });
        } else if (emptyLinesBetween === 0 && previousImport.isMultiline) {
          context.report({
            node: previousImport.node,
            messageId: 'oneLineBetweenThisMultiLineImport',
            fix: shouldDisableFix ? null : fixNewLineAfterImport(context, previousImport),
          });
        } else if (
          emptyLinesBetween > 0 &&
          !previousImport.isMultiline &&
          !currentImport.isMultiline &&
          isTheNewlineBetweenImportsInTheSameGroup
        ) {
          context.report({
            node: previousImport.node,
            messageId: 'noLineBetweenSingleLineImport',
            fix: shouldDisableFix
              ? null
              : removeNewLineAfterImport(context, currentImport, previousImport),
          });
        }
      }
    }

    previousImport = currentImport;
  }
}

function getAlphabetizeConfig(options: Options): AlphabetizeOptions {
  const alphabetize = options.alphabetize || {};
  const order = alphabetize.order || 'ignore';
  const orderImportKind = alphabetize.orderImportKind || 'ignore';
  const caseInsensitive = alphabetize.caseInsensitive || false;
  return { order, orderImportKind, caseInsensitive };
}

// TODO, semver-major: Change the default of "distinctGroup" from true to false
const defaultDistinctGroup = true;

export interface Options {
  'newlines-between'?: NewLinesOptions;
  'newlines-between-types'?: NewLinesOptions;
  named?: boolean | NamedOptions;
  alphabetize?: Partial<AlphabetizeOptions>;
  consolidateIslands?: 'inside-groups' | 'never';
  distinctGroup?: boolean;
  groups?: readonly Arrayable<ImportType>[];
  pathGroupsExcludedImportTypes?: ImportType[];
  pathGroups?: PathGroup[];
  sortTypesGroup?: boolean;
  warnOnUnassignedImports?: boolean | 'top';
}

type MessageId =
  | 'error'
  | 'noLineWithinGroup'
  | 'noLineBetweenGroups'
  | 'oneLineBetweenGroups'
  | 'order'
  | 'oneLineBetweenTheMultiLineImport'
  | 'oneLineBetweenThisMultiLineImport'
  | 'noLineBetweenSingleLineImport';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

// The upstream factory adds a docs URL and passes merged defaults to `create`.
// This rule has empty defaults and reads options directly from `context.options`.
const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Style guide',
      description: 'Enforce a convention in module import order.',
      url: 'https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/order.md',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          groups: {
            type: 'array',
          },
          pathGroupsExcludedImportTypes: {
            type: 'array',
          },
          distinctGroup: {
            type: 'boolean',
            default: defaultDistinctGroup,
          },
          pathGroups: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                pattern: {
                  type: 'string',
                },
                patternOptions: {
                  type: 'object',
                },
                group: {
                  type: 'string',
                  enum: types,
                },
                position: {
                  type: 'string',
                  enum: ['after', 'before'],
                },
              },
              additionalProperties: false,
              required: ['pattern', 'group'],
            },
          },
          'newlines-between': {
            type: 'string',
            enum: ['ignore', 'always', 'always-and-inside-groups', 'never'],
          },
          'newlines-between-types': {
            type: 'string',
            enum: ['ignore', 'always', 'always-and-inside-groups', 'never'],
          },
          consolidateIslands: {
            type: 'string',
            enum: ['inside-groups', 'never'],
          },
          sortTypesGroup: {
            type: 'boolean',
            default: false,
          },
          named: {
            default: false,
            oneOf: [
              {
                type: 'boolean',
              },
              {
                type: 'object',
                properties: {
                  enabled: { type: 'boolean' },
                  import: { type: 'boolean' },
                  export: { type: 'boolean' },
                  require: { type: 'boolean' },
                  cjsExports: { type: 'boolean' },
                  types: {
                    type: 'string',
                    enum: ['mixed', 'types-first', 'types-last'],
                  },
                },
                additionalProperties: false,
              },
            ],
          },
          alphabetize: {
            type: 'object',
            properties: {
              caseInsensitive: {
                type: 'boolean',
                default: false,
              },
              order: {
                type: 'string',
                enum: ['ignore', 'asc', 'desc'],
                default: 'ignore',
              },
              orderImportKind: {
                type: 'string',
                enum: ['ignore', 'asc', 'desc'],
                default: 'ignore',
              },
            },
            additionalProperties: false,
          },
          warnOnUnassignedImports: {
            oneOf: [{ type: 'boolean' }, { type: 'string', enum: ['top'] }],
            default: false,
          },
        },
        additionalProperties: false,
        dependencies: {
          'newlines-between-types': {
            type: 'object',
            properties: {
              sortTypesGroup: {
                type: 'boolean',
                enum: [true],
              },
            },
            required: ['sortTypesGroup'],
          },
          consolidateIslands: {
            anyOf: [
              {
                type: 'object',
                properties: {
                  'newlines-between': {
                    type: 'string',
                    enum: ['always-and-inside-groups'],
                  },
                },
                required: ['newlines-between'],
              },
              {
                type: 'object',
                properties: {
                  'newlines-between-types': {
                    type: 'string',
                    enum: ['always-and-inside-groups'],
                  },
                },
                required: ['newlines-between-types'],
              },
            ],
          },
        },
      },
    ],
    messages: {
      error: '{{error}}',
      noLineWithinGroup: 'There should be no empty line within import group',
      noLineBetweenGroups: 'There should be no empty line between import groups',
      oneLineBetweenGroups:
        'There should be at least one empty line between import groups',
      order: '{{secondImport}} should occur {{order}} {{firstImport}}',
      oneLineBetweenTheMultiLineImport:
        'There should be at least one empty line between this import and the multi-line import that follows it',
      oneLineBetweenThisMultiLineImport:
        'There should be at least one empty line between this multi-line import and the import that follows it',
      noLineBetweenSingleLineImport:
        'There should be no empty lines between this single-line import and the single-line import that follows it',
    },
  },
  defaultOptions: [],
  create(context) {
    const options = context.options[0] || {};
    const newlinesBetweenImports = options['newlines-between'] || 'ignore';
    const newlinesBetweenTypeOnlyImports =
      options['newlines-between-types'] || newlinesBetweenImports;
    const pathGroupsExcludedImportTypes = new Set(
      options.pathGroupsExcludedImportTypes ||
        (['builtin', 'external', 'object'] as const),
    );
    const sortTypesGroup = options.sortTypesGroup;
    const consolidateIslands = options.consolidateIslands || 'never';

    const named: NamedOptions = {
      types: 'mixed',
      ...(typeof options.named === 'object'
        ? {
            ...options.named,
            import:
              'import' in options.named ? options.named.import : options.named.enabled,
            export:
              'export' in options.named ? options.named.export : options.named.enabled,
            require:
              'require' in options.named ? options.named.require : options.named.enabled,
            cjsExports:
              'cjsExports' in options.named
                ? options.named.cjsExports
                : options.named.enabled,
          }
        : {
            import: options.named,
            export: options.named,
            require: options.named,
            cjsExports: options.named,
          }),
    };

    const namedGroups =
      named.types === 'mixed' ? [] : named.types === 'types-last' ? ['value'] : ['type'];
    const alphabetize = getAlphabetizeConfig(options);
    const distinctGroup =
      options.distinctGroup == null ? defaultDistinctGroup : !!options.distinctGroup;

    let ranks: Ranks;

    try {
      const { pathGroups, maxPosition } = convertPathGroupsForRanks(
        options.pathGroups || [],
      );
      const { groups, omittedTypes } = convertGroupsToRanks(
        options.groups || defaultGroups,
      );
      ranks = {
        groups,
        omittedTypes,
        pathGroups,
        maxPosition,
      };
    } catch (error) {
      // Malformed configuration
      return {
        Program(node) {
          context.report({
            node,
            messageId: 'error',
            data: {
              error: (error as Error).message,
            },
          });
        },
      };
    }

    const importMap = new Map<TSESTree.Node, ImportEntryWithRank[]>();
    const exportMap = new Map<TSESTree.Node, ImportEntryWithRank[]>();

    const isTypeGroupInGroups = !ranks.omittedTypes.includes('type');
    const isSortingTypesGroup = isTypeGroupInGroups && sortTypesGroup;

    function getBlockImports(node: TSESTree.Node) {
      let blockImports = importMap.get(node);
      if (!blockImports) {
        importMap.set(node, (blockImports = []));
      }
      return blockImports;
    }

    function getBlockExports(node: TSESTree.Node) {
      let blockExports = exportMap.get(node);
      if (!blockExports) {
        exportMap.set(node, (blockExports = []));
      }
      return blockExports;
    }

    function makeNamedOrderReport(context: RuleContext, namedImports: ImportEntry[]) {
      if (namedImports.length > 1) {
        const imports = namedImports.map(namedImport => {
          const kind = namedImport.kind || 'value';
          const rank = namedGroups.indexOf(kind);
          return {
            displayName: namedImport.value,
            rank: rank === -1 ? namedGroups.length : rank,
            ...namedImport,
            value: `${namedImport.value}:${namedImport.alias || ''}`,
          };
        });

        if (alphabetize.order !== 'ignore') {
          mutateRanksToAlphabetize(imports, alphabetize);
        }

        makeOutOfOrderReport(context, imports, categories.named);
      }
    }

    return {
      ImportDeclaration(node) {
        // Ignoring unassigned imports unless warnOnUnassignedImports is set
        if (node.specifiers.length > 0 || options.warnOnUnassignedImports) {
          const name = node.source.value;
          registerNode(
            context,
            {
              node,
              value: name,
              displayName: name,
              type: 'import',
            },
            ranks,
            getBlockImports(node.parent),
            pathGroupsExcludedImportTypes,
            isSortingTypesGroup,
            node.specifiers.length === 0 && options.warnOnUnassignedImports === 'top'
              ? unassignedImportsTopRank
              : undefined,
          );

          if (named.import) {
            makeNamedOrderReport(
              context,
              node.specifiers
                .filter(specifier => specifier.type === 'ImportSpecifier')
                .map(specifier => ({
                  node: specifier,
                  value: getValue(specifier.imported),
                  type: 'import',
                  kind: specifier.importKind,
                  ...(specifier.local.range[0] !== specifier.imported.range[0] && {
                    alias: specifier.local.name,
                  }),
                })),
            );
          }
        }
      },
      TSImportEqualsDeclaration(node) {
        // @ts-expect-error - legacy parser type
        // skip "export import"s
        if (node.isExport) {
          return;
        }

        let displayName: string;
        let value: string;
        let type: ImportEntryType;

        if (node.moduleReference.type === 'TSExternalModuleReference') {
          value = node.moduleReference.expression.value;
          displayName = value;
          type = 'import';
        } else {
          value = '';
          displayName = context.sourceCode.getText(node.moduleReference);
          type = 'import:object';
        }

        registerNode(
          context,
          {
            node,
            value,
            displayName,
            type,
          },
          ranks,
          getBlockImports(node.parent),
          pathGroupsExcludedImportTypes,
          isSortingTypesGroup,
        );
      },
      CallExpression(node) {
        if (!isStaticRequire(node)) {
          return;
        }
        const block = getRequireBlock(node);
        const firstArg = node.arguments[0];
        if (!block || !('value' in firstArg)) {
          return;
        }
        const { value } = firstArg;
        registerNode(
          context,
          {
            node,
            value,
            displayName: value,
            type: 'require',
          },
          ranks,
          getBlockImports(block),
          pathGroupsExcludedImportTypes,
          isSortingTypesGroup,
        );
      },
      ...(named.require && {
        VariableDeclarator(node) {
          if (node.id.type === 'ObjectPattern' && isRequireExpression(node.init)) {
            const { properties } = node.id;
            for (const p of properties) {
              if (
                !('key' in p) ||
                p.key.type !== 'Identifier' ||
                p.value.type !== 'Identifier'
              ) {
                return;
              }
            }
            makeNamedOrderReport(
              context,
              node.id.properties.map(prop_ => {
                const prop = prop_ as TSESTree.Property;
                const key = prop.key as TSESTree.Identifier;
                const value = prop.value as TSESTree.Identifier;
                return {
                  node: prop,
                  value: key.name,
                  type: 'require',
                  ...(key.range[0] !== value.range[0] && {
                    alias: value.name,
                  }),
                };
              }),
            );
          }
        },
      }),
      ...(named.export && {
        ExportNamedDeclaration(node) {
          makeNamedOrderReport(
            context,
            node.specifiers.map(specifier => ({
              node: specifier,
              value: getValue(specifier.local),
              type: 'export',
              kind: specifier.exportKind,
              ...(specifier.local.range[0] !== specifier.exported.range[0] && {
                alias: getValue(specifier.exported),
              }),
            })),
          );
        },
      }),
      ...(named.cjsExports && {
        AssignmentExpression(node) {
          if (node.parent.type === 'ExpressionStatement') {
            if (isCJSExports(context, node.left)) {
              if (node.right.type === 'ObjectExpression') {
                const { properties } = node.right;
                for (const p of properties) {
                  if (
                    !('key' in p) ||
                    p.key.type !== 'Identifier' ||
                    p.value.type !== 'Identifier'
                  ) {
                    return;
                  }
                }

                makeNamedOrderReport(
                  context,
                  properties.map(prop_ => {
                    const prop = prop_ as TSESTree.Property;
                    const key = prop.key as TSESTree.Identifier;
                    const value = prop.value as TSESTree.Identifier;
                    return {
                      node: prop,
                      value: key.name,
                      type: 'export',
                      ...(key.range[0] !== value.range[0] && {
                        alias: value.name,
                      }),
                    };
                  }),
                );
              }
            } else {
              const nameParts = getNamedCJSExports(context, node.left);
              if (nameParts && nameParts.length > 0) {
                const name = nameParts.join('.');
                getBlockExports(node.parent.parent).push({
                  node,
                  value: name,
                  displayName: name,
                  type: 'export',
                  rank: 0,
                });
              }
            }
          }
        },
      }),
      'Program:exit'() {
        for (const imported of importMap.values()) {
          if (
            newlinesBetweenImports !== 'ignore' ||
            newlinesBetweenTypeOnlyImports !== 'ignore'
          ) {
            makeNewlinesBetweenReport(
              context,
              imported,
              newlinesBetweenImports,
              newlinesBetweenTypeOnlyImports,
              distinctGroup,
              isSortingTypesGroup,
              consolidateIslands === 'inside-groups' &&
                (newlinesBetweenImports === 'always-and-inside-groups' ||
                  newlinesBetweenTypeOnlyImports === 'always-and-inside-groups'),
              options.warnOnUnassignedImports === 'top',
            );
          }

          if (alphabetize.order !== 'ignore') {
            mutateRanksToAlphabetize(
              options.warnOnUnassignedImports === 'top'
                ? imported.filter(node => !isUnassignedImport(node))
                : imported,
              alphabetize,
            );
          }

          makeOutOfOrderReport(context, imported, categories.import);
        }

        for (const exported of exportMap.values()) {
          if (alphabetize.order !== 'ignore') {
            mutateRanksToAlphabetize(exported, alphabetize);
            makeOutOfOrderReport(context, exported, categories.exports);
          }
        }

        importMap.clear();
        exportMap.clear();
      },
    };
  },
};

export default rule;
