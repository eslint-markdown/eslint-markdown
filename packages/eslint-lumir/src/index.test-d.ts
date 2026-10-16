/**
 * @fileoverview Type test for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import config from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region config

config.configs.js.name satisfies 'lumir/js';
config.configs.ts.name satisfies 'lumir/ts';
config.configs.jsxReact.name satisfies 'lumir/jsx-react';
config.configs.jsxNext.name satisfies 'lumir/jsx-next';
config.configs.tsxReact.name satisfies 'lumir/tsx-react';
config.configs.tsxNext.name satisfies 'lumir/tsx-next';
config.configs.json.name satisfies 'lumir/json';
config.configs.jsonc.name satisfies 'lumir/jsonc';
config.configs.json5.name satisfies 'lumir/json5';

// #endregion config
// --------------------------------------------------------------------------------
