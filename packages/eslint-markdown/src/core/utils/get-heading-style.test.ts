/**
 * @fileoverview Test for `get-heading-style.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { MarkdownSourceCode } from '@eslint/markdown';
import { getHeadingStyle } from './get-heading-style.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

class SourceCode extends MarkdownSourceCode {
  constructor(text: string) {
    super({ text, ast: { type: 'root', children: [] } });
  }

  override getText(): string {
    return this.text;
  }
}

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('get-heading-style', () => {
  it('returns `setext` for a heading with an underline', () => {
    assert.strictEqual(
      getHeadingStyle(
        {
          type: 'heading',
          depth: 1,
          children: [],
          position: {
            start: { line: 1, column: 1 },
            end: { line: 2, column: 8 },
          },
        },
        new SourceCode('Heading\n======='),
      ),
      'setext',
    );
  });

  it('returns `atx-closed` for a heading with closing hashes and trailing whitespace', () => {
    assert.strictEqual(
      getHeadingStyle(
        {
          type: 'heading',
          depth: 1,
          children: [],
          position: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 16 },
          },
        },
        new SourceCode('## Heading ##  '),
      ),
      'atx-closed',
    );
  });

  it('returns `atx` for a heading without closing hashes', () => {
    assert.strictEqual(
      getHeadingStyle(
        {
          type: 'heading',
          depth: 1,
          children: [],
          position: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 10 },
          },
        },
        new SourceCode('# Heading'),
      ),
      'atx',
    );
  });

  it('returns `atx` when the trailing hash is escaped', () => {
    assert.strictEqual(
      getHeadingStyle(
        {
          type: 'heading',
          depth: 1,
          children: [],
          position: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 13 },
          },
        },
        new SourceCode('# Heading \\#'),
      ),
      'atx',
    );
  });
});
