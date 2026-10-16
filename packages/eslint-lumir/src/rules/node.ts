/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed `eslint-plugin-n`.
 *   - @see https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#-rules
 *
 * - The best practices outlined in `eslint-config-airbnb-base@19.0.4`.
 *   - @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import nodePluginModule from 'eslint-plugin-n';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const nodePlugin: { n: ESLint.Plugin } = { n: nodePluginModule };

export const nodeRules = {
  /**
   * Require `return` statements after callbacks.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/callback-return.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L8 (airbnb-base)
   */
  'n/callback-return': 'off',

  /**
   * Enforce either `module.exports` or `exports`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/exports-style.md (n)
   */
  'n/exports-style': 'off',

  /**
   * Enforce the style of file extensions in import declarations.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/file-extension-in-import.md (n)
   */
  'n/file-extension-in-import': 'off',

  /**
   * Require `require()` calls to be placed at top-level module scope.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/global-require.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L12 (airbnb-base)
   */
  'n/global-require': 'error',

  /**
   * Require error handling in callbacks.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/handle-callback-err.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L15 (airbnb-base)
   */
  'n/handle-callback-err': 'off',

  /**
   * Require correct usage of hashbang.
   * @description This rule is not included in `airbnb-base`. This rule makes false positive to the files in `src` directory which is built into the `build` directory.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/hashbang.md (n)
   */
  'n/hashbang': 'off',

  /**
   * Enforce Node.js-style error-first callback pattern is followed.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-callback-literal.md (n)
   */
  'n/no-callback-literal': 'off',

  /**
   * Disallow deprecated APIs.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-deprecated-api.md (n)
   */
  'n/no-deprecated-api': 'error',

  /**
   * Disallow the assignment to `exports`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-exports-assign.md (n)
   */
  'n/no-exports-assign': 'error',

  /**
   * Disallow `import` declarations which import extraneous modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-import.md (n)
   */
  'n/no-extraneous-import': 'error',

  /**
   * Disallow `require()` expressions which import extraneous modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-require.md (n)
   */
  'n/no-extraneous-require': 'error',

  /**
   * Disallow `import` declarations which import non-existence modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md (n)
   */
  'n/no-missing-import': [
    'error',
    {
      ignoreTypeImport: true,
    },
  ],

  /**
   * Disallow `require()` expressions which import non-existence modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-require.md (n)
   */
  'n/no-missing-require': 'error',

  /**
   * Disallow `require` calls to be mixed with regular variable declarations.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-mixed-requires.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L22 (airbnb-base)
   */
  'n/no-mixed-requires': 'off',

  /**
   * Disallow `new` operators with calls to `require`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-new-require.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L25 (airbnb-base)
   */
  'n/no-new-require': 'error',

  /**
   * Disallow string concatenation with `__dirname` and `__filename`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-path-concat.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L29 (airbnb-base)
   */
  'n/no-path-concat': 'error',

  /**
   * Disallow the use of `process.env`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L32 (airbnb-base)
   */
  'n/no-process-env': 'off',

  /**
   * Disallow the use of `process.exit()`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-exit.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L35 (airbnb-base)
   */
  'n/no-process-exit': 'off',

  /**
   * Disallow specified modules when loaded by `import` declarations.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-import.md (n)
   */
  'n/no-restricted-import': 'off',

  /**
   * Disallow specified modules when loaded by `require`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-require.md (n)
   */
  'n/no-restricted-require': 'off',

  /**
   * Disallow synchronous methods.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-sync.md (n)
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/node.js#L41 (airbnb-base)
   */
  'n/no-sync': 'off',

  /**
   * Disallow `bin` files that npm ignores.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-bin.md (n)
   */
  'n/no-unpublished-bin': 'error',

  /**
   * Disallow `import` declarations which import private modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-import.md (n)
   */
  'n/no-unpublished-import': 'error',

  /**
   * Disallow `require()` expressions which import private modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-require.md (n)
   */
  'n/no-unpublished-require': 'error',

  /**
   * Disallow unsupported ECMAScript built-ins on the specified version.
   * @description This rule is not included in `airbnb-base`. This rule does not include latest ECMAScript built-ins.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-builtins.md (n)
   */
  'n/no-unsupported-features/es-builtins': 'off',

  /**
   * Disallow unsupported ECMAScript syntax on the specified version.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-syntax.md (n)
   */
  'n/no-unsupported-features/es-syntax': 'off',

  /**
   * Disallow unsupported Node.js built-in APIs on the specified version.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/node-builtins.md (n)
   */
  'n/no-unsupported-features/node-builtins': 'off',

  /**
   * Enforce either `Buffer` or `require("buffer").Buffer`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/buffer.md (n)
   */
  'n/prefer-global/buffer': 'off',

  /**
   * Enforce either `console` or `require("console")`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/console.md (n)
   */
  'n/prefer-global/console': 'off',

  /**
   * Enforce either `process` or `require("process")`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/process.md (n)
   */
  'n/prefer-global/process': 'off',

  /**
   * Enforce either `TextDecoder` or `require("util").TextDecoder`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-decoder.md (n)
   */
  'n/prefer-global/text-decoder': ['error', 'always'],

  /**
   * Enforce either `TextEncoder` or `require("util").TextEncoder`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-encoder.md (n)
   */
  'n/prefer-global/text-encoder': ['error', 'always'],

  /**
   * Enforce either `URL` or `require("url").URL`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url.md (n)
   */
  'n/prefer-global/url': ['error', 'always'],

  /**
   * Enforce either `URLSearchParams` or `require("url").URLSearchParams`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url-search-params.md (n)
   */
  'n/prefer-global/url-search-params': ['error', 'always'],

  /**
   * Enforce using the `node:` protocol when importing Node.js builtin modules.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-node-protocol.md (n)
   */
  'n/prefer-node-protocol': 'error',

  /**
   * Enforce `require("dns").promises`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/dns.md (n)
   */
  'n/prefer-promises/dns': 'off',

  /**
   * Enforce `require("fs").promises`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/fs.md (n)
   */
  'n/prefer-promises/fs': 'off',

  /**
   * Require that `process.exit()` expressions use the same code path as `throw`.
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/process-exit-as-throw.md (n)
   */
  'n/process-exit-as-throw': 'error',
} as const satisfies Linter.RulesRecord;
