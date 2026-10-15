/**
 * @fileoverview Rule to disallow multiple spaces around link text.
 * @author Marry(uncoolclub)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md039.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Link, LinkReference, ListItem, PhrasingContent } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-multiple-link-space` rule.
 */
type RuleOptions = [];
type MessageIds = 'noMultipleLinkSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const spaces = new Set([' ', '\t']);
const lineEndings = new Set(['\r', '\n']);

// NOTE: GFM reads `[x]` or `[X]` at the head of a list item as a checked task list item.
const taskListMarkers = new Set(['x', 'X']);

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow multiple spaces around link text',
      url: URL_RULE_DOCS('no-multiple-link-space'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      noMultipleLinkSpace: 'Multiple spaces around link text are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
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
        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);

        // Skip autolinks like `<https://example.com>` and GFM autolink literals like
        // `https://example.com`, which have no brackets, and empty link text like `[](url)`.
        if (sourceCode.text[nodeStartOffset] !== '[' || children.length === 0) {
          return;
        }

        const [, lastChildEndOffset] = sourceCode.getRange(children[children.length - 1]);

        // The opening bracket is the first character of the node. The closing bracket is the first
        // one after the last child, because padding next to a line break can sit outside the
        // children.
        const labelStartOffset = nodeStartOffset + 1;
        const labelEndOffset = sourceCode.text.indexOf(']', lastChildEndOffset);
        const label = sourceCode.text.slice(labelStartOffset, labelEndOffset);

        // Skip link text spanning multiple lines. It can carry a hard break, a backslash before a
        // line ending, or blockquote markers, which padding removal would break.
        if ([...lineEndings].some(lineEnding => label.includes(lineEnding))) {
          return;
        }

        // NOTE: Loops are used instead of `/[ \t]+$/`, which backtracks quadratically on long runs.
        let leadingSpaceLength = 0;
        let trailingSpaceLength = 0;

        while (spaces.has(label[leadingSpaceLength])) {
          leadingSpaceLength++;
        }

        while (
          trailingSpaceLength < label.length - leadingSpaceLength &&
          spaces.has(label[label.length - 1 - trailingSpaceLength])
        ) {
          trailingSpaceLength++;
        }

        // Skip a shortcut reference that would become a checkbox like `[x]` without its padding.
        // Only a shortcut reference has nothing after its label, and GFM needs a space, tab, or
        // line ending right after the closing bracket.
        const charAfterNode = sourceCode.text[nodeEndOffset];

        if (
          node.type === 'linkReference' &&
          node.referenceType === 'shortcut' &&
          taskListMarkers.has(
            label.slice(leadingSpaceLength, label.length - trailingSpaceLength),
          ) &&
          (charAfterNode === undefined ||
            spaces.has(charAfterNode) ||
            lineEndings.has(charAfterNode)) &&
          listItemHeads.has(node)
        ) {
          return;
        }

        const paddingRanges: [number, number][] = [];

        if (leadingSpaceLength === label.length) {
          // Report padding-only link text like `[ ](url)` once, since both ends cover the same
          // range.
          paddingRanges.push([labelStartOffset, labelEndOffset]);
        } else {
          if (leadingSpaceLength > 0) {
            paddingRanges.push([labelStartOffset, labelStartOffset + leadingSpaceLength]);
          }

          // If an odd number of backslashes precede the padding, removing it would escape the
          // closing bracket and turn the link into plain text.
          let backslashCount = 0;

          while (
            label[label.length - trailingSpaceLength - 1 - backslashCount] === '\\'
          ) {
            backslashCount++;
          }

          if (trailingSpaceLength > 0 && backslashCount % 2 === 0) {
            paddingRanges.push([labelEndOffset - trailingSpaceLength, labelEndOffset]);
          }
        }

        for (const [startOffset, endOffset] of paddingRanges) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noMultipleLinkSpace',

            fix(fixer) {
              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
