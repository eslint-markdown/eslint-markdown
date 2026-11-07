/**
 * @fileoverview Configuration applied when a user configuration extends from `json`.
 *
 * - Values not explicitly defined on the object will use their default values.
 * - Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import { json } from '../files.js';
import { json as jsonIgnores } from '../ignores.js';
import { jsonPlugin, jsonRules } from '../rules/json.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/json',
  files: [...json],
  ignores: [...jsonIgnores],
  language: 'json/json',
  plugins: {
    ...jsonPlugin,
  },
  rules: {
    ...jsonRules,
  },
} as const satisfies Linter.Config;
