/**
 * @fileoverview Configuration applied when a user configuration extends from `md`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import { md } from '../files.js';
import { markdownPlugin, markdownRules } from '../rules/markdown.js';
import { mdPlugin, mdRules } from '../rules/md.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/md',
  files: [...md],
  language: 'markdown/gfm',
  languageOptions: {
    frontmatter: 'yaml',
    math: true,
  },
  plugins: {
    ...markdownPlugin,
    ...mdPlugin,
  },
  rules: {
    ...markdownRules,
    ...mdRules,
  },
} as const satisfies Linter.Config;
