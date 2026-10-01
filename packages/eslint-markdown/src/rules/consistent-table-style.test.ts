/**
 * @fileoverview Test for `consistent-table-style.ts`.
 * @author 이규환(lee-kyu-hwan)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-table-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-table-style', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },

    // default options
    {
      name: 'Default options do not check blank lines around a table',
      code: `Paragraph
| a | b |
| - | - |
# Heading`,
    },
    {
      name: 'Default options do not check blank lines around a table in a blockquote',
      code: `> Paragraph
> | a | b |
> | - | - |
> # Heading`,
    },

    // option: `blankLineAbove`
    {
      name: '`blankLineAbove` option - table at the beginning of the file is skipped even if `blankLineAbove` is 2',
      code: `| a | b |
| - | - |`,
      options: [{ blankLineAbove: 2 }],
    },
    {
      name: '`blankLineAbove` option - one blank line at the beginning of the file is enough even if `blankLineAbove` is 2',
      code: `
| a | b |
| - | - |`,
      options: [{ blankLineAbove: 2 }],
    },
    {
      name: '`blankLineAbove` option - 1 whitespace-only blank line above',
      code: `Paragraph
\x20\t
| a | b |
| - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - 2 blank lines above when 1 is required',
      code: `Paragraph


| a | b |
| - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - 2 blank lines above',
      code: `Paragraph


| a | b |
| - | - |`,
      options: [{ blankLineAbove: 2 }],
    },
    {
      name: '`blankLineAbove` option - indented table',
      code: `Paragraph

  | a | b |
  | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - does not check blank lines below',
      code: `Paragraph

| a | b |
| - | - |
# Heading`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - table-like text in a fenced code block',
      code: `Paragraph
\`\`\`
| a | b |
| - | - |
\`\`\``,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - table-like text without a delimiter row',
      code: `Paragraph
| a | b |
Paragraph`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - table-like text with a mismatched delimiter row',
      code: `Paragraph
| a | b |
| - |
Paragraph`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with blockquote',
      code: `> Paragraph
>
> | a | b |
> | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with blockquote and a blank line with trailing whitespace',
      code: `> Paragraph
>\x20\x20
> | a | b |
> | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with blockquote and a blank line outside the blockquote',
      code: `Paragraph

> | a | b |
> | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with nested blockquote',
      code: `> > Paragraph
> >
> > | a | b |
> > | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with nested blockquote without spaces',
      code: `>> Paragraph
>>
>> | a | b |
>> | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with list',
      code: `- Paragraph

  | a | b |
  | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with list in blockquote',
      code: `> - Paragraph
>
>   | a | b |
>   | - | - |`,
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - with multiple tables',
      code: `| a |
| - |

| b |
| - |

Paragraph

| c |
| - |`,
      options: [{ blankLineAbove: 1 }],
    },

    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/doc/md058.md
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/test/blanks-around-tables.md
    {
      name: '`blankLineAbove` option - `markdownlint` example',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |`, // Start of file is skipped for blank line check, so no error is reported.
      options: [{ blankLineAbove: 1 }],
    },
    {
      name: '`blankLineAbove` option - `markdownlint` example',
      code: `# Blanks Around Tables

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |`,
      options: [{ blankLineAbove: 1 }],
    },

    // option: `blankLineBelow`
    {
      name: '`blankLineBelow` option - table at the end of the file is skipped',
      code: `| a | b |
| - | - |`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - table at the end of the file is skipped even if `blankLineBelow` is 2',
      code: `| a | b |
| - | - |`,
      options: [{ blankLineBelow: 2 }],
    },
    {
      name: '`blankLineBelow` option - trailing newline at the end of the file',
      code: `| a | b |
| - | - |
`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - one trailing newline at the end of the file is enough even if `blankLineBelow` is 2',
      code: `| a | b |
| - | - |
`,
      options: [{ blankLineBelow: 2 }],
    },
    {
      name: '`blankLineBelow` option - 1 whitespace-only blank line below',
      code: `| a | b |
| - | - |
\x20\t
Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - 2 blank lines below when 1 is required',
      code: `| a | b |
| - | - |


Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - 2 blank lines below',
      code: `| a | b |
| - | - |


Paragraph`,
      options: [{ blankLineBelow: 2 }],
    },
    {
      name: '`blankLineBelow` option - does not check blank lines above',
      code: `Paragraph
| a | b |
| - | - |

Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - text directly below the delimiter row is parsed as a table row',
      code: `| a | b |
| - | - |
Paragraph

Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - table-like rows directly below a table are parsed as table rows',
      code: `| a |
| - |
| b |
| - |`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - table-like text in a fenced code block',
      code: `\`\`\`
| a | b |
| - | - |
\`\`\`
Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with blockquote',
      code: `> | a | b |
> | - | - |
>
> Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with blockquote and a blank line with trailing whitespace',
      code: `> | a | b |
> | - | - |
>\x20\x20
> Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with blockquote and a blank line outside the blockquote',
      code: `> | a | b |
> | - | - |

Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with blockquote and text parsed as a table row',
      code: `> | a | b |
> | - | - |
> Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with nested blockquote',
      code: `> > | a | b |
> > | - | - |
> >
> > Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with nested blockquote without spaces and text parsed as a table row',
      code: `>> | a | b |
>> | - | - |
>> Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with list',
      code: `- Paragraph

  | a | b |
  | - | - |

  Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with list and text parsed as a table row',
      code: `- Paragraph

  | a | b |
  | - | - |
  Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - with list in blockquote',
      code: `> - Paragraph
>
>   | a | b |
>   | - | - |
>
>   Paragraph`,
      options: [{ blankLineBelow: 1 }],
    },

    {
      name: '`blankLineBelow` option - `markdownlint` example',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |`, // End of file is skipped for blank line check, so no error is reported.
      options: [{ blankLineBelow: 1 }],
    },
    {
      name: '`blankLineBelow` option - `markdownlint` example',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |

Text`,
      options: [{ blankLineBelow: 1 }],
    },

    // option: mixed
    {
      name: '`blankLineAbove` and `blankLineBelow` options - 2 blank lines around a table',
      code: `Paragraph


| a | b |
| - | - |


Paragraph`,
      options: [{ blankLineAbove: 2, blankLineBelow: 2 }],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - different numbers of blank lines around a table',
      code: `Paragraph


| a | b |
| - | - |



Paragraph`,
      options: [{ blankLineAbove: 2, blankLineBelow: 3 }],
    },

    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `Some text

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |

> Blockquote`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |`, // Start and end of file are skipped for blank line check, so no error is reported.
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
This text is part of the table and the next line is blank

Some text`, // Text immediately following a table is part of the table, so no error is reported.
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
    },
  ],

  invalid: [
    // option: `blankLineAbove`
    {
      name: '`blankLineAbove` option - 1 blank line above when 2 are required',
      code: `Paragraph

| a | b |
| - | - |`,
      options: [{ blankLineAbove: 2 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { blankLineAbove: 2 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - reports a table only once even if multiple lines above are not blank',
      code: `Paragraph
Paragraph
| a | b |
| - | - |`,
      options: [{ blankLineAbove: 2 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { blankLineAbove: 2 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - indented table',
      code: `Paragraph
  | a | b |
  | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - reports only the first line of a table with multiple rows',
      code: `Paragraph
| a | b |
| - | - |
| c | d |
| e | f |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - paragraph directly above a table followed by text parsed as a table row',
      code: `Paragraph
| a | b |
| - | - |
Paragraph`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - does not report blank lines below',
      code: `Paragraph
| a | b |
| - | - |
# Heading`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with blockquote',
      code: `> Paragraph
> | a | b |
> | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with blockquote and paragraph outside the blockquote',
      code: `Paragraph
> | a | b |
> | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with nested blockquote',
      code: `> > Paragraph
> > | a | b |
> > | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 5,
          endLine: 2,
          endColumn: 14,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with nested blockquote without spaces',
      code: `>> Paragraph
>> | a | b |
>> | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 13,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with list',
      code: `- Paragraph
  | a | b |
  | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with list item directly above a table in another list item',
      code: `- Paragraph
- | a | b |
  | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with list in blockquote',
      code: `> - Paragraph
>   | a | b |
>   | - | - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 5,
          endLine: 2,
          endColumn: 14,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` option - with multiple tables',
      code: `Paragraph
| a |
| - |

Paragraph
| b |
| - |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 6,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineAbove',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 6,
          data: { blankLineAbove: 1 },
        },
      ],
    },

    // NOTE: Unlike `markdownlint`, this rule doesn't skip front matter, which matches `consistent-code-style`.
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/lib/markdownlint.mjs#L123-L140
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/lib/markdownlint.mjs#L446-L448
    {
      name: '`blankLineAbove` option - with front matter directly above a table',
      code: `---
title: foo
---
| a | b |
| - | - |`,
      languageOptions: {
        frontmatter: 'yaml',
      },
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
      ],
    },

    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/doc/md058.md
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/test/blanks-around-tables.md
    {
      name: '`blankLineAbove` option - `markdownlint` example',
      code: `Text
| Header | Header |
| ------ | ------ |
| Cell   | Cell   |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 20,
          data: { blankLineAbove: 1 },
        },
      ],
    },

    // NOTE: Unlike `markdownlint`, this rule doesn't regard a line that contains only HTML comments as a blank line, to be consistent with `consistent-code-style`.
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/lib/md058.mjs#L25
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/helpers/helpers.cjs#L142-L169
    {
      name: '`blankLineAbove` option - HTML comment directly above a table is not a blank line',
      code: `Text
<!-- prettier-ignore -->
| Header | Header |
| ------ | ------ |
| Cell   | Cell   |`,
      options: [{ blankLineAbove: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 20,
          data: { blankLineAbove: 1 },
        },
      ],
    },

    // option: `blankLineBelow`
    {
      name: '`blankLineBelow` option - heading directly below a table',
      code: `| a | b |
| - | - |
# Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - list directly below a table',
      code: `| a | b |
| - | - |
- item`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - thematic break directly below a table',
      code: `| a | b |
| - | - |
---`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - fenced code block directly below a table',
      code: `| a | b |
| - | - |
\`\`\`
code
\`\`\``,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - HTML directly below a table',
      code: `| a | b |
| - | - |
<div>html</div>`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - 1 blank line below when 2 are required',
      code: `| a | b |
| - | - |

Paragraph`,
      options: [{ blankLineBelow: 2 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineBelow: 2 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - indented table',
      code: `  | a | b |
  | - | - |
# Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - reports only the last line of a table with multiple rows',
      code: `| a | b |
| - | - |
| c | d |
| e | f |
# Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - does not report blank lines above',
      code: `Paragraph
| a | b |
| - | - |
# Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with blockquote and paragraph outside the blockquote',
      code: `> | a | b |
> | - | - |
Paragraph`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with nested blockquote and paragraph in the outer blockquote',
      code: `> > | a | b |
> > | - | - |
> Paragraph`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 5,
          endLine: 2,
          endColumn: 14,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with nested blockquote without spaces',
      code: `>> | a | b |
>> | - | - |
>> # Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 13,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with list',
      code: `- Paragraph

  | a | b |
  | - | - |
  # Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 3,
          endLine: 4,
          endColumn: 12,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with list item directly below a table in another list item',
      code: `- | a | b |
  | - | - |
- Paragraph`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with list in blockquote',
      code: `> - | a | b |
>   | - | - |
> - Paragraph`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 5,
          endLine: 2,
          endColumn: 14,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - with multiple tables',
      code: `| a |
| - |
# Heading

| b |
| - |
# Heading`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 6,
          data: { blankLineBelow: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 6,
          data: { blankLineBelow: 1 },
        },
      ],
    },

    {
      name: '`blankLineBelow` option - `markdownlint` example',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
> Blockquote`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 20,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineBelow` option - `markdownlint` example',
      code: `> | Header | Header |
> | ------ | ------ |
> | Cell   | Cell   |
> > Blockquote`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 22,
          data: { blankLineBelow: 1 },
        },
      ],
    },

    // NOTE: Unlike `markdownlint`, this rule doesn't regard a line that contains only HTML comments as a blank line, to be consistent with `consistent-code-style`.
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/lib/md058.mjs#L41
    // see: https://github.com/DavidAnson/markdownlint/blob/e41e5a40ba934f079da0ffbdea0309869c034d47/helpers/helpers.cjs#L142-L169
    {
      name: '`blankLineBelow` option - HTML comment directly below a table is not a blank line',
      code: `| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
<!-- comment -->
Text`,
      options: [{ blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 20,
          data: { blankLineBelow: 1 },
        },
      ],
    },

    // option: mixed
    {
      name: '`blankLineAbove` and `blankLineBelow` options - 1 blank line around a table when 2 are required',
      code: `Paragraph

| a | b |
| - | - |

Paragraph`,
      options: [{ blankLineAbove: 2, blankLineBelow: 2 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { blankLineAbove: 2 },
        },
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 10,
          data: { blankLineBelow: 2 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - only the blank line above is missing',
      code: `Paragraph
| a | b |
| - | - |

Paragraph`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - only the blank line below is missing',
      code: `Paragraph

| a | b |
| - | - |
# Heading`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - with list items directly around a table',
      code: `- Paragraph
- | a | b |
  | - | - |
- Paragraph`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 12,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - with a table in a blockquote followed by a table outside the blockquote',
      code: `> Paragraph
> | a | b |
> | - | - |

Paragraph
| c | d |
| - | - |
# Heading`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 12,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineAbove',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 7,
          column: 1,
          endLine: 7,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },

    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `Some text
| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
> Blockquote`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 20,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 20,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `> Text
> | Header | Header |
> | ------ | ------ |
> | Cell   | Cell   |
Text`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 22,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 3,
          endLine: 4,
          endColumn: 22,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `- List Item
  | Header | Header |
  | ------ | ------ |
  | Cell   | Cell   |
- List Item`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 22,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 3,
          endLine: 4,
          endColumn: 22,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - `markdownlint` example',
      code: `1. List Item
\x20\x20\x20| Header | Header |
\x20\x20\x20| ------ | ------ |
\x20\x20\x20| Cell   | Cell   |
1. List Item`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 23,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 4,
          endLine: 4,
          endColumn: 23,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - with CRLF line endings',
      code: 'Paragraph\r\n| a | b |\r\n| - | - |\r\n# Heading\r\n',
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - with a single column table',
      code: `Paragraph
| a |
| - |
# Heading`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 6,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 6,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - with blockquote in list',
      code: `- item
  > Paragraph
  > | a |
  > | - |
  > # Heading`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 10,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 4,
          column: 5,
          endLine: 4,
          endColumn: 10,
          data: { blankLineBelow: 1 },
        },
      ],
    },
    {
      name: '`blankLineAbove` and `blankLineBelow` options - with a table without leading and trailing pipes',
      code: `# Heading
a | b
-- | --
> Blockquote`,
      options: [{ blankLineAbove: 1, blankLineBelow: 1 }],
      errors: [
        {
          messageId: 'blankLineAbove',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 6,
          data: { blankLineAbove: 1 },
        },
        {
          messageId: 'blankLineBelow',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { blankLineBelow: 1 },
        },
      ],
    },
  ],
});
