/**
 * @fileoverview This file follows:
 *
 * - The original rule order from `eslint-plugin-react`, migrated to `@eslint-react/eslint-plugin`.
 * - Unmapped rules and their original options remain commented out for review.
 *   - @see https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#list-of-supported-rules
 *
 * - The best practices outlined in `eslint-config-next@15.1.4`.
 *   - @see https://github.com/vercel/next.js/blob/v15.1.4/packages/eslint-config-next/index.js#L57
 *
 * - The best practices outlined in `eslint-config-airbnb@19.0.4`.
 *   - @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js
 *
 * - The rules disabled by `eslint-config-prettier@9.1.0`.
 *   - @see https://github.com/prettier/eslint-config-prettier/blob/v9.1.0/index.js#L55-L69
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import reactPluginModule from '@eslint-react/eslint-plugin';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const reactPlugin: { 'react-x': ESLint.Plugin } = {
  'react-x': reactPluginModule,
};

export const reactRules = {
  /**
   * Enforce using `onChange` or `readonly` attribute when checked is used.
   * @description This rule does not exist in `eslint-config-airbnb@19.0.4`.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/checked-requires-onchange-or-readonly.md
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/checked-requires-onchange-or-readonly': 'error',

  /**
   * Enforce a specific function type for function components.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L527-L530
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/function-component-definition': [
  //   'error',
  //   {
  //     namedComponents: ['function-declaration', 'function-expression'],
  //     unnamedComponents: 'function-expression',
  //   },
  // ],

  /**
   * Enforce boolean attributes notation in JSX.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L67
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-boolean-value': ['error', 'never', { always: [] }],

  /**
   * Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L432
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-curly-brace-presence': [
  //   'error',
  //   {
  //     props: 'never',
  //     children: 'never',
  //     propElementValues: 'ignore',
  //   },
  // ],

  /**
   * Disallow file extensions that may contain JSX.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L322
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-filename-extension': [
  //   'error',
  //   {
  //     allow: 'as-needed',
  //     extensions: ['.jsx', '.tsx'],
  //     ignoreFilesWithoutCode: true,
  //   },
  // ],

  /**
   * Enforce shorthand or standard form for React fragments.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L475
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-fragments': ['error', 'syntax'],

  /**
   * Disallow `.bind()` or arrow functions in JSX props.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L103-L109
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-no-bind': [
  //   'error',
  //   {
  //     ignoreDOMComponents: true,
  //     ignoreRefs: true,
  //     allowArrowFunctions: true,
  //     allowFunctions: false,
  //     allowBind: false,
  //   },
  // ],

  /**
   * Disallow duplicate properties in JSX.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L113
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

  /**
   * Disallow problematic leaked values from being rendered.
   * @description This rule does not exist in `eslint-config-airbnb@19.0.4`.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
   */
  // Requires type-aware linting; review before enabling react-x/no-leaked-conditional-rendering.
  // 'react/jsx-no-leaked-render': 'warn',
  // 'react-x/no-leaked-conditional-rendering': 'warn',

  /**
   * Enforce PascalCase for user-defined JSX components.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L125-L128
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-pascal-case': [
  //   'error',
  //   {
  //     allowAllCaps: true,
  //     allowLeadingUnderscore: false,
  //     allowNamespace: false,
  //     ignore: [],
  //   },
  // ],

  /**
   * Disallow JSX prop spreading the same identifier multiple times.
   * @description This rule does not exist in `eslint-config-airbnb@19.0.4`.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spread-multi.md
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/jsx-props-no-spread-multi': 'error',

  /**
   * Disallow usage of invalid attributes.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L558
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/no-invalid-html-attribute': 'error',

  /**
   * Disallow using string references.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L206
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/no-string-refs': 'error',

  /**
   * Disallow unescaped HTML entities from appearing in markup.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L366
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/no-unescaped-entities': 'error',

  /**
   * Disallow extra closing tags for components without children.
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L238
   */
  // No built-in equivalent in @eslint-react/eslint-plugin; retained for review.
  // 'react/self-closing-comp': [
  //   'error',
  //   {
  //     component: true,
  //     html: true,
  //   },
  // ],

  // ------------------------------------------------------------------------------
  // #region X Rules

  /**
   * Validates usage of Error Boundaries instead of try/catch for errors in child components.
   * @description Disabled to avoid duplicate checks with `react-hooks/error-boundaries`.
   * @see https://eslint-react.xyz/docs/rules/error-boundaries
   */
  'react-x/error-boundaries': 'off',

  /**
   * Verifies the list of dependencies for Hooks like `useEffect` and similar.
   * @description Disabled to avoid duplicate checks with `react-hooks/exhaustive-deps`.
   * @see https://github.com/facebook/react/issues/14920
   */
  'react-x/exhaustive-deps': 'off',

  /**
   * Validates against assignment/mutation of globals during render,
   * part of ensuring that side effects must run outside of render.
   * @description Disabled to avoid duplicate checks with `react-hooks/globals`.
   * @see https://eslint-react.xyz/docs/rules/globals
   */
  'react-x/globals': 'off',

  /**
   * Validates against mutating props, state, and other immutable values, including through functions
   * passed into frozen contexts such as JSX props, hook arguments, and hook return values.
   * @description Disabled to avoid duplicate checks with `react-hooks/immutability`.
   * @see https://eslint-react.xyz/docs/rules/immutability
   */
  'react-x/immutability': 'off',

  /**
   * Disallows accessing `this.state` inside `setState` calls.
   * @see https://eslint-react.xyz/docs/rules/no-access-state-in-setstate
   */
  'react-x/no-access-state-in-setstate': 'error',

  /**
   * Disallows using an item's index in the array as its key.
   * @see https://eslint-react.xyz/docs/rules/no-array-index-key
   */
  'react-x/no-array-index-key': 'error',

  /**
   * Disallows the use of `Children.count` from the `react` package.
   * @see https://eslint-react.xyz/docs/rules/no-children-count
   */
  'react-x/no-children-count': 'error',

  /**
   * Disallows the use of `Children.forEach` from the `react` package.
   * @see https://eslint-react.xyz/docs/rules/no-children-for-each
   */
  'react-x/no-children-for-each': 'error',

  /**
   * Disallows the use of `Children.map` from the `react` package.
   * @see https://eslint-react.xyz/docs/rules/no-children-map
   */
  'react-x/no-children-map': 'error',

  /**
   * Disallows the use of `Children.only` from the `react` package.
   * @see https://eslint-react.xyz/docs/rules/no-children-only
   */
  'react-x/no-children-only': 'error',

  /**
   * Disallows the use of `Children.toArray` from the `react` package.
   * @see https://eslint-react.xyz/docs/rules/no-children-to-array
   */
  'react-x/no-children-to-array': 'error',

  /**
   * Disallows class components except for error boundaries.
   * @see https://eslint-react.xyz/docs/rules/no-class-component
   */
  'react-x/no-class-component': 'error',

  /**
   * Disallows `cloneElement`.
   * @see https://eslint-react.xyz/docs/rules/no-clone-element
   */
  'react-x/no-clone-element': 'error',

  /**
   * Replaces usage of `componentWillMount` with `UNSAFE_componentWillMount`.
   * @see https://eslint-react.xyz/docs/rules/no-component-will-mount
   */
  'react-x/no-component-will-mount': 'error',

  /**
   * Replaces usage of `componentWillReceiveProps` with `UNSAFE_componentWillReceiveProps`.
   * @see https://eslint-react.xyz/docs/rules/no-component-will-receive-props
   */
  'react-x/no-component-will-receive-props': 'error',

  /**
   * Replaces usage of `componentWillUpdate` with `UNSAFE_componentWillUpdate`.
   * @see https://eslint-react.xyz/docs/rules/no-component-will-update
   */
  'react-x/no-component-will-update': 'error',

  /**
   * Replaces usage of `<Context.Provider>` with `<Context>`.
   * @see https://eslint-react.xyz/docs/rules/no-context-provider
   */
  'react-x/no-context-provider': 'error',

  /**
   * Disallows `createRef` in function components and Hooks.
   * @see https://eslint-react.xyz/docs/rules/no-create-ref
   */
  'react-x/no-create-ref': 'error',

  /**
   * Disallows direct mutation of `this.state`.
   * @see https://eslint-react.xyz/docs/rules/no-direct-mutation-state
   */
  'react-x/no-direct-mutation-state': 'error',

  /**
   * Prevents duplicate `key` props on sibling elements when rendering lists.
   * @see https://eslint-react.xyz/docs/rules/no-duplicate-key
   */
  'react-x/no-duplicate-key': 'error',

  /**
   * Replaces usage of `forwardRef` with passing `ref` as a prop.
   * @see https://eslint-react.xyz/docs/rules/no-forward-ref
   */
  'react-x/no-forward-ref': 'error',

  /**
   * Prevents implicitly passing the `children` prop to components.
   * @description Disabled because this configuration does not enable TypeScript type-aware linting.
   * @see https://eslint-react.xyz/docs/rules/no-implicit-children
   */
  'react-x/no-implicit-children': 'off',

  /**
   * Prevents implicitly passing the `key` prop to components.
   * @description Disabled because this configuration does not enable TypeScript type-aware linting.
   * @see https://eslint-react.xyz/docs/rules/no-implicit-key
   */
  'react-x/no-implicit-key': 'off',

  /**
   * Prevents implicitly passing the `ref` prop to components.
   * @description Disabled because this configuration does not enable TypeScript type-aware linting.
   * @see https://eslint-react.xyz/docs/rules/no-implicit-ref
   */
  'react-x/no-implicit-ref': 'off',

  /**
   * Prevents problematic leaked values from being rendered.
   * @description Disabled because this configuration does not enable TypeScript type-aware linting.
   * @see https://eslint-react.xyz/docs/rules/no-leaked-conditional-rendering
   */
  'react-x/no-leaked-conditional-rendering': 'off',

  /**
   * Enforces that all components have a `displayName` that can be used in DevTools.
   * @see https://eslint-react.xyz/docs/rules/no-missing-component-display-name
   */
  'react-x/no-missing-component-display-name': 'error',

  /**
   * Enforces that all contexts have a `displayName` that can be used in DevTools.
   * @see https://eslint-react.xyz/docs/rules/no-missing-context-display-name
   */
  'react-x/no-missing-context-display-name': 'error',

  /**
   * Disallows missing `key` on items in list rendering.
   * @see https://eslint-react.xyz/docs/rules/no-missing-key
   */
  'react-x/no-missing-key': 'error',

  /**
   * Prevents incorrect usage of `captureOwnerStack`.
   * @see https://eslint-react.xyz/docs/rules/no-misused-capture-owner-stack
   */
  'react-x/no-misused-capture-owner-stack': 'error',

  /**
   * Disallows nesting component definitions inside other components.
   * @see https://eslint-react.xyz/docs/rules/no-nested-component-definitions
   */
  'react-x/no-nested-component-definitions': 'error',

  /**
   * Disallows nesting lazy component declarations inside other components or hooks.
   * @see https://eslint-react.xyz/docs/rules/no-nested-lazy-component-declarations
   */
  'react-x/no-nested-lazy-component-declarations': 'error',

  /**
   * Disallows calling `this.setState` in `componentDidMount` outside functions such as callbacks.
   * @see https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-mount
   */
  'react-x/no-set-state-in-component-did-mount': 'error',

  /**
   * Disallows calling `this.setState` in `componentDidUpdate` outside functions such as callbacks.
   * @see https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-update
   */
  'react-x/no-set-state-in-component-did-update': 'error',

  /**
   * Disallows calling `this.setState` in `componentWillUpdate` outside functions such as callbacks.
   * @see https://eslint-react.xyz/docs/rules/no-set-state-in-component-will-update
   */
  'react-x/no-set-state-in-component-will-update': 'error',

  /**
   * Enforces that a function with the `use` prefix uses at least one Hook inside it.
   * @see https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix
   */
  'react-x/no-unnecessary-use-prefix': 'error',

  /**
   * Warns about the use of `UNSAFE_componentWillMount` in class components.
   * @see https://eslint-react.xyz/docs/rules/no-unsafe-component-will-mount
   */
  'react-x/no-unsafe-component-will-mount': 'error',

  /**
   * Warns about the use of `UNSAFE_componentWillReceiveProps` in class components.
   * @see https://eslint-react.xyz/docs/rules/no-unsafe-component-will-receive-props
   */
  'react-x/no-unsafe-component-will-receive-props': 'error',

  /**
   * Warns about the use of `UNSAFE_componentWillUpdate` in class components.
   * @see https://eslint-react.xyz/docs/rules/no-unsafe-component-will-update
   */
  'react-x/no-unsafe-component-will-update': 'error',

  /**
   * Prevents non-stable values (i.e., object literals) from being used as a value for `Context.Provider`.
   * @see https://eslint-react.xyz/docs/rules/no-unstable-context-value
   */
  'react-x/no-unstable-context-value': 'error',

  /**
   * Prevents using referential-type values as default props in object destructuring.
   * @see https://eslint-react.xyz/docs/rules/no-unstable-default-props
   */
  'react-x/no-unstable-default-props': 'error',

  /**
   * Warns about unused class component methods and properties.
   * @see https://eslint-react.xyz/docs/rules/no-unused-class-component-members
   */
  'react-x/no-unused-class-component-members': 'error',

  /**
   * Warns about component props that are defined but never used.
   * @description Disabled because this configuration does not enable TypeScript type-aware linting.
   * @see https://eslint-react.xyz/docs/rules/no-unused-props
   */
  'react-x/no-unused-props': 'off',

  /**
   * Warns about state variables that are defined but never used.
   * @see https://eslint-react.xyz/docs/rules/no-unused-state
   */
  'react-x/no-unused-state': 'error',

  /**
   * Replaces usage of `useContext` with `use`.
   * @see https://eslint-react.xyz/docs/rules/no-use-context
   */
  'react-x/no-use-context': 'error',

  /**
   * Validates that components and hooks are pure by checking that they do not call known-impure functions during render.
   * @description Disabled to avoid duplicate checks with `react-hooks/purity`.
   * @see https://eslint-react.xyz/docs/rules/purity
   */
  'react-x/purity': 'off',

  /**
   * Validates correct usage of refs by checking that `ref.current` is not read or written during render.
   * @description Disabled to avoid duplicate checks with `react-hooks/refs`.
   * @see https://eslint-react.xyz/docs/rules/refs
   */
  'react-x/refs': 'off',

  /**
   * Enforces the Rules of Hooks.
   * @description Disabled to avoid duplicate checks with `react-hooks/rules-of-hooks`.
   * @see https://react.dev/reference/rules/rules-of-hooks
   */
  'react-x/rules-of-hooks': 'off',

  /**
   * Validates against setting state synchronously in an effect, which can lead to re-renders that degrade performance.
   * @description Disabled to avoid duplicate checks with `react-hooks/set-state-in-effect`.
   * @see https://eslint-react.xyz/docs/rules/set-state-in-effect
   */
  'react-x/set-state-in-effect': 'off',

  /**
   * Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.
   * @description Disabled to avoid duplicate checks with `react-hooks/set-state-in-render`.
   * @see https://eslint-react.xyz/docs/rules/set-state-in-render
   */
  'react-x/set-state-in-render': 'off',

  /**
   * Validates that components are static, not recreated every render.
   * @description Disabled to avoid duplicate checks with `react-hooks/static-components`.
   * @see https://eslint-react.xyz/docs/rules/static-components
   */
  'react-x/static-components': 'off',

  /**
   * Validates against syntax that React Compiler does not support.
   * @description Disabled to avoid duplicate checks with `react-hooks/unsupported-syntax`.
   * @see https://eslint-react.xyz/docs/rules/unsupported-syntax
   */
  'react-x/unsupported-syntax': 'off',

  /**
   * Validates that `useMemo` is called with a callback that returns a value.
   * @description Disabled to avoid duplicate checks with `react-hooks/use-memo`.
   * @see https://eslint-react.xyz/docs/rules/use-memo
   */
  'react-x/use-memo': 'off',

  /**
   * Enforces correct usage of `useState`, including destructuring, symmetric naming of the value and setter,
   * and wrapping expensive initializers in a lazy initializer function.
   * @see https://eslint-react.xyz/docs/rules/use-state
   */
  'react-x/use-state': [
    'error',
    {
      enforceAssignment: true,
      enforceSetterName: true,
      enforceLazyInitialization: true,
    },
  ],

  // #endregion X Rules
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region JSX Rules

  /**
   * Disallows passing `children` as a prop.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-children-prop
   */
  'react-x/jsx-no-children-prop': 'error',

  /**
   * Disallows passing `children` as a prop when children are also passed as nested content.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-children-prop-with-children
   */
  'react-x/jsx-no-children-prop-with-children': 'error',

  /**
   * Prevents comment strings from being accidentally inserted into a JSX element's text nodes.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-comment-textnodes
   */
  'react-x/jsx-no-comment-textnodes': 'error',

  /**
   * Prevent patterns that cause deoptimization when using the automatic JSX runtime.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-key-after-spread
   */
  'react-x/jsx-no-key-after-spread': 'error',

  /**
   * Catches `$` before `{expr}` in JSX — typically from template literal `${expr}` being copy-pasted into JSX without removing the `$`. The `$` "leaks" into the rendered output.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-leaked-dollar
   */
  'react-x/jsx-no-leaked-dollar': 'error',

  /**
   * Catches `;` at the start of JSX text nodes — typically from accidentally placing a statement-ending `;` inside JSX. The `;` "leaks" into the rendered output.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-leaked-semicolon
   */
  'react-x/jsx-no-leaked-semicolon': 'error',

  /**
   * Disallow JSX namespace syntax, as React does not support them.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-namespace
   */
  'react-x/jsx-no-namespace': 'error',

  /**
   * Disallows useless fragment elements.
   * @see https://eslint-react.xyz/docs/rules/jsx-no-useless-fragment
   */
  'react-x/jsx-no-useless-fragment': 'error',

  // #endregion JSX Rules
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region RSC Rules

  /**
   * Validates and transforms React Client/Server Function definitions.
   * @see https://eslint-react.xyz/docs/rules/rsc-function-definition
   */
  'react-x/rsc-function-definition': 'error',

  // #endregion RSC Rules
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region DOM Rules

  /**
   * Disallows DOM elements from using `dangerouslySetInnerHTML`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml
   */
  'react-x/dom-no-dangerously-set-innerhtml': 'error',

  /**
   * Disallows DOM elements from using `dangerouslySetInnerHTML` and `children` at the same time.
   * @see https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children
   */
  'react-x/dom-no-dangerously-set-innerhtml-with-children': 'error',

  /**
   * Disallows `findDOMNode`.
   * @description `findDOMNode` is now fully removed(deprecated) since `react@19`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-find-dom-node
   */
  'react-x/dom-no-find-dom-node': 'off',

  /**
   * Disallows `flushSync`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-flush-sync
   */
  'react-x/dom-no-flush-sync': 'error',

  /**
   * Replaces usage of `ReactDOM.hydrate()` with `hydrateRoot()`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-hydrate
   */
  'react-x/dom-no-hydrate': 'error',

  /**
   * Enforces an explicit `type` attribute for `button` elements.
   * @see https://eslint-react.xyz/docs/rules/dom-no-missing-button-type
   */
  'react-x/dom-no-missing-button-type': 'error',

  /**
   * Enforces an explicit `sandbox` attribute for `iframe` elements.
   * @see https://eslint-react.xyz/docs/rules/dom-no-missing-iframe-sandbox
   */
  'react-x/dom-no-missing-iframe-sandbox': 'error',

  /**
   * Replaces usage of `ReactDOM.render()` with `createRoot(node).render()`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-render
   */
  'react-x/dom-no-render': 'error',

  /**
   * Disallows the return value of `ReactDOM.render`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-render-return-value
   */
  'react-x/dom-no-render-return-value': 'error',

  /**
   * Disallows `javascript:` URLs as attribute values.
   * @see https://eslint-react.xyz/docs/rules/dom-no-script-url
   */
  'react-x/dom-no-script-url': 'error',

  /**
   * Disallows the use of string style prop in JSX. Use an object instead.
   * @see https://eslint-react.xyz/docs/rules/dom-no-string-style-prop
   */
  'react-x/dom-no-string-style-prop': 'error',

  /**
   * Disallows unknown `DOM` properties.
   * @see https://eslint-react.xyz/docs/rules/dom-no-unknown-property
   */
  'react-x/dom-no-unknown-property': ['error', { requireDataLowercase: true }],

  /**
   * Enforces that the `sandbox` attribute for `iframe` elements is not set to unsafe combinations.
   * @see https://eslint-react.xyz/docs/rules/dom-no-unsafe-iframe-sandbox
   */
  'react-x/dom-no-unsafe-iframe-sandbox': 'error',

  /**
   * Disallows `target="_blank"` without `rel="noreferrer noopener"`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-unsafe-target-blank
   */
  'react-x/dom-no-unsafe-target-blank': 'error',

  /**
   * Replaces usage of `useFormState` with `useActionState`.
   * @see https://eslint-react.xyz/docs/rules/dom-no-use-form-state
   */
  'react-x/dom-no-use-form-state': 'error',

  /**
   * Disallows `children` in void DOM elements.
   * @see https://eslint-react.xyz/docs/rules/dom-no-void-elements-with-children
   */
  'react-x/dom-no-void-elements-with-children': 'error',

  // #endregion DOM Rules
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Web API Rules

  /**
   * Enforces that every `addEventListener` in a component or custom hook has a corresponding `removeEventListener`.
   * @see https://eslint-react.xyz/docs/rules/web-api-no-leaked-event-listener
   */
  'react-x/web-api-no-leaked-event-listener': 'error',

  /**
   * Enforces that every `fetch` in a component or custom hook has a corresponding `AbortController` abort in the cleanup function.
   * @see https://eslint-react.xyz/docs/rules/web-api-no-leaked-fetch
   */
  'react-x/web-api-no-leaked-fetch': 'error',

  /**
   * Enforces that every `IntersectionObserver` created in a component or custom hook has a corresponding `IntersectionObserver.disconnect()`.
   * @see https://eslint-react.xyz/docs/rules/web-api-no-leaked-intersection-observer
   */
  'react-x/web-api-no-leaked-intersection-observer': 'error',

  /**
   * Enforces that every `setInterval` in a component or custom hook has a corresponding `clearInterval`.
   * @see https://eslint-react.xyz/docs/rules/web-api-no-leaked-interval
   */
  'react-x/web-api-no-leaked-interval': 'error',

  /**
   * Enforces that every `ResizeObserver` created in a component or custom hook has a corresponding `ResizeObserver.disconnect()`.
   * @see https://eslint-react.xyz/docs/rules/web-api-no-leaked-resize-observer
   */
  'react-x/web-api-no-leaked-resize-observer': 'error',

  /**
   * Enforces that every `setTimeout` in a component or custom hook has a corresponding `clearTimeout`.
   * @see https://eslint-react.xyz/docs/rules/web-api-no-leaked-timeout
   */
  'react-x/web-api-no-leaked-timeout': 'error',

  // #endregion Web API Rules
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Naming Convention Rules

  /**
   * Enforces identifier names assigned from `createContext` calls to be a valid component name with the suffix `Context`.
   * @see https://eslint-react.xyz/docs/rules/naming-convention-context-name
   */
  'react-x/naming-convention-context-name': 'error',

  /**
   * Enforces identifier names assigned from `useId` calls to be either `id` or end with `Id`.
   * @see https://eslint-react.xyz/docs/rules/naming-convention-id-name
   */
  'react-x/naming-convention-id-name': 'error',

  /**
   * Enforces identifier names assigned from `useRef` calls to be either `ref` or end with `Ref`.
   * @see https://eslint-react.xyz/docs/rules/naming-convention-ref-name
   */
  'react-x/naming-convention-ref-name': 'error',

  // #endregion Naming Convention Rules
  // ------------------------------------------------------------------------------
} as const satisfies Linter.RulesRecord;
