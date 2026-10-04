/**
 * @fileoverview Rule to disallow spaces at the start and end of link text.
 * @author Marry(uncoolclub)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md039.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Link, LinkReference, PhrasingContent } from 'mdast';
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

const openingBracket = '[';
const closingBracket = ']';
const lineEndings = ['\r', '\n'];

// NOTE: GFM reads `[x]` or `[X]` at the head of a list item as a checked task list item.
const taskListMarkers = new Set(['x', 'X']);

const isSpace = (char: string) => char === ' ' || char === '\t';
const isBackslash = (char: string) => char === '\\';

/**
 * Count the characters matching a predicate at one end of a string.
 * - NOTE: A loop is used instead of `/[ \t]+$/`, which backtracks quadratically on long runs.
 * @param str The string to measure.
 * @param predicate The test each character must pass to be counted.
 * @param end Which end of the string to count from.
 * @returns The number of matching characters found.
 */
function countChars(
  str: string,
  predicate: (char: string) => boolean,
  end: 'start' | 'end',
): number {
  const strLength = str.length;
  let count = 0;

  while (count < strLength) {
    if (!predicate(str[end === 'end' ? strLength - 1 - count : count])) {
      break;
    }

    count++;
  }

  return count;
}

/**
 * Check whether removing the trailing padding of a label would escape its closing bracket.
 * @param label The link label, without its brackets.
 * @param trailingSpaceLength The length of the padding that would be removed.
 * @returns `true` if an odd number of backslashes precede the padding. `false` otherwise.
 */
function escapesClosingBracket(label: string, trailingSpaceLength: number): boolean {
  const beforePadding = label.slice(0, label.length - trailingSpaceLength);

  return countChars(beforePadding, isBackslash, 'end') % 2 === 1;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow spaces at the start and end of link text',
      url: URL_RULE_DOCS('no-multiple-link-space'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      noMultipleLinkSpace: 'Space at the start or end of link text is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    // Nodes at the head of list items that could still get a checkbox. They are collected from the
    // AST, because the list marker may sit on an earlier line or behind other markers.
    const listItemHeads = new WeakSet<PhrasingContent>();

    /**
     * Report the padding and remove it on fix.
     * @param startOffset Start offset of the padding.
     * @param endOffset End offset of the padding.
     */
    function reportPadding(startOffset: number, endOffset: number) {
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

    /**
     * Check whether removing the padding of a label would turn it into a task list item.
     * @param node The node the label belongs to.
     * @param label The link label, without its brackets.
     * @param leadingSpaceLength The length of the padding at the start.
     * @param trailingSpaceLength The length of the padding at the end.
     * @returns `true` if the fix would produce a checkbox. `false` otherwise.
     */
    function becomesTaskListItem(
      node: Link | LinkReference,
      label: string,
      leadingSpaceLength: number,
      trailingSpaceLength: number,
    ): boolean {
      // Only a shortcut reference has nothing after its label. Other forms are followed by a
      // destination or a second label, so they cannot become a checkbox.
      if (node.type !== 'linkReference' || node.referenceType !== 'shortcut') {
        return false;
      }

      if (
        !taskListMarkers.has(
          label.slice(leadingSpaceLength, label.length - trailingSpaceLength),
        )
      ) {
        return false;
      }

      // GFM needs a space, tab, or line ending right after the closing bracket.
      const [, nodeEndOffset] = sourceCode.getRange(node);
      const charAfterNode = sourceCode.text[nodeEndOffset];

      return (
        (charAfterNode === undefined ||
          isSpace(charAfterNode) ||
          lineEndings.includes(charAfterNode)) &&
        listItemHeads.has(node)
      );
    }

    /**
     * Check the link text of a `link` or `linkReference` node.
     * @param node The node to check.
     */
    function checkLinkText(node: Link | LinkReference) {
      const { children } = node;
      const [nodeStartOffset] = sourceCode.getRange(node);

      // Skip autolinks like `<https://example.com>` and GFM autolink literals like
      // `https://example.com`, which have no brackets.
      if (sourceCode.text[nodeStartOffset] !== openingBracket) {
        return;
      }

      // Skip empty link text like `[](url)`.
      if (children.length === 0) {
        return;
      }

      const [, lastChildEndOffset] = sourceCode.getRange(children[children.length - 1]);

      // The opening bracket is the first character of the node. The closing bracket is the first
      // one after the last child, because padding next to a line break can sit outside the
      // children.
      const labelStartOffset = nodeStartOffset + 1;
      const labelEndOffset = sourceCode.text.indexOf(closingBracket, lastChildEndOffset);
      const label = sourceCode.text.slice(labelStartOffset, labelEndOffset);

      // Skip link text spanning multiple lines. It can carry a hard break, a backslash before a
      // line ending, or blockquote markers, which padding removal would break.
      if (lineEndings.some(lineEnding => label.includes(lineEnding))) {
        return;
      }

      const leadingSpaceLength = countChars(label, isSpace, 'start');
      const trailingSpaceLength = countChars(label, isSpace, 'end');

      // Skip a shortcut reference that would become a checkbox like `[x]` without its padding.
      if (becomesTaskListItem(node, label, leadingSpaceLength, trailingSpaceLength)) {
        return;
      }

      // Report padding-only link text like `[ ](url)` once, since both ends cover the same range.
      if (leadingSpaceLength === label.length) {
        reportPadding(labelStartOffset, labelEndOffset);

        return;
      }

      if (leadingSpaceLength > 0) {
        reportPadding(labelStartOffset, labelStartOffset + leadingSpaceLength);
      }

      // If an odd number of backslashes precede the padding, removing it would escape the closing
      // bracket and turn the link into plain text.
      if (trailingSpaceLength > 0 && !escapesClosingBracket(label, trailingSpaceLength)) {
        reportPadding(labelEndOffset - trailingSpaceLength, labelEndOffset);
      }
    }

    return {
      // NOTE: A `listItem` node is visited before its children, so the heads are collected before
      // the links are checked.
      listItem(node) {
        // Skip list items that already have a checkbox.
        if (typeof node.checked === 'boolean') {
          return;
        }

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

      link: checkLinkText,
      linkReference: checkLinkText,
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
