/**
 * @fileoverview Rule to disallow double consecutive punctuation in text.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { escapeStringRegexp } from '../core/utils/index.js';
import { URL_RULE_DOCS, asciiPunctuationWithQuestionMark } from '../core/constants.js';
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
    /**
     * Specifies the punctuation characters examined by this rule.
     * @default ['.', ',', ';', ':', '!', '?']
     */
    punctuation: string[];
  },
];
type MessageIds =
  'noDoublePunctuation' | 'suggestReplaceWithLeft' | 'suggestReplaceWithRight';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const escapedAsciiPunctuationWithQuestionMark = escapeStringRegexp(
  asciiPunctuationWithQuestionMark.join(''),
);

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
              pattern: `^[${escapedAsciiPunctuationWithQuestionMark}]{2}$`,
            },
            uniqueItems: true,
          },
          punctuation: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1,
              maxLength: 1,
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allow: [],
        punctuation: [...asciiPunctuationWithQuestionMark],
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
    const [{ allow, punctuation }] = context.options;

    for (const pattern of allow) {
      for (const character of pattern) {
        if (!punctuation.includes(character)) {
          throw new Error(
            `The 'allow' pattern '${pattern}' contains '${character}', which is not included in the 'punctuation' option.`,
          );
        }
      }
    }

    const escapedPunctuation = escapeStringRegexp(punctuation.join(''));

    /**
     * This pattern is based on the punctuation list used by `remark-lint`.
     * @see https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-punctuation#parameters
     */
    const doublePunctuationRegex = new RegExp(
      `(?:^|(?<=[^${escapedPunctuation}]))[${escapedPunctuation}]{2}(?:$|(?=[^${escapedPunctuation}]))`,
      'g',
    );

    return {
      text(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const matches = sourceCode.getText(node).matchAll(doublePunctuationRegex);

        for (const match of matches) {
          const matchedPunctuation = match[0];

          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + matchedPunctuation.length;

          if (allow.includes(matchedPunctuation)) continue;

          const [leftPunctuation, rightPunctuation] = matchedPunctuation;
          const violation = {
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              punctuation: matchedPunctuation,
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
                    punctuation: matchedPunctuation,
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
                    punctuation: matchedPunctuation,
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
