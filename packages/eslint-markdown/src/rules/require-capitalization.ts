/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Nodes, Parents, Text } from 'mdast';
import { isAutolink } from '../core/utils/index.js';
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
       * A non-empty custom message to report when the selected node requires capitalization.
       * When omitted, the default capitalization message is used.
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
 * Follows the first child at each level to find a leading text node.
 * @param node The node to start searching from.
 * @returns The leading text node, or `null` if the first branch does not lead to text.
 */
function findFirstTextNode(node: Nodes): Text | null {
  // Base case: if the current node is a text node, return it.
  if (node.type === 'text') {
    return node;
  }

  // Only follow the first child.
  if ('children' in node && node.children.length > 0) {
    return findFirstTextNode(node.children[0]);
  }

  // An empty parent or a non-text leaf has no leading text to check.
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
            minLength: 1,
          },
          {
            type: 'object',
            properties: {
              selector: { type: 'string', minLength: 1 },
              message: { type: 'string', minLength: 1 },
            },
            required: ['selector'],
            additionalProperties: false,
          },
        ],
      },
      // Intentionally allow an empty selector list, matching the behavior of `no-restricted-syntax`.
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

          const parent = sourceCode.getParent(textNode) as Parents | undefined;

          if (parent?.type === 'link' && isAutolink(parent, sourceCode)) return;

          const match = lowercaseRegex.exec(sourceCode.getText(textNode));

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
