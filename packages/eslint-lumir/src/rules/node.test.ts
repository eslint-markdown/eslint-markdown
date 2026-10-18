/**
 * @fileoverview Test for `node.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, it } from 'vitest';
import { nodePlugin, nodeRules } from './node.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const prefix = 'n/';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('node', () => {
  it('should lint imports with the configured Node.js rules', () => {
    const messages = new Linter().verify("import fs from 'fs';", {
      plugins: nodePlugin,
      rules: nodeRules,
    });

    assert.lengthOf(messages, 1);
    assert.strictEqual(messages[0].ruleId, 'n/prefer-node-protocol');
  });

  it('should not configure any Node.js rule with warning severity', () => {
    Object.entries(nodeRules).forEach(([ruleId, config]) => {
      const severity = Array.isArray(config) ? config[0] : config;

      assert.notInclude(['warn', 1], severity, ruleId);
    });
  });

  it('`nodePlugin` should be defined', () => {
    assert.ok(nodePlugin);
    assert.strictEqual(typeof nodePlugin, 'object');
  });

  it(`all key values must start with \`${prefix}\`.`, () => {
    Object.keys(nodeRules).forEach(key => {
      assert.strictEqual(key.startsWith(prefix), true);
    });
  });
});
