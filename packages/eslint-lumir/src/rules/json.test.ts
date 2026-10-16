/**
 * @fileoverview Test for `json.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { jsonPlugin, jsonRules } from './json.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'json/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('json', () => {
  describe('Exports', () => {
    it('`jsonPlugin` should be defined', () => {
      assert.ok(jsonPlugin);
      assert.strictEqual(typeof jsonPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('json.ts', () => {
      Object.keys(jsonRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
