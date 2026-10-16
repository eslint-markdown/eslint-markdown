/**
 * @fileoverview Test for `react-hooks.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { reactHooksPlugin, reactHooksRules } from './react-hooks.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'react-hooks/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('react-hooks', () => {
  describe('Exports', () => {
    it('`reactHooksPlugin` should be defined', () => {
      assert.ok(reactHooksPlugin);
      assert.strictEqual(typeof reactHooksPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('react-hooks.ts', () => {
      Object.keys(reactHooksRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
