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
type MessageIds = 'style';
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
      style:
        'Ordered list item prefix should be `{{ expected }}`, but found `{{ actual }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  // 1. 항목이 1이다.
  // 단일 항목 규칙으로 expected 계산
  // 필요하면 공통 report 함수 호출 -> 종료

  // 2. 항목이 여러개
  // 다중 항목 규칙으로 expected와 증가 여부 계산
  // 항목을 순회하며 공통 report 함수 호출
  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /**
     * @param prefix
     * @param expected
     */
    function reportStyle(prefix: OrderedListItemPrefix, expected: number) {
      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(prefix.startOffset),
          end: sourceCode.getLocFromIndex(prefix.startOffset + prefix.text.length),
        },
        messageId: 'style',
        data: {
          expected,
          actual: prefix.value,
        },
      });
    }

    return {
      'list[ordered=true]'(node: List) {
        const prefixes: OrderedListItemPrefix[] = [];
        for (const listItem of node.children) {
          const [itemStartOffset] = sourceCode.getRange(listItem);
          const match = orderedListItemPrefixRegex.exec(
            sourceCode.text.slice(itemStartOffset),
          );

          if (match === null) {
            return;
          }

          const [text] = match;

          prefixes.push({
            startOffset: itemStartOffset,
            text,
            value: Number(text),
          });
        }

        if (prefixes.length === 1) {
          const [prefix] = prefixes;
          const expected = style === 'zero' ? 0 : 1;

          if (prefix.value !== expected) {
            reportStyle(prefix, expected);
          }

          return;
        }

        const [firstPrefix, secondPrefix] = prefixes;

        let shouldIncrementPrefix = style === 'ordered';

        if (style === 'one_or_ordered') {
          shouldIncrementPrefix = firstPrefix.value === 0 || secondPrefix.value !== 1;
        }

        const expectedStartsAtZero =
          style === 'zero' || (shouldIncrementPrefix && firstPrefix.value === 0);

        let expected = expectedStartsAtZero ? 0 : 1;

        for (const prefix of prefixes) {
          if (prefix.value !== expected) {
            reportStyle(prefix, expected);
          }

          if (shouldIncrementPrefix) {
            expected++;
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
