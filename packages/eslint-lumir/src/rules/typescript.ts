/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed in the `typescript-eslint`'s extension.
 *   - @see https://typescript-eslint.io/rules/?=xdeprecated-extension-xtypeInformation
 *
 * - The order of the rules listed in the `typescript-eslint`'s recommended.
 *   - @see https://typescript-eslint.io/rules/?=xextension-recommended-xtypeInformation
 *   - @see https://github.com/typescript-eslint/typescript-eslint/blob/v8.24.1/packages/eslint-plugin/src/configs/recommended.ts
 *
 * - The order of the rules listed in the `typescript-eslint`'s stylistic.
 *   - The rules in stylistic do not conflict with `prettier` and `eslint-config-prettier`.
 *   - @see https://typescript-eslint.io/rules/?=xextension-stylistic-xtypeInformation
 *   - @see https://github.com/typescript-eslint/typescript-eslint/blob/v8.24.1/packages/eslint-plugin/src/configs/stylistic.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import typescriptPluginModule from '@typescript-eslint/eslint-plugin';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const typescriptPlugin: { '@typescript-eslint': ESLint.Plugin } = {
  // @ts-expect-error -- The plugin is a valid ESLint configuration despite the dependency type mismatch.
  '@typescript-eslint': typescriptPluginModule,
};

export const typescriptRules = {
  // ------------------------------------------------------------------------------
  // #region Extension

  /**
   * @see https://typescript-eslint.io/rules/class-methods-use-this
   */
  'class-methods-use-this': 'off',
  '@typescript-eslint/class-methods-use-this': 'error',

  /**
   * @see https://typescript-eslint.io/rules/default-param-last
   */
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': 'error',

  /**
   * @see https://typescript-eslint.io/rules/init-declarations
   */
  'init-declarations': 'off',
  '@typescript-eslint/init-declarations': 'off',

  /**
   * @see https://typescript-eslint.io/rules/max-params
   */
  'max-params': 'off',
  '@typescript-eslint/max-params': 'off',

  /**
   * @see https://typescript-eslint.io/rules/no-array-constructor
   */
  'no-array-constructor': 'off',
  '@typescript-eslint/no-array-constructor': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-dupe-class-members
   */
  'no-dupe-class-members': 'off',
  '@typescript-eslint/no-dupe-class-members': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-empty-function
   */
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': [
    'error',
    { allow: ['arrowFunctions', 'functions', 'methods', 'overrideMethods'] },
  ],

  /**
   * @see https://typescript-eslint.io/rules/no-invalid-this
   */
  'no-invalid-this': 'off',
  '@typescript-eslint/no-invalid-this': 'off',

  /**
   * @see https://typescript-eslint.io/rules/no-loop-func
   */
  'no-loop-func': 'off',
  '@typescript-eslint/no-loop-func': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-magic-numbers
   */
  'no-magic-numbers': 'off',
  '@typescript-eslint/no-magic-numbers': 'off',

  /**
   * @see https://typescript-eslint.io/rules/no-redeclare
   */
  'no-redeclare': 'off',
  '@typescript-eslint/no-redeclare': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-restricted-imports
   */
  'no-restricted-imports': 'off',
  '@typescript-eslint/no-restricted-imports': 'off',

  /**
   * @see https://typescript-eslint.io/rules/no-shadow
   */
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'warn',

  /**
   * @see https://typescript-eslint.io/rules/no-unused-expressions
   */
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': ['error', { enforceForJSX: true }],

  /**
   * @see https://typescript-eslint.io/rules/no-unused-vars
   */
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
  ],

  /**
   * @see https://typescript-eslint.io/rules/no-use-before-define
   */
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': [
    'error',
    { functions: false, classes: true, variables: true, allowNamedExports: false },
  ],

  /**
   * @see https://typescript-eslint.io/rules/no-useless-constructor
   */
  'no-useless-constructor': 'off',
  '@typescript-eslint/no-useless-constructor': 'error',

  // #endregion Extension
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Recommended

  /**
   * @see https://typescript-eslint.io/rules/ban-ts-comment
   */
  '@typescript-eslint/ban-ts-comment': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-duplicate-enum-values
   */
  '@typescript-eslint/no-duplicate-enum-values': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-empty-object-type
   */
  '@typescript-eslint/no-empty-object-type': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-explicit-any
   */
  '@typescript-eslint/no-explicit-any': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-extra-non-null-assertion
   */
  '@typescript-eslint/no-extra-non-null-assertion': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-misused-new
   */
  '@typescript-eslint/no-misused-new': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-namespace
   */
  '@typescript-eslint/no-namespace': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
   */
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-require-imports
   */
  '@typescript-eslint/no-require-imports': 'off',

  /**
   * @see https://typescript-eslint.io/rules/no-this-alias
   */
  '@typescript-eslint/no-this-alias': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-constraint
   */
  '@typescript-eslint/no-unnecessary-type-constraint': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-unsafe-declaration-merging
   */
  '@typescript-eslint/no-unsafe-declaration-merging': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-unsafe-function-type
   */
  '@typescript-eslint/no-unsafe-function-type': 'warn',

  /**
   * @see https://typescript-eslint.io/rules/no-wrapper-object-types
   */
  '@typescript-eslint/no-wrapper-object-types': 'error',

  /**
   * @see https://typescript-eslint.io/rules/prefer-as-const
   */
  '@typescript-eslint/prefer-as-const': 'error',

  /**
   * @see https://typescript-eslint.io/rules/prefer-namespace-keyword
   */
  '@typescript-eslint/prefer-namespace-keyword': 'error',

  /**
   * @see https://typescript-eslint.io/rules/triple-slash-reference
   */
  '@typescript-eslint/triple-slash-reference': 'error',

  // #endregion Recommended
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Stylistic

  /**
   * @see https://typescript-eslint.io/rules/adjacent-overload-signatures
   */
  '@typescript-eslint/adjacent-overload-signatures': 'error',

  /**
   * @see https://typescript-eslint.io/rules/array-type
   */
  '@typescript-eslint/array-type': 'error',

  /**
   * @see https://typescript-eslint.io/rules/ban-tslint-comment
   */
  '@typescript-eslint/ban-tslint-comment': 'error',

  /**
   * @description I've disabled this rule since it's up to the developer's preference.
   * @see https://typescript-eslint.io/rules/class-literal-property-style
   */
  '@typescript-eslint/class-literal-property-style': 'off',

  /**
   * @see https://typescript-eslint.io/rules/consistent-generic-constructors
   */
  '@typescript-eslint/consistent-generic-constructors': 'error',

  /**
   * @see https://typescript-eslint.io/rules/consistent-indexed-object-style
   */
  '@typescript-eslint/consistent-indexed-object-style': 'warn',

  /**
   * @see https://typescript-eslint.io/rules/consistent-type-assertions
   */
  '@typescript-eslint/consistent-type-assertions': 'error',

  /**
   * @see https://typescript-eslint.io/rules/consistent-type-definitions
   */
  '@typescript-eslint/consistent-type-definitions': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-confusing-non-null-assertion
   */
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',

  /**
   * @see https://typescript-eslint.io/rules/no-inferrable-types
   */
  '@typescript-eslint/no-inferrable-types': 'error',

  /**
   * @description I've disabled this rule since it's up to the developer's preference.
   * @see https://typescript-eslint.io/rules/prefer-for-of
   */
  '@typescript-eslint/prefer-for-of': 'off',

  /**
   * @see https://typescript-eslint.io/rules/prefer-function-type
   */
  '@typescript-eslint/prefer-function-type': 'error',

  // #endregion Stylistic
  // ------------------------------------------------------------------------------
} as const satisfies Linter.RulesRecord;
