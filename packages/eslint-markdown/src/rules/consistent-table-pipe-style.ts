/**
 * @fileoverview Rule to enforce consistent table pipe style.
 * @author dev-oil
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md055.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS, escapedTrailingBackslashRegex } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type TablePipeStyle = (typeof TABLE_PIPE_STYLE)[number];
/**
 * Options for the `consistent-table-pipe-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'consistent'`, the rule enforces that all table rows in the document use the same style as the header row of the first table.
     *
     * You can also specify a particular style by setting `style` to one of the following values:
     *
     * - `'leading-and-trailing'`: Require both leading and trailing pipes, such as `| a | b |`.
     * - `'leading-only'`: Require a leading pipe and disallow a trailing pipe, such as `| a | b`.
     * - `'trailing-only'`: Require a trailing pipe and disallow a leading pipe, such as `a | b |`.
     * - `'no-leading-or-trailing'`: Disallow both leading and trailing pipes, such as `a | b`.
     * @default 'consistent'
     */
    style: 'consistent' | TablePipeStyle;
  },
];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const TABLE_PIPE_STYLE = [
  'leading-and-trailing',
  'leading-only',
  'trailing-only',
  'no-leading-or-trailing',
] as const;

/**
 * Matches blockquote markers and indentation before a delimiter row.
 * A delimiter row only contains `|`, `-`, `:`, spaces, and tabs, so it never starts with `>`.
 */
const delimiterRowPrefixRegex = /^[ \t>]*/u;

/**
 * Returns the table pipe style of the given row text.
 * @param text Text of the row, without leading container markers and trailing whitespace.
 * @returns The table pipe style of the row.
 */
function getTablePipeStyle(text: string): TablePipeStyle {
  const hasLeadingPipe = text.startsWith('|');
  // An escaped `\|` at the end of a row is part of the cell content, not a trailing pipe.
  const hasTrailingPipe =
    text.endsWith('|') && !escapedTrailingBackslashRegex.test(text.slice(0, -1));

  if (hasLeadingPipe) {
    return hasTrailingPipe ? 'leading-and-trailing' : 'leading-only';
  }

  return hasTrailingPipe ? 'trailing-only' : 'no-leading-or-trailing';
}

/**
 * @param style Table pipe style.
 * @returns Whether the style has a leading pipe.
 */
function isLeadingPipeStyle(style: TablePipeStyle): boolean {
  return style === 'leading-and-trailing' || style === 'leading-only';
}

/**
 * @param style Table pipe style.
 * @returns Whether the style has a trailing pipe.
 */
function isTrailingPipeStyle(style: TablePipeStyle): boolean {
  return style === 'leading-and-trailing' || style === 'trailing-only';
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/gfm'],

    docs: {
      description: 'Enforce consistent table pipe style',
      dialects: ['GFM'],
      url: URL_RULE_DOCS('consistent-table-pipe-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', ...TABLE_PIPE_STYLE],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'consistent',
      },
    ],

    messages: {
      style: 'Table pipe style should be `{{ style }}`.',
    },
  },

  create(context) {
    const { sourceCode } = context;
    const { lines } = sourceCode;
    const [{ style }] = context.options;

    let tablePipeStyle: TablePipeStyle | null = style === 'consistent' ? null : style;

    /**
     * @param startOffset Start offset of the row, excluding container markers.
     * @param text Text of the row, without trailing whitespace.
     */
    function checkRow(startOffset: number, text: string) {
      const currentTablePipeStyle = getTablePipeStyle(text);

      if (tablePipeStyle === null) {
        tablePipeStyle = currentTablePipeStyle;
      }

      if (tablePipeStyle === currentTablePipeStyle) {
        return;
      }

      const endOffset = startOffset + text.length;
      const shouldAddLeadingPipe =
        isLeadingPipeStyle(tablePipeStyle) && !isLeadingPipeStyle(currentTablePipeStyle);
      const shouldAddTrailingPipe =
        isTrailingPipeStyle(tablePipeStyle) &&
        !isTrailingPipeStyle(currentTablePipeStyle);
      // Removing a pipe can change the table structure, e.g. `| | b |` loses its empty first cell
      // and `| - a | b |` turns into a list item, so only missing pipes are fixed.
      const shouldRemovePipe =
        (!isLeadingPipeStyle(tablePipeStyle) &&
          isLeadingPipeStyle(currentTablePipeStyle)) ||
        (!isTrailingPipeStyle(tablePipeStyle) &&
          isTrailingPipeStyle(currentTablePipeStyle));

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        messageId: 'style',

        data: {
          style: tablePipeStyle,
        },

        fix: shouldRemovePipe
          ? null
          : fixer => [
              ...(shouldAddLeadingPipe
                ? [fixer.insertTextBeforeRange([startOffset, endOffset], '| ')]
                : []),
              // A space before the pipe keeps a trailing `\` from escaping it.
              ...(shouldAddTrailingPipe
                ? [fixer.insertTextAfterRange([startOffset, endOffset], ' |')]
                : []),
            ],
      });
    }

    return {
      table(node) {
        for (const [index, row] of node.children.entries()) {
          const [startOffset, endOffset] = sourceCode.getRange(row);

          checkRow(startOffset, sourceCode.text.slice(startOffset, endOffset).trimEnd());

          // The delimiter row is not part of the AST, so it is read from the line after the header row.
          if (index === 0) {
            const line = sourceCode.getLoc(row).end.line + 1;
            const lineText = lines[line - 1];
            const prefixLength = delimiterRowPrefixRegex.exec(lineText)![0].length; // Always matches, possibly with an empty string.

            checkRow(
              sourceCode.getIndexFromLoc({ line, column: prefixLength + 1 }),
              lineText.slice(prefixLength).trimEnd(),
            );
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
