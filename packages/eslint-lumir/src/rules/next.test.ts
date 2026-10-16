/**
 * @fileoverview Test for `next.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { nextPlugin, nextRules } from './next.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = '@next/next/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('next', () => {
  describe('Exports', () => {
    it('`nextPlugin` should be defined', () => {
      assert.ok(nextPlugin);
      assert.strictEqual(typeof nextPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('next.ts', () => {
      Object.keys(nextRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
