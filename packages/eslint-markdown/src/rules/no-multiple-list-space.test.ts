/**
 * @fileoverview Tests for `no-multiple-list-space` rule.
 * @author Jung Hyeon Jun(hu6r1s)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester';
import rule from './no-multiple-list-space.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-multiple-list-space', rule, {
  valid: [
    // Basic
    {
      name: 'Basic: Empty document',
      code: '',
    },
    {
      name: 'Basic: Paragraph is ignored',
      code: 'Paragraph  with  multiple  spaces.',
    },

    // Unordered list
    {
      name: 'Unordered list: One space after marker is allowed',
      code: '- item',
    },
    {
      name: 'Unordered list: One space after `*` marker is allowed',
      code: '* item',
    },
    {
      name: 'Unordered list: One space after `+` marker is allowed',
      code: '+ item',
    },

    // Ordered list
    {
      name: 'Ordered list: One space after marker is allowed',
      code: '1. item',
    },
    {
      name: 'Ordered list: Multiple digit marker is allowed',
      code: '10. item',
    },

    // Multiple list items
    {
      name: 'Unordered list: One space after markers is allowed',
      code: `
- item
- item
`,
    },
    {
      name: 'Ordered list: One space after markers is allowed',
      code: `
1. item
2. item
`,
    },

    // Indented and nested lists
    {
      name: 'Nested list: One space after marker is allowed',
      code: `
- item
  - item
`,
    },
    {
      name: 'Block quote: One space after marker is allowed',
      code: '> - item',
    },
    {
      name: 'Indented list: One space after marker is allowed',
      code: ' - item',
    },

    // Options
    {
      name: 'Option: Custom unordered single-line spacing is allowed',
      code: '-  item',
      options: [
        {
          ulSingle: 2,
          ulMulti: 1,
          olSingle: 1,
          olMulti: 1,
        },
      ],
    },
    {
      name: 'Option: Custom ordered single-line spacing is allowed',
      code: '1.  item',
      options: [
        {
          ulSingle: 1,
          ulMulti: 1,
          olSingle: 2,
          olMulti: 1,
        },
      ],
    },

    // Checkbox in list
    {
      name: 'List item with checkbox',
      code: '- [ ] checkbox',
    },
  ],

  invalid: [
    // Unordered list
    {
      name: 'Unordered list: Two spaces after marker are reduced to one',
      code: '-  item',
      output: '- item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
          data: {
            expected: 1,
            actual: 2,
          },
        },
      ],
    },

    {
      name: 'Unordered list: Multiple spaces after marker are reduced to one',
      code: '*    item',
      output: '* item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 4,
          },
        },
      ],
    },

    {
      name: 'Unordered list: Multiple spaces after `+` marker are reduced to one',
      code: '+   item',
      output: '+ item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 3,
          },
        },
      ],
    },

    // Ordered list
    {
      name: 'Ordered list: Two spaces after marker are reduced to one',
      code: '1.  item',
      output: '1. item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 2,
          },
        },
      ],
    },

    {
      name: 'Ordered list: Multiple digit marker is handled',
      code: '10.  item',
      output: '10. item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 2,
          },
        },
      ],
    },

    // Indented and nested lists
    {
      name: 'Nested list: Multiple spaces after marker are reduced to one',
      code: `
- item
  -   item
`,
      output: `
- item
  - item
`,
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 3,
          },
        },
      ],
    },

    {
      name: 'Block quote: Multiple spaces after marker are reduced to one',
      code: '> -   item',
      output: '> - item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 3,
          },
        },
      ],
    },

    {
      name: 'Indented list: Multiple spaces after marker are reduced to one',
      code: ' -   item',
      output: ' - item',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 3,
          },
        },
      ],
    },

    // Custom options
    {
      name: 'Option: `ulSingle` controls single-line unordered lists',
      code: '- item',
      output: '-   item',
      options: [
        {
          ulSingle: 3,
          ulMulti: 1,
          olSingle: 1,
          olMulti: 1,
        },
      ],
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 3,
            actual: 1,
          },
        },
      ],
    },

    {
      name: 'Option: `olSingle` controls single-line ordered lists',
      code: '1. item',
      output: '1.   item',
      options: [
        {
          ulSingle: 1,
          ulMulti: 1,
          olSingle: 3,
          olMulti: 1,
        },
      ],
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 3,
            actual: 1,
          },
        },
      ],
    },

    // Multi-line lists
    {
      name: 'Option: `ulMulti` controls multi-line unordered lists',
      code: `
- item
  continuation
`,
      output: `
-  item
  continuation
`,
      options: [
        {
          ulSingle: 1,
          ulMulti: 2,
          olSingle: 1,
          olMulti: 1,
        },
      ],
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 2,
            actual: 1,
          },
        },
      ],
    },

    {
      name: 'Option: `olMulti` controls multi-line ordered lists',
      code: `
1. item
    continuation
`,
      output: `
1.  item
    continuation
`,
      options: [
        {
          ulSingle: 1,
          ulMulti: 1,
          olSingle: 1,
          olMulti: 2,
        },
      ],
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 2,
            actual: 1,
          },
        },
      ],
    },

    {
      name: 'Multi-line unordered list: All list items are checked',
      code: `
- item
  continuation
- item
  continuation
`,
      output: `
-  item
  continuation
-  item
  continuation
`,
      options: [
        {
          ulSingle: 1,
          ulMulti: 2,
          olSingle: 1,
          olMulti: 1,
        },
      ],
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 2,
            actual: 1,
          },
        },
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 2,
            actual: 1,
          },
        },
      ],
    },

    // Checkbox in list
    {
      name: 'List item: checkbox with multiple spaces',
      code: '-   [ ] checkbox',
      output: '- [ ] checkbox',
      errors: [
        {
          messageId: 'noMultipleListSpace',
          data: {
            expected: 1,
            actual: 3,
          },
        },
      ],
    },
  ],
});
