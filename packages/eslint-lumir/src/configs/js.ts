/**
 * @fileoverview Configuration applied when a user configuration extends from `js`.
 *
 * - Values not explicitly defined on the object will use their default values.
 * - Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import { js } from '../files.js';
import { globals } from '../language-options.js';
import { node } from '../settings.js';
import { eslintRules } from '../rules/eslint.js';
import { importPlugin, importRules } from '../rules/import.js';
import { nodePlugin, nodeRules } from '../rules/node.js';
import { stylisticPlugin, stylisticRules } from '../rules/stylistic.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/js',
  files: [...js],
  languageOptions: {
    globals,
  },
  plugins: {
    ...importPlugin,
    ...nodePlugin,
    ...stylisticPlugin,
  },
  rules: {
    ...eslintRules,
    ...importRules,
    ...nodeRules,
    ...stylisticRules,
  },
  settings: {
    node,
  },
} as const satisfies Linter.Config;
