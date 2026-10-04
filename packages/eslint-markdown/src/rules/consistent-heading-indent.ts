/**
 * @fileoverview Rule to disallow heading indentation.
 * @author Soheun(sohxxny)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md023.mjs
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
 * Options for the `consistent-heading-indent` rule.
 */
type RuleOptions = [];
type MessageIds = 'noHeadingIndentation';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const blockquoteMarkersRegex = /^(?:[ \t]*>[ \t]?)*/;
const indentationRegex = /^[ \t]+$/;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow heading indentation',
      url: URL_RULE_DOCS('consistent-heading-indent'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      noHeadingIndentation: 'Heading indentation is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      heading(node) {
        const { start } = sourceCode.getLoc(node);

        const linePrefix = sourceCode.lines[start.line - 1].slice(0, start.column - 1);

        const indentation = linePrefix.replace(blockquoteMarkersRegex, '');

        // Skip headings preceded by non-whitespace characters, such as list markers.
        if (!indentationRegex.test(indentation)) {
          return;
        }

        const [headingStartOffset] = sourceCode.getRange(node);
        const startOffset = headingStartOffset - indentation.length;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(startOffset),
            end: sourceCode.getLocFromIndex(headingStartOffset),
          },

          messageId: 'noHeadingIndentation',

          fix(fixer) {
            return fixer.removeRange([startOffset, headingStartOffset]);
          },
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
