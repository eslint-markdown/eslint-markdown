/**
 * @fileoverview Type test for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import js from 'eslint-lumir/js';
import ts from 'eslint-lumir/ts';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import md from 'eslint-lumir/md';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region config

js.name satisfies 'lumir/js';
ts.name satisfies 'lumir/ts';
jsx.name satisfies 'lumir/jsx';
tsx.name satisfies 'lumir/tsx';
next.name satisfies 'lumir/next';
json.name satisfies 'lumir/json';
jsonc.name satisfies 'lumir/jsonc';
json5.name satisfies 'lumir/json5';
md.name satisfies 'lumir/md';

// #endregion config
// --------------------------------------------------------------------------------
