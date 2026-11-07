/**
 * @fileoverview Test for `eslint.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { eslintRules } from './eslint.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = '/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('eslint', () => {
  it('should lint JavaScript with the configured ESLint rules', () => {
    const messages = new Linter().verify('debugger;', { rules: eslintRules });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'no-debugger');
  });

  it('should not configure any ESLint rule with warning severity', () => {
    Object.entries(eslintRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it(`all key values must not include \`${prefix}\`.`, () => {
    Object.keys(eslintRules).forEach(key => {
      assert.strictEqual(key.includes(prefix), false);
    });
  });
});
