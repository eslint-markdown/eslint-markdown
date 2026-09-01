/**
 * @fileoverview Test for `consistent-ordered-list-style.ts`.
 * @author Ga eun Lee
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-ordered-list-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-ordered-list-style', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'All ordered list item prefixes are `1`',
      code: '1. First\n1. Second\n1. Third',
    },
    {
      name: 'Ordered list item prefixes increase sequentially',
      code: '1. First\n2. Second\n3. Third',
    },
    {
      name: 'Ordered list item prefixes increase sequentially from `0`',
      code: '0. First\n1. Second\n2. Third',
    },
  ],

  invalid: [
    {
      name: 'Ordered list item prefixes do not increase sequentially',
      code: '1. First\n3. Second\n4. Third',
      errors: [
        {
          messageId: 'prefix',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 2, actual: 3 },
        },
        {
          messageId: 'prefix',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 3, actual: 4 },
        },
      ],
    },
  ],
});
