/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Nodes, Text } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * Options for the `require-capitalization` rule.
 */
type RuleOptions = (
  | string
  | {
      /**
       * An AST selector matching the Markdown nodes to check.
       */
      selector: string;
      /**
       * A custom message to report when the selected node requires capitalization.
       * When omitted or empty, the default capitalization message is used.
       */
      message?: string;
    }
)[];
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

    schema: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'string',
          },
          {
            type: 'object',
            properties: {
              selector: { type: 'string' },
              message: { type: 'string' },
            },
            required: ['selector'],
            additionalProperties: false,
          },
        ],
      },
      // Intentionally allow no selectors so the rule performs no checks,
      // matching the behavior of `no-restricted-syntax`.
      minItems: 0,
      uniqueItems: true,
    },

    defaultOptions: [],

    messages: {
      requireCapitalization: '{{ message }}',
    },

    language: 'markdown',
  },

  create(context) {
    const { options, sourceCode } = context;

    return options.reduce((listeners, selectorOrObject) => {
      const isStringFormat = typeof selectorOrObject === 'string';
      const selector = isStringFormat ? selectorOrObject : selectorOrObject.selector;
      const customMessage = isStringFormat ? undefined : selectorOrObject.message;

      return Object.assign(listeners, {
        [selector](node: Nodes) {
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

            messageId: 'requireCapitalization',

            data: {
              message: customMessage ?? `\`${lowercase}\` should be capitalized.`,
            },

            fix(fixer) {
              return fixer.replaceTextRange(
                [startOffset, endOffset],
                lowercase.toUpperCase(),
              );
            },
          });
        },
      });
    }, {});
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
