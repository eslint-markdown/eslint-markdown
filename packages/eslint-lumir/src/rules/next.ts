/**
 * @fileoverview This file follows:
 *
 * - The rules listed below:
 *   - https://nextjs.org/docs/app/api-reference/config/eslint#rules
 *   - https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/src/index.ts#L30-L51
 *   - https://github.com/vercel/next.js/blob/v15.1.4/packages/eslint-config-next/index.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import nextPluginModule from '@next/eslint-plugin-next';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const nextPlugin: { '@next/next': ESLint.Plugin } = {
  '@next/next': { rules: nextPluginModule.rules },
};

export const nextRules = {
  // warnings
  '@next/next/google-font-display': 'warn',
  '@next/next/google-font-preconnect': 'warn',
  '@next/next/next-script-for-ga': 'warn',
  '@next/next/no-async-client-component': 'warn',
  '@next/next/no-before-interactive-script-outside-document': 'warn',
  '@next/next/no-css-tags': 'warn',
  '@next/next/no-head-element': 'warn',
  '@next/next/no-html-link-for-pages': 'warn',
  '@next/next/no-img-element': 'warn',
  '@next/next/no-page-custom-font': 'warn',
  '@next/next/no-styled-jsx-in-document': 'warn',
  '@next/next/no-sync-scripts': 'warn',
  '@next/next/no-title-in-document-head': 'warn',
  '@next/next/no-typos': 'warn',
  '@next/next/no-unwanted-polyfillio': 'warn',
  // errors
  '@next/next/inline-script-id': 'error',
  '@next/next/no-assign-module-variable': 'error',
  '@next/next/no-document-import-in-page': 'error',
  '@next/next/no-duplicate-head': 'error',
  '@next/next/no-head-import-in-document': 'error',
  '@next/next/no-script-component-in-head': 'error',
} as const satisfies Linter.RulesRecord;
