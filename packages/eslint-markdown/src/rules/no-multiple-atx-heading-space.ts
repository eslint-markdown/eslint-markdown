/**
 * @fileoverview Rule to disallow multiple spaces around ATX heading markers.
 * @author Ga eun Lee(tooth-is-silver)
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
 * Options for the `no-multiple-atx-heading-space` rule.
 */
type RuleOptions = [
  {
    /**
     * When `checkClosedHeading` is set to `true`, this rule also checks for multiple consecutive spaces or tabs before the closing hash characters in closed ATX headings.
     * @default true
     */
    checkClosedHeading: boolean;
  },
];
type MessageIds = 'noMultipleAtxHeadingSpace' | 'noMultipleAtxClosedHeadingSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const leadingSpacesRegex = /^#{1,6}(?<spaces>[ \t]{2,})/u;
const trailingSpacesRegex = /(?<spaces>[ \t]{2,})#+[ \t]*$/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow multiple spaces around ATX heading markers',
      url: URL_RULE_DOCS('no-multiple-atx-heading-space'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          checkClosedHeading: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkClosedHeading: true,
      },
    ],

    messages: {
      noMultipleAtxHeadingSpace:
        'Multiple spaces after opening ATX heading markers are not allowed.',
      noMultipleAtxClosedHeadingSpace:
        'Multiple spaces before closing ATX heading markers are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ checkClosedHeading }] = context.options;

    return {
      heading(node) {
        const text = sourceCode.getText(node);
        const [startOffset] = sourceCode.getRange(node);
        const leadingSpacesMatch = leadingSpacesRegex.exec(text);
        const isEmptyClosedHeading =
          node.children.length === 0 && trailingSpacesRegex.test(text);

        if (leadingSpacesMatch) {
          // A successful match always contains the named capture group.
          const { spaces } = leadingSpacesMatch.groups!;

          if (isEmptyClosedHeading && spaces.length === 2) {
            return;
          }

          const spacesStartOffset = startOffset + node.depth;
          let spacesEndOffset = spacesStartOffset + spaces.length;

          if (isEmptyClosedHeading) {
            spacesEndOffset--;
          }

          // Unlike markdownlint, remove all whitespace after the opening sequence when the heading has neither content nor a closing sequence.
          const replacementText = node.depth + spaces.length === text.length ? '' : ' ';

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(
                spacesStartOffset + replacementText.length,
              ),
              end: sourceCode.getLocFromIndex(spacesEndOffset),
            },

            messageId: 'noMultipleAtxHeadingSpace',

            fix(fixer) {
              return fixer.removeRange([
                spacesStartOffset + replacementText.length,
                spacesEndOffset,
              ]);
            },
          });
        }

        if (!checkClosedHeading || node.children.length === 0) return;

        const trailingSpacesMatch = trailingSpacesRegex.exec(text);

        if (trailingSpacesMatch) {
          // A successful match always contains the named capture group.
          const { spaces } = trailingSpacesMatch.groups!;
          const spacesStartOffset = startOffset + trailingSpacesMatch.index;
          const spacesEndOffset = spacesStartOffset + spaces.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(spacesStartOffset + 1),
              end: sourceCode.getLocFromIndex(spacesEndOffset),
            },

            messageId: 'noMultipleAtxClosedHeadingSpace',

            fix(fixer) {
              return fixer.removeRange([spacesStartOffset + 1, spacesEndOffset]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
