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
  describe('ESLint integration', () => {
    it('should lint imports with the configured Node.js rules', () => {
      const messages = new Linter().verify("import fs from 'fs';", {
        plugins: nodePlugin,
        rules: nodeRules,
      });

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, 'n/prefer-node-protocol');
    });
  });

  describe('Exports', () => {
    it('`nodePlugin` should be defined', () => {
      assert.ok(nodePlugin);
      assert.strictEqual(typeof nodePlugin, 'object');
    });
  });

  describe(`All key values must start with \`${prefix}\`.`, () => {
    it('node.ts', () => {
      Object.keys(nodeRules).forEach(key => {
        assert.strictEqual(key.startsWith(prefix), true);
      });
    });
  });
});
