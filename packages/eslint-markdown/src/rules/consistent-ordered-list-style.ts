/**
 * @fileoverview Rule to enforce consistent ordered list style.
 * @author Ga eun Lee
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

type OrderedListStyle = (typeof ORDERED_LIST_STYLE)[number];
/**
 * Options for the `consistent-ordered-list-style` rule.
 */
type RuleOptions = [
  {
    /**
     * Ordered list item prefix style to enforce.
     * @default 'one_or_ordered'
     */
    style: OrderedListStyle;
  },
];
type MessageIds = 'prefix';
interface OrderedListItemPrefix {
  startOffset: number;
  text: string;
  value: number;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ORDERED_LIST_STYLE = ['one', 'one_or_ordered', 'ordered', 'zero'] as const;
const orderedListItemPrefixRegex = /^\d{1,9}/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent ordered list style',
      url: URL_RULE_DOCS('consistent-ordered-list-style'),
      recommended: false,
      stylistic: true,
    },

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ORDERED_LIST_STYLE,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'one_or_ordered',
      },
    ],

    messages: {
      prefix:
        'Expected ordered list item prefix `{{ expected }}`, but found `{{ actual }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    if (style !== 'one_or_ordered') {
      return {};
    }

    return {
      'list[ordered=true]'(node: List) {
        const prefixes: OrderedListItemPrefix[] = [];

        for (const listItem of node.children) {
          const [startOffset] = sourceCode.getRange(listItem);
          const match = orderedListItemPrefixRegex.exec(
            sourceCode.text.slice(startOffset),
          );

          if (match === null) {
            continue;
          }

          const [text] = match;
          prefixes.push({
            startOffset,
            text,
            value: Number(text),
          });
        }

        const firstPrefix = prefixes[0];
        const secondPrefix = prefixes[1];
        const isOrdered =
          firstPrefix !== undefined &&
          secondPrefix !== undefined &&
          (firstPrefix.value === 0 || secondPrefix.value !== 1);
        let expected = firstPrefix?.value === 0 ? 0 : 1;

        for (const prefix of prefixes) {
          if (prefix.value !== expected) {
            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(prefix.startOffset),
                end: sourceCode.getLocFromIndex(prefix.startOffset + prefix.text.length),
              },

              messageId: 'prefix',

              data: {
                expected,
                actual: prefix.value,
              },
            });
          }

          if (isOrdered) {
            expected++;
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
