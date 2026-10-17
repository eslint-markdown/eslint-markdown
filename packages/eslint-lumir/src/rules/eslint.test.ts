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
  describe('ESLint integration', () => {
    it('should lint JavaScript with the configured ESLint rules', () => {
      const messages = new Linter().verify('debugger;', { rules: eslintRules });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'no-debugger');
    });
  });

  describe(`All key values must not include \`${prefix}\`.`, () => {
    it('eslint.ts', () => {
      Object.keys(eslintRules).forEach(key => {
        assert.strictEqual(key.includes(prefix), false);
      });
    });
  });
});
