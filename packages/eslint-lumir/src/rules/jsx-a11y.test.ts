/**
 * @fileoverview Test for `jsx-a11y.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { jsxA11yPlugin, jsxA11yRules } from './jsx-a11y.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'jsx-a11y-x/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('jsx-a11y-x', () => {
  it('should lint JSX with the configured accessibility rules', () => {
    const messages = new Linter().verify('const element = <img src="example.png" />;', {
      languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
      plugins: jsxA11yPlugin,
      rules: jsxA11yRules,
    });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'jsx-a11y-x/alt-text');
  });

  it('should not configure any accessibility rule with warning severity', () => {
    Object.entries(jsxA11yRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`jsxA11yPlugin` should be defined', () => {
    assert.ok(jsxA11yPlugin);
    assert.strictEqual(typeof jsxA11yPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(jsxA11yRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
