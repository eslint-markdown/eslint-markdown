/**
 * @fileoverview Test for `no-tab.ts`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-tab.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-tab', rule, {
  valid: [
    '',
    '  ',
    `
\`\`\`js
\t
\`\`\``,
    `
\`\`\`js\t
console.log(\t'Hello World');
\`\`\``,
    `\`console.log(\t'Hello World')\`

\`console.log(\t'Hello World')\``,
    {
      code: `\`\`\`md
Hello\tWorld
\`\`\``,
      options: [
        {
          skipCode: ['md'],
        },
      ],
    },
    {
      code: `\`\`\`md
Hello\tWorld
\`\`\`

\`\`\`txt
Hello\tWorld
\`\`\``,
      options: [
        {
          skipCode: ['md', 'txt'],
        },
      ],
    },
    {
      name: '`skipMath: true` default: tabs in math block should be skipped',
      code: `$$
a\tb
$$`,
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipInlineMath: true` default: tabs in inline math should be skipped',
      code: '$a\tb$',
      languageOptions: {
        math: true,
      },
    },
    {
      name: 'Default options: tabs in both math block and inline math should be skipped',
      code: `$$
a\tb
$$

$c\td$`,
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: true, skipInlineMath: false` options: math block should be skipped',
      code: `$$
a\tb
$$`,
      options: [
        {
          skipMath: true,
          skipInlineMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: false, skipInlineMath: true` options: inline math should be skipped',
      code: '$a\tb$',
      options: [
        {
          skipMath: false,
          skipInlineMath: true,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
  ],

  invalid: [
    // Basic
    {
      code: '\t',
      output: '    ',
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      code: '1\t',
      output: '1    ',
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
    {
      code: '`\t`\t',
      output: '`\t`    ',
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },

    // Options
    {
      code: `
\`\`\`js
console.log(\t'Hello World');
\`\`\``,
      output: `
\`\`\`js
console.log(    'Hello World');
\`\`\``,
      options: [
        {
          skipCode: false,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 14,
        },
      ],
    },
    {
      code: `\`\`\`md
Hello\tWorld
\`\`\`

\`\`\`txt
Hello\tWorld
\`\`\`

    code block with\ttab`,
      output: `\`\`\`md
Hello    World
\`\`\`

\`\`\`txt
Hello    World
\`\`\`

    code block with    tab`,
      options: [
        {
          skipCode: ['js', 'ts'],
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
        },
        {
          messageId: 'noTab',
          line: 6,
          column: 6,
          endLine: 6,
          endColumn: 7,
        },
        {
          messageId: 'noTab',
          line: 9,
          column: 20,
          endLine: 9,
          endColumn: 21,
        },
      ],
    },
    {
      code: "`console.log(\t'Hello World')`",
      output: "`console.log(    'Hello World')`",
      options: [
        {
          skipInlineCode: false,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      code: '1`\t`2\t',
      output: '1` `2 ',
      options: [
        {
          skipInlineCode: false,
          tabWidth: 1,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'noTab',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },
    {
      code: '1`\t`2\t',
      output: '1`  `2  ',
      options: [
        {
          skipInlineCode: false,
          tabWidth: 2,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'noTab',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },
    {
      name: '`skipMath: false` option: tabs in math block should be reported',
      code: `$$
a\tb
$$`,
      output: `$$
a    b
$$`,
      options: [
        {
          skipMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
      errors: [
        {
          messageId: 'noTab',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: '`skipInlineMath: false` option: tabs in inline math should be reported',
      code: '$a\tb$',
      output: '$a    b$',
      options: [
        {
          skipInlineMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: '`skipMath: false, skipInlineMath: true` options: math block is reported but inline math is skipped',
      code: `$$
a\tb
$$

$c\td$`,
      output: `$$
a    b
$$

$c\td$`,
      options: [
        {
          skipMath: false,
          skipInlineMath: true,
        },
      ],
      languageOptions: {
        math: true,
      },
      errors: [
        {
          messageId: 'noTab',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: '`skipMath: true, skipInlineMath: false` options: inline math is reported but math block is skipped',
      code: `$$
a\tb
$$

$c\td$`,
      output: `$$
a\tb
$$

$c    d$`,
      options: [
        {
          skipMath: true,
          skipInlineMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
      errors: [
        {
          messageId: 'noTab',
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'Default options: tabs in regular text after math block should still be reported',
      code: `$$
a\tb
$$

c\td`,
      output: `$$
a\tb
$$

c    d`,
      languageOptions: {
        math: true,
      },
      errors: [
        {
          messageId: 'noTab',
          line: 5,
          column: 2,
          endLine: 5,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Default options: tabs in regular text next to inline math should still be reported',
      code: '$a\tb$ c\td',
      output: '$a\tb$ c    d',
      languageOptions: {
        math: true,
      },
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
        },
      ],
    },
    {
      name: 'Math parsing disabled: `skipMath: true` does not exclude tabs enclosed in math block delimiters',
      code: `$$
a\tb
$$`,
      output: `$$
a    b
$$`,
      options: [
        {
          skipMath: true,
          skipInlineMath: true,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Math parsing disabled: `skipInlineMath: true` does not exclude tabs enclosed in inline math delimiters',
      code: '$a\tb$',
      output: '$a    b$',
      options: [
        {
          skipMath: true,
          skipInlineMath: true,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
  ],
});
