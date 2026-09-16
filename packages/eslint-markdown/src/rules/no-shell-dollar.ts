/**
 * @fileoverview Rule to disallow dollar signs before commands without showing output.
 * @author Marry(uncoolclub)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md014.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getCodeStyle, isBlankLine } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule, SourceRange } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-shell-dollar` rule.
 */
type RuleOptions = [
  {
    /**
     * An array of code block language identifiers to skip.
     * @default []
     */
    skipCode: string[];
  },
];
type MessageIds = 'noShellDollar';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dollarCommandRegex = /^[ \t]*\$[ \t]+/u;
const promptRegex = /\$[ \t]+/u;
const trailingBackslashRegex = /\\+$/u;
const lineEndingRegex = /\r\n|[\r\n]/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow dollar signs before commands without showing output',
      url: URL_RULE_DOCS('no-shell-dollar'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          skipCode: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: [],
      },
    ],

    messages: {
      noShellDollar:
        'Dollar sign should not be used before commands without showing output.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const {
      sourceCode,
      sourceCode: { lines },
    } = context;
    const [{ skipCode }] = context.options;

    return {
      code(node) {
        if (node.lang && skipCode.includes(node.lang)) {
          // Early return if the code block's language is in the skip list.
          return;
        }

        const { start } = sourceCode.getLoc(node);
        const promptRanges: SourceRange[] = [];
        const firstCodeLine = // A fenced code block starts its content on the second line, so its opening fence is skipped.
          getCodeStyle(lines[start.line - 1][start.column - 1]) === 'indent'
            ? start.line
            : start.line + 1;

        let isPreviousLineContinues = false;

        for (const [index, codeLine] of node.value.split(lineEndingRegex).entries()) {
          if (isBlankLine(codeLine)) {
            isPreviousLineContinues = false;
            continue;
          }

          if (!isPreviousLineContinues) {
            if (!dollarCommandRegex.test(codeLine)) {
              return;
            }

            // `Code#value` drops container markers and expands partial tabs, so find the prompt in the original line.
            const line = firstCodeLine + index;
            const match = promptRegex.exec(lines[line - 1])!; // `dollarCommandRegex` match guarantees this will succeed.

            const startOffset = sourceCode.getIndexFromLoc({
              line,
              column: match.index + 1,
            });
            const endOffset = startOffset + match[0].length;

            promptRanges.push([startOffset, endOffset]);
          }

          isPreviousLineContinues =
            (trailingBackslashRegex.exec(codeLine)?.[0].length ?? 0) % 2 === 1;
        }

        for (const [startOffset, endOffset] of promptRanges) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noShellDollar',

            fix(fixer) {
              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
