/**
 * @fileoverview Test for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';

import js from 'eslint-lumir/js';
import ts from 'eslint-lumir/ts';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import md from 'eslint-lumir/md';
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

    it('should have a `jsx` subpath export', () => {
      assert.ok(jsx);
    });

    it('should have a `tsx` subpath export', () => {
      assert.ok(tsx);
    });

    it('should have a `next` subpath export', () => {
      assert.ok(next);
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

    it('should have a `md` subpath export', () => {
      assert.ok(md);
    });
  });
});
