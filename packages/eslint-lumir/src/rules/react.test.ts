/**
 * @fileoverview Test for `react.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { reactPlugin, reactRules } from './react.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'react/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('react', () => {
  describe('Exports', () => {
    it('`reactPlugin` should be defined', () => {
      assert.ok(reactPlugin);
      assert.strictEqual(typeof reactPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('react.ts', () => {
      Object.keys(reactRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
