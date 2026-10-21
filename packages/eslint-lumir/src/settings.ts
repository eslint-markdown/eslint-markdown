/**
 * @fileoverview ESLint settings.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const node = {
  resolverConfig: {
    // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
    extensions: [
      '.js',
      '.mjs',
      '.cjs',
      '.jsx',
      '.ts',
      '.mts',
      '.cts',
      '.tsx',
      '.d.ts',
      '.d.mts',
      '.d.cts',
      '.json',
    ],
    mainFiles: ['index'],
  },
} as const;

export const react = {
  version: 'detect',
} as const;
