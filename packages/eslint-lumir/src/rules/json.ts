/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed in the following URL.
 *   - @see https://github.com/eslint/json?tab=readme-ov-file#rules
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import jsonPluginModule from '@eslint/json';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const jsonPlugin: { json: ESLint.Plugin } = { json: jsonPluginModule };

export const jsonRules = {
  'json/no-duplicate-keys': 'error',

  'json/no-empty-keys': 'error',

  'json/no-unnormalized-keys': 'error',

  'json/no-unsafe-values': 'error',

  'json/sort-keys': 'off',

  'json/top-level-interop': 'error',
} as const satisfies Linter.RulesRecord;
