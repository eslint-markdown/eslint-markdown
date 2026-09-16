/**
 * @fileoverview This file declares constants used throughout the `eslint-markdown` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import pkg from '../../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const URL_RULE_DOCS = (ruleName = ''): string =>
  `${pkg.homepage}/docs/rules/${ruleName}`;

// --------------------------------------------------------------------------------
// #region array

/**
 * This pattern is based on the punctuation list used by `markdownlint` and `remark-lint`.
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/helpers/helpers.cjs#L41
 * @see https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-punctuation#parameters
 */
export const punctuation = [
  '.',
  ',',
  ';',
  ':',
  '!',
  '。',
  '，',
  '；',
  '：',
  '！',
] as const;

/**
 * This pattern is based on the punctuation list used by `markdownlint` and `remark-lint`.
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/helpers/helpers.cjs#L41
 * @see https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-punctuation#parameters
 */
export const punctuationWithQuestionMark = [...punctuation, '?', '？'] as const;

// #endregion array
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region regex

/**
 * Regular expression for identifying an odd-length run of backslashes at the end of a string.
 */
export const escapedTrailingBackslashRegex = /(?<=(?<!\\)(?:\\{2})*)\\$/u;

/**
 * Regular expression for identifying a GitHub emoji code.
 * - NOTE: These patterns are based on the `markdownlint`.
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/helpers/helpers.cjs#L36-L38
 */
export const gemojiRegex =
  /:(?:[abmovx]|[-+]1|100|1234|(?:1st|2nd|3rd)_place_medal|8ball|clock\d{1,4}|e-mail|non-potable_water|o2|t-rex|u5272|u5408|u55b6|u6307|u6708|u6709|u6e80|u7121|u7533|u7981|u7a7a|[a-z]{2,15}2?|[a-z]{1,14}(?:_[a-z\d]{1,16})+):/;

// #endregion regex
// --------------------------------------------------------------------------------
