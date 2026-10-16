/**
 * @fileoverview Test for `node.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { nodePlugin, nodeRules } from './node.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'n/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('node', () => {
  describe('Exports', () => {
    it('`nodePlugin` should be defined', () => {
      assert.ok(nodePlugin);
      assert.strictEqual(typeof nodePlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('node.ts', () => {
      Object.keys(nodeRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
