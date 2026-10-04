/**
 * @fileoverview Get the style of a Markdown heading.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { MarkdownSourceCode } from '@eslint/markdown';
import type { Heading } from 'mdast';
import { trailingAtxHeadingHashRegex } from '../constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type HeadingStyle = (typeof HEADING_STYLE)[number];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const HEADING_STYLE = ['atx', 'atx-closed', 'setext'] as const;

/**
 * Gets the style of a Markdown heading.
 * @param node The heading node.
 * @param sourceCode The Markdown source code.
 * @returns The heading style.
 */
export function getHeadingStyle(
  node: Heading,
  sourceCode: MarkdownSourceCode,
): HeadingStyle {
  const { start, end } = sourceCode.getLoc(node);

  if (start.line !== end.line /* Multiline Heading */) {
    return 'setext';
  } else if (trailingAtxHeadingHashRegex.test(sourceCode.getText(node))) {
    return 'atx-closed';
  } else {
    return 'atx';
  }
}
