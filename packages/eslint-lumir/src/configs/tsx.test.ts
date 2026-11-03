/**
 * @fileoverview Test for `tsx.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import tsx from './tsx.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('tsx', () => {
  describe('ESLint integration', () => {
    it('should lint TSX with the tsx configuration', () => {
      const messages = new Linter().verify(
        'export default function App({ label }: { label: string }) { return <button>{label}</button>; }',
        [tsx],
        { filename: 'example.tsx' },
      );

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'react-x/dom-no-missing-button-type');
    });
  });
});
