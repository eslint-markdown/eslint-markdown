/**
 * @fileoverview Rule to enforce consistent table style.
 * @author 이규환(lee-kyu-hwan)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { isBlankLine } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `consistent-table-style` rule.
 */
type RuleOptions = [
  {
    /**
     * Require a specific number of blank lines above each table.
     * @default false
     */
    blankLineAbove: number | false;
    /**
     * Require a specific number of blank lines below each table.
     * @default false
     */
    blankLineBelow: number | false;
  },
];
type MessageIds = 'blankLineAbove' | 'blankLineBelow';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

// Matches the first character that is neither whitespace nor a blockquote marker.
const containerPrefixEndRegex = /[^ \t>]/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent table style',
      url: URL_RULE_DOCS('consistent-table-style'),
      recommended: false,
      stylistic: true,
    },

    schema: [
      {
        type: 'object',
        properties: {
          blankLineAbove: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'integer',
                minimum: 1,
              },
            ],
          },
          blankLineBelow: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'integer',
                minimum: 1,
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        blankLineAbove: false,
        blankLineBelow: false,
      },
    ],

    messages: {
      blankLineAbove:
        'Table should be surrounded by {{ blankLineAbove }} blank line(s) above.',
      blankLineBelow:
        'Table should be surrounded by {{ blankLineBelow }} blank line(s) below.',
    },

    language: 'markdown',

    dialects: ['gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const { lines } = sourceCode;
    const [{ blankLineAbove, blankLineBelow }] = context.options;

    let blockquoteDepth = -1; // NOTE: Depth `0` is the first blockquote level, which is the top level.

    return {
      blockquote() {
        // When entering a `blockquote` node, increase the depth.
        blockquoteDepth++;
      },

      table(node) {
        const { start, end } = sourceCode.getLoc(node);
        const nodeStartLineIndex = start.line - 1;
        const nodeEndLineIndex = end.line - 1;

        // ------------------------------------------------------------------------
        // 1. Check blank lines above the table.
        // ------------------------------------------------------------------------

        if (blankLineAbove !== false) {
          for (
            let i = nodeStartLineIndex - 1; // Start checking from the line above the table.
            i >= nodeStartLineIndex - blankLineAbove; // Check up to the specified number of blank lines.
            i-- // Move upwards through the lines.
          ) {
            const line = lines[i];

            // If the line is `undefined`, it means we've reached the beginning of the file.
            if (line === undefined) {
              break;
            }

            // If the line is blank, continue checking the next line. If it's not blank, report the issue.
            if (isBlankLine(line, blockquoteDepth)) {
              continue;
            }

            // Only the first line of the table is reported.
            context.report({
              loc: {
                start,
                end: {
                  line: start.line,
                  column: lines[nodeStartLineIndex].length + 1,
                },
              },

              messageId: 'blankLineAbove',

              data: {
                blankLineAbove,
              },
            });

            // No need to check further once we've found a non-blank line.
            break;
          }
        }

        // ------------------------------------------------------------------------
        // 2. Check blank lines below the table.
        // ------------------------------------------------------------------------

        // NOTE: Lines directly below the table rows are parsed as part of the table, so `end` already covers them.
        if (blankLineBelow !== false) {
          for (
            let i = nodeEndLineIndex + 1; // Start checking from the line below the table.
            i <= nodeEndLineIndex + blankLineBelow; // Check up to the specified number of blank lines.
            i++ // Move downwards through the lines.
          ) {
            const line = lines[i];

            // If the line is `undefined`, it means we've reached the end of the file.
            if (line === undefined) {
              break;
            }

            // If the line is blank, continue checking the next line. If it's not blank, report the issue.
            if (isBlankLine(line, blockquoteDepth)) {
              continue;
            }

            // Only the last line of the table is reported, excluding its container prefix, such as blockquote markers.
            context.report({
              loc: {
                start: {
                  line: end.line,
                  column: lines[nodeEndLineIndex].search(containerPrefixEndRegex) + 1,
                },
                end,
              },

              messageId: 'blankLineBelow',

              data: {
                blankLineBelow,
              },
            });

            // No need to check further once we've found a non-blank line.
            break;
          }
        }
      },

      'blockquote:exit'() {
        // When exiting a `blockquote` node, decrease the depth.
        blockquoteDepth--;
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
