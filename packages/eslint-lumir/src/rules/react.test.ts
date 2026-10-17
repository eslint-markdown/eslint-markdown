/**
 * @fileoverview Test for `react.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { reactPlugin, reactRules } from './react.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'react-x/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('react-x', () => {
  describe('ESLint integration', () => {
    it('should lint JSX with the configured React rules', () => {
      const messages = new Linter().verify('const element = <button />;', {
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        plugins: reactPlugin,
        rules: reactRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'react-x/dom-no-missing-button-type');
    });
  });

  describe('Exports', () => {
    it('`reactPlugin` should be defined', () => {
      assert.ok(reactPlugin);
      assert.strictEqual(typeof reactPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('react.ts', () => {
      Object.keys(reactRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
