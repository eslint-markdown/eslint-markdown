/**
 * @fileoverview Test for `jsx.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import jsx from './jsx.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('jsx', () => {
  describe('ESLint integration', () => {
    it('should lint JSX with the jsx configuration', () => {
      const messages = new Linter().verify(
        'export default function App() { return <button>Save</button>; }',
        [jsx],
        { filename: 'example.jsx' },
      );

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'react-x/dom-no-missing-button-type');
    });
  });
});
