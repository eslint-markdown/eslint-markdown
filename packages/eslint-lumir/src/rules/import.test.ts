/**
 * @fileoverview Test for `import.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { importPlugin, importRules } from './import.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'import/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('import', () => {
  it('should lint exports with the configured import rules', () => {
    const messages = new Linter().verify(
      'export let first = 1; export const second = 2;',
      {
        plugins: importPlugin,
        rules: importRules,
      },
    );

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'import/no-mutable-exports');
  });

  it('should not configure any import rule with warning severity', () => {
    Object.entries(importRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`importPlugin` should be defined', () => {
    assert.ok(importPlugin);
    assert.strictEqual(typeof importPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(importRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
