/**
 * @fileoverview Rule to require or disallow a newline at the end of files.
 * @see https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/rules/eol-last/eol-last.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `require-eol-last` rule.
 */
type RuleOptions = [
  'always' | 'never',
  {
    /**
     * The newline to insert when fixing a missing final newline.
     * @default 'LF'
     */
    newline: 'CR' | 'LF' | 'CRLF';
  },
];
type MessageIds = 'missing' | 'unexpected';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const NEWLINES = {
  CR: '\r',
  LF: '\n',
  CRLF: '\r\n',
} as const;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Require or disallow a newline at the end of files',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('require-eol-last'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    schema: [
      {
        enum: ['always', 'never'],
      },
      {
        type: 'object',
        properties: {
          newline: {
            enum: ['CR', 'LF', 'CRLF'],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: ['always', { newline: 'LF' }],

    messages: {
      missing: 'Newline required at end of file but not found.',
      unexpected: 'Newline not allowed at end of file.',
    },
  },

  create(context) {
    const { sourceCode } = context;
    const { text } = sourceCode;
    const [mode, { newline }] = context.options;

    return {
      root() {
        // Empty files do not need a final newline.
        if (!text.length) return;

        const finalNewlines = /[\r\n]+$/u.exec(text);

        if (mode === 'always' && !finalNewlines) {
          const loc = sourceCode.getLocFromIndex(text.length);

          context.report({
            loc: {
              start: loc,
              end: loc,
            },

            messageId: 'missing',

            fix(fixer) {
              return fixer.insertTextAfterRange([0, text.length], NEWLINES[newline]);
            },
          });
        } else if (mode === 'never' && finalNewlines) {
          const lastNewlineLength = text.endsWith('\r\n') ? 2 : 1;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(text.length - lastNewlineLength),
              end: sourceCode.getLocFromIndex(text.length),
            },

            messageId: 'unexpected',

            fix(fixer) {
              return fixer.removeRange([finalNewlines.index, text.length]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
