/**
 * @fileoverview Tests ported from the no-empty-named-blocks rule in eslint-plugin-import-x.
 * @license MIT Copied from `eslint-plugin-import-x` package.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/test/rules/no-empty-named-blocks.spec.ts
 */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Ben Mosher
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import parser from '@typescript-eslint/parser';
import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from './no-empty-named-blocks.js';

RuleTester.describe = describe;
RuleTester.it = it;
const ruleTester = new RuleTester({ languageOptions: { parser } });

const tValid = (test: RuleTester.ValidTestCase) => test;
const tInvalid = (test: RuleTester.InvalidTestCase) => test;

function generateSuggestionsTestCases(cases: string[]): ReturnType<typeof tInvalid>[] {
  return cases.map(code =>
    tInvalid({
      code,
      errors: [
        {
          messageId: 'emptyNamed',
          suggestions: [
            {
              messageId: 'unused',
              output: '',
            },
            {
              messageId: 'emptyImport',
              output: `import 'mod';`,
            },
          ],
        },
      ],
    }),
  );
}

ruleTester.run('no-empty-named-blocks', rule, {
  valid: [
    tValid({ code: `import 'mod';` }),
    tValid({ code: `import Default from 'mod';` }),
    tValid({ code: `import { Named } from 'mod';` }),
    tValid({ code: `import Default, { Named } from 'mod';` }),
    tValid({ code: `import * as Namespace from 'mod';` }),

    // Typescript
    tValid({ code: `import type Default from 'mod';` }),
    tValid({
      code: `import type { Named } from 'mod';`,
    }),

    tValid({
      code: `import type Default, { Named } from 'mod';`,
      // Preserve the Babel-accepted upstream syntax with the existing TypeScript parser.
      languageOptions: { parserOptions: { allowInvalidAST: true } },
    }),
    tValid({
      code: `import type * as Namespace from 'mod';`,
    }),

    tValid({
      code: `
        module.exports = {
          rules: {
            'keyword-spacing': ['error', {overrides: {}}],
          }
        };
      `,
    }),
    tValid({
      code: `
        import { DESCRIPTORS, NODE } from '../helpers/constants';
        // ...
        import { timeLimitedPromise } from '../helpers/helpers';
        // ...
        import { DESCRIPTORS2 } from '../helpers/constants';
      `,
    }),
  ],
  invalid: [
    tInvalid({
      code: `import Default, {} from 'mod';`,
      output: `import Default from 'mod';`,
      errors: [{ messageId: 'emptyNamed' }],
    }),
    ...generateSuggestionsTestCases([
      `import {} from 'mod';`,
      `import{}from'mod';`,
      `import {} from'mod';`,
      `import {}from 'mod';`,
    ]),

    // Typescript
    ...generateSuggestionsTestCases([
      `import type {} from 'mod';`,
      `import type {}from 'mod';`,
      `import type{}from 'mod';`,
      `import type {}from'mod';`,
    ]),
    tInvalid({
      code: `import type Default, {} from 'mod';`,
      output: `import type Default from 'mod';`,

      // Preserve the Babel-accepted upstream syntax with the existing TypeScript parser.
      languageOptions: { parserOptions: { allowInvalidAST: true } },

      errors: [{ messageId: 'emptyNamed' }],
    }),
  ],
});
