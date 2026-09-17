/**
 * @fileoverview Rule to disallow double consecutive punctuation in text.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  trailingGemojiRegex,
  trailingHtmlEntityRegex,
  URL_RULE_DOCS,
} from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-double-punctuation` rule.
 */
type RuleOptions = [
  {
    /**
     * When `allow` is specified, the listed two-character punctuation patterns are ignored by this rule.
     *
     * This is useful when punctuation such as `!!` or `?!` is intentionally used for tone or emphasis instead of being treated as a typo.
     * @default []
     */
    allow: string[];
  },
];
type MessageIds =
  'noDoublePunctuation' | 'suggestReplaceWithLeft' | 'suggestReplaceWithRight';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * This pattern is based on the punctuation list used by `remark-lint`.
 * @see https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-punctuation#parameters
 */
const doublePunctuationRegex = /(?:^|(?<=[^!,.:;?]))[!,.:;?]{2}(?:$|(?=[^!,.:;?]))/g;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow double consecutive punctuation in text',
      url: URL_RULE_DOCS('no-double-punctuation'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    hasSuggestions: true,

    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 2,
              maxLength: 2,
              pattern: '^[!,.:;?]{2}$',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allow: [],
      },
    ],

    messages: {
      noDoublePunctuation: 'Double punctuation mark `{{ punctuation }}` is not allowed.',
      suggestReplaceWithLeft:
        'Replace `{{ punctuation }}` with the left punctuation mark `{{ leftPunctuation }}`.',
      suggestReplaceWithRight:
        'Replace `{{ punctuation }}` with the right punctuation mark `{{ rightPunctuation }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allow }] = context.options;

    return {
      text(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const text = sourceCode.getText(node);
        const matches = text.matchAll(doublePunctuationRegex);

        for (const match of matches) {
          const punctuation = match[0];
          //  [
          //   ';!',
          //   index: 15,
          //   input: 'Copyright &copy;! All rights reserved.',
          //   groups: undefined
          // ]

          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + punctuation.length;

          if (allow.includes(punctuation)) continue;

          const textBeforeSecondPunctuation = text.slice(0, match.index + 1);
          // match 된 내용 기준으로 앞의 문자열까지만 파악해서, 내부에 emoji. html entity가 있는지 확인한다.
          // gemoji, html entity에 해당되지 않으면 다음 오류처리를 진행한다.
          if (
            trailingGemojiRegex.test(textBeforeSecondPunctuation) ||
            trailingHtmlEntityRegex.test(textBeforeSecondPunctuation)
          ) {
            continue;
          }

          const [leftPunctuation, rightPunctuation] = punctuation;
          const violation = {
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              punctuation,
            },

            messageId: 'noDoublePunctuation',
          } as const;

          if (leftPunctuation === rightPunctuation) {
            context.report({
              ...violation,

              fix(fixer) {
                return fixer.replaceTextRange([startOffset, endOffset], leftPunctuation);
              },
            });
          } else {
            context.report({
              ...violation,

              suggest: [
                {
                  messageId: 'suggestReplaceWithLeft',

                  data: {
                    punctuation,
                    leftPunctuation,
                  },

                  fix(fixer) {
                    return fixer.replaceTextRange(
                      [startOffset, endOffset],
                      leftPunctuation,
                    );
                  },
                },
                {
                  messageId: 'suggestReplaceWithRight',

                  data: {
                    punctuation,
                    rightPunctuation,
                  },

                  fix(fixer) {
                    return fixer.replaceTextRange(
                      [startOffset, endOffset],
                      rightPunctuation,
                    );
                  },
                },
              ],
            });
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
