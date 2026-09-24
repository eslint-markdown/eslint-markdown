/**
 * @fileoverview Tests for `no-multiple-atx-heading-space` rule.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-multiple-atx-heading-space.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-multiple-atx-heading-space', rule, {
  valid: [
    // Basic cases
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'ATX headings with one space after the opening sequence',
      code: `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`,
    },
    {
      name: 'Closed ATX headings with one space after the opening sequence',
      code: `
# Heading 1 #
## Heading 2 ##
### Heading 3 ###
#### Heading 4 ####
##### Heading 5 #####
###### Heading 6 ######
`,
    },
    {
      name: 'ATX heading containing inline Markdown',
      code: '# **bold** `code` [link](https://example.com)',
    },

    // Accepted whitespace
    {
      name: 'should not report multiple spaces within ATX heading content',
      code: '# Heading  with  multiple  spaces',
    },
    {
      name: 'should allow one tab after an ATX opening sequence',
      code: '#\tHeading',
    },
    {
      name: 'should not report trailing spaces after an ATX closing sequence',
      code: '## Heading ##  ',
    },
    {
      name: 'should allow one space before an ATX closing sequence',
      code: '## Heading ##',
    },
    {
      name: 'Closed ATX heading with one tab before the closing sequence',
      code: '# Heading\t#',
    },
    {
      name: 'should not treat an escaped trailing hash as an ATX closing sequence',
      code: '# Heading  \\#',
    },

    // `checkClosedHeading` option
    {
      name: 'should not check spaces before an ATX closing sequence when disabled',
      code: '## Heading   ##',
      options: [{ checkClosedHeading: false }],
    },

    // Non-ATX content
    {
      name: 'should not report multiple spaces in Setext headings',
      code: `
Heading  1
=========

Heading  2
---------
`,
    },
    {
      name: 'should not report multiple spaces in escaped ATX headings',
      code: `
\\##   foo bar baz
===

\\##   foo bar baz
---
`,
    },
    {
      name: 'should not report multiple spaces in escaped closed ATX headings',
      code: `
\\##   foo bar baz   \\##
===

\\##   foo bar baz   \\##
---
`,
    },
    {
      name: 'should not report multiple spaces in paragraphs',
      code: 'Paragraph  with  multiple  spaces.',
    },

    // HTML entities
    {
      name: 'ATX heading containing non-breaking space entities',
      code: '# &nbsp;&nbsp;Heading',
    },

    // Empty
    {
      name: 'Empty closed ATX heading with two tabs',
      code: '##\t\t##',
    },
    {
      name: 'Empty closed ATX heading with multiple spaces when closed headings are not checked',
      code: '##  ##',
      options: [{ checkClosedHeading: false }],
    },
    {
      name: 'Empty closed ATX heading with a space followed by a tab',
      code: '## \t##',
    },
    {
      name: 'Empty closed ATX heading with a tab followed by a space',
      code: '##\t ##',
    },
  ],

  invalid: [
    // Opening sequences
    {
      name: 'ATX heading with two spaces after the opening sequence',
      code: '#  Heading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with multiple spaces after the opening sequence',
      code: '###    Heading',
      output: '### Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Closed ATX heading with multiple spaces after the opening sequence',
      code: '##   Heading ##',
      output: '## Heading ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },

    // Closing sequences
    {
      name: 'should report multiple spaces before an ATX closing sequence',
      code: '## Heading   ##',
      output: '## Heading ##',
      errors: [
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'should report multiple spaces on both sides of a closed ATX heading',
      code: '##   Heading   ##',
      output: '## Heading ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Closed ATX heading with multiple spaces on both sides when closed headings are not checked',
      code: '##   Heading   ##',
      output: '## Heading   ##',
      options: [{ checkClosedHeading: false }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },

    // Empty headings
    {
      name: 'Empty ATX heading with multiple spaces',
      code: '##  ',
      output: '##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with excess whitespace',
      code: '##   ##',
      output: '##  ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with excess whitespace when closed headings are not checked',
      code: '##   ##',
      output: '##  ##',
      options: [{ checkClosedHeading: false }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with a tab between spaces',
      code: '## \t ##',
      output: '##  ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with a space between tabs',
      code: '##\t \t##',
      output: '##\t\t##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with multiple mixed whitespace characters',
      code: '## \t\t ##',
      output: '##  ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },

    // Whitespace variants
    {
      name: 'Empty ATX heading with multiple tabs',
      code: '##\t\t',
      output: '##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'ATX heading with multiple tabs after the opening sequence',
      code: '#\t\tHeading',
      output: '#\tHeading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with mixed spaces and tabs after the opening sequence',
      code: '# \t\t Heading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Closed ATX heading with multiple tabs before the closing sequence',
      code: '# Heading\t\t#',
      output: '# Heading\t#',
      errors: [
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Closed ATX heading with mixed spaces and tabs before the closing sequence',
      code: '# Heading \t #',
      output: '# Heading #',
      errors: [
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'Closed ATX heading with trailing spaces after the closing sequence',
      code: '# Heading   ##  ',
      output: '# Heading ##  ',
      errors: [
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },

    // Complex cases
    {
      name: 'ATX heading with inline Markdown after multiple spaces',
      code: '#   **bold** `code` [link](https://example.com)',
      output: '# **bold** `code` [link](https://example.com)',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'ATX heading with multiple spaces before non-breaking space entities',
      code: '#  &nbsp;&nbsp;Heading',
      output: '# &nbsp;&nbsp;Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with a hash in its content',
      code: '#  Heading # hashtag',
      output: '# Heading # hashtag',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with CRLF line endings',
      code: 'Paragraph.\r\n\r\n#  Heading\r\n',
      output: 'Paragraph.\r\n\r\n# Heading\r\n',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX headings nested in block containers',
      code: `
> #  Blockquote heading

- ##   List heading ##
`,
      output: `
> # Blockquote heading

- ## List heading ##
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 5,
          endLine: 2,
          endColumn: 6,
        },
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 4,
          column: 6,
          endLine: 4,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Multiple invalid ATX headings',
      code: `
#  Heading 1
## Heading 2  ##
`,
      output: `
# Heading 1
## Heading 2 ##
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
        },
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 3,
          column: 14,
          endLine: 3,
          endColumn: 15,
        },
      ],
    },

    // Setext underlines after an ATX heading
    {
      name: 'ATX heading followed by an equals line',
      code: `
##   foo bar baz
===
`,
      output: `
## foo bar baz
===
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'ATX heading followed by a dashes line',
      code: `
##   foo bar baz
---
`,
      output: `
## foo bar baz
---
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Closed ATX heading followed by an equals line',
      code: `
##   foo bar baz   ##
===
`,
      output: `
## foo bar baz ##
===
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 20,
        },
      ],
    },
    {
      name: 'Closed ATX heading followed by a dashes line',
      code: `
##   foo bar baz   ##
---
`,
      output: `
## foo bar baz ##
---
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
        {
          messageId: 'noMultipleAtxClosedHeadingSpace',
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 20,
        },
      ],
    },
  ],
});
