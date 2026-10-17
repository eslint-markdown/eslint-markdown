/**
 * @fileoverview Test for `stylistic.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { stylisticPlugin, stylisticRules } from './stylistic.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = '@stylistic/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('stylistic', () => {
  describe('ESLint integration', () => {
    it('should lint comments with the configured stylistic rules', () => {
      const messages = new Linter().verify('//comment\n', {
        plugins: stylisticPlugin,
        rules: stylisticRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, '@stylistic/spaced-comment');
    });
  });

  describe('Exports', () => {
    it('`stylisticPlugin` should be defined', () => {
      assert.ok(stylisticPlugin);
      assert.strictEqual(typeof stylisticPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('stylistic.ts', () => {
      Object.keys(stylisticRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
