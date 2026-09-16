/**
 * @fileoverview Rule to enforce consistent code style.
 * @author lumir(lumirlumir)
 */

/*
 * Note on autofix and suggestion safety:
 * - Converting `fence-backtick` to `fence-tilde` is safe.
 * - Converting `fence-backtick` to `indent` is not safe, as `lang` and `meta` information would be lost.
 * - Converting `fence-tilde` to `fence-backtick` is safe.
 * - Converting `fence-tilde` to `indent` is not safe, as `lang` and `meta` information would be lost.
 * - Converting `indent` to `fence-backtick` is safe.
 * - Converting `indent` to `fence-tilde` is safe.
 *
 * A conversion that only rewrites fence characters is applied as an autofix. One that
 * would drop an info string is offered as a suggestion instead, so the loss is the
 * author's choice. A conversion with no faithful form -- a content line that would close
 * the new fence early, or a block whose container prefix the node range does not carry --
 * is reported without a fix.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  CODE_STYLE,
  getCodeStyle,
  isBlankLine,
  type CodeStyle,
} from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `consistent-code-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'consistent'`, the rule enforces that all code blocks in the document use the same style as the first one encountered.
     * @default 'consistent'
     */
    style: 'consistent' | CodeStyle;
    /**
     * Require a specific number of blank lines above each fenced code block.
     * @default false
     */
    blankLineAbove: number | false;
    /**
     * Require a specific number of blank lines below each fenced code block.
     * @default false
     */
    blankLineBelow: number | false;
  },
];
type MessageIds = 'style' | 'blankLineAbove' | 'blankLineBelow' | 'suggestIndent';
type FenceStyle = Exclude<CodeStyle, 'indent'>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/** The shortest fence CommonMark accepts. */
const DEFAULT_FENCE_LENGTH = 3;

/** One level of indentation. @see https://spec.commonmark.org/0.31.2/#indented-code-blocks */
const INDENT = '    ';

/**
 * Characters that may sit before a closing fence on its own line: the
 * whitespace and container markers of a blockquote (`>`) or a list item
 * (`-`, `+`, `*`, `1.`, `1)`).
 */
const FENCE_PREFIX_CHARS = new Set([' ', '\t', '>', '-', '+', '*', '.', ')']);

/**
 * Whether `text` could be the part of a line that precedes its closing fence.
 * @param text The text to inspect.
 * @returns Whether the text is only container markers and whitespace.
 */
function isFencePrefix(text: string): boolean {
  return [...text].every(
    char => FENCE_PREFIX_CHARS.has(char) || (char >= '0' && char <= '9'),
  );
}

/**
 * The fence character of a fenced code style.
 * @param style The fenced code style.
 * @returns The fence character.
 */
function getFenceChar(style: FenceStyle): string {
  return style === 'fence-tilde' ? '~' : '`';
}

/**
 * Counts the characters at the start of `text` that are `char`.
 * @param text The text to inspect.
 * @param char The character to count.
 * @returns The number of leading `char` characters.
 */
function countLeadingChar(text: string, char: string): number {
  let length = 0;

  while (text[length] === char) {
    length += 1;
  }

  return length;
}

/**
 * Whether any line of `text` carries a run of `char` at least `length` long.
 * Such a run would close a fence built from `char` early.
 * @param text The text to inspect.
 * @param char The fence character.
 * @param length The fence length.
 * @returns Whether such a run exists.
 */
function hasCharRun(text: string, char: string, length: number): boolean {
  const run = char.repeat(length);

  return text.split('\n').some(line => line.includes(run));
}

/**
 * The info string of a fenced code block, without its surrounding whitespace.
 * @param text The raw source text of the code block.
 * @returns The info string.
 */
function getInfoString(text: string): string {
  const openingLineEnd = text.indexOf('\n');

  return text
    .slice(
      countLeadingChar(text, text[0]),
      openingLineEnd === -1 ? undefined : openingLineEnd,
    )
    .trim();
}

/**
 * Finds the closing fence of a fenced code block.
 * @param text The raw source text of the code block.
 * @returns The offset at which the closing fence run starts, or `null` when the block is not closed.
 */
function getClosingFenceStart(text: string): number | null {
  const lastLineStart = text.lastIndexOf('\n') + 1;

  // A single-line code block is an opening fence, never a closing one.
  if (lastLineStart === 0) {
    return null;
  }

  const fenceChar = text[0];
  let closingFenceStart = text.length;

  while (closingFenceStart > lastLineStart && text[closingFenceStart - 1] === fenceChar) {
    closingFenceStart -= 1;
  }

  // The run has to sit at the end of the block, follow only container markers
  // and whitespace on its line, and be at least as long as the opening fence.
  if (
    closingFenceStart === text.length ||
    !isFencePrefix(text.slice(lastLineStart, closingFenceStart)) ||
    text.length - closingFenceStart < countLeadingChar(text, fenceChar)
  ) {
    return null;
  }

  return closingFenceStart;
}

/**
 * Rewrites the two fence runs of a fenced code block to another fence character.
 *
 * Only the runs change, so a container prefix (a blockquote's `>`, a list item's
 * indentation) is carried over untouched.
 * @param text The raw source text of the code block.
 * @param from The current fenced code style.
 * @param to The expected fenced code style.
 * @returns The replacement text, or `null` when the rewrite would change the document.
 */
function convertFenceChar(text: string, from: FenceStyle, to: FenceStyle): string | null {
  const fromChar = getFenceChar(from);
  const toChar = getFenceChar(to);
  const openingFenceLength = countLeadingChar(text, fromChar);
  const closingFenceStart = getClosingFenceStart(text);

  // A backtick fence cannot carry a backtick in its info string.
  if (toChar === '`' && getInfoString(text).includes('`')) {
    return null;
  }

  // A content line carrying a run of the new fence character would close the block early.
  const openingLineEnd = text.indexOf('\n');
  const bodyStart = openingLineEnd === -1 ? text.length : openingLineEnd + 1;

  if (
    hasCharRun(
      text.slice(bodyStart, closingFenceStart ?? text.length),
      toChar,
      openingFenceLength,
    )
  ) {
    return null;
  }

  const converted =
    toChar.repeat(openingFenceLength) +
    text.slice(openingFenceLength, closingFenceStart ?? text.length);

  return closingFenceStart === null
    ? converted
    : converted + toChar.repeat(text.length - closingFenceStart);
}

/**
 * Removes one level of indentation from a line.
 * @param line The line to dedent.
 * @returns The line without one level of indentation.
 */
function dedent(line: string): string {
  if (line.startsWith('\t')) {
    return line.slice(1);
  }

  let width = 0;

  while (width < INDENT.length && line[width] === ' ') {
    width += 1;
  }

  return line.slice(width);
}

/**
 * Rewrites an indented code block as a fenced one.
 * @param text The raw source text of the code block.
 * @param to The expected fenced code style.
 * @returns The replacement text, or `null` when the content cannot live inside the fence.
 */
function convertIndentToFence(text: string, to: FenceStyle): string | null {
  const fenceChar = getFenceChar(to);
  const body = text
    .split('\n')
    .map(line => dedent(line))
    .join('\n');

  if (hasCharRun(body, fenceChar, DEFAULT_FENCE_LENGTH)) {
    return null;
  }

  const fence = fenceChar.repeat(DEFAULT_FENCE_LENGTH);

  return `${fence}\n${body}\n${fence}`;
}

/**
 * Rewrites a fenced code block as an indented one. Any info string is dropped.
 * @param text The raw source text of the code block.
 * @returns The replacement text, or `null` when the block has no indented form.
 */
function convertFenceToIndent(text: string): string | null {
  const openingLineEnd = text.indexOf('\n');

  // An opening fence on its own has no content to indent.
  if (openingLineEnd === -1) {
    return null;
  }

  const closingFenceStart = getClosingFenceStart(text);
  const bodyLines = text
    .slice(openingLineEnd + 1, closingFenceStart ?? text.length)
    .split('\n');

  // The newline that precedes the closing fence is not part of the content.
  if (bodyLines.at(-1) === '') {
    bodyLines.pop();
  }

  // An indented code block cannot be empty.
  if (bodyLines.every(line => line.trim() === '')) {
    return null;
  }

  return bodyLines.map(line => (line.trim() === '' ? line : INDENT + line)).join('\n');
}

/**
 * Decides how a code block can reach the expected style.
 * @param options The conversion context.
 * @param options.text The raw source text of the code block.
 * @param options.from The current code style.
 * @param options.to The expected code style.
 * @param options.isTopLevel Whether the block starts at the first column.
 * @param options.isSurroundedByBlankLines Whether blank lines separate the block from its neighbours.
 * @returns The replacement text and whether it is safe to autofix, or `null` when the conversion has no faithful form.
 */
function getStyleConversion(options: {
  text: string;
  from: CodeStyle;
  to: CodeStyle;
  isTopLevel: boolean;
  isSurroundedByBlankLines: boolean;
}): { isSafe: boolean; text: string } | null {
  const { text, from, to, isTopLevel, isSurroundedByBlankLines } = options;

  if (to === 'indent') {
    // Unlike a fence, an indented code block cannot interrupt a paragraph and is
    // ended by a blank line, so it is only offered where the block already sits
    // between blank lines.
    if (!isTopLevel || !isSurroundedByBlankLines) {
      return null;
    }

    const converted = convertFenceToIndent(text);

    if (converted === null) {
      return null;
    }

    // Only an info string is lost, so a bare fence stays safe to fix.
    return { isSafe: getInfoString(text) === '', text: converted };
  }

  // Reflowing a block has to reproduce its container prefix, which the node
  // range does not carry.
  if (from === 'indent' && !isTopLevel) {
    return null;
  }

  const converted =
    from === 'indent' ? convertIndentToFence(text, to) : convertFenceChar(text, from, to);

  return converted === null ? null : { isSafe: true, text: converted };
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent code style',
      url: URL_RULE_DOCS('consistent-code-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    hasSuggestions: true,

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', ...CODE_STYLE],
          },
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
        style: 'consistent',
        blankLineAbove: false,
        blankLineBelow: false,
      },
    ],

    messages: {
      style: 'Code style should be `{{ style }}`.',
      blankLineAbove:
        'Code should be surrounded by {{ blankLineAbove }} blank line(s) above.',
      blankLineBelow:
        'Code should be surrounded by {{ blankLineBelow }} blank line(s) below.',
      suggestIndent:
        'Replace the fenced code block with an indented code block. The language identifier and metadata will be dropped.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const { lines } = sourceCode;
    const [{ style, blankLineAbove, blankLineBelow }] = context.options;

    let codeStyle: CodeStyle | null = style === 'consistent' ? null : style;
    let blockquoteDepth = -1; // NOTE: Depth `0` is the first blockquote level, which is the top level.

    /**
     * Whether the line at the given index is blank, or outside the document.
     * @param index The zero-based line index.
     * @returns Whether the line is blank.
     */
    function isBlankLineAt(index: number): boolean {
      const line = lines[index];

      return line === undefined || isBlankLine(line, blockquoteDepth);
    }

    return {
      blockquote() {
        // When entering a `blockquote` node, increase the depth.
        blockquoteDepth++;
      },

      code(node) {
        // ------------------------------------------------------------------------
        // 1. Check code style consistency.
        // ------------------------------------------------------------------------

        const { start, end } = sourceCode.getLoc(node);
        const [nodeStartOffset] = sourceCode.getRange(node);
        const currentCodeFenceChar = sourceCode.text[nodeStartOffset];
        const currentCodeStyle = getCodeStyle(currentCodeFenceChar);
        const nodeStartLineIndex = start.line - 1;
        const nodeEndLineIndex = end.line - 1;

        if (codeStyle === null) {
          codeStyle = currentCodeStyle;
        }

        if (codeStyle !== currentCodeStyle) {
          const expectedStyle = codeStyle;

          const loc = {
            start,

            end: {
              line: start.line,
              column: (() => {
                const nodeStartLineText = lines[nodeStartLineIndex];

                if (currentCodeStyle === 'indent') {
                  return nodeStartLineText.length + 1;
                }

                let { column } = start;

                while (nodeStartLineText[column - 1] === currentCodeFenceChar) {
                  column++;
                }

                return column;
              })(),
            },
          };

          /**
           * Reports the style mismatch with the fix or the suggestion it allows.
           * @param fix The fix to offer, or `null` when the conversion has no faithful form.
           * @param suggest The suggestions to offer.
           */
          const reportStyle = (
            fix: NonNullable<Parameters<typeof context.report>[0]['fix']> | null,
            ...suggest: NonNullable<Parameters<typeof context.report>[0]['suggest']>
          ) => {
            context.report({
              loc,

              messageId: 'style',

              data: {
                style: expectedStyle,
              },

              fix,

              suggest,
            });
          };

          const conversion = getStyleConversion({
            text: sourceCode.getText(node),
            from: currentCodeStyle,
            to: expectedStyle,
            // Reflowing a block has to reproduce its container prefix, which the
            // node range does not carry.
            isTopLevel: start.column === 1,
            isSurroundedByBlankLines:
              isBlankLineAt(nodeStartLineIndex - 1) &&
              isBlankLineAt(nodeEndLineIndex + 1),
          });

          if (conversion === null) {
            reportStyle(null);
          } else if (conversion.isSafe) {
            reportStyle(fixer => fixer.replaceText(node, conversion.text));
          } else {
            reportStyle(null, {
              messageId: 'suggestIndent',
              fix: fixer => fixer.replaceText(node, conversion.text),
            });
          }
        }

        // ------------------------------------------------------------------------
        // 2. Check blank lines above the code block.
        // ------------------------------------------------------------------------

        // `markdownlint` doesn't check blank lines above indented code blocks, so we skip this check for the `indent` style.
        if (blankLineAbove !== false && currentCodeStyle !== 'indent') {
          for (
            let i = nodeStartLineIndex - 1; // Start checking from the line above the code block.
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

            context.report({
              node,

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
        // 3. Check blank lines below the code block.
        // ------------------------------------------------------------------------

        // `markdownlint` doesn't check blank lines below indented code blocks, so we skip this check for the `indent` style.
        if (blankLineBelow !== false && currentCodeStyle !== 'indent') {
          for (
            let i = nodeEndLineIndex + 1; // Start checking from the line below the code block.
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

            context.report({
              node,

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
