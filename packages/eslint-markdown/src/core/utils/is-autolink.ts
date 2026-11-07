/**
 * @fileoverview Check if a Markdown link is an autolink.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { MarkdownSourceCode } from '@eslint/markdown';
import type { Link } from 'mdast';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Checks for angle-bracket autolinks and GFM autolink literals.
 * @param node The Markdown link node.
 * @param sourceCode The Markdown source code.
 * @returns `true` if the node is an autolink. `false` otherwise.
 */
export function isAutolink(node: Link, sourceCode: MarkdownSourceCode): boolean {
  // Explicit Markdown links start with `[`, unlike autolinks.
  return sourceCode.text[sourceCode.getRange(node)[0]] !== '[';
}
