/**
 * @fileoverview ESLint files.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const js = ['**/*.js', '**/*.cjs', '**/*.mjs'] as const;

export const jsx = ['**/*.jsx'] as const;

export const ts = ['**/*.ts', '**/*.cts', '**/*.mts'] as const;

export const tsx = ['**/*.tsx'] as const;

export const json = ['**/*.json'] as const;

export const jsonc = [
  '**/*.jsonc',
  '**/.vscode/*.json',
  '**/jsconfig.json',
  '**/jsconfig.*.json',
  '**/tsconfig.json',
  '**/tsconfig.*.json',
] as const;

export const json5 = ['**/*.json5'] as const;
