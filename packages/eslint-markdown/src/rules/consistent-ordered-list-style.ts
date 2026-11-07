/**
 * @fileoverview Rule to enforce consistent ordered list style.
 * @author Ga eun Lee(tooth-is-silver)
 */

// TODO: add auto-fix

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

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Enforce consistent ordered list style',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('consistent-ordered-list-style'),
      recommended: false,
      stylistic: true,
    },

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
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    const orderedListPrefixesStack: {
      startOffset: number;
      endOffset: number;
      number: number;
    }[][] = [];

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

        orderedListPrefixesStack[orderedListPrefixesStack.length - 1].push({
          startOffset: nodeStartOffset,
          endOffset: nodeStartOffset + orderedListPrefix.length,
          number: Number(orderedListPrefix),
        });
      },

      'list[ordered=true]:exit'() {
        // Can never be `undefined` because `list[ordered=true]` always pushes to the stack before exiting.
        const orderedListPrefixes = orderedListPrefixesStack.pop()!;
        const [firstOrderedListPrefix, secondOrderedListPrefix] = orderedListPrefixes;
        const hasMultipleItems = orderedListPrefixes.length > 1;

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

        for (const { startOffset, endOffset, number } of orderedListPrefixes) {
          if (number !== expectedOrderedListPrefixNumber) {
            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(startOffset),
                end: sourceCode.getLocFromIndex(endOffset),
              },

              messageId: 'style',

              data: {
                style: orderedListStyle,
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
