/**
 * @fileoverview Test for `ts.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import ts from './ts.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('ts', () => {
  describe('ESLint integration', () => {
    it('should lint TypeScript with the ts configuration', () => {
      const messages = new Linter().verify(
        'const value: any = 1; export default value;',
        [ts],
        {
          filename: 'example.ts',
        },
      );

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'typescript/no-explicit-any');
    });
  });
});
