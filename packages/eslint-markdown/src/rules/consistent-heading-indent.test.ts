/**
 * @fileoverview Test for `consistent-heading-indent.ts`
 * @author Soheun(sohxxny)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-heading-indent.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-heading-indent', rule, {
  valid: [
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'Heading at the beginning of the line',
      code: 'Some text\n\n# Heading',
    },
    {
      name: 'Heading inside a block quote',
      code: '> # Heading in Block Quote',
    },
    {
      name: 'Heading after a list marker',
      code: '- # Heading',
    },
    {
      name: 'Setext heading with an indented underline',
      code: 'Heading\n  ========',
    },
    {
      name: 'Heading in a nested block quote',
      code: '> > # Heading',
    },
  ],

  invalid: [
    {
      name: 'Heading indented by spaces',
      code: 'Some text\n\n  # Indented heading',
      output: 'Some text\n\n# Indented heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Heading in a block quote with extra spaces after the marker',
      code: '>    # Heading',
      output: '> # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Heading in a nested block quote with extra spaces after the last marker',
      code: '> >   # Heading',
      output: '> > # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },
    {
      name: 'Setext heading in a block quote with extra space after the marker',
      code: '>  Heading\n> =======',
      output: '> Heading\n> =======',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Setext heading with an indented text line',
      code: '  Heading\n========',
      output: 'Heading\n========',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
  ],
});
