/**
 * @fileoverview HTML AST utilities.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parseFragment, type DefaultTreeAdapterTypes } from 'parse5';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Mimics the behavior of `getElementsByTagName` in the DOM API.
 * @param html The HTML string to parse.
 * @param tagName The tag name (case-insensitive) or regex to search for.
 * @returns Matched elements.
 */
export function getElementsByTagName(
  html: string,
  tagName: string | RegExp,
): (DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template)[] {
  const ast = parseFragment(html, { sourceCodeLocationInfo: true });
  const tagNameRegex =
    typeof tagName === 'string' ? new RegExp(`^${tagName}$`, 'i') : tagName;

  const nodes: (DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template)[] =
    [];

  function visit(node: DefaultTreeAdapterTypes.Node): void {
    if ('tagName' in node && tagNameRegex.test(node.tagName)) {
      nodes.push(node);
    }

    if ('childNodes' in node) {
      node.childNodes.forEach(visit);
    }
  }

  visit(ast);

  return nodes;
}
