/**
 * @fileoverview Configuration applied when a user configuration extends from `jsonc`.
 *
 * - Values not explicitly defined on the object will use their default values.
 * - Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import { jsonc } from '../files.js';
import { jsonPlugin, jsonRules } from '../rules/json.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/jsonc',
  files: [...jsonc],
  language: 'json/jsonc',
  languageOptions: {
    allowTrailingCommas: true,
  },
  plugins: {
    ...jsonPlugin,
  },
  rules: {
    ...jsonRules,
  },
} as const satisfies Linter.Config;
