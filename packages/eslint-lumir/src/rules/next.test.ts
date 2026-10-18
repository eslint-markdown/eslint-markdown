/**
 * @fileoverview Test for `next.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { nextPlugin, nextRules } from './next.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'next/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('next', () => {
  it('should lint JSX with the configured Next.js rules', () => {
    const messages = new Linter().verify(
      'const element = <img src="/example.png" alt="Example" />;',
      {
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        plugins: nextPlugin,
        rules: nextRules,
      },
    );

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'next/no-img-element');
  });

  it('should not configure any Next.js rule with warning severity', () => {
    Object.entries(nextRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`nextPlugin` should be defined', () => {
    assert.ok(nextPlugin);
    assert.strictEqual(typeof nextPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(nextRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
