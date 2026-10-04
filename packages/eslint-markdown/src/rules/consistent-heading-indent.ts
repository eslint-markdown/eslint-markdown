/**
 * @fileoverview Rule to disallow heading indentation.
 * @author Soheun(sohxxny)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md023.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Blockquote, FootnoteDefinition, ListItem, Node } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `consistent-heading-indent` rule.
 */
type RuleOptions = [];
type MessageIds = 'noHeadingIndentation';
type Container = Blockquote | FootnoteDefinition | ListItem;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const containerTypes = new Set(['blockquote', 'footnoteDefinition', 'listItem']);
const listItemMarkerRegex = /^(?<marker>[*+-]|\d{1,9}[.)])(?<spaces>[ \t]*)(?<rest>.*)$/;
const indentationRegex = /^[ \t]+$/;

/**
 * Check if the node is a container that can hold a heading.
 * @param node Node to check.
 */
function isContainer(node: Node): node is Container {
  return containerTypes.has(node.type);
}

/**
 * Get the column reached after the text, expanding tabs to the next multiple of four columns.
 * @param text Text to measure.
 * @param startColumn Zero-based column where the text starts.
 */
function getColumnAfter(text: string, startColumn = 0) {
  let column = startColumn;

  for (const char of text) {
    column = char === '\t' ? column + 4 - (column % 4) : column + 1;
  }

  return column;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow heading indentation',
      url: URL_RULE_DOCS('consistent-heading-indent'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      noHeadingIndentation: 'Heading indentation is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    /**
     * Get the zero-based column, with tabs expanded, where the content of the container starts on the heading line.
     * @param container Innermost container of the heading.
     * @param linePrefix Text before the heading on the heading line.
     * @param headingStart Start position of the heading.
     */
    function getContentColumn(
      container: Container,
      linePrefix: string,
      headingStart: { line: number; column: number },
    ) {
      const { start } = sourceCode.getLoc(container);
      const firstLine = sourceCode.lines[start.line - 1];

      if (container.type === 'blockquote') {
        // The content starts after the last `>` marker and one column of its optional following space or tab.
        const markerIndex = linePrefix.lastIndexOf('>');
        const hasMarkerSpace = /[ \t]/.test(linePrefix[markerIndex + 1] ?? '');

        return (
          getColumnAfter(linePrefix.slice(0, markerIndex + 1)) + (hasMarkerSpace ? 1 : 0)
        );
      }

      if (container.type === 'footnoteDefinition') {
        // A heading on the label line starts the content, and continuation lines are indented by four columns.
        return start.line === headingStart.line
          ? getColumnAfter(linePrefix)
          : getColumnAfter(firstLine.slice(0, start.column - 1)) + 4;
      }

      const groups = firstLine.slice(start.column - 1).match(listItemMarkerRegex)?.groups;

      if (!groups?.marker || groups.spaces === undefined) {
        return getColumnAfter(firstLine.slice(0, start.column - 1));
      }

      // Columns are measured with tabs expanded, because a tab after the marker can span several columns.
      const markerEndColumn = getColumnAfter(
        firstLine.slice(0, start.column - 1) + groups.marker,
      );
      const spacesWidth =
        getColumnAfter(groups.spaces, markerEndColumn) - markerEndColumn;

      // An empty first line or more than four columns after the marker puts the content one column after the marker.
      return !groups.rest || spacesWidth > 4
        ? markerEndColumn + 1
        : markerEndColumn + spacesWidth;
    }

    return {
      heading(node) {
        const { start } = sourceCode.getLoc(node);

        const linePrefix = sourceCode.lines[start.line - 1].slice(0, start.column - 1);

        const container = sourceCode.getAncestors(node).findLast(isContainer);
        const contentColumn = container
          ? getContentColumn(container, linePrefix, start)
          : 0;

        // Find the first character that extends past the content column.
        let indentationIndex = 0;
        let indentationColumn = 0;

        while (indentationIndex < linePrefix.length) {
          const nextColumn = getColumnAfter(
            linePrefix[indentationIndex] ?? '',
            indentationColumn,
          );

          if (nextColumn > contentColumn) {
            break;
          }

          indentationIndex++;
          indentationColumn = nextColumn;
        }

        const indentation = linePrefix.slice(indentationIndex);

        // Skip headings that start at the beginning of their container's content.
        if (!indentationRegex.test(indentation)) {
          return;
        }

        // A tab that spans the content column is partly a container prefix, so that part is kept as spaces.
        const replacement = ' '.repeat(Math.max(contentColumn - indentationColumn, 0));

        const [headingStartOffset] = sourceCode.getRange(node);
        const startOffset = headingStartOffset - indentation.length;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(startOffset),
            end: sourceCode.getLocFromIndex(headingStartOffset),
          },

          messageId: 'noHeadingIndentation',

          fix(fixer) {
            return fixer.replaceTextRange([startOffset, headingStartOffset], replacement);
          },
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
