/**
 * @fileoverview Test for `md.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import md from './md.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('md', () => {
  describe('ESLint integration', () => {
    it('should lint Markdown with the md configuration', () => {
      const messages = new Linter().verify('Text  here.\n', [md], {
        filename: 'example.md',
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'md/no-double-space');
    });
  });
});
