/**
 * @fileoverview Rule to enforce consistent indentation for list items at the same level.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { List } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `consistent-list-indentation` rule.
 */
type RuleOptions = [];
type MessageIds = 'indentation';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Get the length of a list item marker, such as `*`, `1.`, or `10)`.
 * @param text The source text.
 * @param startOffset The start offset of the list item marker.
 * @param ordered Whether the list is ordered.
 * @returns The length of the list item marker.
 */
function getMarkerLength(
  text: string,
  startOffset: number,
  ordered: boolean | null | undefined,
): number {
  if (!ordered) {
    return 1;
  }

  const match = /^\d{1,9}[.)]/u.exec(text.slice(startOffset, startOffset + 10));

  return match ? match[0].length : 1;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent indentation for list items at the same level',
      url: URL_RULE_DOCS('consistent-list-indentation'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    messages: {
      indentation:
        'Expected indentation of {{ expected }} space(s), but found {{ actual }}.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      list(node: List) {
        const [listStartOffset] = sourceCode.getRange(node);

        // The first list item defines the expected indentation for the whole list.
        const expectedIndent = sourceCode.getLocFromIndex(listStartOffset).column - 1;

        // The column at which the marker of a right-aligned ordered list item should end.
        // `markdownlint` treats ordered list markers as consistent when they are either
        // left-aligned (same indentation) or right-aligned (same end column).
        let expectedEnd = 0;
        let endMatching = false;

        for (const listItem of node.children) {
          const [itemStartOffset] = sourceCode.getRange(listItem);
          const itemColumn = sourceCode.getLocFromIndex(itemStartOffset).column;
          const actualIndent = itemColumn - 1;
          const markerLength = getMarkerLength(
            sourceCode.text,
            itemStartOffset,
            node.ordered,
          );
          let expected = expectedIndent;

          if (node.ordered) {
            const actualEnd = itemColumn + markerLength - 1;

            expectedEnd ||= actualEnd;

            if (expectedIndent === actualIndent && !endMatching) {
              continue;
            }

            if (expectedEnd === actualEnd) {
              // The marker is right-aligned with the other markers, so it is consistent.
              endMatching = true;
              continue;
            }

            expected = endMatching ? expectedEnd - markerLength : expectedIndent;
          } else if (expectedIndent === actualIndent) {
            continue;
          }

          const lineStartOffset =
            sourceCode.text.lastIndexOf('\n', itemStartOffset - 1) + 1;
          const indentation = sourceCode.text.slice(lineStartOffset, itemStartOffset);
          // An autofix is only safe when the indentation consists solely of spaces.
          // Otherwise, the indentation may belong to another block construct, such as a block quote.
          const isFixableIndentation = /^ *$/u.test(indentation);

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(itemStartOffset),
              end: sourceCode.getLocFromIndex(itemStartOffset + markerLength),
            },

            messageId: 'indentation',

            data: {
              expected,
              actual: actualIndent,
            },

            fix(fixer) {
              if (!isFixableIndentation) {
                return null;
              }

              return fixer.replaceTextRange(
                [lineStartOffset, itemStartOffset],
                ' '.repeat(expected),
              );
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
