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

const prefix = 'style/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('stylistic', () => {
  it('should lint comments with the configured stylistic rules', () => {
    const messages = new Linter().verify('//comment\n', {
      plugins: stylisticPlugin,
      rules: stylisticRules,
    });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'style/spaced-comment');
  });

  it('should not configure any stylistic rule with warning severity', () => {
    Object.entries(stylisticRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`stylisticPlugin` should be defined', () => {
    assert.ok(stylisticPlugin);
    assert.strictEqual(typeof stylisticPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(stylisticRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
