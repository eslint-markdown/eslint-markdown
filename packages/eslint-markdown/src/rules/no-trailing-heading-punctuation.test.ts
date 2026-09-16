/**
 * @fileoverview Test for `no-trailing-heading-punctuation.ts`
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-trailing-heading-punctuation.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-trailing-heading-punctuation', rule, {
  valid: [
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'Empty document',
      code: '  ',
    },
    // Default: ATX Headings
    {
      name: 'ATX: Level 1 heading without trailing punctuation',
      code: '# Heading',
    },
    {
      name: 'ATX: Level 1 heading ending with an allowed question mark',
      code: '# Heading?',
    },
    {
      name: 'ATX: Level 2 heading without trailing punctuation',
      code: '## Heading',
    },
    {
      name: 'ATX: Level 3 heading without trailing punctuation',
      code: '### Heading',
    },
    {
      name: 'ATX: Level 4 heading without trailing punctuation',
      code: '#### Heading',
    },
    {
      name: 'ATX: Level 5 heading without trailing punctuation',
      code: '##### Heading',
    },
    {
      name: 'ATX: Level 6 heading without trailing punctuation',
      code: '###### Heading',
    },
    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Heading without trailing punctuation',
      code: '## Heading ##',
    },
    // Default: Setext Headings
    {
      name: 'Setext: Level 1 heading without trailing punctuation',
      code: 'Heading\n=======',
    },
    {
      name: 'Setext: Level 2 heading without trailing punctuation',
      code: 'Heading\n-------',
    },
    // Default: Empty Headings
    {
      name: 'ATX: Empty heading',
      code: '#',
    },
    {
      name: 'ATX: Empty heading followed by text ending with prohibited punctuation',
      code: '#\n\nParagraph.',
    },
    {
      name: 'ATX Closed: Empty heading',
      code: '## ##',
    },
    // Default: Full-Width Punctuation
    {
      name: 'ATX: Heading ending with an allowed full-width question mark',
      code: '# Heading？',
    },
    // Default: Consecutive Punctuation
    {
      name: 'ATX: Consecutive punctuation ending with an allowed question mark',
      code: '# Heading!?',
    },
    // Default: Mixed Punctuation
    {
      name: 'ATX: Heading ending with allowed mixed punctuation',
      code: '# Heading?!?',
    },
    // Default: Whitespace Before Punctuation
    {
      name: 'ATX: Non-trailing punctuation should not be reported',
      code: '# Heading ! More',
    },
    // `punctuation` option
    {
      name: 'ATX: Heading ending with punctuation excluded from the option',
      code: '# Heading!',
      options: [{ punctuation: ['.', ',', ';', ':', '?', ']'] }],
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with an HTML entity',
      code: '# Copyright &copy;',
    },
    {
      name: 'ATX: Heading ending with a numeric HTML entity',
      code: '# Copyright &#169;',
    },
    {
      name: 'ATX: Heading ending with a hexadecimal HTML entity',
      code: '# Copyright &#x000A9;',
    },
    // HTML Entities in ATX Closed Headings
    {
      name: 'ATX Closed: Heading ending with an HTML entity',
      code: '## Copyright &#169; ##',
    },
    // HTML Entities in Setext Headings
    {
      name: 'Setext: Heading ending with an HTML entity',
      code: 'Copyright &copy;\n---------------------',
    },
    // Gemoji
    {
      name: 'ATX: Heading ending with a gemoji',
      code: '# Heading :smile:',
    },
    // HTML Entity Variants
    {
      name: 'ATX: Heading ending with an uppercase named entity',
      code: '# Copyright &COPY;',
    },
    {
      name: 'ATX: Heading ending with an uppercase hexadecimal entity',
      code: '# Copyright &#X000A9;',
    },
    // HTML Entities without Leading Spaces
    {
      name: 'ATX: Heading ending with an adjacent HTML entity',
      code: '## Copyright 2002&copy;',
    },
    // HTML Entities within Headings
    {
      name: 'ATX: Heading containing a non-trailing HTML entity',
      code: '# Copyright &copy; 2000',
    },
    // Non-`text` trailing nodes
    {
      name: 'ATX: Heading ending with an HTML node ignores configured punctuation in its closing tag',
      code: '# Heading.<strong>hi</strong>',
      options: [{ punctuation: ['>'] }],
    },
    {
      name: 'ATX: Heading ending with emphasis ignores configured punctuation in its delimiter',
      code: '# Heading *hi*',
      options: [{ punctuation: ['*'] }],
    },
    {
      name: 'ATX: Heading ending with strong ignores configured punctuation in its delimiter',
      code: '# Heading __hi__',
      options: [{ punctuation: ['_'] }],
    },
    // Edge cases from `markdownlint`
    {
      name: '`markdownlint` edge case: Heading ending with emphasis and period - 1',
      code: '# Heading *.*',
    },
    {
      name: '`markdownlint` edge case: Heading ending with emphasis and period - 2',
      code: '# Heading _._',
    },
    {
      name: '`markdownlint` edge case: Heading ending with emphasis and period - 3',
      code: '# Heading *_._*',
    },
    {
      name: '`markdownlint` edge case: Heading ending with strong and period - 1',
      code: '# Heading **.**',
    },
    {
      name: '`markdownlint` edge case: Heading ending with strong and period - 2',
      code: '# Heading __.__',
    },
    {
      name: '`markdownlint` edge case: Heading ending with emphasis, strong, and period',
      code: '# Heading ***.***',
    },
  ],

  invalid: [
    // Default: ATX Headings
    {
      name: 'ATX: Heading with trailing period',
      code: '# Heading.',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '.',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing comma',
      code: '# Heading,',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: ',',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing semicolon',
      code: '# Heading;',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: ';',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing colon',
      code: '# Heading:',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: ':',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing exclamation mark',
      code: '# Heading!',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing full-width period',
      code: '# Heading。',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '。',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing full-width comma',
      code: '# Heading，',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '，',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing full-width semicolon',
      code: '# Heading；',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '；',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing full-width colon',
      code: '# Heading：',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '：',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing full-width exclamation mark',
      code: '# Heading！',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '！',
          },
        },
      ],
    },
    {
      name: 'ATX: Headings with prohibited ASCII punctuation',
      code: '# Heading,\n# Heading;\n# Heading:',
      output: '# Heading\n# Heading\n# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: { punctuation: ',' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: { punctuation: ';' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: { punctuation: ':' },
        },
      ],
    },
    {
      name: 'ATX: Headings with prohibited full-width punctuation',
      code: '# Heading，\n# Heading；\n# Heading：\n# Heading！',
      output: '# Heading\n# Heading\n# Heading\n# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: { punctuation: '，' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: { punctuation: '；' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: { punctuation: '：' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 4,
          column: 10,
          endLine: 4,
          endColumn: 11,
          data: { punctuation: '！' },
        },
      ],
    },

    // `punctuation` option
    {
      name: 'ATX: Heading with configured trailing question mark',
      code: '# Heading?',
      output: '# Heading',
      options: [{ punctuation: ['.', ',', ';', ':', '?', ']'] }],
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '?',
          },
        },
      ],
    },
    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Heading with trailing exclamation mark',
      code: '## Heading! ##',
      output: '## Heading ##',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    // Default: Setext Headings
    {
      name: 'Setext: Level 1 heading with trailing exclamation mark',
      code: 'Heading!\n=======',
      output: 'Heading\n=======',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    {
      name: 'Setext: Level 2 heading with trailing exclamation mark',
      code: 'Heading!\n-------',
      output: 'Heading\n-------',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    // Default: Consecutive Punctuation
    {
      name: 'ATX: Heading with consecutive trailing punctuation',
      code: '# Heading!!!',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 13,
          data: {
            punctuation: '!!!',
          },
        },
      ],
    },
    // Default: Mixed Punctuation
    {
      name: 'ATX: Heading ending with prohibited mixed punctuation',
      code: '# Heading?!',
      output: '# Heading?',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    // Default: Whitespace Before Punctuation
    {
      name: 'ATX: Whitespace before trailing punctuation should be removed',
      code: '# Heading !',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: ' !',
          },
        },
      ],
    },
    {
      name: 'ATX: Non-breaking space before trailing punctuation should be preserved',
      code: '# Heading\u00A0.',
      output: '# Heading\u00A0',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '.',
          },
        },
      ],
    },
    // `punctuation` option
    {
      name: 'ATX: Heading ending with punctuation included in the option',
      code: '# Heading]',
      output: '# Heading',
      options: [{ punctuation: ['.', ',', ';', ':', '?', ']'] }],
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: ']',
          },
        },
      ],
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with a non-entity semicolon',
      code: '# Copyright copy;',
      output: '# Copyright copy',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 18,
          data: { punctuation: ';' },
        },
      ],
    },
    {
      name: 'ATX: Heading ending with an invalid numeric entity',
      code: '# Copyright #169;',
      output: '# Copyright #169',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 18,
          data: { punctuation: ';' },
        },
      ],
    },
    {
      name: 'ATX: Heading ending with an invalid hexadecimal entity',
      code: '# Copyright #x000A9;',
      output: '# Copyright #x000A9',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 20,
          endLine: 1,
          endColumn: 21,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities in ATX Closed Headings
    {
      name: 'ATX Closed: Heading ending with an invalid numeric entity',
      code: '## Copyright #169; ##',
      output: '## Copyright #169 ##',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 19,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities in Setext Headings
    {
      name: 'Setext: Heading ending with a non-entity semicolon',
      code: 'Copyright copy;\n---------------------',
      output: 'Copyright copy\n---------------------',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 16,
          data: { punctuation: ';' },
        },
      ],
    },
    // Gemoji
    {
      name: 'ATX: Heading ending with a non-gemoji colon',
      code: '# Heading smile:',
      output: '# Heading smile',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
          data: { punctuation: ':' },
        },
      ],
    },
    // HTML Entities without Leading Spaces
    {
      name: 'ATX: Heading ending with adjacent non-entity text',
      code: '## Copyright 2002copy;',
      output: '## Copyright 2002copy',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 22,
          endLine: 1,
          endColumn: 23,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities within Headings
    {
      name: 'ATX: Heading containing an entity with trailing punctuation',
      code: '# Copyright &copy; 2000;',
      output: '# Copyright &copy; 2000',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 24,
          endLine: 1,
          endColumn: 25,
          data: { punctuation: ';' },
        },
      ],
    },
    // Edge cases from `markdownlint`
    {
      name: '`markdownlint` edge case: ATX Heading with only punctuation',
      code: '# .',
      output: '# ',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { punctuation: '.' },
        },
      ],
    },
    {
      name: '`markdownlint` edge case: ATX closed Heading with only punctuation',
      code: '# . #',
      output: '#  #',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { punctuation: '.' },
        },
      ],
    },
    {
      name: '`markdownlint` edge case: Setext Heading with only punctuation',
      code: '.\n---',
      output: '\n---',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { punctuation: '.' },
        },
      ],
    },
    {
      name: '`markdownlint` edge case: Trailing spaces after punctuation',
      code: '# .   ',
      output: '#    ',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { punctuation: '.' },
        },
      ],
    },
    // Edge cases which are not handled by `markdownlint`
    {
      name: 'ATX: Heading ending with an HTML entity followed by punctuation',
      code: '# Copyright &copy;.',
      output: '# Copyright &copy;',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 20,
          data: { punctuation: '.' },
        },
      ],
    },
    {
      name: 'ATX: Heading ending with an HTML entity followed by multiple punctuation characters',
      code: '# Copyright &copy;.!',
      output: '# Copyright &copy;',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 21,
          data: { punctuation: '.!' },
        },
      ],
    },
    {
      name: 'ATX: Heading ending with a gemoji followed by punctuation',
      code: '# Heading :smile:.',
      output: '# Heading :smile:',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 19,
          data: { punctuation: '.' },
        },
      ],
    },
    {
      name: 'ATX: Heading ending with a gemoji followed by multiple punctuation characters',
      code: '# Heading :smile:.!',
      output: '# Heading :smile:',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 20,
          data: { punctuation: '.!' },
        },
      ],
    },
    {
      name: 'Setext: Level 1 Multiline heading with trailing punctuation - CR',
      code: 'Heading\r.\r===',
      output: 'Heading\r===',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 2,
          endColumn: 2,
          data: { punctuation: '\r.' },
        },
      ],
    },
    {
      name: 'Setext: Level 2 Multiline heading with trailing punctuation - CR',
      code: 'Heading\r.\r---',
      output: 'Heading\r---',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 2,
          endColumn: 2,
          data: { punctuation: '\r.' },
        },
      ],
    },
    {
      name: 'Setext: Level 1 Multiline heading with trailing punctuation - LF',
      code: 'Heading\n.\n===',
      output: 'Heading\n===',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 2,
          endColumn: 2,
          data: { punctuation: '\n.' },
        },
      ],
    },
    {
      name: 'Setext: Level 2 Multiline heading with trailing punctuation - LF',
      code: 'Heading\n.\n---',
      output: 'Heading\n---',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 2,
          endColumn: 2,
          data: { punctuation: '\n.' },
        },
      ],
    },
    {
      name: 'Setext: Level 1 Multiline heading with trailing punctuation - CRLF',
      code: 'Heading\r\n.\r\n===',
      output: 'Heading\r\n===',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 2,
          endColumn: 2,
          data: { punctuation: '\r\n.' },
        },
      ],
    },
    {
      name: 'Setext: Level 2 Multiline heading with trailing punctuation - CRLF',
      code: 'Heading\r\n.\r\n---',
      output: 'Heading\r\n---',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 2,
          endColumn: 2,
          data: { punctuation: '\r\n.' },
        },
      ],
    },

    // Backslash before trailing punctuation
    {
      name: 'ATX: Heading with an escaped trailing exclamation mark',
      code: '# Hello\\!',
      output: '# Hello',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with a literal backslash before trailing exclamation mark',
      code: '# Hello\\\\!',
      output: '# Hello\\\\',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with three backslashes before trailing exclamation mark',
      code: `# Hello${'\\'.repeat(3)}!`,
      output: `# Hello${'\\'.repeat(2)}`,
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with four backslashes before trailing exclamation mark',
      code: `# Hello${'\\'.repeat(4)}!`,
      output: `# Hello${'\\'.repeat(4)}`,
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 13,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with a backslash separated from trailing punctuation by a space',
      code: '# Hello\\ !',
      output: '# Hello\\',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: ' !',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with a backslash separated from trailing punctuation by a tab',
      code: '# Hello\\\t!',
      output: '# Hello\\',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '\t!',
          },
        },
      ],
    },
  ],
});
