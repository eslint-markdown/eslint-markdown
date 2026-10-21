/**
 * @fileoverview Configuration applied when a user configuration extends from `json5`.
 *
 * - Values not explicitly defined on the object will use their default values.
 * - Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import { json5 } from '../files.js';
import { jsonPlugin, jsonRules } from '../rules/json.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/json5',
  files: [...json5],
  language: 'json/json5',
  plugins: {
    ...jsonPlugin,
  },
  rules: {
    ...jsonRules,
  },
} as const satisfies Linter.Config;
