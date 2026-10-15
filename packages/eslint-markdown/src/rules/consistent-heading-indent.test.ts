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

    // Top level
    {
      name: 'Heading at the beginning of the line',
      code: 'Some text\n\n# Heading',
    },
    {
      name: 'Setext heading at the beginning of the line',
      code: 'Heading\n========',
    },
    {
      name: 'Setext heading with an indented underline',
      code: 'Heading\n  ========',
    },
    {
      name: 'Multiline setext heading with an indented second line',
      code: 'Line one\n  Line two\n===',
    },
    {
      name: 'Heading-like line indented by four spaces is an indented code block',
      code: '    # Heading',
    },
    {
      name: 'Heading-like line indented by a tab is an indented code block',
      code: '\t# Heading',
    },
    {
      name: 'Hash without a following space is not a heading',
      code: '  #Heading',
    },
    {
      name: 'Non-breaking space before a hash is not indentation',
      code: ' # Heading',
    },
    {
      name: 'Indented comment inside a fenced code block',
      code: '```sh\nif true; then\n  # Load settings\n  source .env\nfi\n```',
    },

    // Block quotes
    {
      name: 'Heading inside a block quote',
      code: '> # Heading in Block Quote',
    },
    {
      name: 'Heading in a nested block quote',
      code: '> > # Heading',
    },
    {
      name: 'Heading in a nested block quote without spaces between markers',
      code: '>> # Heading',
    },
    {
      name: 'Setext heading inside a block quote',
      code: '> Heading\n> =======',
    },
    {
      name: 'Spaces before a block quote marker are not heading indentation',
      code: '  > # Heading',
    },

    // Lists
    {
      name: 'Heading after a list marker',
      code: '- # Heading',
    },
    {
      name: 'Heading after a list marker followed by extra spaces',
      code: '-   # Heading',
    },
    {
      name: 'Heading after a list marker followed by a tab',
      code: '-\t# Heading',
    },
    {
      name: 'Heading after a list marker inside a block quote',
      code: '> - # Heading',
    },
    {
      name: 'Setext heading as list item content',
      code: '- Heading\n  ===',
    },
    {
      name: 'Heading aligned with list item content',
      code: '- item\n\n  # Heading',
    },
    {
      name: 'Heading aligned with list item content without a blank line',
      code: '- item\n  # Heading',
    },
    {
      name: 'Heading aligned with ordered list item content',
      code: '1. item\n\n   # Heading',
    },
    {
      name: 'Heading aligned with wide ordered list item content',
      code: '10. item\n\n    # Heading',
    },
    {
      name: 'Heading aligned with nested list item content',
      code: '- a\n  - b\n\n    # Heading',
    },
    {
      name: 'Heading aligned with indented list item content',
      code: ' - item\n\n   # Heading',
    },
    {
      name: 'Heading aligned with empty list item content',
      code: '-\n  # Heading',
    },
    {
      name: 'Heading aligned with list item content after a tab',
      code: '-\titem\n\n    # Heading',
    },
    {
      name: 'Heading aligned with list item content after a space and a tab',
      code: '- \titem\n\n    # Heading',
    },
    {
      name: 'Heading aligned with list item content inside a block quote',
      code: '> - item\n>\n>   # Heading',
    },
    {
      name: 'Heading aligned with list item content inside a block quote by a tab',
      code: '> - a\n>\n>\t# Heading',
    },
    {
      name: 'Heading aligned with task list item content',
      code: '- [ ] task\n\n  # Heading',
      language: 'markdown/gfm',
    },

    // Footnote definitions
    {
      name: 'Heading at the beginning of a footnote definition',
      code: '[^1]: # Heading',
      language: 'markdown/gfm',
    },
    {
      name: 'Heading after a footnote label followed by extra spaces',
      code: '[^1]:   # Heading',
      language: 'markdown/gfm',
    },
    {
      name: 'Heading aligned with footnote definition content',
      code: '[^1]: note\n\n    # Heading',
      language: 'markdown/gfm',
    },
  ],

  invalid: [
    // Top level
    {
      name: 'Heading indented by one space',
      code: ' # Heading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
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
      name: 'Heading indented by three spaces',
      code: '   # Heading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Empty heading indented by spaces',
      code: '  #',
      output: '#',
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
    {
      name: 'Setext heading with an indented text line and an indented underline',
      code: '   Heading\n   ===',
      output: 'Heading\n   ===',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Indented heading interrupting a paragraph',
      code: 'text\n  # Heading',
      output: 'text\n# Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Multiple indented headings in a document',
      code: ' # A\n\n  # B\n\n   # C',
      output: '# A\n\n# B\n\n# C',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
        },
        {
          messageId: 'noHeadingIndentation',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Indented heading with CRLF line endings',
      code: 'Some text\r\n\r\n  # Heading',
      output: 'Some text\r\n\r\n# Heading',
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
      name: 'Indented heading after a byte order mark',
      code: '\uFEFF  # Heading',
      output: '\uFEFF# Heading',
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

    // Block quotes
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
      name: 'Heading in a block quote with a space and a tab after the marker',
      code: '> \t# Heading',
      output: '> # Heading',
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
      name: 'Heading in a block quote with a tab after the marker',
      code: '>\t# Heading',
      output: '> # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Heading in a nested block quote with tabs after the markers',
      code: '>\t>\t# Heading',
      output: '>\t> # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Heading in a block quote with spaces before and after the marker',
      code: '  >   # Heading',
      output: '  > # Heading',
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
      name: 'Indented heading after a lazy continuation line of a block quote',
      code: '> para\n  # Heading',
      output: '> para\n# Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },

    // Lists
    {
      name: 'Heading in a block quote after a list marker with extra spaces after the block quote marker',
      code: '- >   # Heading',
      output: '- > # Heading',
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
      name: 'Heading in a block quote in list item content with extra spaces after the marker',
      code: '- item\n\n  >   # Heading',
      output: '- item\n\n  > # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
        },
      ],
    },
    {
      name: 'Heading indented beyond list item content',
      code: '- item\n\n    # Heading',
      output: '- item\n\n  # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Setext heading indented beyond list item content',
      code: '- item\n\n    Heading\n  ===',
      output: '- item\n\n  Heading\n  ===',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Heading indented beyond list item content inside a block quote',
      code: '> - item\n>\n>     # Heading',
      output: '> - item\n>\n>   # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
        },
      ],
    },
    {
      name: 'Heading indented beyond list item content by a tab',
      code: '- item\n\n\t# Heading',
      output: '- item\n\n  # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Heading indented beyond empty list item content',
      code: '-\n   # Heading',
      output: '-\n  # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Heading indented beyond list item content after a tab',
      code: '-\titem\n\n      # Heading',
      output: '-\titem\n\n    # Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
        },
      ],
    },
    {
      name: 'Heading indented beyond task list item content',
      code: '- [ ] task\n\n    # Heading',
      output: '- [ ] task\n\n  # Heading',
      language: 'markdown/gfm',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Heading indented less than indented list item content is outside the list',
      code: '   - item\n\n  # Heading',
      output: '   - item\n\n# Heading',
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
      name: 'Heading indented less than list item content without a blank line is outside the list',
      code: '- item\n # Heading',
      output: '- item\n# Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Indented heading after a list ended by an HTML comment',
      code: '- item\n\n<!-- end -->\n\n  # Heading',
      output: '- item\n\n<!-- end -->\n\n# Heading',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 3,
        },
      ],
    },

    // Footnote definitions
    {
      name: 'Heading indented beyond footnote definition content',
      code: '[^1]: note\n\n      # Heading',
      output: '[^1]: note\n\n    # Heading',
      language: 'markdown/gfm',
      errors: [
        {
          messageId: 'noHeadingIndentation',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
        },
      ],
    },
  ],
});
