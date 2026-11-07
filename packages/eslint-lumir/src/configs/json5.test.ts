/**
 * @fileoverview Test for `json5.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import json5 from './json5.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('json5', () => {
  describe('ESLint integration', () => {
    it('should lint JSON5 with the json5 configuration', () => {
      const messages = new Linter().verify("{name: 'first', name: 'second',}", [json5], {
        filename: 'example.json5',
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'json/no-duplicate-keys');
    });
  });
});
