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
   * Enforce that class methods utilize `this`.
   * @see https://typescript-eslint.io/rules/class-methods-use-this
   */
  'class-methods-use-this': 'off',
  '@typescript-eslint/class-methods-use-this': 'error',

  /**
   * Enforce default parameters to be last.
   * @see https://typescript-eslint.io/rules/default-param-last
   */
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': 'error',

  /**
   * Require or disallow initialization in variable declarations.
   * @see https://typescript-eslint.io/rules/init-declarations
   */
  'init-declarations': 'off',
  '@typescript-eslint/init-declarations': 'off',

  /**
   * Enforce a maximum number of parameters in function definitions.
   * @see https://typescript-eslint.io/rules/max-params
   */
  'max-params': 'off',
  '@typescript-eslint/max-params': 'off',

  /**
   * Disallow generic `Array` constructors.
   * @see https://typescript-eslint.io/rules/no-array-constructor
   */
  'no-array-constructor': 'off',
  '@typescript-eslint/no-array-constructor': 'error',

  /**
   * Disallow duplicate class members.
   * @see https://typescript-eslint.io/rules/no-dupe-class-members
   */
  'no-dupe-class-members': 'off',
  '@typescript-eslint/no-dupe-class-members': 'error',

  /**
   * Disallow empty functions.
   * @see https://typescript-eslint.io/rules/no-empty-function
   */
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': [
    'error',
    { allow: ['arrowFunctions', 'functions', 'methods', 'overrideMethods'] },
  ],

  /**
   * Disallow `this` keywords outside of classes or class-like objects.
   * @see https://typescript-eslint.io/rules/no-invalid-this
   */
  'no-invalid-this': 'off',
  '@typescript-eslint/no-invalid-this': 'off',

  /**
   * Disallow function declarations that contain unsafe references inside loop statements.
   * @description Disabled because it is deprecated.
   * ESLint's core `no-loop-func` rule now supports TypeScript and remains enabled.
   * @see https://typescript-eslint.io/rules/no-loop-func
   */
  '@typescript-eslint/no-loop-func': 'off',

  /**
   * Disallow magic numbers.
   * @see https://typescript-eslint.io/rules/no-magic-numbers
   */
  'no-magic-numbers': 'off',
  '@typescript-eslint/no-magic-numbers': 'off',

  /**
   * Disallow variable redeclaration.
   * @see https://typescript-eslint.io/rules/no-redeclare
   */
  'no-redeclare': 'off',
  '@typescript-eslint/no-redeclare': 'error',

  /**
   * Disallow specified modules when loaded by `import`.
   * @see https://typescript-eslint.io/rules/no-restricted-imports
   */
  'no-restricted-imports': 'off',
  '@typescript-eslint/no-restricted-imports': 'off',

  /**
   * Disallow variable declarations from shadowing variables declared in the outer scope.
   * @see https://typescript-eslint.io/rules/no-shadow
   */
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',

  /**
   * Disallow unused expressions.
   * @see https://typescript-eslint.io/rules/no-unused-expressions
   */
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': ['error', { enforceForJSX: true }],

  /**
   * Disallow unused private class members.
   * @see https://typescript-eslint.io/rules/no-unused-private-class-members
   */
  'no-unused-private-class-members': 'off',
  '@typescript-eslint/no-unused-private-class-members': 'error',

  /**
   * Disallow unused variables.
   * @see https://typescript-eslint.io/rules/no-unused-vars
   */
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
  ],

  /**
   * Disallow the use of variables before they are defined.
   * @see https://typescript-eslint.io/rules/no-use-before-define
   */
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': [
    'error',
    { functions: false, classes: true, variables: true, allowNamedExports: false },
  ],

  /**
   * Disallow unnecessary constructors.
   * @see https://typescript-eslint.io/rules/no-useless-constructor
   */
  'no-useless-constructor': 'off',
  '@typescript-eslint/no-useless-constructor': 'error',

  // #endregion Extension
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Recommended

  /**
   * Disallow `@ts-<directive>` comments or require descriptions after directives.
   * @see https://typescript-eslint.io/rules/ban-ts-comment
   */
  '@typescript-eslint/ban-ts-comment': 'error',

  /**
   * Disallow duplicate enum member values.
   * @see https://typescript-eslint.io/rules/no-duplicate-enum-values
   */
  '@typescript-eslint/no-duplicate-enum-values': 'error',

  /**
   * Disallow accidentally using the "empty object" type.
   * @see https://typescript-eslint.io/rules/no-empty-object-type
   */
  '@typescript-eslint/no-empty-object-type': 'error',

  /**
   * Disallow the `any` type.
   * @see https://typescript-eslint.io/rules/no-explicit-any
   */
  '@typescript-eslint/no-explicit-any': 'error',

  /**
   * Disallow extra non-null assertions.
   * @see https://typescript-eslint.io/rules/no-extra-non-null-assertion
   */
  '@typescript-eslint/no-extra-non-null-assertion': 'error',

  /**
   * Enforce valid definition of `new` and `constructor`.
   * @see https://typescript-eslint.io/rules/no-misused-new
   */
  '@typescript-eslint/no-misused-new': 'error',

  /**
   * Disallow TypeScript namespaces.
   * @see https://typescript-eslint.io/rules/no-namespace
   */
  '@typescript-eslint/no-namespace': 'error',

  /**
   * Disallow non-null assertions after an optional chain expression.
   * @see https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
   */
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

  /**
   * Disallow invocation of `require()`.
   * @see https://typescript-eslint.io/rules/no-require-imports
   */
  '@typescript-eslint/no-require-imports': 'off',

  /**
   * Disallow aliasing `this`.
   * @see https://typescript-eslint.io/rules/no-this-alias
   */
  '@typescript-eslint/no-this-alias': 'error',

  /**
   * Disallow unnecessary constraints on generic types.
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-constraint
   */
  '@typescript-eslint/no-unnecessary-type-constraint': 'error',

  /**
   * Disallow unsafe declaration merging.
   * @see https://typescript-eslint.io/rules/no-unsafe-declaration-merging
   */
  '@typescript-eslint/no-unsafe-declaration-merging': 'error',

  /**
   * Disallow using the unsafe built-in Function type.
   * @see https://typescript-eslint.io/rules/no-unsafe-function-type
   */
  '@typescript-eslint/no-unsafe-function-type': 'error',

  /**
   * Disallow using confusing built-in primitive class wrappers.
   * @see https://typescript-eslint.io/rules/no-wrapper-object-types
   */
  '@typescript-eslint/no-wrapper-object-types': 'error',

  /**
   * Enforce the use of `as const` over literal type.
   * @see https://typescript-eslint.io/rules/prefer-as-const
   */
  '@typescript-eslint/prefer-as-const': 'error',

  /**
   * Require using `namespace` keyword over `module` keyword to declare custom TypeScript modules.
   * @see https://typescript-eslint.io/rules/prefer-namespace-keyword
   */
  '@typescript-eslint/prefer-namespace-keyword': 'error',

  /**
   * Disallow certain triple slash directives in favor of ES6-style import declarations.
   * @see https://typescript-eslint.io/rules/triple-slash-reference
   */
  '@typescript-eslint/triple-slash-reference': 'error',

  // #endregion Recommended
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Stylistic

  /**
   * Require that function overload signatures be consecutive.
   * @see https://typescript-eslint.io/rules/adjacent-overload-signatures
   */
  '@typescript-eslint/adjacent-overload-signatures': 'error',

  /**
   * Require consistently using either `T[]` or `Array<T>` for arrays.
   * @see https://typescript-eslint.io/rules/array-type
   */
  '@typescript-eslint/array-type': 'error',

  /**
   * Disallow `// tslint:<rule-flag>` comments.
   * @see https://typescript-eslint.io/rules/ban-tslint-comment
   */
  '@typescript-eslint/ban-tslint-comment': 'error',

  /**
   * Enforce that literals on classes are exposed in a consistent style.
   * @description I've disabled this rule since it's up to the developer's preference.
   * @see https://typescript-eslint.io/rules/class-literal-property-style
   */
  '@typescript-eslint/class-literal-property-style': 'off',

  /**
   * Enforce specifying generic type arguments on type annotation or constructor name of a constructor call.
   * @see https://typescript-eslint.io/rules/consistent-generic-constructors
   */
  '@typescript-eslint/consistent-generic-constructors': 'error',

  /**
   * Require or disallow the `Record` type.
   * @see https://typescript-eslint.io/rules/consistent-indexed-object-style
   */
  '@typescript-eslint/consistent-indexed-object-style': 'error',

  /**
   * Enforce consistent usage of type assertions.
   * @see https://typescript-eslint.io/rules/consistent-type-assertions
   */
  '@typescript-eslint/consistent-type-assertions': 'error',

  /**
   * Enforce type definitions to consistently use either `interface` or `type`.
   * @see https://typescript-eslint.io/rules/consistent-type-definitions
   */
  '@typescript-eslint/consistent-type-definitions': 'error',

  /**
   * Disallow non-null assertion in locations that may be confusing.
   * @see https://typescript-eslint.io/rules/no-confusing-non-null-assertion
   */
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',

  /**
   * Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean.
   * @see https://typescript-eslint.io/rules/no-inferrable-types
   */
  '@typescript-eslint/no-inferrable-types': 'error',

  /**
   * Enforce the use of `for-of` loop over the standard `for` loop where possible.
   * @description I've disabled this rule since it's up to the developer's preference.
   * @see https://typescript-eslint.io/rules/prefer-for-of
   */
  '@typescript-eslint/prefer-for-of': 'off',

  /**
   * Enforce using function types instead of interfaces with call signatures.
   * @see https://typescript-eslint.io/rules/prefer-function-type
   */
  '@typescript-eslint/prefer-function-type': 'error',

  // #endregion Stylistic
  // ------------------------------------------------------------------------------
} as const satisfies Linter.RulesRecord;
