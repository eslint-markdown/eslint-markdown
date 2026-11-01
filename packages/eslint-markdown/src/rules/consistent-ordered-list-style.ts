/**
 * @fileoverview Rule to enforce consistent ordered list style.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ListItem } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type OrderedListStyle = (typeof ORDERED_LIST_STYLE)[number];
/**
 * Options for the `consistent-ordered-list-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'one-or-ordered'`, the rule allows either the `'one'` or `'ordered'` style based on the first two list item prefixes.
     *
     * When `style` is set to `'one'`, the rule requires every prefix to be `1`.
     *
     * When `style` is set to `'ordered'`, the rule requires prefixes to increase sequentially, starting from `1` or from `0` when the list has two or more items.
     *
     * When `style` is set to `'zero'`, the rule requires every prefix to be `0`.
     * @default 'one-or-ordered'
     */
    style: 'one-or-ordered' | OrderedListStyle;
  },
];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ORDERED_LIST_STYLE = ['one', 'ordered', 'zero'] as const;

/**
 * Ordered list start numbers must be nine digits or less.
 * @see https://spec.commonmark.org/0.31.2/#example-265
 */
const orderedListPrefixRegex = /^\d{1,9}/u;

/**
 * Get the end column of a list item prefix, including its delimiter and padding.
 * @param line The source line containing the list item.
 * @param markerEndIndex The index immediately after the list marker.
 * @returns The one-based column immediately after the prefix.
 */
function getListItemPrefixEndColumn(line: string, markerEndIndex: number): number {
  const whitespace = /^[ \t]*/u.exec(line.slice(markerEndIndex))![0];

  // Empty items do not include trailing whitespace in their prefix.
  if (markerEndIndex + whitespace.length === line.length) {
    return markerEndIndex + 1;
  }

  let column = 0;

  for (const character of line.slice(0, markerEndIndex)) {
    column += character === '\t' ? 4 - (column % 4) : 1;
  }

  const markerEndColumn = column;

  for (const character of whitespace) {
    column += character === '\t' ? 4 - (column % 4) : 1;
  }

  // CommonMark consumes only one whitespace character when padding exceeds four spaces.
  const paddingLength = column - markerEndColumn > 4 ? 1 : whitespace.length;

  return markerEndIndex + paddingLength + 1;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent ordered list style',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('consistent-ordered-list-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['one-or-ordered', ...ORDERED_LIST_STYLE],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'one-or-ordered',
      },
    ],

    messages: {
      style: 'Ordered list style should be `{{ style }}`.',
    },

    language: 'markdown',
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    const orderedListPrefixesStack: {
      startOffset: number;
      endOffset: number;
      number: number;
      text: string;
      prefixEndColumn: number;
      indent: number;
    }[][] = [];

    /**
     * Get the indentation before a marker, relative to its enclosing container.
     * @param node The ordered list item.
     * @returns The indentation, or infinity when tab expansion makes it uncertain.
     */
    function getListItemIndent(node: ListItem): number {
      const { line, column } = sourceCode.getLoc(node).start;
      const beforeMarker = sourceCode.lines[line - 1].slice(0, column - 1);

      if (beforeMarker.includes('\t')) return Infinity;

      // A blockquote consumes its marker and at most one following space.
      const quoteIndex = beforeMarker.lastIndexOf('>');
      const quoteEndColumn =
        quoteIndex === -1
          ? 1
          : quoteIndex + 2 + Number(beforeMarker[quoteIndex + 1] === ' ');
      let containerEndColumn = quoteEndColumn;
      const parent = sourceCode.getParent(sourceCode.getParent(node)!);

      if (parent?.type === 'listItem') {
        const parentStart = sourceCode.getLoc(parent).start;
        const parentLine = sourceCode.lines[parentStart.line - 1];
        const parentMarker = /^(?:\d{1,9}[.)]|[-+*])/u.exec(
          sourceCode.getText(parent),
        )![0];
        // Even an empty parent item requires one padding space on continuation lines.
        const parentPrefixEndColumn = Math.max(
          getListItemPrefixEndColumn(
            parentLine,
            parentStart.column - 1 + parentMarker.length,
          ),
          parentStart.column + parentMarker.length + 1,
        );
        const parentBeforeMarker = parentLine.slice(0, parentStart.column - 1);

        if (parentLine.slice(0, parentPrefixEndColumn - 1).includes('\t'))
          return Infinity;

        const parentQuoteIndex = parentBeforeMarker.lastIndexOf('>');
        const parentQuoteEndColumn =
          parentQuoteIndex === -1
            ? 1
            : parentQuoteIndex +
              2 +
              Number(parentBeforeMarker[parentQuoteIndex + 1] === ' ');

        containerEndColumn =
          // On the same line, added spaces also count toward the parent's padding limit.
          (parentStart.line === line
            ? parentStart.column + parentMarker.length + 1
            : parentPrefixEndColumn) +
          quoteEndColumn -
          parentQuoteEndColumn;
      }

      return Math.max(0, column - containerEndColumn);
    }

    return {
      'list[ordered=true]'() {
        orderedListPrefixesStack.push([]);
      },

      'list[ordered=true] > listItem'(node: ListItem) {
        const [nodeStartOffset] = sourceCode.getRange(node);

        // `match` is never `null` because this visitor only runs for
        // ordered list items, whose source text starts with a numeric marker.
        const match = orderedListPrefixRegex.exec(sourceCode.getText(node))!;
        const orderedListPrefix = match[0];
        const { line, column } = sourceCode.getLoc(node).start;

        orderedListPrefixesStack[orderedListPrefixesStack.length - 1].push({
          startOffset: nodeStartOffset,
          endOffset: nodeStartOffset + orderedListPrefix.length,
          number: Number(orderedListPrefix),
          text: orderedListPrefix,
          prefixEndColumn: getListItemPrefixEndColumn(
            sourceCode.lines[line - 1],
            column + orderedListPrefix.length,
          ),
          indent: getListItemIndent(node),
        });
      },

      'list[ordered=true]:exit'() {
        // Can never be `undefined` because `list[ordered=true]` always pushes to the stack before exiting.
        const orderedListPrefixes = orderedListPrefixesStack.pop()!;
        const [firstOrderedListPrefix, secondOrderedListPrefix] = orderedListPrefixes;
        const hasMultipleItems = orderedListPrefixes.length > 1;
        // Match markdownlint's MD029 alignment and zero-padding detection.
        const rightAligned = orderedListPrefixes.every(
          prefix => prefix.prefixEndColumn === firstOrderedListPrefix.prefixEndColumn,
        );
        const zeroPrefixed =
          hasMultipleItems && firstOrderedListPrefix.text.startsWith('0');

        let orderedListStyle = style;

        if (orderedListStyle === 'one-or-ordered') {
          orderedListStyle =
            hasMultipleItems &&
            (firstOrderedListPrefix.number === 0 || secondOrderedListPrefix.number !== 1)
              ? 'ordered'
              : 'one';
        }

        let expectedOrderedListPrefixNumber =
          orderedListStyle === 'zero' ||
          (orderedListStyle === 'ordered' &&
            hasMultipleItems &&
            firstOrderedListPrefix.number === 0)
            ? 0
            : 1;

        for (const { startOffset, endOffset, number, indent } of orderedListPrefixes) {
          if (number !== expectedOrderedListPrefixNumber) {
            const expectedText = String(expectedOrderedListPrefixNumber);

            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(startOffset),
                end: sourceCode.getLocFromIndex(endOffset),
              },

              messageId: 'style',

              data: {
                style: orderedListStyle,
              },

              fix(fixer) {
                const addedSpaces = endOffset - startOffset - expectedText.length;

                // Four spaces of indentation can turn a list item into a code block.
                if (
                  rightAligned &&
                  !zeroPrefixed &&
                  addedSpaces > 0 &&
                  indent + addedSpaces >= 4
                ) {
                  return null;
                }

                return fixer.replaceTextRange(
                  [startOffset, endOffset],
                  rightAligned
                    ? expectedText.padStart(
                        endOffset - startOffset,
                        zeroPrefixed ? '0' : ' ',
                      )
                    : expectedText,
                );
              },
            });
          }

          if (orderedListStyle === 'ordered') {
            expectedOrderedListPrefixNumber++;
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
