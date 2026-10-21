/**
 * @fileoverview Test for `package.json` across the project.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import eslintLumir from 'eslint-lumir/package.json' with { type: 'json' };
import eslintMarkdown from 'eslint-markdown/package.json' with { type: 'json' };
import monorepo from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('package-json', () => {
  it('should use the same Node.js version range across the root and packages', () => {
    assert.strictEqual(
      new Set([
        monorepo.engines.node,
        monorepo.devEngines.runtime.version,
        eslintLumir.engines.node,
        eslintMarkdown.engines.node,
      ]).size,
      1,
    );
  });
});
