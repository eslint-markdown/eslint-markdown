/**
 * @fileoverview Test for `js.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import js from './js.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('js', () => {
  describe('ESLint integration', () => {
    it('should lint JavaScript with the js configuration', () => {
      const messages = new Linter().verify('debugger;', [js], { filename: 'example.js' });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'no-debugger');
    });
  });
});
