/**
 * @fileoverview Get the code style based on the given character.
 * @see https://spec.commonmark.org/0.31.2/#fenced-code-blocks
 * @see https://spec.commonmark.org/0.31.2/#indented-code-blocks
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type CodeStyle = (typeof CODE_STYLE)[number];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const CODE_STYLE = ['indent', 'fence-backtick', 'fence-tilde'] as const;

/**
 * Get the code style based on the given character.
 * @param char The character to determine the code style from. It must be a single character.
 * @returns The code style.
 */
export function getCodeStyle(char: string): CodeStyle {
  if (char === '`') {
    return 'fence-backtick';
  } else if (char === '~') {
    return 'fence-tilde';
  } else {
    return 'indent';
  }
}
