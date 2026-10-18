/**
 * @fileoverview Test for `react-hooks.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { reactHooksPlugin, reactHooksRules } from './react-hooks.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'react-hooks/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('react-hooks', () => {
  it('should lint hook calls with the configured React Hooks rules', () => {
    const messages = new Linter().verify('useState();', {
      plugins: reactHooksPlugin,
      rules: reactHooksRules,
    });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'react-hooks/rules-of-hooks');
  });

  it('should not configure any React Hooks rule with warning severity', () => {
    Object.entries(reactHooksRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`reactHooksPlugin` should be defined', () => {
    assert.ok(reactHooksPlugin);
    assert.strictEqual(typeof reactHooksPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(reactHooksRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
