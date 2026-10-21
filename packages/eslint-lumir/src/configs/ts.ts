/**
 * @fileoverview Configuration applied when a user configuration extends from `ts`.
 *
 * - Values not explicitly defined on the object will use their default values.
 * - Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.
 *
 * @see https://eslint.org/docs/latest/use/configure/parser#configure-a-custom-parser
 * @see https://eslint.org/docs/latest/use/command-line-interface#--parser
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import parser from '@typescript-eslint/parser';
import { ts } from '../files.js';
import { globals } from '../language-options.js';
import { node } from '../settings.js';
import { eslintRules } from '../rules/eslint.js';
import { importPlugin, importRules } from '../rules/import.js';
import { nodePlugin, nodeRules } from '../rules/node.js';
import { stylisticPlugin, stylisticRules } from '../rules/stylistic.js';
import { typescriptPlugin, typescriptRules } from '../rules/typescript.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/ts',
  files: [...ts],
  languageOptions: {
    globals,
    parser,
  },
  plugins: {
    ...importPlugin,
    ...nodePlugin,
    ...stylisticPlugin,
    ...typescriptPlugin,
  },
  rules: {
    ...eslintRules,
    ...importRules,
    ...nodeRules,
    ...stylisticRules,
    ...typescriptRules,
  },
  settings: {
    node,
  },
} as const satisfies Linter.Config;
