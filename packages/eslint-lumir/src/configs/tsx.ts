/**
 * @fileoverview Configuration applied when a user configuration extends from `tsx`.
 *
 * - Values not explicitly defined on the object will use their default values.
 * - Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';
import parser from '@typescript-eslint/parser';
import { ts, tsx } from '../files.js';
import { globals, parserOptions } from '../language-options.js';
import { node, react } from '../settings.js';
import { eslintRules } from '../rules/eslint.js';
import { importPlugin, importRules } from '../rules/import.js';
import { nodePlugin, nodeRules } from '../rules/node.js';
import { stylisticPlugin, stylisticRules } from '../rules/stylistic.js';
import { jsxA11yPlugin, jsxA11yRules } from '../rules/jsx-a11y.js';
import { reactPlugin, reactRules } from '../rules/react.js';
import { reactHooksPlugin, reactHooksRules } from '../rules/react-hooks.js';
import { typescriptPlugin, typescriptRules } from '../rules/typescript.js';

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

export default {
  name: 'lumir/tsx',
  files: [...ts, ...tsx],
  languageOptions: {
    globals,
    parser,
    parserOptions,
  },
  plugins: {
    ...importPlugin,
    ...nodePlugin,
    ...stylisticPlugin,
    ...jsxA11yPlugin,
    ...reactPlugin,
    ...reactHooksPlugin,
    ...typescriptPlugin,
  },
  rules: {
    ...eslintRules,
    ...importRules,
    ...nodeRules,
    ...stylisticRules,
    ...jsxA11yRules,
    ...reactRules,
    ...reactHooksRules,
    ...typescriptRules,
  },
  settings: {
    node,
    'react-x': react,
  },
} as const satisfies Linter.Config;
