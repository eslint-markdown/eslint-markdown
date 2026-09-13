/**
 * @fileoverview Test for `no-space-in-link-text.ts`.
 * @author Marry(uncoolclub)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-space-in-link-text.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-space-in-link-text', rule, {
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 41,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      // NOTE: The line break stays, so only the spaces next to the brackets are removed.
      name: 'Padding next to a line break inside the link text',
      code: '[ \nESLint\n ](https://eslint.org)',
      output: '[\nESLint\n](https://eslint.org)',
      errors: [
        {
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'noSpaceInLinkText',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Link inside a blockquote',
      code: '> [ ESLint ](https://eslint.org)',
      output: '> [ESLint](https://eslint.org)',
      errors: [
        {
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'noSpaceInLinkText',
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
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Multiple links where only one has padding',
      code: '[ESLint](https://eslint.org) [ Prettier ](https://prettier.io)',
      output: '[ESLint](https://eslint.org) [Prettier](https://prettier.io)',
      errors: [
        {
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 31,
          endLine: 1,
          endColumn: 32,
        },
        {
          messageId: 'noSpaceInLinkText',
          line: 1,
          column: 40,
          endLine: 1,
          endColumn: 41,
        },
      ],
    },
  ],
});
