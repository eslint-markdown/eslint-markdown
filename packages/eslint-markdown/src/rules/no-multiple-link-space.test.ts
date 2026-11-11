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
    // Basic
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },

    // Link
    {
      name: 'Link: Empty link text',
      code: '[](https://eslint.org)',
    },
    {
      name: 'Link: Inline link without padding',
      code: '[ESLint](https://eslint.org)',
    },
    {
      name: 'Link: Spaces between words of the link text',
      code: '[a b](https://eslint.org)',
    },
    {
      name: 'Link: Spaces outside the link',
      code: 'a [ESLint](https://eslint.org) b',
    },
    {
      name: 'Link: Spaces inside the destination',
      code: '[ESLint](<https://eslint.org/a b>)',
    },
    {
      // NOTE: A no-break space is not padding under this rule, unlike `MD039`.
      name: 'Link: No-break space at both ends of the link text',
      code: '[\u00a0ESLint\u00a0](https://eslint.org)',
    },

    // Link: Autolink
    {
      name: 'Link: Followed by trailing spaces',
      code: '<https://eslint.org>  ',
    },
    {
      name: 'Link: Followed by brackets that are not a link',
      code: '<https://eslint.org> [ ESLint ]',
    },
    {
      name: 'Link: GFM literal autolink followed by brackets that are not a link',
      code: 'https://eslint.org [ ESLint ]',
    },

    // Link: Line Breaks
    {
      // NOTE: Removing the line break would drop the hard break it forms with the two spaces.
      name: 'Link(Line Breaks): Hard break at the end of the link text',
      code: '[ESLint  \n](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.
    {
      // NOTE: Removing the line break would leave the backslash escaping the closing bracket.
      name: 'Link(Line Breaks): Backslash before a line break at the end of the link text',
      code: '[ESLint\\\n](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.
    {
      name: 'Link(Line Breaks): Line break alone at both ends of the link text',
      code: '[\nESLint\n](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.
    {
      // NOTE: The two spaces form a hard break with the line ending, so they are not padding.
      name: 'Link(Line Breaks): Hard break at the start of the link text',
      code: '[  \nESLint](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.
    {
      // NOTE: The blockquote marker of the second line sits between the text and the bracket.
      name: 'Link(Line Breaks): Link text spanning lines of a blockquote',
      code: '> [ESLint\n> ](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.
    {
      name: 'Link(Line Breaks): Padding next to a line break inside the link text',
      code: '[ \nESLint\n ](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.
    {
      name: 'Link: Line break inside the link text without padding',
      code: '[ES\nLint](https://eslint.org)',
    },
    {
      name: 'Link: No-break spaces around multiline link text',
      code: '[\u00a0ES\nLint\u00a0](https://eslint.org)',
    },

    // Link: Backslashes
    {
      // NOTE: Removing the padding would leave the backslash escaping the closing bracket.
      name: 'Link: Backslash before padding at the end of the link text',
      code: '[ESLint\\ ](https://eslint.org)',
    }, // TODO: `markdownlint` reports this.

    // LinkReference
    {
      name: 'LinkReference: Full reference link without padding',
      code: '[ESLint][eslint]\n\n[eslint]: https://eslint.org',
    },
    {
      name: 'LinkReference: Collapsed reference link without padding',
      code: '[ESLint][]\n\n[ESLint]: https://eslint.org',
    },
    {
      name: 'LinkReference: Shortcut reference link without padding',
      code: '[ESLint]\n\n[ESLint]: https://eslint.org',
    },
    {
      // NOTE: A no-break space is not padding under this rule, unlike `MD039`.
      name: 'LinkReference: No-break space at both ends of the link text',
      code: '[\u00a0ESLint\u00a0][eslint]\n\n[eslint]: https://eslint.org',
    },

    // ListItem: Task list items
    {
      // NOTE: `[x]` at the head of a list item is a GFM checkbox, so the fix would drop the link.
      // CommonMark has no task list items, but the padding is kept there too for consistency.
      name: 'ListItem: Shortcut reference that would become a checked task list item',
      code: '- [x ] details\n\n[x]: https://eslint.org',
    }, // TODO
    {
      // NOTE: The list marker sits on an earlier line, so the line holding the link has none.
      name: 'ListItem: Shortcut reference that would become a task list item across lines',
      code: '-\n  [x ] details\n\n[x]: https://eslint.org',
    }, // TODO
    {
      // NOTE: The definition renders nothing, so the paragraph after it still opens the list item.
      name: 'ListItem: Shortcut reference that would become a task list item after a definition',
      code: '- [x]: https://eslint.org\n  [x ] details',
    }, // TODO
    {
      name: 'ListItem: Shortcut reference that would become a task list item of a doubly marked list',
      code: '- - [x ] details\n\n[x]: https://eslint.org',
    }, // TODO
    {
      name: 'ListItem: Shortcut reference that would become a task list item of a nested list',
      code: '- > - [x ] details\n\n[x]: https://eslint.org',
    }, // TODO
    {
      name: 'ListItem: Shortcut reference in uppercase that would become a task list item',
      code: '- [ X ] details\n\n[x]: https://eslint.org',
    }, // TODO
    {
      name: 'ListItem: Shortcut reference that would become a task list item of an ordered list',
      code: '1. [x ] details\n\n[x]: https://eslint.org',
    }, // TODO

    // Out of scope
    {
      name: 'Image: Image with padding is out of scope',
      code: '![ ESLint ](https://eslint.org/logo.png)',
    },
    {
      name: 'ImageReference: Image reference with padding is out of scope',
      code: '![ ESLint ][eslint]\n\n[eslint]: https://eslint.org/logo.png',
    },
    {
      name: 'Text: Bracket that is not a link',
      code: '[ ESLint ]',
    },
    {
      name: 'InlineCode: Inline code containing a padded link',
      code: '`[ ESLint ](https://eslint.org)`',
    },
    {
      name: 'Code: Code block containing a padded link',
      code: '```md\n[ ESLint ](https://eslint.org)\n```',
    },
  ],

  invalid: [
    // Link
    {
      name: 'Link: Padding on both ends',
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
      name: 'Link: Padding at the start only',
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
      name: 'Link: Padding at the end only',
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
      name: 'Link: Multiple spaces as padding',
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
      name: 'Link: Tabs as padding',
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
      name: 'Link: Link text of padding only',
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
      // NOTE: Both ends match over the same characters, so the padding is reported once.
      name: 'Link: Link text of padding only',
      code: '[   ](https://eslint.org)',
      output: '[](https://eslint.org)',
      errors: [
        {
          messageId: 'noMultipleLinkSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Link: Multiple links where only one has padding',
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
    {
      name: 'Link: Link text starting with emphasis',
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
      name: 'Link: Link text containing brackets',
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
      name: 'Link: Link text containing an escaped closing bracket',
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
      name: 'Link: Link text containing an image',
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

    // Link: Containers
    {
      name: 'Link: Link inside a blockquote',
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
      name: 'Link: Link inside a list item',
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

    // Link: Backslashes
    {
      // NOTE: Two backslashes escape each other, so the closing bracket still closes the link.
      name: 'Link: Two backslashes before padding at the end of the link text',
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

    // LinkReference
    {
      name: 'LinkReference: Full reference link',
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
      name: 'LinkReference: Collapsed reference link',
      code: '[ ESLint ][]\n\n[ESLint]: https://eslint.org',
      output: '[ESLint][]\n\n[ESLint]: https://eslint.org',
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
      name: 'LinkReference: Shortcut reference link',
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

    // ListItem: Task list items
    {
      // NOTE: A checkbox needs content after it, so a list item holding the link alone is safe.
      name: 'ListItem: Shortcut reference of a task list marker alone in a list item',
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
      name: 'ListItem: Shortcut reference of a task list marker after an existing checkbox',
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
      name: 'ListItem: Shortcut reference of a task list marker joined to the text after it',
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
      name: 'ListItem: Shortcut reference of a task list marker inside a blockquote of a list item',
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
      name: 'ListItem: Shortcut reference in a list item that is not a task list marker',
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
      name: 'ListItem: Shortcut reference of a task list marker that is not at the head of a list item',
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
      name: 'ListItem: Full reference of a task list marker at the head of a list item',
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
  ],
});
