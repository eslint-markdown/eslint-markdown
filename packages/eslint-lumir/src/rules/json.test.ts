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
  it('should lint JSON with the configured JSON rules', () => {
    const messages = new Linter().verify('{"name": 1, "name": 2}', {
      language: 'json/json',
      plugins: jsonPlugin,
      rules: jsonRules,
    });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'json/no-duplicate-keys');
  });

  it('should not configure any JSON rule with warning severity', () => {
    Object.entries(jsonRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`jsonPlugin` should be defined', () => {
    assert.ok(jsonPlugin);
    assert.strictEqual(typeof jsonPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(jsonRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
