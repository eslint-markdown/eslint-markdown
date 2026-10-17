/**
 * @fileoverview Test for `json.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { jsonPlugin, jsonRules } from './json.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'json/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('json', () => {
  describe('ESLint integration', () => {
    it('should lint JSON with the configured JSON rules', () => {
      const messages = new Linter().verify('{"name": 1, "name": 2}', {
        language: 'json/json',
        plugins: jsonPlugin,
        rules: jsonRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'json/no-duplicate-keys');
    });
  });

  describe('Exports', () => {
    it('`jsonPlugin` should be defined', () => {
      assert.ok(jsonPlugin);
      assert.strictEqual(typeof jsonPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('json.ts', () => {
      Object.keys(jsonRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
