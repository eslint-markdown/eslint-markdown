/**
 * @fileoverview Rule to disallow spaces inside link text.
 * @author Marry(uncoolclub)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md039.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Link, LinkReference } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-space-in-link-text` rule.
 */
type RuleOptions = [];
type MessageIds = 'noSpaceInLinkText';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

// Only spaces and tabs are removable padding. Removing a line break would discard meaning:
// two spaces before it produce a hard break, and a backslash before it escapes the closing
// bracket, so dropping the break alone would swallow the link itself.
const leadingSpaceRegex = /^[ \t]+/u;
const trailingSpaceRegex = /[ \t]+$/u;

const closingBracket = ']';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow spaces inside link text',
      url: URL_RULE_DOCS('no-space-in-link-text'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'whitespace',

    messages: {
      noSpaceInLinkText: 'Space inside link text is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    /**
     * @param startOffset Start offset of the padding.
     * @param endOffset End offset of the padding.
     */
    function reportPadding(startOffset: number, endOffset: number) {
      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        messageId: 'noSpaceInLinkText',

        fix(fixer) {
          return fixer.removeRange([startOffset, endOffset]);
        },
      });
    }

    /**
     * Checks the link text of a `link` or `linkReference` node.
     * - NOTE: `children` positions cannot delimit the label on their own. The parser leaves padding
     *   next to a line break outside them, so the label is measured against the source text instead.
     * @param node The node to check.
     */
    function checkLinkText(node: Link | LinkReference) {
      const { children } = node;

      // An empty link text, `[](url)`, has no children and therefore no padding to report.
      if (children.length === 0) {
        return;
      }

      const [nodeStartOffset] = sourceCode.getRange(node);
      const [, lastChildEndOffset] = sourceCode.getRange(children[children.length - 1]);

      // The opening bracket is the first character of the node, and only padding can sit between
      // the last child and the closing bracket, so both ends of the label are reachable from here.
      const labelStartOffset = nodeStartOffset + 1;
      const labelEndOffset = sourceCode.text.indexOf(closingBracket, lastChildEndOffset);
      const label = sourceCode.text.slice(labelStartOffset, labelEndOffset);

      const leadingSpaceLength = leadingSpaceRegex.exec(label)?.[0].length ?? 0;
      const trailingSpaceLength = trailingSpaceRegex.exec(label)?.[0].length ?? 0;

      // A label of padding only, `[ ](url)`, matches on both ends over the same characters.
      if (leadingSpaceLength + trailingSpaceLength > label.length) {
        reportPadding(labelStartOffset, labelEndOffset);

        return;
      }

      if (leadingSpaceLength > 0) {
        reportPadding(labelStartOffset, labelStartOffset + leadingSpaceLength);
      }

      if (trailingSpaceLength > 0) {
        reportPadding(labelEndOffset - trailingSpaceLength, labelEndOffset);
      }
    }

    return {
      link: checkLinkText,
      linkReference: checkLinkText,
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
