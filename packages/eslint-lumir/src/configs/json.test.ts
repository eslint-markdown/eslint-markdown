/**
 * @fileoverview Test for `json.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import json from './json.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('json', () => {
  describe('ESLint integration', () => {
    it('should lint JSON with the json configuration', () => {
      const messages = new Linter().verify('{"name": 1, "name": 2}', [json], {
        filename: 'example.json',
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'json/no-duplicate-keys');
    });
  });
});
