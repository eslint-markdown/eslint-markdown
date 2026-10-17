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

const prefix = '@next/next/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('next', () => {
  describe('ESLint integration', () => {
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
      assert.strictEqual(messages[0].ruleId, '@next/next/no-img-element');
    });
  });

  describe('Exports', () => {
    it('`nextPlugin` should be defined', () => {
      assert.ok(nextPlugin);
      assert.strictEqual(typeof nextPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('next.ts', () => {
      Object.keys(nextRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
