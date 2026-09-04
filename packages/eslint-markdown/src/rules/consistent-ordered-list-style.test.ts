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
      name: '`one_or_ordered` style - single item',
      code: '1. First',
    },
    {
      name: '`one_or_ordered` style - all prefixes are `1`',
      code: '1. First\n1. Second\n1. Third',
    },
    {
      name: '`one_or_ordered` style - prefixes increase from `1`',
      code: '1. First\n2. Second\n3. Third',
    },
    {
      name: '`one_or_ordered` style - prefixes increase from `0`',
      code: '0. First\n1. Second\n2. Third',
    },
    {
      name: '`one` style - single item',
      code: '1. First',
      options: [{ style: 'one' }],
    },
    {
      name: '`one` style - all prefixes are `1`',
      code: '1. First\n1. Second\n1. Third',
      options: [{ style: 'one' }],
    },
    {
      name: '`ordered` style - single item',
      code: '1. First',
      options: [{ style: 'ordered' }],
    },
    {
      name: '`ordered` style - prefixes increase from `1`',
      code: '1. First\n2. Second\n3. Third',
      options: [{ style: 'ordered' }],
    },
    {
      name: '`ordered` style - prefixes increase from `0`',
      code: '0. First\n1. Second\n2. Third',
      options: [{ style: 'ordered' }],
    },
    {
      name: '`zero` style - single item',
      code: '0. First',
      options: [{ style: 'zero' }],
    },
    {
      name: '`zero` style - all prefixes are `0`',
      code: '0. First\n0. Second\n0. Third',
      options: [{ style: 'zero' }],
    },
    {
      name: 'Parenthesis delimiters',
      code: '1) First\n1) Second\n1) Third',
    },
    {
      name: 'Prefixes with leading zeros',
      code: '00. First\n01. Second\n02. Third',
    },
    {
      name: 'Nested ordered lists use independent prefix sequences',
      code: '1. Outer first\n   1. Nested first\n   2. Nested second\n1. Outer second',
    },
    {
      name: 'Ordered list in a blockquote',
      code: '> 1. First\n> 1. Second',
    },
    {
      name: 'Separate ordered lists use independent prefix sequences',
      code: '1. First\n2. Second\n\nParagraph\n\n1. First\n1. Second',
    },
    {
      name: 'Unordered lists are ignored',
      code: '- First\n- Second\n\n1. First\n1. Second',
    },
  ],

  invalid: [
    {
      name: '`one_or_ordered` style - single item does not start with `1`',
      code: '2. First',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one_or_ordered` style - prefixes do not increase sequentially',
      code: '1. First\n3. Second\n4. Third',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 2, actual: 3 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 3, actual: 4 },
        },
      ],
    },
    {
      name: '`one_or_ordered` style - prefixes do not remain `1`',
      code: '1. First\n1. Second\n2. Third',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one` style - single item does not start with `1`',
      code: '2. First',
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one` style - prefixes are not all `1`',
      code: '1. First\n2. Second\n3. Third',
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 1, actual: 3 },
        },
      ],
    },
    {
      name: '`ordered` style - single item does not start with `1`',
      code: '0. First',
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 0 },
        },
      ],
    },
    {
      name: '`ordered` style - prefixes do not increase',
      code: '1. First\n1. Second\n1. Third',
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 2, actual: 1 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 3, actual: 1 },
        },
      ],
    },
    {
      name: '`zero` style - single item does not start with `0`',
      code: '1. First',
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 0, actual: 1 },
        },
      ],
    },
    {
      name: '`zero` style - prefixes are not all `0`',
      code: '0. First\n1. Second\n2. Third',
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 0, actual: 1 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 0, actual: 2 },
        },
      ],
    },
    {
      name: 'Nested ordered lists report their own prefix sequence',
      code: '1. Outer first\n   1. Nested first\n   3. Nested second\n1. Outer second',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { expected: 2, actual: 3 },
        },
      ],
    },
    {
      name: 'Ordered lists in blockquotes report the prefix location',
      code: '> 1. First\n> 3. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: { expected: 2, actual: 3 },
        },
      ],
    },
    {
      name: 'Multi-digit prefixes report the entire number',
      code: '1. First\n10. Second',
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { expected: 1, actual: 10 },
        },
      ],
    },
  ],
});
