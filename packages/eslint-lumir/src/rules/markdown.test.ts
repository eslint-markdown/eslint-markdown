/**
 * @fileoverview Test for `markdown.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { markdownPlugin, markdownRules } from './markdown.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'markdown/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown', () => {
  describe('ESLint integration', () => {
    it('should lint Markdown with the configured Markdown rules', () => {
      const messages = new Linter().verify('# Title\n\n### Details\n', {
        language: 'markdown/commonmark',
        plugins: markdownPlugin,
        rules: markdownRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'markdown/heading-increment');
    });
  });

  describe('Exports', () => {
    it('`markdownPlugin` should be defined', () => {
      assert.ok(markdownPlugin);
      assert.strictEqual(typeof markdownPlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('markdown.ts', () => {
      Object.keys(markdownRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
