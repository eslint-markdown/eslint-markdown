/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed on `eslint-plugin-import-x`.
 *   - @see https://github.com/un-ts/eslint-plugin-import-x#rules
 *
 * - The best practices outlined in `eslint-config-airbnb-base@19.0.4`.
 *   - @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import importPluginModule from 'eslint-plugin-import-x';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const importPlugin: { 'import-x': ESLint.Plugin } = {
  'import-x': importPluginModule,
};

export const importRules = {
  // ------------------------------------------------------------------------------
  // #region Helpful Warnings

  /**
   * Forbid any invalid exports, i.e. re-export of the same name.
   * @description TypeScript already checks this, so the rule is disabled to avoid duplicate checks.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L54 (airbnb-base)
   */
  'import-x/export': 'off',

  /**
   * Forbid imported names marked with `@deprecated` documentation tag.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-deprecated.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L66 (airbnb-base)
   */
  'import-x/no-deprecated': 'off',

  /**
   * Forbid empty named import blocks.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-empty-named-blocks.md (import-x)
   */
  'import-x/no-empty-named-blocks': 'error',

  /**
   * Forbid the use of extraneous packages.
   * @description Too computationally expensive for large codebases. I've disabled it. Note that this check is already handled by `n/no-extraneous-import` and `n/no-extraneous-require`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L71-L97 (airbnb-base)
   */
  'import-x/no-extraneous-dependencies': [
    'off',
    {
      devDependencies: [
        'test/**', // tape, common npm pattern
        'tests/**', // also common npm pattern
        'spec/**', // mocha, rspec-like pattern
        '**/__tests__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        'test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}', // repos with a single test file
        'test-*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}', // repos with multiple top-level test files
        '**/*{.,_}{test,spec}.{js,mjs,cjs,jsx,ts,mts,cts,tsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.config.{js,mjs,cjs,ts,mts,cts}', // jest config -- https://jestjs.io/docs/configuration
        '**/jest.setup.js', // jest setup
        '**/vue.config.js', // vue-cli config
        '**/webpack.config.{js,mjs,cjs,ts,mts,cts}', // webpack config -- https://webpack.js.org/guides/typescript/#ways-to-use-typescript-in-webpackconfigts
        '**/webpack.config.*.{js,mjs,cjs,ts,mts,cts}', // webpack config -- https://webpack.js.org/guides/typescript/#ways-to-use-typescript-in-webpackconfigts
        '**/rollup.config.{js,mjs,cjs,ts,mts,cts}', // rollup config -- https://rollupjs.org/command-line-interface/#configplugin-plugin
        '**/rollup.config.*.{js,mjs,cjs,ts,mts,cts}', // rollup config -- https://rollupjs.org/command-line-interface/#configplugin-plugin
        '**/vite.config.{js,mjs,cjs,ts,mts,cts}', // vite config -- https://vitest.dev/guide/#configuring-vitest
        '**/vitest.config.{js,mjs,cjs,ts,mts,cts}', // vitest config -- https://vitest.dev/guide/#configuring-vitest
        '**/gulpfile.js', // gulp config
        '**/gulpfile.*.js', // gulp config
        '**/Gruntfile{,.js}', // grunt config
        '**/protractor.conf.js', // protractor config
        '**/protractor.conf.*.js', // protractor config
        '**/karma.conf.js', // karma config
        '**/.eslintrc.js', // eslint config
        '**/eslint.config.{js,mjs,cjs,ts,mts,cts}', // eslint config -- https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file
        '**/.vitepress/**/*.{js,mjs,cjs,ts,mts,cts}', // vitepress config
      ],
      optionalDependencies: false,
    },
  ],

  /**
   * Forbid the use of mutable exports with `var` or `let`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L101 (airbnb-base)
   */
  'import-x/no-mutable-exports': 'error',

  /**
   * Forbid use of exported name as identifier of default export.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L58 (airbnb-base)
   */
  'import-x/no-named-as-default': 'error',

  /**
   * Forbid use of exported name as property of default export.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default-member.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L62 (airbnb-base)
   */
  'import-x/no-named-as-default-member': 'error',

  /**
   * Forbid modules without exports, or exports without matching import in another module.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unused-modules.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L257-L261 (airbnb-base)
   */
  'import-x/no-unused-modules': 'off',

  // #endregion Helpful Warnings
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Module Systems

  /**
   * Forbid AMD `require` and `define` calls.
   * @description Only relevant if using AMD module system. Disabled here.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-amd.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L111 (airbnb-base)
   */
  'import-x/no-amd': 'off',

  /**
   * Forbid CommonJS `require` calls and `module.exports` or `exports.*`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-commonjs.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L107 (airbnb-base)
   */
  'import-x/no-commonjs': 'off',

  /**
   * Forbid import statements with CommonJS `module.exports`.
   * @description I've removed unnecessary options from `airbnb-base`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-import-module-exports.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L265-L267 (airbnb-base)
   */
  'import-x/no-import-module-exports': [
    'error',
    {
      exceptions: ['**/*.{ts,cts}'],
    },
  ],

  /**
   * Forbid Node.js builtin modules.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-nodejs-modules.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L116 (airbnb-base)
   */
  'import-x/no-nodejs-modules': 'off',

  /**
   * Forbid potentially ambiguous parse goal (`script` vs. `module`).
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/unambiguous.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L186 (airbnb-base)
   */
  'import-x/unambiguous': 'off',

  // #endregion Module Systems
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Static Analysis

  /**
   * Ensure a default export is present, given a default import.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/default.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L45 (airbnb-base)
   */
  'import-x/default': 'off',

  /**
   * Ensure named imports correspond to a named export in the remote file.
   * @description TypeScript already checks this, so the rule is disabled to avoid duplicate checks.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/named.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L41 (airbnb-base)
   */
  'import-x/named': 'off',

  /**
   * Ensure imported namespaces contain dereferenced properties as they are dereferenced.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/namespace.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L48 (airbnb-base)
   */
  'import-x/namespace': 'off',

  /**
   * Forbid import of modules using absolute paths.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-absolute-path.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L169 (airbnb-base)
   */
  'import-x/no-absolute-path': 'error',

  /**
   * Forbid a module from importing a module with a dependency path back to itself.
   * @description Too computationally expensive for large codebases. I've disabled it.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L237 (airbnb-base)
   */
  'import-x/no-cycle': 'off',

  /**
   * Forbid `require()` calls with expressions.
   * @description I've disabled this rule.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-dynamic-require.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L173 (airbnb-base)
   */
  'import-x/no-dynamic-require': 'off',

  /**
   * Forbid importing the submodules of other modules.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-internal-modules.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L177-L179 (airbnb-base)
   */
  'import-x/no-internal-modules': 'off',

  /**
   * Forbid importing packages through relative paths.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-packages.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L271 (airbnb-base)
   */
  'import-x/no-relative-packages': 'error',

  /**
   * Forbid importing modules from parent directories.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-parent-imports.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L252 (airbnb-base)
   */
  'import-x/no-relative-parent-imports': 'off',

  /**
   * Enforce which files can be imported in a given folder.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-restricted-paths.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L161 (airbnb-base)
   */
  'import-x/no-restricted-paths': 'off',

  /**
   * Forbid a module from importing itself.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-self-import.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L233 (airbnb-base)
   */
  'import-x/no-self-import': 'error',

  /**
   * Ensure imports point to a file/module that can be resolved.
   * @description Kept disabled to preserve the existing import resolution policy after migrating to `eslint-plugin-import-x`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L37 (airbnb-base)
   */
  'import-x/no-unresolved': 'off',

  /**
   * Forbid unnecessary path segments in import and require statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-useless-path-segments.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L241 (airbnb-base)
   */
  'import-x/no-useless-path-segments': ['error', { commonjs: true }],

  /**
   * Forbid webpack loader syntax in imports.
   * @description Only relevant if using webpack loader syntax in imports. Disabled here.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-webpack-loader-syntax.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L190 (airbnb-base)
   */
  'import-x/no-webpack-loader-syntax': 'off',

  // #endregion Static Analysis
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // #region Style Guide

  /**
   * Enforce or ban the use of inline type-only markers for named imports.
   * @description This rule is not included in `airbnb-base`. It's for TypeScript only.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md (import-x)
   */
  'import-x/consistent-type-specifier-style': 'off',

  /**
   * Enforce a leading comment with the `webpackChunkName` for dynamic imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/dynamic-import-chunkname.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L245-L248 (airbnb-base)
   */
  'import-x/dynamic-import-chunkname': 'off',

  /**
   * Ensure all exports appear after other statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L215 (airbnb-base)
   */
  'import-x/exports-last': 'off',

  /**
   * Ensure consistent use of file extension within the import path.
   * @description I've disabled this rule because ESM requires explicit file extensions, but web development with ESM doesn't. This creates conflicts.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L140-L144 (airbnb-base)
   */
  'import-x/extensions': 'off',

  /**
   * Ensure all imports appear before other statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L122 (airbnb-base)
   */
  'import-x/first': 'error',

  /**
   * Prefer named exports to be grouped together in a single export declaration
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L221 (airbnb-base)
   */
  'import-x/group-exports': 'off',

  /**
   * Enforce the maximum number of dependencies a module can have.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/max-dependencies.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L165 (airbnb-base)
   */
  'import-x/max-dependencies': 'off',

  /**
   * Enforce a newline after import statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L153 (airbnb-base)
   */
  'import-x/newline-after-import': 'error',

  /**
   * Forbid anonymous values as default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-anonymous-default-export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L203-L210 (airbnb-base)
   */
  'import-x/no-anonymous-default-export': 'off',

  /**
   * Forbid default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-default-export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L225 (airbnb-base)
   */
  'import-x/no-default-export': 'off',

  /**
   * Forbid repeated import of the same module in multiple places.
   * @description Replaced by [`no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports). Note that it's `'off'`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L131 (airbnb-base)
   */
  'import-x/no-duplicates': 'off',

  /**
   * Forbid named default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-default.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L199 (airbnb-base)
   */
  'import-x/no-named-default': 'error',

  /**
   * Forbid named exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L229 (airbnb-base)
   */
  'import-x/no-named-export': 'off',

  /**
   * Forbid namespace (a.k.a. "wildcard" `*`) imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-namespace.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L136 (airbnb-base)
   */
  'import-x/no-namespace': 'off',

  /**
   * Forbid unassigned imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unassigned-import.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L195 (airbnb-base)
   */
  'import-x/no-unassigned-import': 'off',

  /**
   * Enforce a convention in module import order.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L149 (airbnb-base)
   */
  'import-x/order': ['error', { groups: [['builtin', 'external', 'internal']] }],

  /**
   * Prefer a default export if module exports a single name or multiple names.
   * @description I've set this rule to `'off'` because I don't want to enforce default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-default-export.md (import-x)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L157 (airbnb-base)
   */
  'import-x/prefer-default-export': 'off',

  // #endregion Style Guide
  // ------------------------------------------------------------------------------
} as const satisfies Linter.RulesRecord;
