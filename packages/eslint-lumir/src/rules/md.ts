/**
 * @fileoverview Rules for `eslint-markdown`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import mdPluginModule from 'eslint-markdown';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const mdPlugin: { md: ESLint.Plugin } = { md: mdPluginModule };

export const mdRules = {
  /**
   * Enforce the use of allowed or disallowed headings.
   * @see https://eslint-markdown.lumir.page/docs/rules/allow-heading
   */
  'md/allow-heading': 'off',

  /**
   * Enforce the use of allowed or disallowed URLs for images.
   * @see https://eslint-markdown.lumir.page/docs/rules/allow-image-url
   */
  'md/allow-image-url': ['error', { disallowUrls: [/^\.\//, /^http:\/\//i] }],

  /**
   * Enforce the use of allowed or disallowed URLs for links.
   * @see https://eslint-markdown.lumir.page/docs/rules/allow-link-url
   */
  'md/allow-link-url': ['error', { disallowUrls: [/^\.\//, /^http:\/\//i] }],

  /**
   * Enforce the use of shorthand for code block language identifiers.
   * @see https://eslint-markdown.lumir.page/docs/rules/code-lang-shorthand
   */
  'md/code-lang-shorthand': 'error',

  /**
   * Enforce consistent code style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-code-style
   */
  'md/consistent-code-style': [
    'error',
    { style: 'fence-backtick', blankLineAbove: 1, blankLineBelow: 1 },
  ],

  /**
   * Enforce consistent delete style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-delete-style
   */
  'md/consistent-delete-style': ['error', { style: '~' }],

  /**
   * Enforce consistent emphasis style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-emphasis-style
   */
  'md/consistent-emphasis-style': ['error', { style: '*' }],

  /**
   * Enforce consistent heading style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-heading-style
   */
  'md/consistent-heading-style': ['error', { style: 'atx' }],

  /**
   * Enforce consistent inline code style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-inline-code-style
   */
  'md/consistent-inline-code-style': 'error',

  /**
   * Enforce consistent ordered list style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-ordered-list-style
   */
  'md/consistent-ordered-list-style': ['error', { style: 'one' }],

  /**
   * Enforce consistent strong style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-strong-style
   */
  'md/consistent-strong-style': ['error', { style: '*' }],

  /**
   * Enforce consistent thematic break style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-thematic-break-style
   */
  'md/consistent-thematic-break-style': ['error', { style: '---' }],

  /**
   * Enforce consistent unordered list style.
   * @see https://eslint-markdown.lumir.page/docs/rules/consistent-unordered-list-style
   */
  'md/consistent-unordered-list-style': ['error', { style: '-' }],

  /**
   * Disallow consecutive blank lines.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-consecutive-blank-line
   */
  'md/no-consecutive-blank-line': ['error', { max: 1, skipCode: false, skipMath: false }],

  /**
   * Disallow control character.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-control-character
   */
  'md/no-control-character': ['error', { skipCode: false, skipInlineCode: false }],

  /**
   * Disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-curly-quote
   */
  'md/no-curly-quote': 'error',

  /**
   * Disallow double consecutive punctuation in text.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-double-punctuation
   */
  'md/no-double-punctuation': ['error', { allowTerms: [/\be\.g\.,/u, /\bi\.e\.,/u] }],

  /**
   * Disallow double or multiple consecutive spaces in text, except for leading and trailing spaces.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-double-space
   */
  'md/no-double-space': 'error',

  /**
   * Disallow emojis in text.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-emoji
   */
  'md/no-emoji': 'off',

  /**
   * Disallow git conflict markers.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-git-conflict-marker
   */
  'md/no-git-conflict-marker': ['error', { skipCode: false, skipMath: false }],

  /**
   * Disallow irregular dash.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-irregular-dash
   */
  'md/no-irregular-dash': [
    'error',
    {
      skipCode: false,
      skipInlineCode: false,
      skipMath: false,
      skipInlineMath: false,
    },
  ],

  /**
   * Disallow irregular whitespace.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-irregular-whitespace
   */
  'md/no-irregular-whitespace': [
    'error',
    {
      skipCode: false,
      skipInlineCode: false,
      skipMath: false,
      skipInlineMath: false,
    },
  ],

  /**
   * Disallow multiple spaces around ATX heading markers.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-multiple-atx-heading-space
   */
  'md/no-multiple-atx-heading-space': ['error', { checkClosedHeading: true }],

  /**
   * Disallow dollar signs before commands without showing output.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-shell-dollar
   */
  'md/no-shell-dollar': 'off',

  /**
   * Disallow tab characters.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-tab
   */
  'md/no-tab': [
    'error',
    {
      skipCode: false,
      skipInlineCode: false,
      skipMath: false,
      skipInlineMath: false,
    },
  ],

  /**
   * Disallow trailing punctuation in headings.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-trailing-heading-punctuation
   */
  'md/no-trailing-heading-punctuation': 'error',

  /**
   * Disallow URL trailing slash.
   * @see https://eslint-markdown.lumir.page/docs/rules/no-url-trailing-slash
   */
  'md/no-url-trailing-slash': 'off',

  /**
   * Enforce the use of heading IDs.
   * @see https://eslint-markdown.lumir.page/docs/rules/require-heading-id
   */
  'md/require-heading-id': 'off',

  /**
   * Enforce the use of title attribute for images.
   * @see https://eslint-markdown.lumir.page/docs/rules/require-image-title
   */
  'md/require-image-title': 'off', // Too tight.

  /**
   * Enforce the use of title attribute for links.
   * @see https://eslint-markdown.lumir.page/docs/rules/require-link-title
   */
  'md/require-link-title': 'off', // Too tight.
} as const satisfies Linter.RulesRecord;
