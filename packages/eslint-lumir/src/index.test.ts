/**
 * @fileoverview Test for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';

import js from 'eslint-lumir/js';
import ts from 'eslint-lumir/ts';
import jsxReact from 'eslint-lumir/jsx-react';
import jsxNext from 'eslint-lumir/jsx-next';
import tsxReact from 'eslint-lumir/tsx-react';
import tsxNext from 'eslint-lumir/tsx-next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import packageJson from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('package.json', () => {
    it('should have `sideEffects: false`', () => {
      assert.strictEqual(packageJson.sideEffects, false);
    });

    it('should not have `typesVersions` keys that start with `./`', () => {
      const typesVersionKeys = Object.keys(packageJson.typesVersions['*']);

      assert.strictEqual(typesVersionKeys.filter(key => key.startsWith('./')).length, 0);
    });
  });

  describe('subpath exports', () => {
    it('should have a `js` subpath export', () => {
      assert.ok(js);
    });

    it('should have a `ts` subpath export', () => {
      assert.ok(ts);
    });

    it('should have a `jsx-react` subpath export', () => {
      assert.ok(jsxReact);
    });

    it('should have a `jsx-next` subpath export', () => {
      assert.ok(jsxNext);
    });

    it('should have a `tsx-react` subpath export', () => {
      assert.ok(tsxReact);
    });

    it('should have a `tsx-next` subpath export', () => {
      assert.ok(tsxNext);
    });

    it('should have a `json` subpath export', () => {
      assert.ok(json);
    });

    it('should have a `jsonc` subpath export', () => {
      assert.ok(jsonc);
    });

    it('should have a `json5` subpath export', () => {
      assert.ok(json5);
    });
  });
});
