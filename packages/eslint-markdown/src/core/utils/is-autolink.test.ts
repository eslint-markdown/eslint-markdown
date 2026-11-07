/**
 * @fileoverview Test for `is-autolink.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { MarkdownSourceCode } from '@eslint/markdown';
import { isAutolink } from './is-autolink.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

class SourceCode extends MarkdownSourceCode {
  constructor(text: string) {
    super({ text, ast: { type: 'root', children: [] } });
  }
}

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('is-autolink', () => {
  it('should return `true` for an angle-bracket URL autolink', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'https://example.com',
          children: [],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
        new SourceCode('<https://example.com>'),
      ),
      true,
    );
  });

  it('should return `true` for an angle-bracket email autolink', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'mailto:user@example.com',
          children: [],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 19, offset: 18 },
          },
        },
        new SourceCode('<user@example.com>'),
      ),
      true,
    );
  });

  it('should return `true` for a GFM bare URL', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'https://example.com',
          children: [],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
        new SourceCode('https://example.com'),
      ),
      true,
    );
  });

  it('should return `true` for a GFM www autolink', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'http://www.example.com',
          children: [],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 16, offset: 15 },
          },
        },
        new SourceCode('www.example.com'),
      ),
      true,
    );
  });

  it('should return `true` for a GFM bare email address', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'mailto:user@example.com',
          children: [],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 17, offset: 16 },
          },
        },
        new SourceCode('user@example.com'),
      ),
      true,
    );
  });

  it('should return `true` for an autolink following a bracket', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'mailto:user@example.com',
          children: [],
          position: {
            start: { line: 1, column: 2, offset: 1 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
        new SourceCode('[<user@example.com>]'),
      ),
      true,
    );
  });

  it('should return `false` for an explicit Markdown link', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'https://example.com',
          children: [],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 29, offset: 28 },
          },
        },
        new SourceCode('[hello](https://example.com)'),
      ),
      false,
    );
  });

  it('should return `false` for an explicit link after leading text', () => {
    assert.strictEqual(
      isAutolink(
        {
          type: 'link',
          url: 'https://example.com',
          children: [],
          position: {
            start: { line: 1, column: 5, offset: 4 },
            end: { line: 1, column: 33, offset: 32 },
          },
        },
        new SourceCode('See [hello](https://example.com)'),
      ),
      false,
    );
  });
});
