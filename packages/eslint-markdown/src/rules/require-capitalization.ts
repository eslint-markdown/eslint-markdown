/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
 * @author 루밀LuMir(lumirlumir)
 */

// TODO:
// - Consider `always` and `never` options for each node type.
// - Consider allow or allowPattern options to allow certain words or patterns to be exempt from capitalization.

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading, Nodes, Paragraph, TableCell, Text } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

type RuleOptions = [
  {
    skipBlockquote: boolean;
    skipFootnoteDefinition: boolean;
    skipHeading: boolean;
    skipListItem: boolean;
    skipParagraph: boolean;
    skipTableCell: boolean | 'th' | 'td';
  },
];
type MessageIds = 'requireCapitalization';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const lowercaseRegex = /^[a-z]/u;

/**
 * Traverses the Markdown AST using a DFS pre-order approach to find the first text node.
 * @param node The node to start searching from.
 * @returns The first text node, if present.
 */
function findFirstTextNode(node: Nodes): Text | null {
  // Base case: if the current node is a text node, return it.
  if (node.type === 'text') {
    return node;
  }

  // Check if the current node has children to traverse.
  // In the Markdown AST (Mdast), if a node has children
  // they are always represented as an array even when empty.
  if ('children' in node) {
    for (const child of node.children) {
      const textNode = findFirstTextNode(child);

      // Return the first text node found in the subtree.
      if (textNode) {
        return textNode;
      }
    }
  }

  // When no text node is found in the subtree, return `null`.
  return null;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of capital letters at the beginning of sentences',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('require-capitalization'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          skipBlockquote: {
            type: 'boolean',
          },
          skipFootnoteDefinition: {
            type: 'boolean',
          },
          skipHeading: {
            type: 'boolean',
          },
          skipListItem: {
            type: 'boolean',
          },
          skipParagraph: {
            type: 'boolean',
          },
          skipTableCell: {
            oneOf: [
              {
                type: 'boolean',
              },
              {
                enum: ['th', 'td'],
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipBlockquote: false,
        skipFootnoteDefinition: false,
        skipHeading: false,
        skipListItem: false,
        skipParagraph: false,
        skipTableCell: false,
      },
    ],

    messages: {
      requireCapitalization: '`{{ lowercase }}` should be capitalized.',
    },

    language: 'markdown',
  },

  create(context) {
    const { sourceCode } = context;
    const [
      {
        skipBlockquote,
        skipFootnoteDefinition,
        skipHeading,
        skipListItem,
        skipParagraph,
        skipTableCell,
      },
    ] = context.options;

    /** @param node The heading, paragraph, or table cell to report. */
    function report(node: Heading | Paragraph | TableCell) {
      const textNode = findFirstTextNode(node);

      if (!textNode) return;

      const match = lowercaseRegex.exec(textNode.value);

      if (!match) return;

      const [nodeStartOffset] = sourceCode.getRange(textNode);
      const lowercase = match[0];
      const startOffset = nodeStartOffset + match.index;
      const endOffset = startOffset + lowercase.length;

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        data: {
          lowercase,
        },

        messageId: 'requireCapitalization',

        fix(fixer) {
          return fixer.replaceTextRange(
            [startOffset, endOffset],
            lowercase.toUpperCase(),
          );
        },
      });
    }

    return {
      // blockquote
      'blockquote > paragraph'(node: Paragraph) {
        if (skipBlockquote) return;

        report(node);
      },

      // footnoteDefinition
      'footnoteDefinition > paragraph'(node: Paragraph) {
        if (skipFootnoteDefinition) return;

        report(node);
      },

      // heading
      heading(node) {
        if (skipHeading) return;

        report(node);
      },

      // listItem
      'listItem > paragraph'(node: Paragraph) {
        if (skipListItem) return;

        report(node);
      },

      // paragraph
      'paragraph:not(blockquote > paragraph, footnoteDefinition > paragraph, listItem > paragraph)'(
        node: Paragraph,
      ) {
        if (skipParagraph) return;

        report(node);
      },

      // tableCell: th (table header)
      'table > tableRow:first-child > tableCell'(node: TableCell) {
        if (skipTableCell === true || skipTableCell === 'th') return;

        report(node);
      },

      // tableCell: td (table data)
      'table > tableRow:not(:first-child) > tableCell'(node: TableCell) {
        if (skipTableCell === true || skipTableCell === 'td') return;

        report(node);
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
