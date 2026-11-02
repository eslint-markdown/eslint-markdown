/**
 * @fileoverview Tests for `no-multiple-atx-heading-space` rule.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { it } from 'vitest';
import { Linter } from 'eslint/universal';
import markdown from '@eslint/markdown';
import md from '../index.js';
import ruleTester from '../tests/rule-tester.js';
import rule from './no-multiple-atx-heading-space.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-multiple-atx-heading-space', rule, {
  valid: [
    // Basic
    {
      name: 'Basic: Empty document',
      code: '',
    },
    {
      name: 'Basic: Whitespace-only document',
      code: '  ',
    },
    {
      name: 'Basic: Multiple spaces in paragraphs are ignored',
      code: 'Paragraph  with  multiple  spaces.',
    },

    // ATX
    {
      name: 'ATX: Headings with one space after the opening sequence',
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
      name: 'ATX: Multiple spaces within heading content are allowed',
      code: '# Heading  with  multiple  spaces',
    },
    {
      name: 'ATX: One space after the opening sequence is allowed',
      code: '## Heading',
    },
    {
      name: 'ATX: One tab after the opening sequence is allowed',
      code: '#\tHeading',
    },
    {
      name: 'ATX: Trailing spaces after the heading are allowed',
      code: '## Heading  ',
    },
    {
      name: 'ATX: Escaped trailing hash is not a closing sequence',
      code: '# Heading  \\#',
    },
    {
      name: 'ATX: Inline Markdown in heading content is allowed',
      code: '# **bold** `code` [link](https://example.com)',
    },
    {
      name: 'ATX: Non-breaking space entities in heading content are allowed',
      code: '# &nbsp;&nbsp;Heading',
    },

    // Empty ATX heading
    {
      name: 'ATX: Empty heading is allowed',
      code: '##',
    },

    // ATX Closed
    {
      name: 'ATX Closed: Headings with one space around both sequences',
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
      name: 'ATX Closed: Multiple spaces within heading content are allowed',
      code: '# Heading  with  multiple  spaces #',
    },
    {
      name: 'ATX Closed: One space around both sequences is allowed',
      code: '## Heading ##',
    },
    {
      name: 'ATX Closed: One tab before the closing sequence is allowed',
      code: '# Heading\t#',
    },
    {
      name: 'ATX Closed: One tab around both sequences is allowed',
      code: '#\tHeading\t#',
    },
    {
      name: 'ATX Closed: Trailing spaces after the closing sequence are allowed',
      code: '## Heading ##  ',
    },

    // Setext
    {
      name: 'Setext: Multiple spaces in Setext headings are ignored',
      code: `
Heading  1
=========

Heading  2
---------
`,
    },
    {
      name: 'Setext: Escaped markers in Setext headings are ignored',
      code: `
\\##   foo bar baz
===

\\##   foo bar baz
---
`,
    },
    {
      name: 'Setext: Escaped markers in Setext headings are ignored',
      code: `
\\##   foo bar baz   \\##
===

\\##   foo bar baz   \\##
---
`,
    },

    // `checkClosedHeading` option
    {
      name: 'ATX Closed: Multiple spaces before the closing sequence are allowed when closing checks are disabled',
      code: '## Heading   ##',
      options: [{ checkClosedHeading: false }],
    },
    {
      name: 'ATX Closed: Empty heading with two spaces is allowed when closing checks are disabled',
      code: '##  ##',
      options: [{ checkClosedHeading: false }],
    },
    {
      name: 'ATX Closed: Empty heading with three spaces is allowed when closing checks are disabled',
      code: '##   ##',
      options: [{ checkClosedHeading: false }],
    },
    {
      name: 'ATX Closed: Empty heading with two tabs is allowed when closing checks are disabled',
      code: '##\t\t##',
      options: [{ checkClosedHeading: false }],
    },
    {
      name: 'ATX Closed: Empty heading with a space followed by a tab is allowed when closing checks are disabled',
      code: '## \t##',
      options: [{ checkClosedHeading: false }],
    },
    {
      name: 'ATX Closed: Empty heading with a tab followed by a space is allowed when closing checks are disabled',
      code: '##\t ##',
      options: [{ checkClosedHeading: false }],
    },
  ],

  invalid: [
    // Opening sequences
    {
      name: 'ATX: Two spaces after the opening sequence are removed',
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
      name: 'ATX: Multiple spaces after the opening sequence are removed',
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
      name: 'ATX: Multiple tabs after the opening sequence are removed',
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
      name: 'ATX: Mixed spaces and tabs after the opening sequence are removed',
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
      name: 'ATX: Multiple spaces before inline Markdown are removed',
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
      name: 'ATX: Multiple spaces before non-breaking space entities are removed',
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
      name: 'ATX: Multiple opening spaces are removed when content contains a hash',
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
      name: 'ATX: Multiple opening spaces are removed with CRLF line endings',
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
      name: 'ATX: Multiple opening spaces are removed in block containers',
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
      name: 'ATX Closed: Multiple spaces after the opening sequence are removed',
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
      name: 'ATX Closed: Multiple spaces before the closing sequence are removed',
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
      name: 'ATX Closed: Multiple tabs before the closing sequence are removed',
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
      name: 'ATX Closed: Mixed spaces and tabs before the closing sequence are removed',
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
      name: 'ATX Closed: Extra spaces before the closing sequence are removed without changing trailing spaces',
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

    // Opening and closing sequences
    {
      name: 'ATX Closed: Multiple spaces around both sequences are removed',
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
      name: 'ATX: Multiple open and closed headings are fixed independently',
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

    // Empty ATX heading:
    // Intentionally doesn't follow `markdownlint`'s error location
    // for more accurate error reporting and auto fixing.
    {
      name: 'ATX: Multiple spaces in an empty heading are removed',
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
      name: 'ATX: Multiple tabs after the opening sequence are removed',
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
      name: 'ATX: Multiple mixed whitespace after the opening sequence are removed',
      code: '## \t \t',
      output: '##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },

    // Empty ATX Closed heading:
    // Intentionally doesn't follow `markdownlint`'s error location
    // for more accurate error reporting and auto fixing.
    {
      name: 'ATX Closed: Empty heading with two spaces is removed',
      code: '##  ##',
      output: '## ##',
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
      name: 'ATX Closed: Empty heading with multiple spaces is removed',
      code: '##   ##',
      output: '## ##',
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
    {
      name: 'ATX Closed: Empty heading with two tabs is removed',
      code: '##\t\t##',
      output: '##\t##',
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
      name: 'ATX Closed: Empty heading with a space followed by a tab is removed',
      code: '## \t##',
      output: '## ##',
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
      name: 'ATX Closed: Empty heading with a tab followed by a space is removed',
      code: '##\t ##',
      output: '##\t##',
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
      name: 'ATX Closed: Empty heading with a tab between spaces is removed',
      code: '## \t ##',
      output: '## ##',
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
    {
      name: 'ATX Closed: Empty heading with space between tabs is removed',
      code: '##\t \t##',
      output: '##\t##',
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
    {
      name: 'ATX Closed: Empty heading with mixed excess whitespace is removed',
      code: '## \t\t ##',
      output: '## ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },

    // Setext underlines after an ATX heading
    {
      name: 'ATX: Multiple opening spaces are removed before an equals line',
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
      name: 'ATX: Multiple opening spaces are removed before a dashes line',
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
      name: 'ATX Closed: Multiple spaces around both sequences are removed before an equals line',
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
      name: 'ATX Closed: Multiple spaces around both sequences are removed before a dashes line',
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

    // `checkClosedHeading` option
    {
      name: 'ATX Closed: Opening spaces are removed when closing checks are disabled',
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
  ],
});

it('ATX: Linting an empty heading with 50,000 spaces finishes promptly', () => {
  new Linter().verify(`#${' '.repeat(50_000)}`, {
    language: 'markdown/commonmark',
    plugins: { markdown, md },
    rules: { 'md/no-multiple-atx-heading-space': 'error' },
  });
}, 500);

it('ATX Closed: Linting 50,000 spaces within heading content finishes promptly', () => {
  new Linter().verify(`# a${' '.repeat(50_000)}b  #`, {
    language: 'markdown/commonmark',
    plugins: { markdown, md },
    rules: { 'md/no-multiple-atx-heading-space': 'error' },
  });
}, 500);
