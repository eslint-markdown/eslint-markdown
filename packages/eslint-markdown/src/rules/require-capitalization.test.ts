/**
 * @fileoverview Test for `require-capitalization.ts`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './require-capitalization.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-capitalization', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },

    // `blockquote`
    {
      name: 'Blockquote: Skips capitalization checks when no selectors are provided',
      code: '> hello world!',
      options: [],
    },
    {
      name: 'Blockquote: Empty',
      code: '> ',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: 1 level depth',
      code: '> Hello World!',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: 2 level depth - em',
      code: '> *Hello* World!',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: 2 level depth - strong',
      code: '> **Hello** World!',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: 3 level depth - em + strong - 1',
      code: '> ***Hello*** World!',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: 3 level depth - em + strong - 2',
      code: '> _**Hello**_ _World!_',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: Should not report text starting with a space after inline code',
      code: '> `code` hello world!',
      options: ['blockquote'],
    },
    {
      name: 'Blockquote: Should not report text starting with a space after an image',
      code: '> ![alt](image.png) hello world!',
      options: ['blockquote'],
    },

    // `footnoteDefinition`
    {
      name: 'FootnoteDefinition: Skips capitalization checks when no selectors are provided',
      code: '[^1]: hello world!',
      language: 'markdown/gfm',
      options: [],
    },
    {
      name: 'FootnoteDefinition: Empty',
      code: '[^1]:',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: 1 level depth',
      code: '[^1]: Hello World!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: 2 level depth - em',
      code: '[^1]: *Hello* World!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: 2 level depth - strong',
      code: '[^1]: **Hello** World!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: 3 level depth - em + strong - 1',
      code: '[^1]: ***Hello*** World!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: 3 level depth - em + strong - 2',
      code: '[^1]: _**Hello**_ _World!_',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: Should not report text starting with a space after inline code',
      code: '[^1]: `code` hello world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },
    {
      name: 'FootnoteDefinition: Should not report text starting with a space after an image',
      code: '[^1]: ![alt](image.png) hello world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition'],
    },

    // `heading`
    {
      name: 'Heading: Skips capitalization checks when no selectors are provided',
      code: '# hello world!',
      options: [],
    },
    {
      name: 'Heading: Empty',
      code: '## ',
      options: ['heading'],
    },
    {
      name: 'Heading: 1 level depth',
      code: '# Hello World!',
      options: ['heading'],
    },
    {
      name: 'Heading: 2 level depth - em',
      code: '# *Hello* World!',
      options: ['heading'],
    },
    {
      name: 'Heading: 2 level depth - strong',
      code: '# **Hello** World!',
      options: ['heading'],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 1',
      code: '# ***Hello*** World!',
      options: ['heading'],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 2',
      code: '# _**Hello**_ _World!_',
      options: ['heading'],
    },
    {
      name: 'Heading: Should not report text starting with a space after inline code',
      code: '# `code` hello world!',
      options: ['heading'],
    },
    {
      name: 'Heading: Should not report text starting with a space after an image',
      code: '# ![alt](image.png) hello world!',
      options: ['heading'],
    },

    // `listItem`
    {
      name: 'ListItem: Skips capitalization checks when no selectors are provided',
      code: '- hello world!',
      options: [],
    },
    {
      name: 'ListItem: Empty',
      code: '- ',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: 1 level depth',
      code: '- Hello World!',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: 2 level depth - em',
      code: '- *Hello* World!',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: 2 level depth - strong',
      code: '- **Hello** World!',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 1',
      code: '- ***Hello*** World!',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 2',
      code: '- _**Hello**_ _World!_',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: Should not report text starting with a space after inline code',
      code: '- `code` hello world!',
      options: ['listItem > paragraph'],
    },
    {
      name: 'ListItem: Should not report text starting with a space after an image',
      code: '- ![alt](image.png) hello world!',
      options: ['listItem > paragraph'],
    },

    // `paragraph`
    {
      name: 'Paragraph: Skips capitalization checks when no selectors are provided',
      code: 'hello world!',
      options: [],
    },
    {
      name: 'Paragraph: 1 level depth',
      code: 'Hello World!',
      options: ['paragraph'],
    },
    {
      name: 'Paragraph: 2 level depth - em',
      code: '*Hello* World!',
      options: ['paragraph'],
    },
    {
      name: 'Paragraph: 2 level depth - strong',
      code: '**Hello** World!',
      options: ['paragraph'],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 1',
      code: '***Hello*** World!',
      options: ['paragraph'],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 2',
      code: '_**Hello**_ World!',
      options: ['paragraph'],
    },
    {
      name: 'Paragraph: Should not report text starting with a space after inline code',
      code: '`code` hello world!',
      options: ['paragraph'],
    },
    {
      name: 'Paragraph: Should not report text starting with a space after an image',
      code: '![alt](image.png) hello world!',
      options: ['paragraph'],
    },

    // `table`
    {
      name: 'TableCell: Skips capitalization checks when no selectors are provided',
      code: '| hello world! |\n| - |',
      language: 'markdown/gfm',
      options: [],
    },
    {
      name: 'TableCell: Should not report header cells when only data cells are selected',
      code: '| heading |\n| - |\n| Data |',
      language: 'markdown/gfm',
      options: ['table > tableRow:not(:first-child) > tableCell'],
    },
    {
      name: 'TableCell: Should not report data cells when only header cells are selected',
      code: '| Heading |\n| - |\n| data |',
      language: 'markdown/gfm',
      options: ['table > tableRow:first-child > tableCell'],
    },

    // `tableCell`
    {
      name: 'TableCell: Empty',
      code: '| |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: 1 level depth',
      code: '| Hello World! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: 2 level depth - em',
      code: '| *Hello* World! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: 2 level depth - strong',
      code: '| **Hello** World! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: 3 level depth - em + strong - 1',
      code: '| ***Hello*** World! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: 3 level depth - em + strong - 2',
      code: '| _**Hello**_ _World!_ |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: Should not report text starting with a space after inline code',
      code: '| `code` hello world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
    {
      name: 'TableCell: Should not report text starting with a space after an image',
      code: '| ![alt](image.png) hello world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
    },
  ],

  invalid: [
    // `blockquote`
    {
      name: 'Blockquote: 1 level depth',
      code: '> hello world!',
      output: '> Hello world!',
      options: ['blockquote > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Blockquote: 2 level depth - em',
      code: '> *hello* world!',
      output: '> *Hello* world!',
      options: ['blockquote > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Blockquote: 2 level depth - strong',
      code: '> **hello** world!',
      output: '> **Hello** world!',
      options: ['blockquote > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Blockquote: 3 level depth - em + strong - 1',
      code: '> ***hello*** world!',
      output: '> ***Hello*** world!',
      options: ['blockquote > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Blockquote: 3 level depth - em + strong - 2',
      code: '> _**hello**_ world!',
      output: '> _**Hello**_ world!',
      options: ['blockquote > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },

    // `footnoteDefinition`
    {
      name: 'FootnoteDefinition: 1 level depth',
      code: '[^1]: hello world!',
      output: '[^1]: Hello world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'FootnoteDefinition: 2 level depth - em',
      code: '[^1]: *hello* world!',
      output: '[^1]: *Hello* world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'FootnoteDefinition: 2 level depth - strong',
      code: '[^1]: **hello** world!',
      output: '[^1]: **Hello** world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'FootnoteDefinition: 3 level depth - em + strong - 1',
      code: '[^1]: ***hello*** world!',
      output: '[^1]: ***Hello*** world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'FootnoteDefinition: 3 level depth - em + strong - 2',
      code: '[^1]: _**hello**_ world!',
      output: '[^1]: _**Hello**_ world!',
      language: 'markdown/gfm',
      options: ['footnoteDefinition > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },

    // `heading`
    {
      name: 'Heading: 1 level depth',
      code: '# hello world!',
      output: '# Hello world!',
      options: ['heading'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Heading: 2 level depth - em',
      code: '# *hello* world!',
      output: '# *Hello* world!',
      options: ['heading'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Heading: 2 level depth - strong',
      code: '# **hello** world!',
      output: '# **Hello** world!',
      options: ['heading'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 1',
      code: '# ***hello*** world!',
      output: '# ***Hello*** world!',
      options: ['heading'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 2',
      code: '# _**hello**_ world!',
      output: '# _**Hello**_ world!',
      options: ['heading'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },

    // `listItem`
    {
      name: 'ListItem: 1 level depth',
      code: '- hello world!',
      output: '- Hello world!',
      options: ['listItem > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'ListItem: 2 level depth - em',
      code: '- *hello* world!',
      output: '- *Hello* world!',
      options: ['listItem > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'ListItem: 2 level depth - strong',
      code: '- **hello** world!',
      output: '- **Hello** world!',
      options: ['listItem > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 1',
      code: '- ***hello*** world!',
      output: '- ***Hello*** world!',
      options: ['listItem > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 2',
      code: '- _**hello**_ world!',
      output: '- _**Hello**_ world!',
      options: ['listItem > paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },

    // `paragraph`
    {
      name: 'Paragraph: 1 level depth',
      code: 'hello world!',
      output: 'Hello world!',
      options: ['paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Paragraph: 2 level depth - em',
      code: '*hello* world!',
      output: '*Hello* world!',
      options: ['paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Paragraph: 2 level depth - strong',
      code: '**hello** world!',
      output: '**Hello** world!',
      options: ['paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 1',
      code: '***hello*** world!',
      output: '***Hello*** world!',
      options: ['paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 2',
      code: '_**hello**_ world!',
      output: '_**Hello**_ world!',
      options: ['paragraph'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },

    // `table`
    {
      name: 'TableCell: Should capitalize only header cells when selected',
      code: '| header |\n| - |\n| data |',
      output: '| Header |\n| - |\n| data |',
      language: 'markdown/gfm',
      options: ['table > tableRow:first-child > tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'TableCell: Should capitalize only data cells when selected',
      code: '| header |\n| - |\n| data |',
      output: '| header |\n| - |\n| Data |',
      language: 'markdown/gfm',
      options: ['table > tableRow:not(:first-child) > tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 4,
          data: { message: '`d` should be capitalized.' },
        },
      ],
    },

    // `tableCell`
    {
      name: 'TableCell: 1 level depth',
      code: '| hello world! |\n| - |',
      output: '| Hello world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'TableCell: 2 level depth - em',
      code: '| *hello* world! |\n| - |',
      output: '| *Hello* world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'TableCell: 2 level depth - strong',
      code: '| **hello** world! |\n| - |',
      output: '| **Hello** world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'TableCell: 3 level depth - em + strong - 1',
      code: '| ***hello*** world! |\n| - |',
      output: '| ***Hello*** world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'TableCell: 3 level depth - em + strong - 2',
      code: '| _**hello**_ world! |\n| - |',
      output: '| _**Hello**_ world! |\n| - |',
      language: 'markdown/gfm',
      options: ['tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { message: '`h` should be capitalized.' },
        },
      ],
    },
    {
      name: 'TableCell: Header and data cells',
      code: '| header |\n| - |\n| data |',
      output: '| Header |\n| - |\n| Data |',
      language: 'markdown/gfm',
      options: ['tableCell'],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { message: '`h` should be capitalized.' },
        },
        {
          messageId: 'requireCapitalization',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 4,
          data: { message: '`d` should be capitalized.' },
        },
      ],
    },
  ],
});
