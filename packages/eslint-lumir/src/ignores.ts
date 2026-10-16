/**
 * @fileoverview ESLint ignores.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const json = [
  'package-lock.json',
  '**/.vscode/*.json',
  '**/jsconfig.json',
  '**/jsconfig.*.json',
  '**/tsconfig.json',
  '**/tsconfig.*.json',
] as const;
