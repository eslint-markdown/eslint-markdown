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

  /**
   * Enforce font-display behavior with Google Fonts.
   * @see https://nextjs.org/docs/messages/google-font-display
   */
  '@next/next/google-font-display': 'warn',

  /**
   * Ensure `preconnect` is used with Google Fonts.
   * @see https://nextjs.org/docs/messages/google-font-preconnect
   */
  '@next/next/google-font-preconnect': 'warn',

  /**
   * Prefer `@next/third-parties/google` when using the inline script for Google Analytics and Tag Manager.
   * @see https://nextjs.org/docs/messages/next-script-for-ga
   */
  '@next/next/next-script-for-ga': 'warn',

  /**
   * Prevent Client Components from being async functions.
   * @see https://nextjs.org/docs/messages/no-async-client-component
   */
  '@next/next/no-async-client-component': 'warn',

  /**
   * Prevent usage of `next/script`'s `beforeInteractive` strategy outside of `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-before-interactive-script-outside-document
   */
  '@next/next/no-before-interactive-script-outside-document': 'warn',

  /**
   * Prevent manual stylesheet tags.
   * @see https://nextjs.org/docs/messages/no-css-tags
   */
  '@next/next/no-css-tags': 'warn',

  /**
   * Prevent usage of `<head>` element.
   * @see https://nextjs.org/docs/messages/no-head-element
   */
  '@next/next/no-head-element': 'warn',

  /**
   * Prevent usage of `<a>` elements to navigate to internal Next.js pages.
   * @see https://nextjs.org/docs/messages/no-html-link-for-pages
   */
  '@next/next/no-html-link-for-pages': 'warn',

  /**
   * Prevent usage of `<img>` element due to slower LCP and higher bandwidth.
   * @see https://nextjs.org/docs/messages/no-img-element
   */
  '@next/next/no-img-element': 'warn',

  /**
   * Prevent usage of `location.assign` or `location.href` assignment to navigate to internal Next.js pages.
   * @see https://nextjs.org/docs/messages/no-location-assign-relative-destination
   */
  '@next/next/no-location-assign-relative-destination': 'warn',

  /**
   * Prevent page-only custom fonts.
   * @see https://nextjs.org/docs/messages/no-page-custom-font
   */
  '@next/next/no-page-custom-font': 'warn',

  /**
   * Prevent usage of `styled-jsx` in `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-styled-jsx-in-document
   */
  '@next/next/no-styled-jsx-in-document': 'warn',

  /**
   * Prevent synchronous scripts.
   * @see https://nextjs.org/docs/messages/no-sync-scripts
   */
  '@next/next/no-sync-scripts': 'warn',

  /**
   * Prevent usage of `<title>` with `Head` component from `next/document`.
   * @see https://nextjs.org/docs/messages/no-title-in-document-head
   */
  '@next/next/no-title-in-document-head': 'warn',

  /**
   * Prevent common typos in Next.js data fetching functions.
   * @see https://nextjs.org/docs/messages/no-typos
   */
  '@next/next/no-typos': 'warn',

  /**
   * Prevent duplicate polyfills from Polyfill.io.
   * @see https://nextjs.org/docs/messages/no-unwanted-polyfillio
   */
  '@next/next/no-unwanted-polyfillio': 'warn',
  // errors

  /**
   * Enforce `id` attribute on `next/script` components with inline content.
   * @see https://nextjs.org/docs/messages/inline-script-id
   */
  '@next/next/inline-script-id': 'error',

  /**
   * Prevent assignment to the `module` variable.
   * @see https://nextjs.org/docs/messages/no-assign-module-variable
   */
  '@next/next/no-assign-module-variable': 'error',

  /**
   * Prevent importing `next/document` outside of `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-document-import-in-page
   */
  '@next/next/no-document-import-in-page': 'error',

  /**
   * Prevent duplicate usage of `<Head>` in `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-duplicate-head
   */
  '@next/next/no-duplicate-head': 'error',

  /**
   * Prevent usage of `next/head` in `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-head-import-in-document
   */
  '@next/next/no-head-import-in-document': 'error',

  /**
   * Prevent usage of `next/script` in `next/head` component.
   * @see https://nextjs.org/docs/messages/no-script-component-in-head
   */
  '@next/next/no-script-component-in-head': 'error',
} as const satisfies Linter.RulesRecord;
