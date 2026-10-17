/**
 * @fileoverview Test for `next.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Linter } from 'eslint';
import { assert, describe, expect, it, vi } from 'vitest';
import next from './next.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('next', () => {
  describe('ESLint integration', () => {
    it('should lint JSX with the next configuration', () => {
      const messages = new Linter().verify(
        'const element = <img src="/example.png" alt="Example" />;',
        [next],
        { filename: 'example.jsx' },
      );

      assert.lengthOf(messages, 1);
      assert.strictEqual(messages[0].ruleId, '@next/next/no-img-element');
    });
  });

  it('should throw when loading the `eslint-lumir/next` subpaths without the Next.js plugin', async () => {
    // Re-evaluate imports so cached configurations cannot hide a dependency on Next.js.
    vi.resetModules();
    vi.doMock('@next/eslint-plugin-next', () => {
      throw new Error('The optional Next.js plugin is not installed.');
    });

    try {
      await expect(import('eslint-lumir/next')).rejects.toMatchObject({
        cause: { message: 'The optional Next.js plugin is not installed.' },
      });

      const [{ default: loadedJsx }, { default: loadedTsx }] = await Promise.all([
        import('eslint-lumir/jsx'),
        import('eslint-lumir/tsx'),
      ]);

      assert.strictEqual(loadedJsx.name, 'lumir/jsx');
      assert.strictEqual(loadedTsx.name, 'lumir/tsx');
      assert.notProperty(loadedJsx.plugins, '@next/next');
      assert.notProperty(loadedTsx.plugins, '@next/next');
    } finally {
      vi.doUnmock('@next/eslint-plugin-next');
      vi.resetModules();
    }
  });
});
