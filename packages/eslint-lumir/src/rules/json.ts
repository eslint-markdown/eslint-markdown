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
  /**
   * Disallow duplicate keys in JSON objects.
   * @see https://github.com/eslint/json/blob/main/docs/rules/no-duplicate-keys.md
   */
  'json/no-duplicate-keys': 'error',

  /**
   * Disallow empty keys in JSON objects.
   * @see https://github.com/eslint/json/blob/main/docs/rules/no-empty-keys.md
   */
  'json/no-empty-keys': 'error',

  /**
   * Disallow JSON keys that are not normalized.
   * @see https://github.com/eslint/json/blob/main/docs/rules/no-unnormalized-keys.md
   */
  'json/no-unnormalized-keys': 'error',

  /**
   * Disallow JSON values that are unsafe for interchange.
   * @see https://github.com/eslint/json/blob/main/docs/rules/no-unsafe-values.md
   */
  'json/no-unsafe-values': 'error',

  /**
   * Require JSON object keys to be sorted.
   * @see https://github.com/eslint/json/blob/main/docs/rules/sort-keys.md
   */
  'json/sort-keys': 'off',

  /**
   * Require the JSON top-level value to be an array or object.
   * @see https://github.com/eslint/json/blob/main/docs/rules/top-level-interop.md
   */
  'json/top-level-interop': 'error',
} as const satisfies Linter.RulesRecord;
