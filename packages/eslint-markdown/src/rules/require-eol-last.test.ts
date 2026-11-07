/**
 * @fileoverview Test for `require-eol-last.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './require-eol-last.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-eol-last', rule, {
  valid: [
    {
      name: 'Empty files do not require a newline',
      code: '',
    },
    {
      name: 'A single LF is a valid file',
      code: '\n',
    },
    {
      name: 'A final LF is accepted by default',
      code: 'Text\n',
    },
    {
      name: 'Multiple final LFs are accepted',
      code: 'Text\n\n',
    },
    {
      name: 'Spaces before a final LF are accepted',
      code: 'Text\n   \n',
    },
    {
      name: 'A single CRLF is a valid file',
      code: '\r\n',
    },
    {
      name: 'A final CRLF is accepted with the default LF option',
      code: 'Text\r\n',
    },
    {
      name: 'Multiple final CRLFs are accepted',
      code: 'Text\r\n\r\n',
    },
    {
      name: 'Spaces before a final CRLF are accepted',
      code: 'Text\r\n   \r\n',
    },
    {
      name: 'A single CR is a valid file',
      code: '\r',
    },
    {
      name: 'A final CR is accepted with the default LF option',
      code: 'Text\r',
    },
    {
      name: 'Multiple final CRs are accepted',
      code: 'Text\r\r',
    },
    {
      name: 'Empty files are valid in never mode',
      code: '',
      options: ['never'],
    },
    {
      name: 'Text without a final newline is valid in never mode',
      code: 'Text',
      options: ['never'],
    },
    {
      name: 'Internal LFs are valid in never mode',
      code: 'foo\nbar',
      options: ['never'],
    },
    {
      name: 'Internal CRLFs are valid in never mode',
      code: 'foo\r\nbar',
      options: ['never'],
    },
    {
      name: 'Internal CRs are valid in never mode',
      code: 'foo\rbar',
      options: ['never'],
    },
    {
      name: 'Trailing spaces after a newline are valid in never mode',
      code: 'Text\n   ',
      options: ['never'],
    },
    {
      name: 'An empty options object accepts a final newline',
      code: 'Text\n',
      options: ['always', {}],
    },
    {
      name: 'The CR option accepts an existing LF',
      code: 'Text\n',
      options: ['always', { newline: 'CR' }],
    },
    {
      name: 'The CRLF option accepts an existing CR',
      code: 'Text\r',
      options: ['always', { newline: 'CRLF' }],
    },
    {
      name: 'The CR option leaves empty files unchanged',
      code: '',
      options: ['always', { newline: 'CR' }],
    },
    {
      name: 'The CRLF option leaves empty files unchanged',
      code: '',
      options: ['always', { newline: 'CRLF' }],
    },
  ],

  invalid: [
    {
      name: 'A missing final newline is fixed with LF by default',
      code: 'Text',
      output: 'Text\n',
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'A newline is inserted after trailing spaces on the last line',
      code: 'Text\n   ',
      output: 'Text\n   \n',
      errors: [
        {
          messageId: 'missing',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'A file containing only whitespace still requires a newline',
      code: ' \t ',
      output: ' \t \n',
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Explicit always mode uses the default LF',
      code: 'Text',
      output: 'Text\n',
      options: ['always'],
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'An empty options object uses the default LF',
      code: 'Text',
      output: 'Text\n',
      options: ['always', {}],
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'The LF option preserves internal CRLF line endings',
      code: 'foo\r\nbar',
      output: 'foo\r\nbar\n',
      options: ['always', { newline: 'LF' }],
      errors: [
        {
          messageId: 'missing',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'The CR option inserts a CR without changing internal LFs',
      code: 'foo\nbar',
      output: 'foo\nbar\r',
      options: ['always', { newline: 'CR' }],
      errors: [
        {
          messageId: 'missing',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'The CRLF option inserts a CRLF without changing internal CRs',
      code: 'foo\rbar',
      output: 'foo\rbar\r\n',
      options: ['always', { newline: 'CRLF' }],
      errors: [
        {
          messageId: 'missing',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'The CRLF option preserves trailing spaces after an existing CRLF',
      code: 'Text\r\n   ',
      output: 'Text\r\n   \r\n',
      options: ['always', { newline: 'CRLF' }],
      errors: [
        {
          messageId: 'missing',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'A final LF is removed in never mode',
      code: 'Text\n',
      output: 'Text',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 1,
          column: 5,
          endLine: 2,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'A final CRLF is removed in never mode',
      code: 'Text\r\n',
      output: 'Text',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 1,
          column: 5,
          endLine: 2,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Multiple final CRLFs are removed together and the last is reported',
      code: 'Text\r\n\r\n',
      output: 'Text',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 2,
          column: 1,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Never mode preserves internal LFs',
      code: 'foo\nbar\n',
      output: 'foo\nbar',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 2,
          column: 4,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Never mode preserves internal CRLFs',
      code: 'foo\r\nbar\r\n',
      output: 'foo\r\nbar',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 2,
          column: 4,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Multiple final LFs are removed together and the last is reported',
      code: 'Text\n\n',
      output: 'Text',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 2,
          column: 1,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'A final CR is removed in never mode',
      code: 'Text\r',
      output: 'Text',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 1,
          column: 5,
          endLine: 2,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Multiple final CRs are removed together',
      code: 'Text\r\r',
      output: 'Text',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 2,
          column: 1,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Never mode removes mixed final newlines regardless of the newline option',
      code: 'Text\n\r\r\n',
      output: 'Text',
      options: ['never', { newline: 'CRLF' }],
      errors: [
        {
          messageId: 'unexpected',
          line: 3,
          column: 1,
          endLine: 4,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Never mode turns a newline-only file into an empty file',
      code: '\r\n\n\r',
      output: '',
      options: ['never'],
      errors: [
        {
          messageId: 'unexpected',
          line: 3,
          column: 1,
          endLine: 4,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Never mode preserves spaces before the final newline',
      code: 'Text\n   \n',
      output: 'Text\n   ',
      options: ['never', { newline: 'CR' }],
      errors: [
        {
          messageId: 'unexpected',
          line: 2,
          column: 4,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'A Unicode line separator is not a Markdown newline',
      code: 'Text\u2028',
      output: 'Text\u2028\n',
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'A Unicode paragraph separator is not a Markdown newline',
      code: 'Text\u2029',
      output: 'Text\u2029\n',
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'A missing newline after a fenced code block is reported',
      code: '```txt\nText\n```',
      output: '```txt\nText\n```\n',
      errors: [
        {
          messageId: 'missing',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'A missing newline after YAML frontmatter is reported',
      code: '---\ntitle: Text\n---',
      output: '---\ntitle: Text\n---\n',
      languageOptions: { frontmatter: 'yaml' },
      errors: [
        {
          messageId: 'missing',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'A missing newline is inserted while preserving the byte order mark',
      code: '\uFEFFText',
      output: '\uFEFFText\n',
      errors: [
        {
          messageId: 'missing',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
  ],
});
