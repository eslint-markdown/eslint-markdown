/**
 * @fileoverview Test for `jsonc.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import jsonc from './jsonc.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('jsonc', () => {
  describe('ESLint integration', () => {
    it('should lint JSON with comments and trailing commas using the jsonc configuration', () => {
      const messages = new Linter().verify(
        '// Example\n{"name": 1, "name": 2,}',
        [jsonc],
        {
          filename: 'example.jsonc',
        },
      );

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'json/no-duplicate-keys');
    });
  });
});
