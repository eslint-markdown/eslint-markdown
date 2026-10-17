/**
 * @fileoverview Rules for `@eslint/markdown`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import markdownPluginModule from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const markdownPlugin: { markdown: ESLint.Plugin } = {
  markdown: markdownPluginModule,
};

export const markdownRules = {
  /**
   * Require languages for fenced code blocks.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/fenced-code-language.md
   */
  'markdown/fenced-code-language': 'error',

  /**
   * Require or disallow metadata for fenced code blocks.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/fenced-code-meta.md
   */
  'markdown/fenced-code-meta': 'off',

  /**
   * Enforce heading levels increment by one.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/heading-increment.md
   */
  'markdown/heading-increment': 'error',

  /**
   * Disallow bare URLs.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-bare-urls.md
   */
  'markdown/no-bare-urls': 'error',

  /**
   * Disallow duplicate definitions.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-definitions.md
   */
  'markdown/no-duplicate-definitions': ['error', { checkFootnoteDefinitions: true }],

  /**
   * Disallow duplicate headings in the same document.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-headings.md
   */
  'markdown/no-duplicate-headings': ['error', { checkSiblingsOnly: true }],

  /**
   * Disallow empty definitions.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-definitions.md
   */
  'markdown/no-empty-definitions': ['error', { checkFootnoteDefinitions: true }],

  /**
   * Disallow empty images.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-images.md
   */
  'markdown/no-empty-images': 'error',

  /**
   * Disallow empty links.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-links.md
   */
  'markdown/no-empty-links': 'error',

  /**
   * Disallow HTML tags.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-html.md
   */
  'markdown/no-html': [
    'error',
    {
      allowed: [
        'strong',
        'em',
        'small',
        'sub',
        'sup',
        'u',
        'br',
        'details',
        'summary',
        'image',
        'code',
        'kbd',
        'mark',
      ],
    },
  ],

  /**
   * Disallow invalid label references.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-invalid-label-refs.md
   */
  'markdown/no-invalid-label-refs': 'error',

  /**
   * Disallow headings without a space after the hash characters.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-atx-heading-space.md
   */
  'markdown/no-missing-atx-heading-space': ['error', { checkClosedHeadings: true }],

  /**
   * Disallow missing label references.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-label-refs.md
   */
  'markdown/no-missing-label-refs': [
    'error',
    { allowLabels: ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION', 'TOC'] },
  ],

  /**
   * Disallow link fragments that do not reference valid headings.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-link-fragments.md
   */
  'markdown/no-missing-link-fragments': ['error', { ignoreCase: false }],

  /**
   * Disallow multiple H1 headings in the same document.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-multiple-h1.md
   */
  'markdown/no-multiple-h1': 'error',

  /**
   * Disallow URLs that match defined reference identifiers.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-reference-like-urls.md
   */
  'markdown/no-reference-like-urls': 'error',

  /**
   * Disallow reversed link and image syntax.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-reversed-media-syntax.md
   */
  'markdown/no-reversed-media-syntax': 'error',

  /**
   * Disallow spaces around emphasis markers.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-space-in-emphasis.md
   */
  'markdown/no-space-in-emphasis': ['error', { checkStrikethrough: true }],

  /**
   * Disallow unused definitions.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md
   */
  'markdown/no-unused-definitions': ['error', { checkFootnoteDefinitions: true }],

  /**
   * Require alternative text for images.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/require-alt-text.md
   */
  'markdown/require-alt-text': 'error',

  /**
   * Disallow data rows in a GitHub Flavored Markdown table from having more cells than the header row.
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/table-column-count.md
   */
  'markdown/table-column-count': ['error', { checkMissingCells: true }],
} as const satisfies Linter.RulesRecord;
