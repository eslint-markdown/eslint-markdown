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
  describe('ESLint integration', () => {
    it('should lint hook calls with the configured React Hooks rules', () => {
      const messages = new Linter().verify('useState();', {
        plugins: reactHooksPlugin,
        rules: reactHooksRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'react-hooks/rules-of-hooks');
    });
  });

  describe('Exports', () => {
    it('`reactHooksPlugin` should be defined', () => {
      assert.ok(reactHooksPlugin);
      assert.strictEqual(typeof reactHooksPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('react-hooks.ts', () => {
      Object.keys(reactHooksRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
