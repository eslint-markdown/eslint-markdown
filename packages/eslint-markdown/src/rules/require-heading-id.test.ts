/**
 * @fileoverview Test for `require-heading-id.ts`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './require-heading-id.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-heading-id', rule, {
  valid: [
    // Default
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty String',
      code: '  ',
    },

    // Default: Empty Headings
    {
      name: 'ATX: Empty h1 heading',
      code: '#',
    },
    {
      name: 'ATX: Empty h2 heading',
      code: '##',
    },
    {
      name: 'ATX: Empty h3 heading',
      code: '###',
    },
    {
      name: 'Close ATX: Empty h1 heading',
      code: '# #',
    },
    {
      name: 'Close ATX: Empty h2 heading',
      code: '## ##',
    },
    {
      name: 'Close ATX: Empty h3 heading',
      code: '### ###',
    },

    // Default: ATX Headings
    {
      name: 'ATX: Correct h1 heading ID',
      code: '# Heading 1 {#heading-1}',
    },
    {
      name: 'ATX: Correct h2 heading ID',
      code: '## Heading 2 {#heading-2}',
    },
    {
      name: 'ATX: Correct h3 heading ID',
      code: '### Heading 3 {#heading-3}',
    },
    {
      name: 'ATX: Correct h4 heading ID',
      code: '#### Heading 4 {#heading-4}',
    },
    {
      name: 'ATX: Correct h5 heading ID',
      code: '##### Heading 5 {#heading-5}',
    },
    {
      name: 'ATX: Correct h6 heading ID',
      code: '###### Heading 6 {#heading-6}',
    },

    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Correct h1 heading ID',
      code: '# Heading 1 {#heading-1} #',
    },
    {
      name: 'ATX Closed: Correct h2 heading ID',
      code: '## Heading 2 {#heading-2} ##',
    },
    {
      name: 'ATX Closed: Correct h3 heading ID',
      code: '### Heading 3 {#heading-3} ###',
    },
    {
      name: 'ATX Closed: Correct h4 heading ID',
      code: '#### Heading 4 {#heading-4} ####',
    },
    {
      name: 'ATX Closed: Correct h5 heading ID',
      code: '##### Heading 5 {#heading-5} #####',
    },
    {
      name: 'ATX Closed: Correct h6 heading ID',
      code: '###### Heading 6 {#heading-6} ######',
    },

    // Default: Setext Headings
    {
      name: 'Setext: Correct h1 heading ID',
      code: 'Heading 1 {#heading-1}\n=========',
    },
    {
      name: 'Setext: Correct multiline h1 heading ID',
      code: 'Heading 1\nMultiple Lines {#heading-1}\n=========',
    },
    {
      name: 'Setext: Correct h2 heading ID',
      code: 'Heading 2 {#heading-2}\n---------',
    },
    {
      name: 'Setext: Correct multiline h2 heading ID',
      code: 'Heading 2\nMultiple Lines {#heading-2}\n---------',
    },

    // Default: HTML Headings
    {
      name: 'HTML: h1 heading with an ID attribute',
      code: '<h1 id="heading-1">Heading 1</h1>',
    },
    {
      name: 'HTML: h2 heading with an ID attribute',
      code: '<h2 id="heading-2">Heading 2</h2>',
    },
    {
      name: 'HTML: h3 heading with an ID attribute',
      code: '<h3 id="heading-3">Heading 3</h3>',
    },
    {
      name: 'HTML: h4 heading with an ID attribute',
      code: '<h4 id="heading-4">Heading 4</h4>',
    },
    {
      name: 'HTML: h5 heading with an ID attribute',
      code: '<h5 id="heading-5">Heading 5</h5>',
    },
    {
      name: 'HTML: h6 heading with an ID attribute',
      code: '<h6 id="heading-6">Heading 6</h6>',
    },
    {
      name: 'HTML: h1 heading with an uppercase ID attribute',
      code: '<h1 ID="heading-1">Heading 1</h1>',
    },
    {
      name: 'HTML: uppercase h6 heading with an ID attribute',
      code: '<H6 ID="heading-6">Heading 6</H6>',
    },
    {
      name: 'HTML: non-heading element without an ID attribute',
      code: '<div>Content</div>',
    },

    // Default: Edge Cases
    {
      name: 'ATX: h1 heading ID with trailing spaces',
      code: '# Heading {#id}  ',
    },
    {
      name: 'ATX: h1 heading ID with trailing tabs',
      code: '# Heading {#id}\t\t',
    },
    {
      name: 'ATX: h1 heading ID with trailing spaces and tabs',
      code: '# Heading {#id}  \t',
    },
    {
      name: 'ATX: h1 heading ID with leading spaces',
      code: '# Heading   {#id}',
    },
    {
      name: 'ATX: h1 heading ID with leading tabs',
      code: '# Heading\t\t{#id}',
    },
    {
      name: 'ATX: h1 heading ID with leading spaces and tabs',
      code: '# Heading  \t{#id}',
    },

    // `never` option: ATX Headings
    {
      name: 'ATX: No h1 heading ID',
      code: '# Heading 1',
      options: ['never'],
    },
    {
      name: 'ATX: No h2 heading ID',
      code: '## Heading 2',
      options: ['never'],
    },
    {
      name: 'ATX: No h3 heading ID',
      code: '### Heading 3',
      options: ['never'],
    },
    {
      name: 'ATX: No h4 heading ID',
      code: '#### Heading 4',
      options: ['never'],
    },
    {
      name: 'ATX: No h5 heading ID',
      code: '##### Heading 5',
      options: ['never'],
    },
    {
      name: 'ATX: No h6 heading ID',
      code: '###### Heading 6',
      options: ['never'],
    },

    // `never` option: ATX Closed Headings
    {
      name: 'ATX Closed: No h1 heading ID',
      code: '# Heading 1 #',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h2 heading ID',
      code: '## Heading 2 ##',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h3 heading ID',
      code: '### Heading 3 ###',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h4 heading ID',
      code: '#### Heading 4 ####',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h5 heading ID',
      code: '##### Heading 5 #####',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h6 heading ID',
      code: '###### Heading 6 ######',
      options: ['never'],
    },

    // `never` option: Setext Headings
    {
      name: 'Setext: No h1 heading ID',
      code: 'Heading 1\n=========',
      options: ['never'],
    },
    {
      name: 'Setext: No multiline h1 heading ID',
      code: 'Heading 1\nMultiple Lines\n=========',
      options: ['never'],
    },
    {
      name: 'Setext: No h2 heading ID',
      code: 'Heading 2\n---------',
      options: ['never'],
    },
    {
      name: 'Setext: No multiline h2 heading ID',
      code: 'Heading 2\nMultiple Lines\n---------',
      options: ['never'],
    },

    // `never` option: HTML Headings
    {
      name: 'HTML: h1 heading without an ID in `never` mode',
      code: '<h1>Heading 1</h1>',
      options: ['never'],
    },
    {
      name: 'HTML: h2 heading without an ID in `never` mode',
      code: '<h2>Heading 2</h2>',
      options: ['never'],
    },
    {
      name: 'HTML: h3 heading without an ID in `never` mode',
      code: '<h3>Heading 3</h3>',
      options: ['never'],
    },
    {
      name: 'HTML: h4 heading without an ID in `never` mode',
      code: '<h4>Heading 4</h4>',
      options: ['never'],
    },
    {
      name: 'HTML: h5 heading without an ID in `never` mode',
      code: '<h5>Heading 5</h5>',
      options: ['never'],
    },
    {
      name: 'HTML: h6 heading without an ID in `never` mode',
      code: '<h6>Heading 6</h6>',
      options: ['never'],
    },

    // `never` option: Edge Cases
    {
      name: 'ATX: If there is no space or tab before the `leftDelimiter`, it should not be treated as a heading ID',
      code: '# Heading{#id}',
      options: ['never'],
    },
    {
      name: 'ATX: Heading ending with image should not be reported in `never` mode',
      code: '# Heading ![Alt](image.png)',
      options: ['never'],
    },

    // `leftDelimiter` and `rightDelimiter` option
    {
      name: 'ATX: Custom Delimiters `[`, `]`',
      code: '# Heading [#id]',
      options: [
        'always',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `|`, `|`',
      code: '# Heading |#id|',
      options: [
        'always',
        {
          leftDelimiter: '|',
          rightDelimiter: '|',
        },
      ],
    },

    // `allowDepths` option: ATX Headings
    {
      name: 'ATX: Ignore h1 heading ID',
      code: '# Heading',
      options: [
        'always',
        {
          allowDepths: [1],
        },
      ],
    },
    {
      name: 'ATX: Ignore h1, h2, h3 heading ID',
      code: '# Heading 1\n\n## Heading 2\n\n### Heading 3',
      options: [
        'always',
        {
          allowDepths: [1, 2, 3],
        },
      ],
    },
    {
      name: 'ATX: Ignore h1 heading ID even with `never` mode',
      code: '# Heading 1 {#heading-1}',
      options: [
        'never',
        {
          allowDepths: [1],
        },
      ],
    },

    // `allowDepths` option: HTML Headings
    {
      name: 'HTML: ignore h1 heading without an ID with `allowDepths`',
      code: '<h1>Heading 1</h1>',
      options: ['always', { allowDepths: [1] }],
    },
    {
      name: 'HTML: ignore uppercase H6 heading without an ID with `allowDepths`',
      code: '<H6>Heading 6</H6>',
      options: ['always', { allowDepths: [6] }],
    },
    {
      name: 'HTML: ignore h1 heading with an ID with `allowDepths` in `never` mode',
      code: '<h1 id="heading-1">Heading 1</h1>',
      options: ['never', { allowDepths: [1] }],
    },
    {
      name: 'HTML: ignore uppercase H6 heading with an ID with `allowDepths` in `never` mode',
      code: '<H6 ID="heading-6">Heading 6</H6>',
      options: ['never', { allowDepths: [6] }],
    },

    // `checkHtml` option
    {
      name: 'HTML: ignore HTML headings when `checkHtml` is `false`',
      code: '<h1>Heading</h1>',
      options: ['always', { checkHtml: false }],
    },
  ],

  invalid: [
    // Default: ATX Headings
    {
      name: 'ATX: Missing h1 heading ID',
      code: '# Heading 1',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'ATX: Missing h2 heading ID',
      code: '## Heading 2',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'ATX: Missing h3 heading ID',
      code: '### Heading 3',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'ATX: Missing h4 heading ID',
      code: '#### Heading 4',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'ATX: Missing h5 heading ID',
      code: '##### Heading 5',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'ATX: Missing h6 heading ID',
      code: '###### Heading 6',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },

    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Missing h1 heading ID',
      code: '# Heading 1 #',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'ATX Closed: Missing h2 heading ID',
      code: '## Heading 2 ##',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'ATX Closed: Missing h3 heading ID',
      code: '### Heading 3 ###',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'ATX Closed: Missing h4 heading ID',
      code: '#### Heading 4 ####',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'ATX Closed: Missing h5 heading ID',
      code: '##### Heading 5 #####',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'ATX Closed: Missing h6 heading ID',
      code: '###### Heading 6 ######',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },

    // Default: Setext Headings
    {
      name: 'Setext: Missing h1 heading ID',
      code: 'Heading 1\n=========',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Setext: Missing multiline h1 heading ID',
      code: 'Heading 1\nMultiple Lines\n=========',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'Setext: Missing h2 heading ID',
      code: 'Heading 2\n---------',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Setext: Missing multiline h2 heading ID',
      code: 'Heading 2\nMultiple Lines\n---------',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 15,
        },
      ],
    },

    // Default: HTML Headings
    {
      name: 'HTML: h1 heading without an ID attribute',
      code: '<h1>Heading 1</h1>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: h2 heading without an ID attribute',
      code: '<h2>Heading 2</h2>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: h3 heading without an ID attribute',
      code: '<h3>Heading 3</h3>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: h4 heading without an ID attribute',
      code: '<h4>Heading 4</h4>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: h5 heading without an ID attribute',
      code: '<h5>Heading 5</h5>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: h6 heading without an ID attribute',
      code: '<h6>Heading 6</h6>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: uppercase H1 heading without an ID attribute',
      code: '<H1>Heading 1</H1>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: uppercase H2 heading without an ID attribute',
      code: '<H2>Heading 2</H2>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: uppercase H3 heading without an ID attribute',
      code: '<H3>Heading 3</H3>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: uppercase H4 heading without an ID attribute',
      code: '<H4>Heading 4</H4>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: uppercase H5 heading without an ID attribute',
      code: '<H5>Heading 5</H5>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: uppercase H6 heading without an ID attribute',
      code: '<H6>Heading 6</H6>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: nested h2 heading without an ID attribute',
      code: '<div><h2>Heading 2</h2></div>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'HTML: multiple headings without IDs',
      code: '<h1>One</h1>\n<h2>Two</h2>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'headingIdAlways',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'HTML: h3 heading with an empty ID attribute',
      code: '<h3 id="">Heading 3</h3>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'HTML: h3 heading with an empty uppercase ID attribute',
      code: '<h3 ID="">Heading 3</h3>',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },

    // Default: Edge Cases
    {
      name: 'ATX: h1 heading ID with nothing',
      code: '# Heading {#}',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'ATX: h1 heading ID with leading space',
      code: '# Heading { #id}',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      name: 'ATX: h1 heading ID wrapped in emphasis',
      code: '# Heading *{#id}*',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 18,
        },
      ],
    },
    {
      name: 'ATX: h1 heading ID wrapped in strong',
      code: '# Heading **{#id}**',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 20,
        },
      ],
    },
    {
      name: 'ATX: h1 heading ending with image',
      code: '# Heading ![Alt](image.png)',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 27,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },

    // `never` option: ATX Headings
    {
      name: 'ATX: h1 heading ID exists',
      code: '# Heading 1 {#heading-1}',
      output: '# Heading 1',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-1}',
          },
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 25,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h2 heading ID exists',
      code: '## Heading 2 {#heading-2}',
      output: '## Heading 2',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-2}',
          },
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 26,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h3 heading ID exists',
      code: '### Heading 3 {#heading-3}',
      output: '### Heading 3',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-3}',
          },
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 27,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h4 heading ID exists',
      code: '#### Heading 4 {#heading-4}',
      output: '#### Heading 4',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-4}',
          },
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 28,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h5 heading ID exists',
      code: '##### Heading 5 {#heading-5}',
      output: '##### Heading 5',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-5}',
          },
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 29,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h6 heading ID exists',
      code: '###### Heading 6 {#heading-6}',
      output: '###### Heading 6',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-6}',
          },
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 30,
        },
      ],
      options: ['never'],
    },

    // `never` option: ATX Closed Headings
    {
      name: 'ATX Closed: h1 heading ID exists',
      code: '# Heading 1 {#heading-1} #',
      output: '# Heading 1 #',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-1}',
          },
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 25,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX Closed: h2 heading ID exists',
      code: '## Heading 2 {#heading-2} ##',
      output: '## Heading 2 ##',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-2}',
          },
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 26,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX Closed: h3 heading ID exists',
      code: '### Heading 3 {#heading-3} ###',
      output: '### Heading 3 ###',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-3}',
          },
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 27,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX Closed: h4 heading ID exists',
      code: '#### Heading 4 {#heading-4} ####',
      output: '#### Heading 4 ####',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-4}',
          },
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 28,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX Closed: h5 heading ID exists',
      code: '##### Heading 5 {#heading-5} #####',
      output: '##### Heading 5 #####',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-5}',
          },
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 29,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX Closed: h6 heading ID exists',
      code: '###### Heading 6 {#heading-6} ######',
      output: '###### Heading 6 ######',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-6}',
          },
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 30,
        },
      ],
      options: ['never'],
    },

    // `never` option: Setext Headings
    {
      name: 'Setext: h1 heading ID exists',
      code: 'Heading 1 {#heading-1}\n=========',
      output: 'Heading 1\n=========',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-1}',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 23,
        },
      ],
      options: ['never'],
    },
    {
      name: 'Setext: multiline h1 heading ID exists',
      code: 'Heading 1\nMultiple Lines {#heading-1}\n=========',
      output: 'Heading 1\nMultiple Lines\n=========',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-1}',
          },
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 28,
        },
      ],
      options: ['never'],
    },
    {
      name: 'Setext: h2 heading ID exists',
      code: 'Heading 2 {#heading-2}\n---------',
      output: 'Heading 2\n---------',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-2}',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 23,
        },
      ],
      options: ['never'],
    },
    {
      name: 'Setext: multiline h2 heading ID exists',
      code: 'Heading 2\nMultiple Lines {#heading-2}\n---------',
      output: 'Heading 2\nMultiple Lines\n---------',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading-2}',
          },
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 28,
        },
      ],
      options: ['never'],
    },

    // `never` option: HTML Headings
    {
      name: 'HTML: h4 heading with an ID attribute in `never` mode',
      code: '<h4 id="heading-4">Heading 4</h4>',
      output: '<h4>Heading 4</h4>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'id="heading-4"' },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },
    {
      name: 'HTML: empty ID attribute in `never` mode',
      code: '<h3 id="">Heading 3</h3>',
      output: '<h3>Heading 3</h3>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'id=""' },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'HTML: uppercase H1 heading with an uppercase ID attribute in `never` mode',
      code: '<H1 ID="heading-1">Heading 1</H1>',
      output: '<H1>Heading 1</H1>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'ID="heading-1"' },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },
    {
      name: 'HTML: remove tabs before an ID attribute in `never` mode',
      code: '<h2\t\tid="heading-2">Heading 2</h2>',
      output: '<h2>Heading 2</h2>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'id="heading-2"' },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 20,
        },
      ],
    },
    {
      name: 'HTML: preserve attributes before and after an ID attribute in `never` mode',
      code: '<h2 class="title" id="heading-2" title="Heading">Heading 2</h2>',
      output: '<h2 class="title" title="Heading">Heading 2</h2>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'id="heading-2"' },
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 33,
        },
      ],
    },
    {
      name: 'HTML: preserve attributes after a leading ID attribute in `never` mode',
      code: '<h2 id="heading-2" class="title" title="Heading">Heading 2</h2>',
      output: '<h2 class="title" title="Heading">Heading 2</h2>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'id="heading-2"' },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },
    {
      name: 'HTML: preserve the heading tag when removing an ID after a paragraph',
      code: 'Preface\n\n<h1 id="x">   Heading</h1>',
      output: 'Preface\n\n<h1>   Heading</h1>',
      options: ['never'],
      errors: [
        {
          messageId: 'headingIdNever',
          data: { headingId: 'id="x"' },
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 11,
        },
      ],
    },

    // `never` option: Edge Cases
    {
      name: 'ATX: h1 heading ID after character reference exists',
      code: '# R&amp;D {#r-d}',
      output: '# R&amp;D',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#r-d}',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 17,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h1 heading ID with escaped character exists',
      code: '# Heading {#r\\&d}',
      output: '# Heading',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#r\\&d}',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 18,
        },
      ],
      options: ['never'],
    },

    // `leftDelimiter` and `rightDelimiter` option: ATX Headings
    {
      name: 'ATX: Custom Delimiters `[`, `]` h1 heading ID exists',
      code: '# Heading 1 [#heading-1]',
      output: '# Heading 1',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-1]',
          },
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 25,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `[`, `]` h2 heading ID exists',
      code: '## Heading 2 [#heading-2]',
      output: '## Heading 2',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-2]',
          },
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 26,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `[`, `]` h3 heading ID exists',
      code: '### Heading 3 [#heading-3]',
      output: '### Heading 3',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-3]',
          },
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 27,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `[`, `]` h4 heading ID exists',
      code: '#### Heading 4 [#heading-4]',
      output: '#### Heading 4',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-4]',
          },
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 28,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `[`, `]` h5 heading ID exists',
      code: '##### Heading 5 [#heading-5]',
      output: '##### Heading 5',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-5]',
          },
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 29,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `[`, `]` h6 heading ID exists',
      code: '###### Heading 6 [#heading-6]',
      output: '###### Heading 6',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-6]',
          },
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 30,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },

    // `leftDelimiter` and `rightDelimiter` option: ATX Closed Headings
    {
      name: 'ATX Closed: Custom Delimiters `[`, `]` h1 heading ID exists',
      code: '# Heading 1 [#heading-1] #',
      output: '# Heading 1 #',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-1]',
          },
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 25,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX Closed: Custom Delimiters `[`, `]` h2 heading ID exists',
      code: '## Heading 2 [#heading-2] ##',
      output: '## Heading 2 ##',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-2]',
          },
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 26,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX Closed: Custom Delimiters `[`, `]` h3 heading ID exists',
      code: '### Heading 3 [#heading-3] ###',
      output: '### Heading 3 ###',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-3]',
          },
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 27,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX Closed: Custom Delimiters `[`, `]` h4 heading ID exists',
      code: '#### Heading 4 [#heading-4] ####',
      output: '#### Heading 4 ####',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-4]',
          },
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 28,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX Closed: Custom Delimiters `[`, `]` h5 heading ID exists',
      code: '##### Heading 5 [#heading-5] #####',
      output: '##### Heading 5 #####',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-5]',
          },
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 29,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX Closed: Custom Delimiters `[`, `]` h6 heading ID exists',
      code: '###### Heading 6 [#heading-6] ######',
      output: '###### Heading 6 ######',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-6]',
          },
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 30,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },

    // `leftDelimiter` and `rightDelimiter` option: Setext Headings
    {
      name: 'Setext: Custom Delimiters `[`, `]` h1 heading ID exists',
      code: 'Heading 1 [#heading-1]\n=========',
      output: 'Heading 1\n=========',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-1]',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 23,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'Setext: Custom Delimiters `[`, `]` multiline h1 heading ID exists',
      code: 'Heading 1\nMultiple Lines [#heading-1]\n=========',
      output: 'Heading 1\nMultiple Lines\n=========',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-1]',
          },
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 28,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'Setext: Custom Delimiters `[`, `]` h2 heading ID exists',
      code: 'Heading 2 [#heading-2]\n---------',
      output: 'Heading 2\n---------',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-2]',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 23,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'Setext: Custom Delimiters `[`, `]` multiline h2 heading ID exists',
      code: 'Heading 2\nMultiple Lines [#heading-2]\n---------',
      output: 'Heading 2\nMultiple Lines\n---------',
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '[#heading-2]',
          },
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 28,
        },
      ],
      options: [
        'never',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },

    // `allowDepths` option
    {
      name: 'ATX: Ignore h2-h6 heading ID, but h1 heading ID is missing',
      code: '# Heading',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
      options: [
        'always',
        {
          allowDepths: [2, 3, 4, 5, 6],
        },
      ],
    },
    {
      name: 'HTML: report a missing ID after an allowed heading in the same HTML block',
      code: '<div>\n<h1>One</h1>\n<h2>Two</h2>\n</div>',
      options: ['always', { allowDepths: [1] }],
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 5,
        },
      ],
    },

    // `checkHtml` option
    {
      name: 'HTML: require only Markdown IDs when `checkHtml` is `false`',
      code: '# Heading\n\n<h1>Heading</h1>',
      options: ['always', { checkHtml: false }],
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'HTML: remove only Markdown IDs when `checkHtml` is `false`',
      code: '# Heading {#heading}\n\n<h1 id="heading">Heading</h1>',
      output: '# Heading\n\n<h1 id="heading">Heading</h1>',
      options: ['never', { checkHtml: false }],
      errors: [
        {
          messageId: 'headingIdNever',
          data: {
            headingId: '{#heading}',
          },
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 21,
        },
      ],
    },
  ],
});
