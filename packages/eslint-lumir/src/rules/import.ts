/**
 * @fileoverview This file follows:
 *
 * - Inline import rules first, followed by `eslint-plugin-import-lite` rules.
 *   - @see https://github.com/9romise/eslint-plugin-import-lite#available-rules
 *
 * - The best practices outlined in `eslint-config-airbnb-base@19.0.4`.
 *   - @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import importLitePluginModule from 'eslint-plugin-import-lite';
import { importPlugin as importPluginModule } from '../plugins/index.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const importPlugin: { import: ESLint.Plugin } = {
  import: {
    rules: {
      ...importPluginModule.rules,
      ...importLitePluginModule.rules,
    },
  },
};

export const importRules = {
  /**
   * Forbid import of modules using absolute paths.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-absolute-path.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L169 (airbnb-base)
   */
  'import/no-absolute-path': 'error',

  /**
   * Forbid empty named import blocks.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-empty-named-blocks.md (import-x)
   */
  'import/no-empty-named-blocks': 'error',

  /**
   * Enforce a convention in module import order.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L149 (airbnb-base)
   */
  'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],

  /**
   * Enforce or ban the use of inline type-only markers for named imports.
   * @description This rule is not included in `airbnb-base`. It's for TypeScript only.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md (import-x)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/consistent-type-specifier-style/README.md (import-lite)
   */
  'import/consistent-type-specifier-style': 'off',

  /**
   * Ensure all exports appear after other statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L215 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/exports-last/README.md (import-lite)
   */
  'import/exports-last': 'off',

  /**
   * Ensure all imports appear before other statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L122 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/first/README.md (import-lite)
   */
  'import/first': 'error',

  /**
   * Enforce a newline after import statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L153 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/newline-after-import/README.md (import-lite)
   */
  'import/newline-after-import': 'error',

  /**
   * Forbid default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-default-export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L225 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-default-export/README.md (import-lite)
   */
  'import/no-default-export': 'off',

  /**
   * Forbid repeated import of the same module in multiple places.
   * @description Replaced by [`no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports). Note that it's `'off'`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L131 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-duplicates/README.md (import-lite)
   */
  'import/no-duplicates': 'off',

  /**
   * Forbid the use of mutable exports with `var` or `let`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L101 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-mutable-exports/README.md (import-lite)
   */
  'import/no-mutable-exports': 'error',

  /**
   * Forbid named default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-default.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L199 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-named-default/README.md (import-lite)
   */
  'import/no-named-default': 'error',

  /**
   * Prefer a default export if module exports a single name or multiple names.
   * @description I've set this rule to `'off'` because I don't want to enforce default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-default-export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L157 (airbnb-base)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/prefer-default-export/README.md (import-lite)
   */
  'import/prefer-default-export': 'off',
} as const satisfies Linter.RulesRecord;
