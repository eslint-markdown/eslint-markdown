/**
 * @fileoverview Rule to disallow double consecutive punctuation in text.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { escapeStringRegexp } from '../core/utils/index.js';
import {
  URL_RULE_DOCS,
  asciiPunctuationWithQuestionMark,
  gemojiRegex as originalGemojiRegex,
  htmlEntityRegex as originalHtmlEntityRegex,
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
    /**
     * Specifies the characters that are treated as punctuation by this rule.
     *
     * The configured array replaces the default punctuation characters. Each item must be a single character, and at least one character is required.
     *
     * NOTE: Spaces, tabs, line feeds, carriage returns, and backslashes are not allowed.
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

const gemojiRegex = new RegExp(originalGemojiRegex.source, 'g');

const htmlEntityRegex = new RegExp(originalHtmlEntityRegex.source, 'g');

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Disallow double consecutive punctuation in text',
      dialects: ['CommonMark', 'GFM'],
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
            },
            uniqueItems: true,
          },
          punctuation: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1,
              maxLength: 1,
              pattern: String.raw`^[^ \t\r\n\\]+$`,
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
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allow, punctuation }] = context.options;

    const escapedPunctuation = escapeStringRegexp(punctuation.join(''));
    const doublePunctuationRegex = new RegExp(
      `(?:^|(?<=[^${escapedPunctuation}]))[${escapedPunctuation}]{2}(?:$|(?=[^${escapedPunctuation}]))`,
      'gu',
    );

    return {
      text(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const matches = sourceCode
          .getText(node) // Mask HTML entities and gemoji without changing their offsets in the original text.
          .replace(gemojiRegex, match => ' '.repeat(match.length))
          .replace(htmlEntityRegex, match => ' '.repeat(match.length))
          .matchAll(doublePunctuationRegex);

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
