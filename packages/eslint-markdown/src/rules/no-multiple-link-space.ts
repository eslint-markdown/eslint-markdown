/**
 * @fileoverview Rule to disallow multiple spaces around link text.
 * @author Marry(uncoolclub)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md039.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Link, LinkReference, ListItem, PhrasingContent } from 'mdast';
import { isAutolink } from '../core/utils/index.js';
import {
  URL_RULE_DOCS,
  blankLineChars,
  escapedTrailingBackslashRegex,
  lineEndingRegex,
} from '../core/constants.js';
import type { RuleModule, SourceRange } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-multiple-link-space` rule.
 */
type RuleOptions = [];
type MessageIds = 'noMultipleLinkSpace';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Disallow multiple spaces around link text',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('no-multiple-link-space'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      noMultipleLinkSpace: 'Multiple spaces around link text are not allowed.',
    },
  },

  create(context) {
    const { sourceCode } = context;

    // Nodes at the head of list items that could still get a checkbox. They are collected from the
    // AST, because the list marker may sit on an earlier line or behind other markers.
    const listItemHeads = new WeakSet<PhrasingContent>();

    return {
      // NOTE: A `listItem` node is visited before its children, so the heads are collected before
      // the links are checked. List items that already have a checkbox are skipped.
      'listItem:not([checked])'(node: ListItem) {
        // Skip definitions, since GFM still reads a checkbox in the paragraph after them.
        const firstRenderedChild = node.children.find(
          child => child.type !== 'definition',
        );

        // A checkbox needs content after it, so a paragraph with a single child is skipped.
        if (
          firstRenderedChild?.type === 'paragraph' &&
          firstRenderedChild.children.length > 1
        ) {
          listItemHeads.add(firstRenderedChild.children[0]);
        }
      },

      'link, linkReference'(node: Link | LinkReference) {
        const { children } = node;

        // Skip autolinks like `<https://example.com>` and GFM autolink literals like
        // `https://example.com`, which have no brackets, and empty link text like `[](url)`.
        if (
          (node.type === 'link' && isAutolink(node, sourceCode)) ||
          children.length === 0
        ) {
          return;
        }

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const [, lastChildNodeEndOffset] = sourceCode.getRange(
          children[children.length - 1],
        );

        // The opening bracket is the first character of the node. The closing bracket is the first
        // one after the last child, because padding next to a line break can sit outside the children.
        const labelStartOffset = nodeStartOffset + 1;
        const labelEndOffset = sourceCode.text.indexOf(']', lastChildNodeEndOffset);
        const label = sourceCode.text.slice(labelStartOffset, labelEndOffset);

        // Skip link text spanning multiple lines. It can carry a hard break, a backslash before a
        // line ending, or blockquote markers, which padding removal would break.
        if (lineEndingRegex.test(label)) {
          return;
        }

        // NOTE: Loops are used instead of `/[ \t]+$/`, which backtracks quadratically on long runs.
        let linkTextStart = 0;
        let linkTextEnd = label.length;

        while (blankLineChars.has(label[linkTextStart])) {
          linkTextStart++;
        }

        while (
          // Keep the ranges disjoint so padding-only labels are reported once.
          linkTextEnd > linkTextStart &&
          blankLineChars.has(label[linkTextEnd - 1])
        ) {
          linkTextEnd--;
        }

        const trimmedLabel = label.slice(linkTextStart, linkTextEnd);
        const charAfterNode = sourceCode.text[nodeEndOffset];

        // Skip a shortcut reference that would become a checkbox like `[x]` or `[X]` without its padding.
        // Only a shortcut reference has nothing after its label, and GFM needs a space, tab, or
        // line ending right after the closing bracket.
        if (
          node.type === 'linkReference' &&
          node.referenceType === 'shortcut' &&
          trimmedLabel.toLowerCase() === 'x' &&
          listItemHeads.has(node) &&
          (blankLineChars.has(charAfterNode) || lineEndingRegex.test(charAfterNode))
        ) {
          return;
        }

        const paddingRanges: SourceRange[] = [];

        if (linkTextStart > 0) {
          paddingRanges.push([labelStartOffset, labelStartOffset + linkTextStart]);
        }

        if (linkTextEnd < label.length) {
          paddingRanges.push([labelStartOffset + linkTextEnd, labelEndOffset]);
        }

        for (const [startOffset, endOffset] of paddingRanges) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noMultipleLinkSpace',

            fix(fixer) {
              // Removing padding after an odd number of backslashes would escape the closing
              // bracket and turn the link into plain text, so report it without a fix.
              if (
                endOffset === labelEndOffset &&
                escapedTrailingBackslashRegex.test(trimmedLabel)
              ) {
                return null;
              }

              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
