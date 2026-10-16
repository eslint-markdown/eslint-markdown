/**
 * @fileoverview Test for `jsx-a11y.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { jsxA11yPlugin, jsxA11yRules } from './jsx-a11y.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'jsx-a11y/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('jsx-a11y', () => {
  describe('Exports', () => {
    it('`jsxA11yPlugin` should be defined', () => {
      assert.ok(jsxA11yPlugin);
      assert.strictEqual(typeof jsxA11yPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('jsx-a11y.ts', () => {
      Object.keys(jsxA11yRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
