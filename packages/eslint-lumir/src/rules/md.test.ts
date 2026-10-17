/**
 * @fileoverview Test for `md.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { markdownPlugin } from './markdown.js';
import { mdPlugin, mdRules } from './md.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'md/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('md', () => {
  describe('ESLint integration', () => {
    it('should lint Markdown with the configured eslint-markdown rules', () => {
      const messages = new Linter().verify('Text  here.\n', {
        language: 'markdown/commonmark',
        plugins: { ...markdownPlugin, ...mdPlugin },
        rules: mdRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'md/no-double-space');
    });
  });

  describe('Exports', () => {
    it('`mdPlugin` should be defined', () => {
      assert.ok(mdPlugin);
      assert.strictEqual(typeof mdPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('md.ts', () => {
      Object.keys(mdRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
