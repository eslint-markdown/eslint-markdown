/**
 * @fileoverview Test for `consistent-list-indentation.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-list-indentation.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-list-indentation', rule, {
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
      name: 'Consistently indented unordered list',
      code: '* item 1\n* item 2\n* item 3',
    },
    {
      name: 'Consistently indented nested unordered list',
      code: '- item 1\n  - nested 1\n  - nested 2\n- item 2',
    },
    {
      name: 'Nested list items aligned with their siblings',
      code: '* Item 1\n  * Nested item 1\n  * Nested item 2\n  * Nested item 3',
    },
    {
      name: 'Unordered list with mixed marker characters but consistent indentation',
      code: '- item 1\n* item 2\n+ item 3',
    },
    {
      name: 'Left-aligned ordered list',
      code: '1. item 1\n2. item 2\n3. item 3',
    },
    {
      name: 'Left-aligned ordered list with consistent marker widths',
      code: '9. item 1\n10. item 2\n11. item 3',
    },
    {
      name: 'Right-aligned ordered list',
      code: ' 1. a\n 2. b\n 3. c\n 4. d\n 5. e\n 6. f\n 7. g\n 8. h\n 9. i\n10. j\n11. k',
    },
    {
      name: 'Ordered list using the `)` delimiter',
      code: '1) item 1\n2) item 2',
    },
    {
      name: 'Mixed ordered and unordered lists with consistent indentation',
      code: '- item 1\n- item 2\n\n1. ordered 1\n2. ordered 2',
    },
    {
      name: 'Consistently indented task list',
      code: '- [ ] task 1\n- [x] task 2',
      language: 'markdown/gfm',
    },
    {
      name: 'Consistently indented list inside a block quote',
      code: '> * item 1\n>   * nested item',
    },
  ],

  invalid: [
    {
      name: 'Nested list item that is not aligned with its siblings',
      code: '* Item 1\n  * Nested item 1\n  * Nested item 2\n   * Misaligned item',
      output: '* Item 1\n  * Nested item 1\n  * Nested item 2\n  * Misaligned item',
      errors: [
        {
          messageId: 'indentation',
          line: 4,
          column: 4,
          endLine: 4,
          endColumn: 5,
          data: { expected: 2, actual: 3 },
        },
      ],
    },
    {
      name: 'Unordered list item that is over-indented',
      code: '* Alpha\n * Bravo',
      output: '* Alpha\n* Bravo',
      errors: [
        {
          messageId: 'indentation',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
          data: { expected: 0, actual: 1 },
        },
      ],
    },
    {
      name: 'Unordered list item that is under-indented',
      code: '  * a\n* b',
      output: '  * a\n  * b',
      errors: [
        {
          messageId: 'indentation',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 2, actual: 0 },
        },
      ],
    },
    {
      name: 'Nested list item that dedents to a shallower indentation than its siblings',
      code: '* a\n  * b\n * c',
      output: '* a\n  * b\n* c',
      errors: [
        {
          messageId: 'indentation',
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 3,
          data: { expected: 0, actual: 1 },
        },
      ],
    },
    {
      name: 'Task list item that is not aligned with its siblings',
      code: '- [ ] task 1\n - [x] task 2',
      output: '- [ ] task 1\n- [x] task 2',
      language: 'markdown/gfm',
      errors: [
        {
          messageId: 'indentation',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
          data: { expected: 0, actual: 1 },
        },
      ],
    },
    {
      name: 'Left-aligned ordered list item that is not aligned with its siblings',
      code: ' 1. a\n2. b',
      output: ' 1. a\n 2. b',
      errors: [
        {
          messageId: 'indentation',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { expected: 1, actual: 0 },
        },
      ],
    },
    {
      name: '`markdownlint` MD005 ordered list example',
      code: ' 1. One\n 2. Two\n 3. Three\n 4. Four\n5. Five\n 6. Six\n 7. Seven\n 8. Eight\n 9. Nine\n10. Ten\n 11. Eleven\n12. Twelve',
      output:
        ' 1. One\n 2. Two\n 3. Three\n 4. Four\n 5. Five\n 6. Six\n 7. Seven\n 8. Eight\n 9. Nine\n10. Ten\n11. Eleven\n12. Twelve',
      errors: [
        {
          messageId: 'indentation',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 3,
          data: { expected: 1, actual: 0 },
        },
        {
          messageId: 'indentation',
          line: 11,
          column: 2,
          endLine: 11,
          endColumn: 5,
          data: { expected: 0, actual: 1 },
        },
      ],
    },
    {
      name: 'Block quote list item that is not aligned with its siblings is reported without an autofix',
      code: '> * a\n>  * c',
      output: null,
      errors: [
        {
          messageId: 'indentation',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
          data: { expected: 2, actual: 3 },
        },
      ],
    },
  ],
});
