/**
 * @fileoverview Rule to enforce spaces after list markers.
 * @author Jung Hyeon Jun(hu6r1s)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { List, ListItem } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

/**
 * Options for the `no-multiple-list-space` rule.
 */
type RuleOptions = [
  {
    /** Spaces after unordered list markers for single-line lists. */
    ulSingle: number;

    /** Spaces after unordered list markers for multi-line lists. */
    ulMulti: number;

    /** Spaces after ordered list markers for single-line lists. */
    olSingle: number;

    /** Spaces after ordered list markers for multi-line lists. */
    olMulti: number;
  },
];

type MessageIds = 'noMultipleListSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const LIST_MARKER_REGEX = /^(?:[*+-]|\d+[.)])(?<whitespace>[ \t]+)/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce spaces after list markers',
      url: URL_RULE_DOCS('no-multiple-list-space'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          ulSingle: {
            type: 'integer',
            minimum: 1,
          },
          ulMulti: {
            type: 'integer',
            minimum: 1,
          },
          olSingle: {
            type: 'integer',
            minimum: 1,
          },
          olMulti: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        ulSingle: 1,
        ulMulti: 1,
        olSingle: 1,
        olMulti: 1,
      },
    ],

    messages: {
      noMultipleListSpace:
        'List marker should be followed by {{ expected }} space(s), not {{ actual }}.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ ulSingle, ulMulti, olSingle, olMulti }] = context.options;

    return {
      list(node: List) {
        const listStart = sourceCode.getLoc(node).start.line;
        const listEnd = sourceCode.getLoc(node).end.line;

        const listItems = node.children;

        const allSingleLine = listEnd - listStart + 1 === listItems.length;

        const expectedSpaces = node.ordered
          ? allSingleLine
            ? olSingle
            : olMulti
          : allSingleLine
            ? ulSingle
            : ulMulti;

        for (const listItem of listItems) {
          checkListItem(listItem, expectedSpaces);
        }
      },
    };

    function checkListItem(node: ListItem, expectedSpaces: number): void {
      const [start] = sourceCode.getRange(node);
      const line = sourceCode.lines[sourceCode.getLocFromIndex(start).line - 1];

      const match = line.match(LIST_MARKER_REGEX);

      if (!match) {
        return;
      }

      const whitespace = match.groups?.whitespace;

      if (!whitespace) {
        return;
      }

      const actualSpaces = whitespace.length;

      if (actualSpaces === expectedSpaces) {
        return;
      }

      const whitespaceStart = start + match[0].length - whitespace.length;

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(whitespaceStart),
          end: sourceCode.getLocFromIndex(whitespaceStart + whitespace.length),
        },

        messageId: 'noMultipleListSpace',

        data: {
          expected: expectedSpaces,
          actual: actualSpaces,
        },

        fix(fixer) {
          return fixer.replaceTextRange(
            [whitespaceStart, whitespaceStart + whitespace.length],
            ' '.repeat(expectedSpaces),
          );
        },
      });
    }
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
