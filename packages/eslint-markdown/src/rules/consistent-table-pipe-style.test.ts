/**
 * @fileoverview Test for `consistent-table-pipe-style.ts`.
 * @author dev-oil
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-table-pipe-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-table-pipe-style', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Pipe in a paragraph',
      code: 'Paragraph | with | pipes |',
      options: [{ style: 'no-leading-or-trailing' }],
    },
    {
      name: '`consistent` style with leading and trailing pipes',
      code: '| a | b |\n| - | - |\n| 1 | 2 |',
    },
    {
      name: '`consistent` style without leading or trailing pipes',
      code: 'a | b\n--- | ---\n1 | 2',
    },
    {
      name: '`consistent` style across multiple tables',
      code: '| a | b\n| - | -\n| 1 | 2\n\n| c | d\n| - | -\n| 3 | 4',
    },
    {
      name: '`leading-and-trailing` style',
      code: '| a | b |\n| - | - |\n| 1 | 2 |',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: '`leading-only` style',
      code: '| a | b\n| - | -\n| 1 | 2',
      options: [{ style: 'leading-only' }],
    },
    {
      name: '`trailing-only` style',
      code: 'a | b |\n--- | --- |\n1 | 2 |',
      options: [{ style: 'trailing-only' }],
    },
    {
      name: '`no-leading-or-trailing` style',
      code: 'a | b\n--- | ---\n1 | 2',
      options: [{ style: 'no-leading-or-trailing' }],
    },
    {
      name: 'Escaped trailing pipe is not a trailing pipe',
      code: '| a | b \\|\n| - | -',
      options: [{ style: 'leading-only' }],
    },
    {
      name: 'Escaped backslash before a trailing pipe',
      code: '| a | b \\\\|\n| - | - |',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: 'Pipe in inline code',
      code: '| `a|b` | c |\n| - | - | - |',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: 'Trailing whitespace after a pipe',
      code: '| a | b |  \n| - | - |\t\n| 1 | 2 | ',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: 'CRLF line endings',
      code: '| a | b |\r\n| - | - |\r\n| 1 | 2 |',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: 'Table in a blockquote',
      code: '> | a | b |\n> | - | - |\n> | 1 | 2 |',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: 'Table in a list item',
      code: '- item\n\n  | a | b |\n  | - | - |\n  | 1 | 2 |',
      options: [{ style: 'leading-and-trailing' }],
    },
    {
      name: 'Table in a code block',
      code: '```md\na | b\n--- | ---\n```',
      options: [{ style: 'leading-and-trailing' }],
    },
  ],

  invalid: [
    {
      name: '`consistent` style with the issue example',
      code: '| Header | Header |\n| ------ | ------\n  Cell   | Cell   |',
      output: '| Header | Header |\n| ------ | ------ |\n  | Cell   | Cell   |',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 18,
          data: { style: 'leading-and-trailing' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 20,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: '`consistent` style uses the header row of the first table for every table',
      code: 'a | b\n--- | ---\n1 | 2\n\n| c | d |\n| - | - |\n| 3 | 4 |',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 10,
          data: { style: 'no-leading-or-trailing' },
        },
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 10,
          data: { style: 'no-leading-or-trailing' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 1,
          endLine: 7,
          endColumn: 10,
          data: { style: 'no-leading-or-trailing' },
        },
      ],
    },
    {
      name: '`leading-and-trailing` style adds missing leading and trailing pipes',
      code: 'a | b\n--- | ---\n1 | 2',
      output: '| a | b |\n| --- | --- |\n| 1 | 2 |',
      options: [{ style: 'leading-and-trailing' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'leading-and-trailing' },
        },
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'leading-and-trailing' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 6,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: '`leading-only` style does not fix an extra trailing pipe',
      code: '| a | b |\n| - | -\n| 1 | 2',
      output: null,
      options: [{ style: 'leading-only' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'leading-only' },
        },
      ],
    },
    {
      name: '`trailing-only` style adds missing trailing pipes',
      code: 'a | b\n--- | ---\n1 | 2',
      output: 'a | b |\n--- | --- |\n1 | 2 |',
      options: [{ style: 'trailing-only' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'trailing-only' },
        },
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'trailing-only' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 6,
          data: { style: 'trailing-only' },
        },
      ],
    },
    {
      name: '`no-leading-or-trailing` style does not fix extra pipes',
      code: '| a | b |\n| - | - |',
      output: null,
      options: [{ style: 'no-leading-or-trailing' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'no-leading-or-trailing' },
        },
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'no-leading-or-trailing' },
        },
      ],
    },
    {
      name: 'Empty first cell is not fixed because removing the leading pipe drops the cell',
      code: 'a | b\n--- | ---\n| | 2',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 6,
          data: { style: 'no-leading-or-trailing' },
        },
      ],
    },
    {
      name: 'Escaped trailing pipe gets a trailing pipe after it',
      code: '| a | b |\n| - | - |\n| 1 | 2 \\|',
      output: '| a | b |\n| - | - |\n| 1 | 2 \\| |',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: 'Trailing backslash is not escaped by the added pipe',
      code: '| a | b |\n| - | - |\n| 1 | 2 \\',
      output: '| a | b |\n| - | - |\n| 1 | 2 \\ |',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: 'Text right after a table is a table row',
      code: '| a | b |\n| - | - |\ntext after',
      output: '| a | b |\n| - | - |\n| text after |',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: 'Trailing whitespace is kept after the added pipe',
      code: '| a | b |\n| - | -  ',
      output: '| a | b |\n| - | - |  ',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: 'CRLF line endings',
      code: '| a | b |\r\n| - | -\r\n| 1 | 2 |',
      output: '| a | b |\r\n| - | - |\r\n| 1 | 2 |',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: 'Table in a blockquote',
      code: '> | a | b |\n> | - | -\n> | 1 | 2 |',
      output: '> | a | b |\n> | - | - |\n> | 1 | 2 |',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'leading-and-trailing' },
        },
      ],
    },
    {
      name: 'Table in a list item',
      code: '- item\n\n  a | b |\n  --- | ---\n  1 | 2 |',
      output: '- item\n\n  a | b |\n  --- | --- |\n  1 | 2 |',
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 3,
          endLine: 4,
          endColumn: 12,
          data: { style: 'trailing-only' },
        },
      ],
    },
  ],
});
