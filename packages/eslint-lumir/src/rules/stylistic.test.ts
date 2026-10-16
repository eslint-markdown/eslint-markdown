/**
 * @fileoverview Test for `stylistic.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { stylisticPlugin, stylisticRules } from './stylistic.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = '@stylistic/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('stylistic', () => {
  describe('Exports', () => {
    it('`stylisticPlugin` should be defined', () => {
      assert.ok(stylisticPlugin);
      assert.strictEqual(typeof stylisticPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('stylistic.ts', () => {
      Object.keys(stylisticRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
