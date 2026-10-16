/**
 * @fileoverview Test for `import.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { importPlugin, importRules } from './import.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'import-x/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('import', () => {
  describe('Exports', () => {
    it('`importPlugin` should be defined', () => {
      assert.ok(importPlugin);
      assert.strictEqual(typeof importPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('import.ts', () => {
      Object.keys(importRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
