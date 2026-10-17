/**
 * @fileoverview Test for `typescript.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import parser from '@typescript-eslint/parser';
import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { typescriptPlugin, typescriptRules } from './typescript.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = '@typescript-eslint/';
const eslintKeys = Object.keys(typescriptRules).filter(
  (key): key is keyof typeof typescriptRules => !key.includes('/'),
);
const typescriptKeys = Object.keys(typescriptRules).filter(key => key.includes('/'));

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('typescript', () => {
  describe('ESLint integration', () => {
    it('should lint TypeScript with the configured TypeScript rules', () => {
      const messages = new Linter().verify('export const value: any = 1;', {
        languageOptions: { parser },
        plugins: typescriptPlugin,
        rules: typescriptRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, '@typescript-eslint/no-explicit-any');
    });
  });

  describe('Exports', () => {
    it('`typescriptPlugin` should be defined', () => {
      assert.ok(typescriptPlugin);
      assert.strictEqual(typeof typescriptPlugin, 'object');
    });
  });

  it('The rules of ESLint and TypeScript must correspond one-to-one in the extension rules', () => {
    for (const eslintKey of eslintKeys) {
      assert.ok(Object.hasOwn(typescriptRules, `${prefix}${eslintKey}`));
    }
  });

  it('The rules of ESLint should be set to "off" in the extension rules', () => {
    for (const eslintKey of eslintKeys) {
      assert.strictEqual(typescriptRules[eslintKey], 'off');
    }
  });

  it('The rules of TypeScript should have `@typescript-eslint/` prefix', () => {
    for (const typescriptKey of typescriptKeys) {
      assert.ok(typescriptKey.startsWith(prefix));
    }
  });
});
