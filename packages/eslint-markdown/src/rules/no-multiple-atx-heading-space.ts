/**
 * @fileoverview Rule to disallow multiple spaces around ATX heading markers.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getHeadingStyle } from '../core/utils/index.js';
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
     * When `checkClosedHeading` is set to `false`, this rule stops checking for multiple
     * consecutive spaces or tabs before the closing hash characters in closed ATX headings.
     * @default true
     */
    checkClosedHeading: boolean;
  },
];
type MessageIds = 'noMultipleAtxHeadingSpace' | 'noMultipleAtxClosedHeadingSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const multipleSpacesRegex = /^[ \t]{2,}/u;

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

    /**
     * @param text Text starting immediately after an opening sequence or heading content.
     * @param textStartOffset Start offset of the text.
     * @param messageId Message for the opening or closing sequence.
     */
    function report(text: string, textStartOffset: number, messageId: MessageIds) {
      const spacesMatch = multipleSpacesRegex.exec(text)?.[0];

      if (!spacesMatch) return;

      // Empty ATX headings keep no whitespace; otherwise, keep the first character.
      const startOffset = textStartOffset + Number(spacesMatch.length !== text.length);
      const endOffset = textStartOffset + spacesMatch.length;

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        messageId,

        fix(fixer) {
          return fixer.removeRange([startOffset, endOffset]);
        },
      });
    }

    return {
      heading(node) {
        const currentHeadingStyle = getHeadingStyle(node, sourceCode);

        if (currentHeadingStyle === 'setext') {
          // Early returns when the heading is a Setext heading, as this rule only applies to ATX headings.
          return;
        }

        const lastChildNode = node.children.at(-1);
        const isClosedHeading = currentHeadingStyle === 'atx-closed';
        const isEmptyHeading = !lastChildNode;

        if (!checkClosedHeading && isClosedHeading && isEmptyHeading) {
          // When closing checks are disabled, skip closed headings with no content
          // (e.g., `'##   ##'`), where opening and closing whitespace overlap.
          return;
        }

        const text = sourceCode.getText(node);
        const [nodeStartOffset] = sourceCode.getRange(node);

        report(
          text.slice(node.depth),
          nodeStartOffset + node.depth,
          'noMultipleAtxHeadingSpace',
        );

        if (checkClosedHeading && isClosedHeading && !isEmptyHeading) {
          const [, lastChildNodeEndOffset] = sourceCode.getRange(lastChildNode);

          report(
            text.slice(lastChildNodeEndOffset - nodeStartOffset),
            lastChildNodeEndOffset,
            'noMultipleAtxClosedHeadingSpace',
          );
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
