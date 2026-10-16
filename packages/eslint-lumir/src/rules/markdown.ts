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
  'markdown/fenced-code-language': 'error',

  'markdown/fenced-code-meta': 'off',

  'markdown/heading-increment': 'error',

  'markdown/no-bare-urls': 'error',

  'markdown/no-duplicate-definitions': ['error', { checkFootnoteDefinitions: true }],

  'markdown/no-duplicate-headings': ['error', { checkSiblingsOnly: true }],

  'markdown/no-empty-definitions': ['error', { checkFootnoteDefinitions: true }],

  'markdown/no-empty-images': 'error',

  'markdown/no-empty-links': 'error',

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

  'markdown/no-invalid-label-refs': 'error',

  'markdown/no-missing-atx-heading-space': ['error', { checkClosedHeadings: true }],

  'markdown/no-missing-label-refs': [
    'error',
    { allowLabels: ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION', 'TOC'] },
  ],

  'markdown/no-missing-link-fragments': ['error', { ignoreCase: false }],

  'markdown/no-multiple-h1': 'error',

  'markdown/no-reference-like-urls': 'error',

  'markdown/no-reversed-media-syntax': 'error',

  'markdown/no-space-in-emphasis': ['error', { checkStrikethrough: true }],

  'markdown/no-unused-definitions': ['error', { checkFootnoteDefinitions: true }],

  'markdown/require-alt-text': 'error',

  'markdown/table-column-count': ['error', { checkMissingCells: true }],
} as const satisfies Linter.RulesRecord;
