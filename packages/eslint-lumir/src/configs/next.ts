/**
 * @fileoverview Configuration applied when a user configuration extends from `next`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import parser from '@typescript-eslint/parser';
import { js, jsx, ts, tsx } from '../files.js';
import { globals, parserOptions } from '../language-options.js';
import { nextPlugin, nextRules } from '../rules/next.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/next',
  files: [...js, ...jsx, ...ts, ...tsx],
  languageOptions: {
    globals,
    parser,
    parserOptions,
  },
  plugins: nextPlugin,
  rules: nextRules,
} as const satisfies Linter.Config;
