/**
 * @fileoverview Rule to disallow spaces inside link text.
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
 * Options for the `no-space-in-link-text` rule.
 */
type RuleOptions = [];
type MessageIds = 'noSpaceInLinkText';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const openingBracket = '[';
const closingBracket = ']';
const lineEndings = ['\r', '\n'];

// GFM reads `[x]` or `[X]` at the head of a list item as a checked task list item.
const taskListMarkers = new Set(['x', 'X']);

const isSpace = (char: string) => char === ' ' || char === '\t';
const isBackslash = (char: string) => char === '\\';

/**
 * Count the characters matching a predicate at one end of a string.
 * - NOTE: Counting beats an anchored regular expression here, because `/[ \t]+$/` backtracks from
 *   every position of a long run and turns a padded label into quadratic work.
 * @param str The string to measure.
 * @param predicate The test each character must pass to be counted.
 * @param fromEnd Whether to count from the end instead of the start.
 * @returns The number of matching characters found.
 */
function countChars(
  str: string,
  predicate: (char: string) => boolean,
  fromEnd: boolean,
): number {
  const strLength = str.length;
  let count = 0;

  while (count < strLength) {
    if (!predicate(str[fromEnd ? strLength - 1 - count : count])) {
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
 * @returns `true` if the padding hides an odd number of backslashes. `false` otherwise.
 */
function escapesClosingBracket(label: string, trailingSpaceLength: number): boolean {
  const beforePadding = label.slice(0, label.length - trailingSpaceLength);

  return countChars(beforePadding, isBackslash, true) % 2 === 1;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow spaces at the start and end of link text',
      url: URL_RULE_DOCS('no-space-in-link-text'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'whitespace',

    messages: {
      noSpaceInLinkText: 'Space at the start or end of link text is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    // A checkbox has to open the first paragraph of a list item, which the text before the link on
    // its own line cannot tell: the list marker may sit on an earlier line, or behind other markers.
    const listItemHeads = new WeakSet<PhrasingContent>();

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
     * Checks whether removing the padding of a label would turn it into a task list marker.
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
      // Only a shortcut reference renders as bare brackets; every other form keeps a destination
      // or a second label after them, which stops GFM from reading a checkbox.
      if (node.type !== 'linkReference' || node.referenceType !== 'shortcut') {
        return false;
      }

      return (
        taskListMarkers.has(
          label.slice(leadingSpaceLength, label.length - trailingSpaceLength),
        ) && listItemHeads.has(node)
      );
    }

    /**
     * Checks the link text of a `link` or `linkReference` node.
     * @param node The node to check.
     */
    function checkLinkText(node: Link | LinkReference) {
      const { children } = node;
      const [nodeStartOffset] = sourceCode.getRange(node);

      // An autolink or a GFM literal such as `<https://example.com>` is a `link` node without
      // brackets, so it has no link text and no label to measure offsets against.
      if (sourceCode.text[nodeStartOffset] !== openingBracket) {
        return;
      }

      // An empty link text, `[](url)`, has no children and therefore no padding to report.
      if (children.length === 0) {
        return;
      }

      const [, lastChildEndOffset] = sourceCode.getRange(children[children.length - 1]);

      // The opening bracket is the first character of the node, and the closing bracket is the
      // first one after the last child, since the label ends there.
      const labelStartOffset = nodeStartOffset + 1;
      const labelEndOffset = sourceCode.text.indexOf(closingBracket, lastChildEndOffset);
      const label = sourceCode.text.slice(labelStartOffset, labelEndOffset);

      // A label spanning several lines carries structure that padding removal would damage: the two
      // spaces of a hard break, the backslash that escapes the closing bracket, and the blockquote
      // markers that open each of its lines.
      if (lineEndings.some(lineEnding => label.includes(lineEnding))) {
        return;
      }

      const leadingSpaceLength = countChars(label, isSpace, false);
      const trailingSpaceLength = countChars(label, isSpace, true);

      // Removing the padding of a shortcut reference at the head of a list item would leave `[x]`,
      // which GFM reads as a checkbox, replacing the link with a task list item.
      if (becomesTaskListItem(node, label, leadingSpaceLength, trailingSpaceLength)) {
        return;
      }

      // A label of padding only, `[ ](url)`, matches on both ends over the same characters.
      if (leadingSpaceLength + trailingSpaceLength > label.length) {
        reportPadding(labelStartOffset, labelEndOffset);

        return;
      }

      if (leadingSpaceLength > 0) {
        reportPadding(labelStartOffset, labelStartOffset + leadingSpaceLength);
      }

      // An odd number of backslashes before the padding would escape the closing bracket once the
      // padding is gone, which turns the link into plain text.
      if (trailingSpaceLength > 0 && !escapesClosingBracket(label, trailingSpaceLength)) {
        reportPadding(labelEndOffset - trailingSpaceLength, labelEndOffset);
      }
    }

    return {
      // Visited before its own children, so the head is known by the time the link is checked.
      listItem(node) {
        const [firstChild] = node.children;

        if (firstChild?.type === 'paragraph' && firstChild.children.length > 0) {
          listItemHeads.add(firstChild.children[0]);
        }
      },

      link: checkLinkText,
      linkReference: checkLinkText,
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
