/**
 * @fileoverview Test for `no-multiple-link-space.ts`.
 * @author Marry(uncoolclub)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-multiple-link-space.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-multiple-link-space', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'Inline link without padding',
      code: '[ESLint](https://eslint.org)',
    },
    {
      name: 'Full reference link without padding',
      code: '[ESLint][eslint]\n\n[eslint]: https://eslint.org',
    },
    {
      name: 'Collapsed reference link without padding',
      code: '[ESLint][]\n\n[ESLint]: https://eslint.org',
    },
    {
      name: 'Shortcut reference link without padding',
      code: '[ESLint]\n\n[ESLint]: https://eslint.org',
    },
    {
      name: 'Empty link text',
      code: '[](https://eslint.org)',
    },
    {
      name: 'Spaces between words of the link text',
      code: '[a b](https://eslint.org)',
    },
    {
      name: 'Spaces outside the link',
      code: 'a [ESLint](https://eslint.org) b',
    },
    {
      name: 'Spaces inside the destination',
      code: '[ESLint](<https://eslint.org/a b>)',
    },
    {
      name: 'Image with padding is out of scope',
      code: '![ ESLint ](https://eslint.org/logo.png)',
    },
    {
      name: 'Image reference with padding is out of scope',
      code: '![ ESLint ][eslint]\n\n[eslint]: https://eslint.org/logo.png',
    },
    {
      // NOTE: Removing the line break would drop the hard break it forms with the two spaces.
      name: 'Hard break at the end of the link text',
      code: '[ESLint  \n](https://eslint.org)',
    },
    {
      // NOTE: Removing the line break would leave the backslash escaping the closing bracket.
      name: 'Backslash before a line break at the end of the link text',
      code: '[ESLint\\\n](https://eslint.org)',
    },
    {
      name: 'Line break alone at both ends of the link text',
      code: '[\nESLint\n](https://eslint.org)',
    },
    {
      // NOTE: The two spaces form a hard break with the line ending, so they are not padding.
      name: 'Hard break at the start of the link text',
      code: '[  \nESLint](https://eslint.org)',
    },
    {
      // NOTE: Removing the padding would leave the backslash escaping the closing bracket.
      name: 'Backslash before padding at the end of the link text',
      code: '[ESLint\\ ](https://eslint.org)',
    },
    {
      // NOTE: The blockquote marker of the second line sits between the text and the bracket.
      name: 'Link text spanning lines of a blockquote',
      code: '> [ESLint\n> ](https://eslint.org)',
    },
    {
      name: 'Padding next to a line break inside the link text',
      code: '[ \nESLint\n ](https://eslint.org)',
    },
    {
      name: 'Autolink followed by trailing spaces',
      code: '<https://eslint.org>  ',
    },
    {
      name: 'Autolink followed by brackets that are not a link',
      code: '<https://eslint.org> [ ESLint ]',
    },
    {
      name: 'GFM literal autolink followed by brackets that are not a link',
      code: 'https://eslint.org [ ESLint ]',
    },
    {
      // NOTE: `[x]` at the head of a list item is a GFM checkbox, so the fix would drop the link.
      name: 'Shortcut reference that would become a checked task list item',
      code: '- [x ] details\n\n[x]: https://eslint.org',
    },
    {
      // NOTE: The list marker sits on an earlier line, so the line holding the link has none.
      name: 'Shortcut reference that would become a task list item across lines',
      code: '-\n  [x ] details\n\n[x]: https://eslint.org',
    },
    {
      // NOTE: The definition renders nothing, so the paragraph after it still opens the list item.
      name: 'Shortcut reference that would become a task list item after a definition',
      code: '- [x]: https://eslint.org\n  [x ] details',
    },
    {
      name: 'Shortcut reference that would become a task list item of a doubly marked list',
      code: '- - [x ] details\n\n[x]: https://eslint.org',
    },
    {
      name: 'Shortcut reference that would become a task list item of a nested list',
      code: '- > - [x ] details\n\n[x]: https://eslint.org',
    },
    {
      name: 'Shortcut reference in uppercase that would become a task list item',
      code: '- [ X ] details\n\n[x]: https://eslint.org',
    },
    {
      name: 'Shortcut reference that would become a task list item of an ordered list',
      code: '1. [x ] details\n\n[x]: https://eslint.org',
    },
    {
      // NOTE: A no-break space is not padding under this rule, unlike `MD039`.
      name: 'No-break space at both ends of the link text',
      code: '[\u00a0ESLint\u00a0](https://eslint.org)',
    },
    {
      name: 'Bracket that is not a link',
      code: '[ ESLint ]',
    },
    {
      name: 'Inline code containing a padded link',
      code: '`[ ESLint ](https://eslint.org)`',
    },
    {
      name: 'Fenced code block containing a padded link',
      code: '```md\n[ ESLint ](https://eslint.org)\n```',
    },
  ],

  invalid: [
    {
      name: 'Padding on both ends',
      code: '[ ESLint ](https://eslint.org)',
      output: '[ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Padding at the start only',
      code: '[ ESLint](https://eslint.org)',
      output: '[ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Padding at the end only',
      code: '[ESLint ](https://eslint.org)',
      output: '[ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
        },
      ],
    },
    {
      name: 'Multiple spaces as padding',
      code: '[   ESLint   ](https://eslint.org)',
      output: '[ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Tabs as padding',
      code: '[\tESLint\t](https://eslint.org)',
      output: '[ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // NOTE: Both ends match over the same characters, so the padding is reported once.
      name: 'Link text of padding only',
      code: '[ ](https://eslint.org)',
      output: '[](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Full reference link',
      code: '[ ESLint ][eslint]\n\n[eslint]: https://eslint.org',
      output: '[ESLint][eslint]\n\n[eslint]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // NOTE: The label normalizes to `eslint`, so the definition still matches after the fix.
      name: 'Shortcut reference link',
      code: '[ ESLint ]\n\n[eslint]: https://eslint.org',
      output: '[ESLint]\n\n[eslint]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Link text starting with emphasis',
      code: '[ *ESLint* ](https://eslint.org)',
      output: '[*ESLint*](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Link text containing brackets',
      code: '[ a [b] c ](https://eslint.org)',
      output: '[a [b] c](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Link text containing an escaped closing bracket',
      code: '[ a\\]b ](https://eslint.org)',
      output: '[a\\]b](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Link text containing an image',
      code: '[ ![ESLint](https://eslint.org/logo.png) ](https://eslint.org)',
      output: '[![ESLint](https://eslint.org/logo.png)](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 41,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'Link inside a blockquote',
      code: '> [ ESLint ](https://eslint.org)',
      output: '> [ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Link inside a list item',
      code: '- [ ESLint ](https://eslint.org)',
      output: '- [ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      // NOTE: An even number of backslashes escapes itself, so the closing bracket stays literal.
      name: 'Two backslashes before padding at the end of the link text',
      code: '[ESLint\\\\ ](https://eslint.org)',
      output: '[ESLint\\\\](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      // NOTE: A checkbox needs content after it, so a list item holding the link alone is safe.
      name: 'Shortcut reference of a task list marker alone in a list item',
      code: '- [x ]\n\n[x]: https://eslint.org',
      output: '- [x]\n\n[x]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      // NOTE: The item already holds a checkbox, so the link after it cannot become a second one.
      name: 'Shortcut reference of a task list marker after an existing checkbox',
      code: '- [x] [x ] details\n\n[x]: https://eslint.org',
      output: '- [x] [x] details\n\n[x]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // NOTE: GFM needs whitespace after the brackets, so this cannot become a checkbox.
      name: 'Shortcut reference of a task list marker joined to the text after it',
      code: '- [x ]details\n\n[x]: https://eslint.org',
      output: '- [x]details\n\n[x]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      // NOTE: The first child of the list item is a blockquote, so the link opens no paragraph of it.
      name: 'Shortcut reference of a task list marker inside a blockquote of a list item',
      code: '- > [x ] details\n\n[x]: https://eslint.org',
      output: '- > [x] details\n\n[x]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Shortcut reference in a list item that is not a task list marker',
      code: '- [ESLint ] details\n\n[eslint]: https://eslint.org',
      output: '- [ESLint] details\n\n[eslint]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Shortcut reference of a task list marker that is not at the head of a list item',
      code: '- details [x ] more\n\n[x]: https://eslint.org',
      output: '- details [x] more\n\n[x]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Full reference of a task list marker at the head of a list item',
      code: '- [x ][eslint] details\n\n[eslint]: https://eslint.org',
      output: '- [x][eslint] details\n\n[eslint]: https://eslint.org',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Multiple links where only one has padding',
      code: '[ESLint](https://eslint.org) [ Prettier ](https://prettier.io)',
      output: '[ESLint](https://eslint.org) [Prettier](https://prettier.io)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 31,
          endLine: 1,
          endColumn: 32,
        },
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 40,
          endLine: 1,
          endColumn: 41,
        },
      ],
    },
  ],
});
