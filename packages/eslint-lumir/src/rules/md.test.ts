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
  it('should lint GFM with the configured eslint-markdown rules', () => {
    const messages = new Linter().verify('Text  here.\n', {
      language: 'markdown/gfm',
      plugins: { ...markdownPlugin, ...mdPlugin },
      rules: mdRules,
    });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'md/no-double-space');
  });

  it('should not configure any eslint-markdown rule with warning severity', () => {
    Object.entries(mdRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`mdPlugin` should be defined', () => {
    assert.ok(mdPlugin);
    assert.strictEqual(typeof mdPlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(mdRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
