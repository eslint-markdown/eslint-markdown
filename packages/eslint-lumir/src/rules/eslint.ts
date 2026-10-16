/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed on eslint.org.
 *   - @see https://eslint.org/docs/latest/rules
 *
 * - The best practices outlined in `eslint-config-airbnb-base@19.0.4`.
 *   - @see https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules
 *
 * - The rules disabled by `eslint-config-prettier@9.1.0`.
 *   - @see https://github.com/prettier/eslint-config-prettier/blob/v9.1.0/index.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import type { ESLintRules } from 'eslint/rules';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const eslintRules = {
  // ------------------------------------------------------------------------------
  // #region Possible Problems

  /**
   * Enforce `return` statements in callbacks of array methods.
   * @see https://eslint.org/docs/latest/rules/array-callback-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L9 (airbnb-base)
   */
  'array-callback-return': ['error', { allowImplicit: true }],

  /**
   * Require `super()` calls in constructors.
   * @see https://eslint.org/docs/latest/rules/constructor-super (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L31 (airbnb-base)
   */
  'constructor-super': 'error',

  /**
   * Enforce `for` loop update clause moving the counter in the right direction.
   * @see https://eslint.org/docs/latest/rules/for-direction (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L5 (airbnb-base)
   */
  'for-direction': 'error',

  /**
   * Enforce return statements in getters.
   * @see https://eslint.org/docs/latest/rules/getter-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L9 (airbnb-base)
   */
  'getter-return': ['error', { allowImplicit: true }],

  /**
   * Disallow using an async function as a Promise executor.
   * @see https://eslint.org/docs/latest/rules/no-async-promise-executor (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L13 (airbnb-base)
   */
  'no-async-promise-executor': 'error',

  /**
   * Disallow `await` inside of loops.
   * @see https://eslint.org/docs/latest/rules/no-await-in-loop (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L17 (airbnb-base)
   */
  'no-await-in-loop': 'error',

  /**
   * Disallow reassigning class members.
   * @see https://eslint.org/docs/latest/rules/no-class-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L39 (airbnb-base)
   */
  'no-class-assign': 'error',

  /**
   * Disallow comparing against `-0`.
   * @see https://eslint.org/docs/latest/rules/no-compare-neg-zero (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L21 (airbnb-base)
   */
  'no-compare-neg-zero': 'error',

  /**
   * Disallow assignment operators in conditional expressions.
   * @see https://eslint.org/docs/latest/rules/no-cond-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L24 (airbnb-base)
   */
  'no-cond-assign': ['error', 'except-parens'],

  /**
   * Disallow reassigning `const` variables.
   * @see https://eslint.org/docs/latest/rules/no-const-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L48 (airbnb-base)
   */
  'no-const-assign': 'error',

  /**
   * Disallow expressions where the operation doesn't affect the value.
   * @description This rule is not included in `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-constant-binary-expression (eslint)
   */
  'no-constant-binary-expression': 'error',

  /**
   * Disallow constant expressions in conditions.
   * @see https://eslint.org/docs/latest/rules/no-constant-condition (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L30 (airbnb-base)
   */
  'no-constant-condition': 'warn',

  /**
   * Disallow returning value from constructor.
   * @see https://eslint.org/docs/latest/rules/no-constructor-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L82 (airbnb-base)
   */
  'no-constructor-return': 'error',

  /**
   * Disallow control characters in regular expressions.
   * @see https://eslint.org/docs/latest/rules/no-control-regex (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L33 (airbnb-base)
   */
  'no-control-regex': 'error',

  /**
   * Disallow the use of debugger.
   * @see https://eslint.org/docs/latest/rules/no-debugger (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L36 (airbnb-base)
   */
  'no-debugger': 'error',

  /**
   * Disallow duplicate arguments in function definitions.
   * @see https://eslint.org/docs/latest/rules/no-dupe-args (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L39 (airbnb-base)
   */
  'no-dupe-args': 'error',

  /**
   * Disallow duplicate class members.
   * @see https://eslint.org/docs/latest/rules/no-dupe-class-members (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L52 (airbnb-base)
   */
  'no-dupe-class-members': 'error',

  /**
   * Disallow duplicate conditions in if-else-if chains.
   * @see https://eslint.org/docs/latest/rules/no-dupe-else-if (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L43 (airbnb-base)
   */
  'no-dupe-else-if': 'error',

  /**
   * Disallow duplicate keys in object literals.
   * @see https://eslint.org/docs/latest/rules/no-dupe-keys (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L46 (airbnb-base)
   */
  'no-dupe-keys': 'error',

  /**
   * Disallow duplicate case labels.
   * @see https://eslint.org/docs/latest/rules/no-duplicate-case (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L49 (airbnb-base)
   */
  'no-duplicate-case': 'error',

  /**
   * Disallow duplicate module imports.
   * @description Replaced by [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md). Note that it's `'off'`.
   * @see https://eslint.org/docs/latest/rules/no-duplicate-imports (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L57 (airbnb-base)
   */
  'no-duplicate-imports': 'off',

  /**
   * Disallow empty character classes in regular expressions.
   * @see https://eslint.org/docs/latest/rules/no-empty-character-class (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L55 (airbnb-base)
   */
  'no-empty-character-class': 'error',

  /**
   * Disallow empty destructuring patterns.
   * @see https://eslint.org/docs/latest/rules/no-empty-pattern (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L104 (airbnb-base)
   */
  'no-empty-pattern': 'error',

  /**
   * Disallow reassigning exceptions in `catch` clauses.
   * @see https://eslint.org/docs/latest/rules/no-ex-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L58 (airbnb-base)
   */
  'no-ex-assign': 'error',

  /**
   * Disallow fallthrough of `case` statements.
   * @see https://eslint.org/docs/latest/rules/no-fallthrough (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L128 (airbnb-base)
   */
  'no-fallthrough': 'error',

  /**
   * Disallow reassigning `function` declarations.
   * @see https://eslint.org/docs/latest/rules/no-func-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L78 (airbnb-base)
   */
  'no-func-assign': 'error',

  /**
   * Disallow assigning to imported bindings.
   * @see https://eslint.org/docs/latest/rules/no-import-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L81 (airbnb-base)
   */
  'no-import-assign': 'error',

  /**
   * Disallow variable or `function` declarations in nested blocks.
   * @see https://eslint.org/docs/latest/rules/no-inner-declarations (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L84 (airbnb-base)
   */
  'no-inner-declarations': 'error',

  /**
   * Disallow invalid regular expression strings in `RegExp` constructors.
   * @see https://eslint.org/docs/latest/rules/no-invalid-regexp (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L87 (airbnb-base)
   */
  'no-invalid-regexp': 'error',

  /**
   * Disallow irregular whitespace.
   * @see https://eslint.org/docs/latest/rules/no-irregular-whitespace (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L90 (airbnb-base)
   */
  'no-irregular-whitespace': 'error',

  /**
   * Disallow literal numbers that lose precision.
   * @see https://eslint.org/docs/latest/rules/no-loss-of-precision (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L94 (airbnb-base)
   */
  'no-loss-of-precision': 'error',

  /**
   * Disallow characters which are made with multiple code points in character class syntax.
   * @see https://eslint.org/docs/latest/rules/no-misleading-character-class (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L98 (airbnb-base)
   */
  'no-misleading-character-class': 'error',

  /**
   * Disallow `new` operators with global non-constructor functions.
   * @description This rule is not included in `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-new-native-nonconstructor (eslint)
   */
  'no-new-native-nonconstructor': 'error',

  /**
   * Disallow calling global object properties as functions.
   * @see https://eslint.org/docs/latest/rules/no-obj-calls (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L101 (airbnb-base)
   */
  'no-obj-calls': 'error',

  /**
   * Disallow returning values from Promise executor functions.
   * @see https://eslint.org/docs/latest/rules/no-promise-executor-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L105 (airbnb-base)
   */
  'no-promise-executor-return': 'error',

  /**
   * Disallow calling some `Object.prototype` methods directly on objects.
   * @see https://eslint.org/docs/latest/rules/no-prototype-builtins (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L109 (airbnb-base)
   */
  'no-prototype-builtins': 'error',

  /**
   * Disallow assignments where both sides are exactly the same.
   * - `props` - if this is `true`, `no-self-assign` rule warns self-assignments of properties. Default is `true`.
   * @see https://eslint.org/docs/latest/rules/no-self-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L307-L309 (airbnb-base)
   */
  'no-self-assign': 'error',

  /**
   * Disallow comparisons where both sides are exactly the same.
   * @see https://eslint.org/docs/latest/rules/no-self-compare (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L313 (airbnb-base)
   */
  'no-self-compare': 'error',

  /**
   * Disallow returning values from setters.
   * @see https://eslint.org/docs/latest/rules/no-setter-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L116 (airbnb-base)
   */
  'no-setter-return': 'error',

  /**
   * Disallow sparse arrays.
   * @see https://eslint.org/docs/latest/rules/no-sparse-arrays (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L119 (airbnb-base)
   */
  'no-sparse-arrays': 'error',

  /**
   * Disallow template literal placeholder syntax in regular strings.
   * @see https://eslint.org/docs/latest/rules/no-template-curly-in-string (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L123 (airbnb-base)
   */
  'no-template-curly-in-string': 'error',

  /**
   * Disallow `this`/`super` before calling `super()` in constructors.
   * @see https://eslint.org/docs/latest/rules/no-this-before-super (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L81 (airbnb-base)
   */
  'no-this-before-super': 'error',

  /**
   * Disallow `let` or `var` variables that are read but never assigned.
   * @description This rule is not included in `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-unassigned-vars (eslint)
   */
  'no-unassigned-vars': 'error',

  /**
   * Disallow the use of undeclared variables unless mentioned in global comments.
   * @see https://eslint.org/docs/latest/rules/no-undef (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L40 (airbnb-base)
   */
  'no-undef': 'error',

  /**
   * Disallow confusing multiline expressions.
   * @see https://eslint.org/docs/latest/rules/no-unexpected-multiline (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L127 (airbnb-base)
   * @see https://github.com/prettier/eslint-config-prettier/blob/v9.1.0/index.js#L14 (prettier)
   */
  'no-unexpected-multiline': 'off',

  /**
   * Disallow unmodified loop conditions.
   * @description Note that it's `'off'`.
   * @see https://eslint.org/docs/latest/rules/no-unmodified-loop-condition (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L325 (airbnb-base)
   */
  'no-unmodified-loop-condition': 'off',

  /**
   * Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements.
   * @see https://eslint.org/docs/latest/rules/no-unreachable (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L130 (airbnb-base)
   */
  'no-unreachable': 'error',

  /**
   * Disallow loops with a body that allows only one iteration.
   * - "ignore" - an optional array of loop types that will be ignored by this rule.
   * @see https://eslint.org/docs/latest/rules/no-unreachable-loop (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L134-L136 (airbnb-base)
   */
  'no-unreachable-loop': 'error',

  /**
   * Disallow control flow statements in `finally` blocks.
   * @see https://eslint.org/docs/latest/rules/no-unsafe-finally (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L140 (airbnb-base)
   */
  'no-unsafe-finally': 'error',

  /**
   * Disallow negating the left operand of relational operators.
   * @see https://eslint.org/docs/latest/rules/no-unsafe-negation (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L144 (airbnb-base)
   */
  'no-unsafe-negation': 'error',

  /**
   * Disallow use of optional chaining in contexts where the `undefined` value is not allowed.
   * @see https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L148 (airbnb-base)
   */
  'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

  /**
   * Disallow unused private class members.
   * @see https://eslint.org/docs/latest/rules/no-unused-private-class-members (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L153 (airbnb-base)
   */
  'no-unused-private-class-members': 'error',

  /**
   * Disallow unused variables.
   * @see https://eslint.org/docs/latest/rules/no-unused-vars (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L51 (airbnb-base)
   */
  'no-unused-vars': [
    'error',
    { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
  ],

  /**
   * Disallow the use of variables before they are defined.
   * @description Different from `airbnb-base` which has `functions: true`.
   * @see https://eslint.org/docs/latest/rules/no-use-before-define (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L54 (airbnb-base)
   */
  'no-use-before-define': [
    'error',
    { functions: false, classes: true, variables: true, allowNamedExports: false },
  ],

  /**
   * Disallow variable assignments when the value is not used.
   * @description This rule is not included in `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-useless-assignment (eslint)
   */
  'no-useless-assignment': 'error',

  /**
   * Disallow useless backreferences in regular expressions.
   * @see https://eslint.org/docs/latest/rules/no-useless-backreference (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L157 (airbnb-base)
   */
  'no-useless-backreference': 'error',

  /**
   * Disallow assignments that can lead to race conditions due to usage of `await` or `yield`.
   * @description Note that it's `'off'`. (`airbnb-base` says "not enabled because it is very buggy".)
   * @see https://eslint.org/docs/latest/rules/require-atomic-updates (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L166 (airbnb-base)
   */
  'require-atomic-updates': 'off',

  /**
   * Require calls to `isNaN()` when checking for `NaN`.
   * @see https://eslint.org/docs/latest/rules/use-isnan (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L169 (airbnb-base)
   */
  'use-isnan': 'error',

  /**
   * Enforce comparing typeof expressions against `valid` strings
   * - `"requireStringLiterals"`: `true` allows the comparison of `typeof` expressions with only string literals or other `typeof` expressions, and disallows comparisons to any other value. Default is `false`.
   * @see https://eslint.org/docs/latest/rules/valid-typeof (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L177 (airbnb-base)
   */
  'valid-typeof': ['error', { requireStringLiterals: true }],

  // #endregion Possible Problems
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Suggestions

  /**
   * Enforce getter and setter pairs in objects and classes.
   * @see https://eslint.org/docs/latest/rules/accessor-pairs (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L5 (airbnb-base)
   */
  'accessor-pairs': 'off',

  /**
   * Require braces around arrow function bodies.
   * @see https://eslint.org/docs/latest/rules/arrow-body-style (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L18-L20 (airbnb-base)
   */
  'arrow-body-style': [
    'error',
    'as-needed',
    {
      requireReturnForObjectLiteral: false,
    },
  ],

  /**
   * Enforce the use of variables within the scope they are defined.
   * @see https://eslint.org/docs/latest/rules/block-scoped-var (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L13 (airbnb-base)
   */
  'block-scoped-var': 'error',

  /**
   * Enforce camelcase naming convention.
   * @see https://eslint.org/docs/latest/rules/camelcase (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L24 (airbnb-base)
   */
  camelcase: [
    'error',
    {
      properties: 'never', // Does not check property names.
      ignoreDestructuring: true,
    },
  ],

  /**
   * Enforce or disallow capitalization of the first letter of a comment.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/capitalized-comments (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L28-L39 (airbnb-base)
   */
  'capitalized-comments': 'off',

  /**
   * Enforce that class methods utilize `this`.
   * @description I've deleted unnecessary options from airbnb-base.
   * @see https://eslint.org/docs/latest/rules/class-methods-use-this (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L21-L23 (airbnb-base)
   */
  'class-methods-use-this': 'error',

  /**
   * Enforce a maximum cyclomatic complexity allowed in a program.
   * @description I've deleted unnecessary options from airbnb-base.
   * @see https://eslint.org/docs/latest/rules/complexity (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L17 (airbnb-base)
   */
  complexity: 'off',

  /**
   * Require `return` statements to either always or never specify values.
   * @see https://eslint.org/docs/latest/rules/consistent-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L27 (airbnb-base)
   */
  'consistent-return': 'error',

  /**
   * Enforce consistent naming when capturing the current execution context.
   * @see https://eslint.org/docs/latest/rules/consistent-this (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L74 (airbnb-base)
   */
  'consistent-this': 'off',

  /**
   * Enforce consistent brace style for all control statements.
   * @see https://eslint.org/docs/latest/rules/curly (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L31 (airbnb-base)
   * @see https://github.com/prettier/eslint-config-prettier/blob/v9.1.0/index.js#L13 (prettier)
   */
  curly: 'off',

  /**
   * Require `default` cases in `switch` statements.
   * @description I've deleted unnecessary options from airbnb-base.
   * @see https://eslint.org/docs/latest/rules/default-case (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L35 (airbnb-base)
   */
  'default-case': 'error',

  /**
   * Enforce `default` clauses in `switch` statements to be last.
   * @see https://eslint.org/docs/latest/rules/default-case-last (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L39 (airbnb-base)
   */
  'default-case-last': 'error',

  /**
   * Enforce default parameters to be last.
   * @see https://eslint.org/docs/latest/rules/default-param-last (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L42 (airbnb-base)
   */
  'default-param-last': 'error',

  /**
   * Enforce dot notation whenever possible.
   * @description I've deleted unnecessary additional options from airbnb-base.
   * @see https://eslint.org/docs/latest/rules/dot-notation (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L46 (airbnb-base)
   */
  'dot-notation': 'error',

  /**
   * Require the use of `===` and `!==`.
   * @see https://eslint.org/docs/latest/rules/eqeqeq (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L54 (airbnb-base)
   */
  eqeqeq: ['error', 'always', { null: 'ignore' }],

  /**
   * Require function names to match the name of the variable or property to which they are assigned.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/func-name-matching (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L89-L92 (airbnb-base)
   */
  'func-name-matching': 'off',

  /**
   * Require or disallow named `function` expressions.
   * @description I added `'as-needed'` option.
   * @see https://eslint.org/docs/latest/rules/func-names (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L96 (airbnb-base)
   */
  'func-names': ['warn', 'as-needed'],

  /**
   * Enforce the consistent use of either `function` declarations or expressions assigned to variables.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/func-style (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L101 (airbnb-base)
   */
  'func-style': 'off',

  /**
   * Require grouped accessor pairs in object literals and classes.
   * @see https://eslint.org/docs/latest/rules/grouped-accessor-pairs (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L58 (airbnb-base)
   */
  'grouped-accessor-pairs': 'error',

  /**
   * Require `for`-`in` loops to include an `if` statement.
   * @see https://eslint.org/docs/latest/rules/guard-for-in (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L62 (airbnb-base)
   */
  'guard-for-in': 'error',

  /**
   * Disallow specified identifiers.
   * @see https://eslint.org/docs/latest/rules/id-denylist (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L109 (airbnb-base)
   */
  'id-denylist': 'off',

  /**
   * Enforce minimum and maximum identifier lengths.
   * @see https://eslint.org/docs/latest/rules/id-length (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L113 (airbnb-base)
   */
  'id-length': 'off',

  /**
   * Require identifiers to match a specified regular expression.
   * @see https://eslint.org/docs/latest/rules/id-match (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L116 (airbnb-base)
   */
  'id-match': 'off',

  /**
   * Require or disallow initialization in variable declarations.
   * @see https://eslint.org/docs/latest/rules/init-declarations (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L6 (airbnb-base)
   */
  'init-declarations': 'off',

  /**
   * Require or disallow logical assignment operator shorthand.
   * @description This rule is not included in `airbnb-base@19.0.4`. Stylistic choice, so I set it to `'off'`.
   * @see https://eslint.org/docs/latest/rules/logical-assignment-operators (eslint)
   */
  'logical-assignment-operators': 'off',

  /**
   * Enforce a maximum number of classes per file.
   * @see https://eslint.org/docs/latest/rules/max-classes-per-file (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L66 (airbnb-base)
   */
  'max-classes-per-file': ['error', 1],

  /**
   * Enforce a maximum depth that blocks can be nested.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/max-depth (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L195 (airbnb-base)
   */
  'max-depth': 'off',

  /**
   * Enforce a maximum number of lines per file.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/max-lines (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L209-L213 (airbnb-base)
   */
  'max-lines': 'off',

  /**
   * Enforce a maximum number of lines of code in a function.
   * @see https://eslint.org/docs/latest/rules/max-lines-per-function (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L217-L222 (airbnb-base)
   */
  'max-lines-per-function': 'off',

  /**
   * Enforce a maximum depth that callbacks can be nested.
   * @see https://eslint.org/docs/latest/rules/max-nested-callbacks (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L225 (airbnb-base)
   */
  'max-nested-callbacks': 'off',

  /**
   * Enforce a maximum number of parameters in function definitions.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/max-params (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L228 (airbnb-base)
   */
  'max-params': 'off',

  /**
   * Enforce a maximum number of statements allowed in function blocks.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/max-statements (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L231 (airbnb-base)
   */
  'max-statements': 'off',

  /**
   * Require constructor names to begin with a capital letter.
   * @see https://eslint.org/docs/latest/rules/new-cap (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L247-L252 (airbnb-base)
   */
  'new-cap': [
    'error',
    {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
    },
  ],

  /**
   * Disallow the use of `alert`, `confirm`, and `prompt`.
   * @see https://eslint.org/docs/latest/rules/no-alert (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L70 (airbnb-base)
   */
  'no-alert': 'error',

  /**
   * Disallow `Array` constructors.
   * @see https://eslint.org/docs/latest/rules/no-array-constructor (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L270 (airbnb-base)
   */
  'no-array-constructor': 'error',

  /**
   * Disallow bitwise operators.
   * @description I've changed the rule to `'warn'` from `'error'`.
   * @see https://eslint.org/docs/latest/rules/no-bitwise (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L274 (airbnb-base)
   */
  'no-bitwise': 'warn',

  /**
   * Disallow the use of `arguments.caller` or `arguments.callee`.
   * @see https://eslint.org/docs/latest/rules/no-caller (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L74 (airbnb-base)
   */
  'no-caller': 'error',

  /**
   * Disallow lexical declarations in `case` clauses.
   * @see https://eslint.org/docs/latest/rules/no-case-declarations (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L78 (airbnb-base)
   */
  'no-case-declarations': 'error',

  /**
   * Disallow the use of `console`.
   * @see https://eslint.org/docs/latest/rules/no-console (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L27 (airbnb-base)
   */
  'no-console': 'error',

  /**
   * Disallow `continue` statements.
   * @description I've changed the rule to `'off'` from `'error'`.
   * @see https://eslint.org/docs/latest/rules/no-continue (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L278 (airbnb-base)
   */
  'no-continue': 'off',

  /**
   * Disallow deleting variables.
   * @see https://eslint.org/docs/latest/rules/no-delete-var (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L12 (airbnb-base)
   */
  'no-delete-var': 'error',

  /**
   * Disallow equal signs explicitly at the beginning of regular expressions.
   * @see https://eslint.org/docs/latest/rules/no-div-regex (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L86 (airbnb-base)
   */
  'no-div-regex': 'off',

  /**
   * Disallow `else` blocks after `return` statements in `if` statements.
   * @description I've changed the rule to `'off'` from `'error'`. I think this rule is more about stylistic choices. So, I don't want to enforce it.
   * @see https://eslint.org/docs/latest/rules/no-else-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L90 (airbnb-base)
   */
  'no-else-return': 'off',

  /**
   * Disallow empty block statements.
   * @see https://eslint.org/docs/latest/rules/no-empty (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L52 (airbnb-base)
   */
  'no-empty': 'error',

  /**
   * Disallow empty functions.
   * @see https://eslint.org/docs/latest/rules/no-empty-function (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L94-L100 (airbnb-base)
   */
  'no-empty-function': [
    'error',
    {
      allow: ['arrowFunctions', 'functions', 'methods'],
    },
  ],

  /**
   * Disallow empty `static` blocks.
   * @description This rule is not included in `airbnb-base@19.0.4`
   * @see https://eslint.org/docs/latest/rules/no-empty-static-block (eslint)
   */
  'no-empty-static-block': 'error',

  /**
   * Disallow `null` comparisons without type-checking operators.
   * @description This rule is subset of `eqeqeq` rule. `eqeqeq` already includes this rule.
   * @see https://eslint.org/docs/latest/rules/no-eq-null (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L108 (airbnb-base)
   */
  'no-eq-null': 'off',

  /**
   * Disallow the use of `eval()`.
   * @see https://eslint.org/docs/latest/rules/no-eval (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L112 (airbnb-base)
   */
  'no-eval': 'error',

  /**
   * Disallow extending native types.
   * @see https://eslint.org/docs/latest/rules/no-extend-native (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L116 (airbnb-base)
   */
  'no-extend-native': 'error',

  /**
   * Disallow unnecessary calls to `.bind()`.
   * @see https://eslint.org/docs/latest/rules/no-extra-bind (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L120 (airbnb-base)
   */
  'no-extra-bind': 'error',

  /**
   * Disallow unnecessary boolean casts.
   * @see https://eslint.org/docs/latest/rules/no-extra-boolean-cast (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L62 (airbnb-base)
   */
  'no-extra-boolean-cast': 'error',

  /**
   * Disallow unnecessary labels.
   * @see https://eslint.org/docs/latest/rules/no-extra-label (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L124 (airbnb-base)
   */
  'no-extra-label': 'error',

  /**
   * Disallow assignments to native objects or read-only global variables.
   * @description I've deleted unnecessary options from `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-global-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L136 (airbnb-base)
   */
  'no-global-assign': 'error',

  /**
   * Disallow shorthand type conversions.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`. This rule is too tight to enforce.
   * @see https://eslint.org/docs/latest/rules/no-implicit-coercion (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L144-L149 (airbnb-base)
   */
  'no-implicit-coercion': 'off',

  /**
   * Disallow declarations in the global scope.
   * @see https://eslint.org/docs/latest/rules/no-implicit-globals (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L153 (airbnb-base)
   */
  'no-implicit-globals': 'off',

  /**
   * Disallow the use of `eval()`-like methods.
   * @see https://eslint.org/docs/latest/rules/no-implied-eval (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L157 (airbnb-base)
   */
  'no-implied-eval': 'error',

  /**
   * Disallow inline comments after code.
   * @see https://eslint.org/docs/latest/rules/no-inline-comments (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L281 (airbnb-base)
   */
  'no-inline-comments': 'off',

  /**
   * Disallow use of `this` in contexts where the value of `this` is `undefined`.
   * @see https://eslint.org/docs/latest/rules/no-invalid-this (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L161 (airbnb-base)
   */
  'no-invalid-this': 'off',

  /**
   * Disallow the use of the `__iterator__` property.
   * @see https://eslint.org/docs/latest/rules/no-iterator (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L165 (airbnb-base)
   */
  'no-iterator': 'error',

  /**
   * Disallow labels that share a name with a variable.
   * @see https://eslint.org/docs/latest/rules/no-label-var (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L16 (airbnb-base)
   */
  'no-label-var': 'error',

  /**
   * Disallow labeled statements.
   * @description I've deleted unnecessary options from `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-labels (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L169 (airbnb-base)
   */
  'no-labels': 'error',

  /**
   * Disallow unnecessary nested blocks.
   * @see https://eslint.org/docs/latest/rules/no-lone-blocks (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L173 (airbnb-base)
   */
  'no-lone-blocks': 'error',

  /**
   * Disallow `if` statements as the only statement in `else` blocks.
   * @see https://eslint.org/docs/latest/rules/no-lonely-if (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L285 (airbnb-base)
   */
  'no-lonely-if': 'error',

  /**
   * Disallow function declarations that contain unsafe references inside loop statements.
   * @see https://eslint.org/docs/latest/rules/no-loop-func (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L177 (airbnb-base)
   */
  'no-loop-func': 'error',

  /**
   * Disallow magic numbers.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/no-magic-numbers (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L181-L186 (airbnb-base)
   */
  'no-magic-numbers': 'off',

  /**
   * Disallow use of chained assignment expressions.
   * @see https://eslint.org/docs/latest/rules/no-multi-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L311 (airbnb-base)
   */
  'no-multi-assign': 'error',

  /**
   * Disallow multiline strings.
   * @see https://eslint.org/docs/latest/rules/no-multi-str (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L196 (airbnb-base)
   */
  'no-multi-str': 'error',

  /**
   * Disallow negated conditions.
   * @see https://eslint.org/docs/latest/rules/no-negated-condition (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L319 (airbnb-base)
   */
  'no-negated-condition': 'off',

  /**
   * Disallow nested ternary expressions.
   * @description I've changed the rule to `'off'` from `'error'`.
   * @see https://eslint.org/docs/latest/rules/no-nested-ternary (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L322 (airbnb-base)
   */
  'no-nested-ternary': 'off',

  /**
   * Disallow `new` operators outside of assignments or comparisons.
   * @see https://eslint.org/docs/latest/rules/no-new (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L200 (airbnb-base)
   */
  'no-new': 'error',

  /**
   * Disallow `new` operators with the `Function` object.
   * @see https://eslint.org/docs/latest/rules/no-new-func (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L204 (airbnb-base)
   */
  'no-new-func': 'error',

  /**
   * Disallow `new` operators with the `String`, `Number`, and `Boolean` objects.
   * @see https://eslint.org/docs/latest/rules/no-new-wrappers (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L208 (airbnb-base)
   */
  'no-new-wrappers': 'error',

  /**
   * Disallow `\8` and `\9` escape sequences in string literals.
   * @see https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L212 (airbnb-base)
   */
  'no-nonoctal-decimal-escape': 'error',

  /**
   * Disallow calls to the `Object` constructor without an argument.
   * @description This rule is not included in `airbnb-base@19.0.4`.
   * @see https://eslint.org/docs/latest/rules/no-object-constructor (eslint)
   */
  'no-object-constructor': 'error',

  /**
   * Disallow octal literals.
   * @description I've changed the rule to `'warn'` from `'error'`.
   * @see https://eslint.org/docs/latest/rules/no-octal (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L216 (airbnb-base)
   */
  'no-octal': 'warn',

  /**
   * Disallow octal escape sequences in string literals.
   * @see https://eslint.org/docs/latest/rules/no-octal-escape (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L221 (airbnb-base)
   */
  'no-octal-escape': 'error',

  /**
   * Disallow reassigning `function` parameters.
   * @see https://eslint.org/docs/latest/rules/no-param-reassign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L226-L241 (airbnb-base)
   */
  'no-param-reassign': ['error', { props: false }],

  /**
   * Disallow the unary operators `++` and `--`.
   * @description I've changed the rule to `'off'` from `'error'`.
   * @see https://eslint.org/docs/latest/rules/no-plusplus (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L329 (airbnb-base)
   */
  'no-plusplus': 'off',

  /**
   * Disallow the use of the `__proto__` property.
   * @see https://eslint.org/docs/latest/rules/no-proto (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L245 (airbnb-base)
   */
  'no-proto': 'error',

  /**
   * Disallow variable redeclaration.
   * @see https://eslint.org/docs/latest/rules/no-redeclare (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L249 (airbnb-base)
   */
  'no-redeclare': 'error',

  /**
   * Disallow multiple spaces in regular expressions.
   * @see https://eslint.org/docs/latest/rules/no-regex-spaces (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L112 (airbnb-base)
   */
  'no-regex-spaces': 'error',

  /**
   * Disallow specified names in exports.
   * @see https://eslint.org/docs/latest/rules/no-restricted-exports (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L65-L70 (airbnb-base)
   */
  'no-restricted-exports': [
    'error',
    {
      restrictedNamedExports: [
        'default', // use `export default` to provide a default export.
        'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions.
      ],
    },
  ],

  /**
   * Disallow specified global variables.
   * @description I've deleted `confusingBrowserGlobals` to simplify the rule.
   * @see https://eslint.org/docs/latest/rules/no-restricted-globals (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L19-L31 (airbnb-base)
   */
  'no-restricted-globals': [
    'error',
    {
      name: 'isFinite',
      message:
        'Use `Number.isFinite` instead https://github.com/airbnb/javascript#standard-library--isfinite',
    },
    {
      name: 'isNaN',
      message:
        'Use `Number.isNaN` instead https://github.com/airbnb/javascript#standard-library--isnan',
    },
  ],

  /**
   * Disallow specified modules when loaded by import.
   * @see https://eslint.org/docs/latest/rules/no-restricted-imports (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L74-L77 (airbnb-base)
   */
  'no-restricted-imports': 'off',

  /**
   * Disallow certain properties on certain objects.
   * @see https://eslint.org/docs/latest/rules/no-restricted-properties (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L253-L291 (airbnb-base)
   */
  'no-restricted-properties': [
    'error',
    {
      object: 'arguments',
      property: 'callee',
      message: '`arguments.callee` is deprecated',
    },
    {
      object: 'global',
      property: 'isFinite',
      message: 'Please use `Number.isFinite` instead',
    },
    {
      object: 'self',
      property: 'isFinite',
      message: 'Please use `Number.isFinite` instead',
    },
    {
      object: 'window',
      property: 'isFinite',
      message: 'Please use `Number.isFinite` instead',
    },
    {
      object: 'global',
      property: 'isNaN',
      message: 'Please use `Number.isNaN` instead',
    },
    {
      object: 'self',
      property: 'isNaN',
      message: 'Please use `Number.isNaN` instead',
    },
    {
      object: 'window',
      property: 'isNaN',
      message: 'Please use `Number.isNaN` instead',
    },
    {
      property: '__defineGetter__',
      message: 'Please use `Object.defineProperty` instead.',
    },
    {
      property: '__defineSetter__',
      message: 'Please use `Object.defineProperty` instead.',
    },
    {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (`**`) instead.',
    },
  ],

  /**
   * Disallow specified syntax.
   * @description I've changed the rule to `'warn'` from `'error'`. I’ve also removed `LabeledStatement` and `WithStatement` since they are redundant, as `no-labels` and `no-with` already cover them.
   * @see https://eslint.org/docs/latest/rules/no-restricted-syntax (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L333-L351 (airbnb-base)
   */
  'no-restricted-syntax': [
    'warn',
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use `Object.{keys,values,entries}`, and iterate over the resulting array.',
    },
  ],

  /**
   * Disallow assignment operators in `return` statements.
   * @see https://eslint.org/docs/latest/rules/no-return-assign (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L295 (airbnb-base)
   */
  'no-return-assign': ['error', 'always'],

  /**
   * Disallow `javascript:` URLs.
   * @see https://eslint.org/docs/latest/rules/no-script-url (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L303 (airbnb-base)
   */
  'no-script-url': 'error',

  /**
   * Disallow comma operators.
   * @see https://eslint.org/docs/latest/rules/no-sequences (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L317 (airbnb-base)
   */
  'no-sequences': 'error',

  /**
   * Disallow variable declarations from shadowing variables declared in the outer scope.
   * @description I've changed the rule to `'warn'` from `'error'`.
   * @see https://eslint.org/docs/latest/rules/no-shadow (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L34 (airbnb-base)
   */
  'no-shadow': 'warn',

  /**
   * Disallow identifiers from shadowing restricted names.
   * @see https://eslint.org/docs/latest/rules/no-shadow-restricted-names (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L37 (airbnb-base)
   */
  'no-shadow-restricted-names': 'error',

  /**
   * Disallow ternary operators.
   * @see https://eslint.org/docs/latest/rules/no-ternary (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L360 (airbnb-base)
   */
  'no-ternary': 'off',

  /**
   * Disallow throwing literals as exceptions.
   * @see https://eslint.org/docs/latest/rules/no-throw-literal (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L321 (airbnb-base)
   */
  'no-throw-literal': 'error',

  /**
   * Disallow initializing variables to `undefined`.
   * @see https://eslint.org/docs/latest/rules/no-undef-init (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L43 (airbnb-base)
   */
  'no-undef-init': 'error',

  /**
   * Disallow the use of `undefined` as an identifier.
   * @see https://eslint.org/docs/latest/rules/no-undefined (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L48 (airbnb-base)
   */
  'no-undefined': 'off',

  /**
   * Disallow dangling underscores in identifiers.
   * @description I've turned this rule `'off'`.
   * @see https://eslint.org/docs/latest/rules/no-underscore-dangle (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L370-L375 (airbnb-base)
   */
  'no-underscore-dangle': 'off',

  /**
   * Disallow ternary operators when simpler alternatives exist.
   * @see https://eslint.org/docs/latest/rules/no-unneeded-ternary (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L380 (airbnb-base)
   */
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],

  /**
   * Disallow unused expressions.
   * @description I've deleted unnecessary options from `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-unused-expressions (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L329-L333 (airbnb-base)
   */
  'no-unused-expressions': ['error', { enforceForJSX: true }],

  /**
   * Disallow unused labels.
   * @see https://eslint.org/docs/latest/rules/no-unused-labels (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L337 (airbnb-base)
   */
  'no-unused-labels': 'error',

  /**
   * Disallow unnecessary calls to `.call()` and `.apply()`.
   * @see https://eslint.org/docs/latest/rules/no-useless-call (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L341 (airbnb-base)
   */
  'no-useless-call': 'off',

  /**
   * Disallow unnecessary `catch` clauses.
   * @see https://eslint.org/docs/latest/rules/no-useless-catch (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L345 (airbnb-base)
   */
  'no-useless-catch': 'error',

  /**
   * Disallow unnecessary computed property keys in objects and classes.
   * @see https://eslint.org/docs/latest/rules/no-useless-computed-key (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L85 (airbnb-base)
   */
  'no-useless-computed-key': 'error',

  /**
   * Disallow unnecessary concatenation of literals or template literals.
   * @see https://eslint.org/docs/latest/rules/no-useless-concat (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L349 (airbnb-base)
   */
  'no-useless-concat': 'error',

  /**
   * Disallow unnecessary constructors.
   * @see https://eslint.org/docs/latest/rules/no-useless-constructor (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L89 (airbnb-base)
   */
  'no-useless-constructor': 'error',

  /**
   * Disallow unnecessary escape characters.
   * @see https://eslint.org/docs/latest/rules/no-useless-escape (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L353 (airbnb-base)
   */
  'no-useless-escape': 'error',

  /**
   * Disallow renaming import, export, and destructured assignments to the same name.
   * @description I've deleted unnecessary options from `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/no-useless-rename (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L93-L97 (airbnb-base)
   */
  'no-useless-rename': 'error',

  /**
   * Disallow redundant return statements.
   * @see https://eslint.org/docs/latest/rules/no-useless-return (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L357 (airbnb-base)
   */
  'no-useless-return': 'error',

  /**
   * Require `let` or `const` instead of `var`.
   * @see https://eslint.org/docs/latest/rules/no-var (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L100 (airbnb-base)
   */
  'no-var': 'error',

  /**
   * Disallow `void` operators.
   * @see https://eslint.org/docs/latest/rules/no-void (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L361 (airbnb-base)
   */
  'no-void': 'error',

  /**
   * Disallow specified warning terms in comments.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/no-warning-comments (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L365 (airbnb-base)
   */
  'no-warning-comments': 'off',

  /**
   * Disallow `with` statements.
   * @see https://eslint.org/docs/latest/rules/no-with (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L369 (airbnb-base)
   */
  'no-with': 'error',

  /**
   * Require or disallow method and property shorthand syntax for object literals.
   * @see https://eslint.org/docs/latest/rules/object-shorthand (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L104-L107 (airbnb-base)
   */
  'object-shorthand': [
    'error',
    'always',
    {
      avoidQuotes: false,
      ignoreConstructors: false,
    },
  ],

  /**
   * Enforce variables to be declared either together or separately in functions.
   * @see https://eslint.org/docs/latest/rules/one-var (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L409 (airbnb-base)
   */
  'one-var': ['error', 'never'],

  /**
   * Require or disallow assignment operator shorthand where possible.
   * @description Turned this rule `'off'` since it's a stylistic choice.
   * @see https://eslint.org/docs/latest/rules/operator-assignment (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L417 (airbnb-base)
   */
  'operator-assignment': 'off',

  /**
   * Require using arrow functions for callbacks.
   * @description I've deleted unnecessary options from `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/prefer-arrow-callback (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L110-L113 (airbnb-base)
   */
  'prefer-arrow-callback': 'error',

  /**
   * Require `const` declarations for variables that are never reassigned after declared.
   * @see https://eslint.org/docs/latest/rules/prefer-const (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L116-L119 (airbnb-base)
   */
  'prefer-const': [
    'error',
    {
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
    },
  ],

  /**
   * Require destructuring from arrays and/or objects.
   * @see https://eslint.org/docs/latest/rules/prefer-destructuring (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L123-L134 (airbnb-base)
   */
  'prefer-destructuring': [
    'error',
    {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: true,
        object: false,
      },
    },
    {
      enforceForRenamedProperties: false,
    },
  ],

  /**
   * Disallow the use of `Math.pow` in favor of the `**` operator.
   * @see https://eslint.org/docs/latest/rules/prefer-exponentiation-operator (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L438 (airbnb-base)
   */
  'prefer-exponentiation-operator': 'error',

  /**
   * Enforce using named capture group in regular expression.
   * @description I've turned this rule `'error'` from `'off'`.
   * @see https://eslint.org/docs/latest/rules/prefer-named-capture-group (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L377 (airbnb-base)
   */
  'prefer-named-capture-group': 'error',

  /**
   * Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals.
   * @see https://eslint.org/docs/latest/rules/prefer-numeric-literals (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L138 (airbnb-base)
   */
  'prefer-numeric-literals': 'error',

  /**
   * Disallow use of `Object.prototype.hasOwnProperty.call()` and prefer use of `Object.hasOwn()`.
   * @see https://eslint.org/docs/latest/rules/prefer-object-has-own (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L382 (airbnb-base)
   */
  'prefer-object-has-own': 'error',

  /**
   * Disallow using `Object.assign` with an object literal as the first argument and prefer the use of object spread instead.
   * @see https://eslint.org/docs/latest/rules/prefer-object-spread (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L442 (airbnb-base)
   */
  'prefer-object-spread': 'error',

  /**
   * Require using `Error` objects as `Promise` rejection reasons.
   * @see https://eslint.org/docs/latest/rules/prefer-promise-reject-errors (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L373 (airbnb-base)
   */
  'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

  /**
   * Disallow use of the `RegExp` constructor in favor of regular expression literals.
   * @see https://eslint.org/docs/latest/rules/prefer-regex-literals (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L385-L387 (airbnb-base)
   */
  'prefer-regex-literals': [
    'error',
    {
      disallowRedundantWrapping: true,
    },
  ],

  /**
   * Require rest parameters instead of `arguments`.
   * @see https://eslint.org/docs/latest/rules/prefer-rest-params (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L146 (airbnb-base)
   */
  'prefer-rest-params': 'error',

  /**
   * Require spread operators instead of `.apply()`.
   * @see https://eslint.org/docs/latest/rules/prefer-spread (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L150 (airbnb-base)
   */
  'prefer-spread': 'error',

  /**
   * Require template literals instead of string concatenation.
   * @see https://eslint.org/docs/latest/rules/prefer-template (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L154 (airbnb-base)
   */
  'prefer-template': 'error',

  /**
   * Disallow losing originally caught error when re-throwing custom errors.
   * @description This rule is not included in `airbnb-base`.
   * @see https://eslint.org/docs/latest/rules/preserve-caught-error (eslint)
   */
  'preserve-caught-error': 'error',

  /**
   * Enforce the consistent use of the radix argument when using `parseInt()`.
   * @see https://eslint.org/docs/latest/rules/radix (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L391 (airbnb-base)
   */
  radix: 'error',

  /**
   * Disallow async functions which have no `await` expression.
   * @see https://eslint.org/docs/latest/rules/require-await (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L395 (airbnb-base)
   */
  'require-await': 'off',

  /**
   * Enforce the use of `u` or `v` flag on `RegExp`.
   * @see https://eslint.org/docs/latest/rules/require-unicode-regexp (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L399 (airbnb-base)
   */
  'require-unicode-regexp': 'off',

  /**
   * Require generator functions to contain `yield`.
   * @see https://eslint.org/docs/latest/rules/require-yield (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L158 (airbnb-base)
   */
  'require-yield': 'error',

  /**
   * Enforce sorted `import` declarations within modules.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/sort-imports (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L166-L171 (airbnb-base)
   */
  'sort-imports': 'off',

  /**
   * Require object keys to be sorted.
   * @description I've deleted unnecessary options from airbnb-base since the rule is set to `'off'`.
   * @see https://eslint.org/docs/latest/rules/sort-keys (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L466 (airbnb-base)
   */
  'sort-keys': 'off',

  /**
   * Require variables within the same declaration block to be sorted.
   * @see https://eslint.org/docs/latest/rules/sort-vars (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L469 (airbnb-base)
   */
  'sort-vars': 'off',

  /**
   * Require or disallow strict mode directives.
   * @description Babel inserts `'use strict';` for us.
   * @see https://eslint.org/docs/latest/rules/strict (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/strict.js#L4 (airbnb-base)
   */
  strict: ['error', 'never'],

  /**
   * Require symbol descriptions.
   * @see https://eslint.org/docs/latest/rules/symbol-description (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L175 (airbnb-base)
   */
  'symbol-description': 'error',

  /**
   * Require `var` declarations be placed at the top of their containing scope.
   * @see https://eslint.org/docs/latest/rules/vars-on-top (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L403 (airbnb-base)
   */
  'vars-on-top': 'error',

  /**
   * Require or disallow "Yoda" conditions.
   * @see https://eslint.org/docs/latest/rules/yoda (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/best-practices.js#L411 (airbnb-base)
   */
  yoda: 'error',

  // #endregion Suggestions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Layout & Formatting

  /**
   * Require or disallow Unicode byte order mark (BOM).
   * @see https://eslint.org/docs/latest/rules/unicode-bom (eslint)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L521 (airbnb-base)
   */
  'unicode-bom': ['error', 'never'],

  // #endregion Layout & Formatting
  // ------------------------------------------------------------------------------
} as const satisfies Partial<ESLintRules> satisfies Linter.RulesRecord;
