/**
 * @fileoverview Test for `require-image-title.ts`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './require-image-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-image-title', rule, {
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
      name: 'Image node with title attribute - 1',
      code: '![](https://example.com/image.jpg "title")',
    },
    {
      name: 'Image node with title attribute - 2',
      code: "![](https://example.com/image.jpg 'title')",
    },
    {
      name: 'Image node with title attribute - 3',
      code: '![](https://example.com/image.jpg (title))',
    },
    {
      name: 'ImageReference node with title attribute - 1',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg "title"
`,
    },
    {
      name: 'ImageReference node with title attribute - 2',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg 'title'
`,
    },
    {
      name: 'ImageReference node with title attribute - 3',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg (title)
`,
    },
    {
      name: "ImageReference node with `'//'`",
      code: `
![alt text][//]

[//]: https://example.com/image.jpg
`,
    },
    {
      name: 'Html node with title attribute',
      code: '<img src="https://example.com/image.jpg" title="title">',
    },
    {
      name: 'Nested Html node with title attribute',
      code: `
<div>
  <img src="https://example.com/image.jpg" title="title">
</div>
`,
    },
    {
      name: 'Html node without any attributes',
      code: '<img>',
    },
    {
      name: 'Html node without src, srcset, or alt attribute',
      code: '<img id="1">',
    },
    {
      name: 'Html node with lone alt attribute',
      code: '<img alt>',
    },
    {
      name: 'Html node with empty alt attribute and without src or srcset attribute',
      code: '<img alt="">',
    },
    {
      name: 'Html node with empty alt attribute',
      code: '<img src="https://example.com/image.jpg" alt="">',
    },
    {
      name: 'Html node with aria-hidden attribute set to true',
      code: '<img src="https://example.com/image.jpg" aria-hidden="true">',
    },

    // Options
    {
      name: "ImageReference node with `'hi'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['hi'] }],
      code: `
![alt text][hi]

[hi]: https://example.com/image.jpg
`,
    },
    {
      name: "ImageReference node with `'HI'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['HI'] }],
      code: `
![alt text][hi]

[hi]: https://example.com/image.jpg
`,
    },
    {
      name: "ImageReference node with `'GRÜẞE'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['GRÜẞE'] }],
      code: `
![alt text][Grüsse]

[Grüsse]: https://example.com/image.jpg
`,
    },
  ],

  invalid: [
    {
      name: 'Image node without title attribute',
      code: '![](https://example.com/image.jpg)',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 35,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute - 1',
      code: '![](https://example.com/image.jpg "")',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute - 2',
      code: "![](https://example.com/image.jpg '')",
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute - 3',
      code: '![](https://example.com/image.jpg ())',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },

    {
      name: 'ImageReference node without title attribute',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 39,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 1',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ""`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 2',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ''`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 3',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ()`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },

    {
      name: 'Html node without title attribute - 1',
      code: '<img src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 2',
      code: '<img\nsrc="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 37,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 3',
      code: '<img\n src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 4',
      code: '<img\n  src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 39,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute - 1',
      code: '<img src="https://example.com/image.jpg" title>',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 48,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute - 2',
      code: '<img src="https://example.com/image.jpg" title="">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 51,
        },
      ],
    },
    {
      name: 'Html node with empty src attribute and without title attribute',
      code: '<img src="">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'Html node with srcset attribute and without title attribute',
      code: '<img srcset="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 45,
        },
      ],
    },
    {
      name: 'Html node with non-empty alt attribute and without title attribute',
      code: '<img alt="Alt text">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 21,
        },
      ],
    },
    {
      name: 'Html node with lone aria-hidden attribute',
      code: '<img src="https://example.com/image.jpg" aria-hidden>',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 54,
        },
      ],
    },
    {
      name: 'Html node with aria-hidden attribute set to false',
      code: '<img src="https://example.com/image.jpg" aria-hidden="false">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 62,
        },
      ],
    },
    {
      name: 'Nested Html node with ignored images followed by image without title attribute',
      code: `
<div>
  <img id="1">
  <img src="https://example.com/image.jpg" alt="">
  <img src="https://example.com/image.jpg" aria-hidden="true">
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 6,
          column: 3,
          endLine: 6,
          endColumn: 44,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 1',
      code: `
<div>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 44,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 2',
      code: `
<div>
  <img src="https://example.com/image.jpg">
  <br>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 44,
        },
        {
          messageId: 'requireImageTitle',
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 44,
        },
      ],
    },
  ],
});
