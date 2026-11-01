/**
 * @fileoverview Test for `consistent-ordered-list-style.ts`.
 * @author Ga eun Lee
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-ordered-list-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-ordered-list-style', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },

    // `one-or-ordered` style
    {
      name: '`one-or-ordered` style - single item',
      code: '1. First',
    },
    {
      name: '`one-or-ordered` style - all prefixes are `1` (`.` delimiters)',
      code: `1. First
1. Second
1. Third`,
    },
    {
      name: '`one-or-ordered` style - all prefixes are `1` (`)` delimiters)',
      code: `1) First
1) Second
1) Third`,
    },
    {
      name: '`one-or-ordered` style - all prefixes have leading zeros',
      code: `01. First
01. Second
01. Third`,
    },
    {
      name: '`one-or-ordered` style - prefixes increase from `1`',
      code: `1. First
2. Second
3. Third`,
    },
    {
      name: '`one-or-ordered` style - prefixes increase from `0`',
      code: `0. First
1. Second
2. Third`,
    },
    {
      name: '`one-or-ordered` style - all prefixes have leading zeros increasing from `00`',
      code: `00. First
01. Second
02. Third`,
    },

    {
      name: '`one-or-ordered` style - nested ordered lists use independent prefix sequences',
      code: `1. Outer first
    1. Nested first
    2. Nested second
1. Outer second`,
    },
    {
      name: '`one-or-ordered` style - ordered list in a blockquote',
      code: `> 1. First
> 1. Second`,
    },
    {
      name: '`one-or-ordered` style - separate ordered lists use independent prefix sequences',
      code: `1. First
2. Second

Paragraph

1. First
1. Second`,
    },
    {
      name: '`one-or-ordered` style - unordered lists are ignored',
      code: `- First
- Second

1. First
1. Second`,
    },

    // `one` style
    {
      name: '`one` style - single item',
      code: '1. First',
      options: [{ style: 'one' }],
    },
    {
      name: '`one` style - all prefixes are `1`',
      code: `1. First
1. Second
1. Third`,
      options: [{ style: 'one' }],
    },

    // `ordered` style
    {
      name: '`ordered` style - single item',
      code: '1. First',
      options: [{ style: 'ordered' }],
    },
    {
      name: '`ordered` style - prefixes increase from `1`',
      code: `1. First
2. Second
3. Third`,
      options: [{ style: 'ordered' }],
    },
    {
      name: '`ordered` style - prefixes increase from `0`',
      code: `0. First
1. Second
2. Third`,
      options: [{ style: 'ordered' }],
    },

    // `zero` style
    {
      name: '`zero` style - single item',
      code: '0. First',
      options: [{ style: 'zero' }],
    },
    {
      name: '`zero` style - all prefixes are `0`',
      code: `0. First
0. Second
0. Third`,
      options: [{ style: 'zero' }],
    },
  ],

  invalid: [
    // Autofix alignment and padding
    {
      name: 'Autofix - permits four spaces after a parent marker on the same line',
      code: '- 1234. Nested',
      output: '-    1. Nested',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 7,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - does not exceed four spaces after a parent marker on the same line',
      code: '-  1234. Nested',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 8,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - preserves right alignment with spaces',
      code: ' 1. First\n10. Second',
      output: ' 1. First\n 2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - includes spaces after the delimiter when detecting alignment',
      code: '1.  First\n20. Second',
      output: '1.  First\n 2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - preserves aligned leading zeros with parenthesis delimiters',
      code: '01) First\n03) Second',
      output: '01) First\n02) Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - removes padding when prefixes are not aligned',
      code: '01. First\n003. Second',
      output: '01. First\n2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - uses the first prefix to choose between space and zero padding',
      code: '1.   First\n003. Second',
      output: '1.   First\n  2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - pads a single zero-prefixed item with spaces like markdownlint',
      code: '02. Single',
      output: ' 1. Single',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - permits three added padding spaces',
      code: '1234. Single',
      output: '   1. Single',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - does not add four padding spaces that would create a code block',
      code: '12345. Single',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - still fixes nine-digit prefixes when no space padding is needed',
      code: '1. First\n123456789. Second',
      output: '1. First\n2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - accounts for existing indentation before adding spaces',
      code: ' 1234. Single',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 6,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - accounts for indentation inside a blockquote',
      code: '>  1234. Single',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 8,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - permits safe space padding inside an unordered list',
      code: '- Outer\n\n  1234. Nested',
      output: '- Outer\n\n     1. Nested',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 7,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - accounts for extra indentation inside an ordered list',
      code: '1. Outer\n\n    1234. Nested',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 9,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - preserves zero padding in lists starting from zero',
      code: '00. First\n03. Second',
      output: '00. First\n01. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - preserves nine-digit zero padding without introducing spaces',
      code: '000000001. First\n000000003. Second',
      output: '000000001. First\n000000002. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - permits safe padding in a list nested inside a blockquote',
      code: '> - Outer\n>\n>   1234. Nested',
      output: '> - Outer\n>\n>      1. Nested',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 9,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - accounts for varying blockquote indentation around a nested list',
      code: '> - Outer\n>\n >    1234. Nested',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 7,
          endLine: 3,
          endColumn: 11,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - withholds space padding when preceding indentation contains tabs',
      code: '>\t123. Single',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 6,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - withholds space padding when parent indentation contains tabs',
      code: '-\tOuter\n\n    12. Nested',
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - preserves zero padding with the one style',
      code: '01. First\n02. Second',
      output: '01. First\n01. Second',
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: 'Autofix - preserves zero padding with the zero style',
      code: '00. First\n02. Second',
      output: '00. First\n00. Second',
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'zero' },
        },
      ],
    },
    {
      name: 'Autofix - detects nested list alignment independently',
      code: '01. Outer first\n    1. Nested first\n    10. Nested second\n03. Outer second',
      output:
        '01. Outer first\n    1. Nested first\n    2. Nested second\n02. Outer second',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: 'ordered' },
        },
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - preserves alignment inside blockquotes',
      code: '>  1. First\n> 10. Second',
      output: '>  1. First\n>  2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - counts tab characters when comparing prefix end columns',
      code: '1.\t First\n20. Second',
      output: '1.\t First\n 2. Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - accounts for tab expansion exceeding four padding spaces',
      code: '1.\t\tFirst\n20.\t Second',
      output: '1.\t\tFirst\n2.\t Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - excludes indented code whitespace from list prefixes',
      code: '1.     Code\n20.    Second',
      output: '1.     Code\n2.    Second',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - preserves zero padding in empty items',
      code: '01.\n03.',
      output: '01.\n02.',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - excludes trailing spaces from empty item prefixes',
      code: '1. \n20.',
      output: '1. \n2.',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - expands a marker when the ordered sequence reaches ten',
      code: '1. One\n2. Two\n3. Three\n4. Four\n5. Five\n6. Six\n7. Seven\n8. Eight\n9. Nine\n1. Ten',
      output:
        '1. One\n2. Two\n3. Three\n4. Four\n5. Five\n6. Six\n7. Seven\n8. Eight\n9. Nine\n10. Ten',
      errors: [
        {
          messageId: 'style',
          line: 10,
          column: 1,
          endLine: 10,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - preserves CRLF line endings and continuation lines',
      code: '1. First\r\n3. Second\r\n   Continued\r\n',
      output: '1. First\r\n2. Second\r\n   Continued\r\n',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: 'Autofix - preserves GFM task checkboxes and zero padding',
      code: '01. [ ] First\n03. [x] Second',
      output: '01. [ ] First\n02. [x] Second',
      language: 'markdown/gfm',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'ordered' },
        },
      ],
    },

    // `one-or-ordered` style
    {
      name: '`one-or-ordered` style - single item does not start with `1`',
      code: '2. First',
      output: '1. First',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: '`one-or-ordered` style - infers `one` from the second prefix',
      code: `2. First
1. Second`,
      output: `1. First
1. Second`,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: '`one-or-ordered` style - infers `ordered` from a zero prefix',
      code: `0. First
0. Second
0. Third`,
      output: `0. First
1. Second
2. Third`,
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'ordered' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: '`one-or-ordered` style - prefixes do not increase sequentially',
      code: `1. First
3. Second
4. Third`,
      output: `1. First
2. Second
3. Third`,
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'ordered' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: '`one-or-ordered` style - prefixes do not remain `1`',
      code: `1. First
1. Second
2. Third`,
      output: `1. First
1. Second
1. Third`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: '`one-or-ordered` style - infers nested list styles independently of the outer list',
      code: `1. Outer first
    1. Nested first
    3. Nested second
1. Outer second`,
      output: `1. Outer first
    1. Nested first
    2. Nested second
1. Outer second`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 6,
          data: { style: 'ordered' },
        },
      ],
    },

    // `one` style
    {
      name: '`one` style - single item does not start with `1`',
      code: '2. First',
      output: '1. First',
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: '`one` style - prefixes are not all `1`',
      code: `1. First
2. Second
3. Third`,
      output: `1. First
1. Second
1. Third`,
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'one' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: 'one' },
        },
      ],
    },
    {
      name: '`one` style - multi-digit prefixes report the entire number',
      code: `1. First
10. Second`,
      output: `1. First
1. Second`,
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { style: 'one' },
        },
      ],
    },

    // `ordered` style
    {
      name: '`ordered` style - single item does not start with `1`',
      code: '0. First',
      output: '1. First',
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: '`ordered` style - prefixes do not increase',
      code: `1. First
1. Second
1. Third`,
      output: `1. First
2. Second
3. Third`,
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'ordered' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: '`ordered` style - single item does not start with `1`',
      code: `2. hi
3. hi`,
      output: `1. hi
2. hi`,
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'ordered' },
        },
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: '`ordered` style - nested ordered lists report their own prefix sequence',
      code: `1. Outer first
    1. Nested first
    3. Nested second
1. Outer second`,
      output: `1. Outer first
    1. Nested first
    2. Nested second
2. Outer second`,
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 6,
          data: { style: 'ordered' },
        },
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 2,
          data: { style: 'ordered' },
        },
      ],
    },
    {
      name: '`ordered` style - Ordered lists in blockquotes report the prefix location',
      code: `> 1. First
> 3. Second`,
      output: `> 1. First
> 2. Second`,
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: { style: 'ordered' },
        },
      ],
    },

    // `zero` style
    {
      name: '`zero` style - single item does not start with `0`',
      code: '1. First',
      output: '0. First',
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'zero' },
        },
      ],
    },
    {
      name: '`zero` style - prefixes are not all `0`',
      code: `0. First
1. Second
2. Third`,
      output: `0. First
0. Second
0. Third`,
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: 'zero' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: 'zero' },
        },
      ],
    },
  ],
});
