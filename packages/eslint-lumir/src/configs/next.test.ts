/**
 * @fileoverview Test for `next.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, expect, it, vi } from 'vitest';
import nextPlugin from '@next/eslint-plugin-next';
import next from './next.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('next', () => {
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

  it('should include every rule provided by the Next.js plugin', () => {
    assert.deepStrictEqual(
      Object.keys(next.rules).sort(),
      Object.keys(nextPlugin.rules)
        .map(name => `@next/next/${name}`)
        .sort(),
    );
  });
});
