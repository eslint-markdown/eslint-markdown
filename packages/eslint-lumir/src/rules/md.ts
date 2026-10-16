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
  'md/allow-heading': 'off',

  'md/allow-image-url': ['error', { disallowUrls: [/^\.\//, /^http:\/\//i] }],

  'md/allow-link-url': ['error', { disallowUrls: [/^\.\//, /^http:\/\//i] }],

  'md/code-lang-shorthand': 'error',

  'md/consistent-code-style': [
    'error',
    { style: 'fence-backtick', blankLineAbove: 1, blankLineBelow: 1 },
  ],

  'md/consistent-delete-style': ['error', { style: '~' }],

  'md/consistent-emphasis-style': ['error', { style: '*' }],

  'md/consistent-heading-style': ['error', { style: 'atx' }],

  'md/consistent-inline-code-style': 'error',

  'md/consistent-ordered-list-style': ['error', { style: 'one' }],

  'md/consistent-strong-style': ['error', { style: '*' }],

  'md/consistent-thematic-break-style': ['error', { style: '---' }],

  'md/consistent-unordered-list-style': ['error', { style: '-' }],

  'md/no-consecutive-blank-line': ['error', { max: 1, skipCode: false, skipMath: false }],

  'md/no-control-character': ['error', { skipCode: false, skipInlineCode: false }],

  'md/no-curly-quote': 'error',

  'md/no-double-punctuation': ['error', { allow: ['.,'] }],

  'md/no-double-space': 'error',

  'md/no-emoji': 'off',

  'md/no-git-conflict-marker': ['error', { skipCode: false, skipMath: false }],

  'md/no-irregular-dash': [
    'error',
    {
      skipCode: false,
      skipInlineCode: false,
      skipMath: false,
      skipInlineMath: false,
    },
  ],

  'md/no-irregular-whitespace': [
    'error',
    {
      skipCode: false,
      skipInlineCode: false,
      skipMath: false,
      skipInlineMath: false,
    },
  ],

  'md/no-multiple-atx-heading-space': ['error', { checkClosedHeading: true }],

  'md/no-shell-dollar': 'off',

  'md/no-tab': [
    'error',
    {
      skipCode: false,
      skipInlineCode: false,
      skipMath: false,
      skipInlineMath: false,
    },
  ],

  'md/no-trailing-heading-punctuation': 'error',

  'md/no-url-trailing-slash': 'off',

  'md/require-heading-id': 'off',

  'md/require-image-title': 'off', // Too tight.

  'md/require-link-title': 'off', // Too tight.
} as const satisfies Linter.RulesRecord;
