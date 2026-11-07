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

export const nextPlugin: { next: ESLint.Plugin } = {
  next: { rules: nextPluginModule.rules },
};

export const nextRules = {
  /**
   * Enforce font-display behavior with Google Fonts.
   * @see https://nextjs.org/docs/messages/google-font-display
   */
  'next/google-font-display': 'error',

  /**
   * Ensure `preconnect` is used with Google Fonts.
   * @see https://nextjs.org/docs/messages/google-font-preconnect
   */
  'next/google-font-preconnect': 'error',

  /**
   * Prefer `@next/third-parties/google` when using the inline script for Google Analytics and Tag Manager.
   * @see https://nextjs.org/docs/messages/next-script-for-ga
   */
  'next/next-script-for-ga': 'error',

  /**
   * Prevent Client Components from being async functions.
   * @see https://nextjs.org/docs/messages/no-async-client-component
   */
  'next/no-async-client-component': 'error',

  /**
   * Prevent usage of `next/script`'s `beforeInteractive` strategy outside of `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-before-interactive-script-outside-document
   */
  'next/no-before-interactive-script-outside-document': 'error',

  /**
   * Prevent manual stylesheet tags.
   * @see https://nextjs.org/docs/messages/no-css-tags
   */
  'next/no-css-tags': 'error',

  /**
   * Prevent usage of `<head>` element.
   * @see https://nextjs.org/docs/messages/no-head-element
   */
  'next/no-head-element': 'error',

  /**
   * Prevent usage of `<a>` elements to navigate to internal Next.js pages.
   * @see https://nextjs.org/docs/messages/no-html-link-for-pages
   */
  'next/no-html-link-for-pages': 'error',

  /**
   * Prevent usage of `<img>` element due to slower LCP and higher bandwidth.
   * @see https://nextjs.org/docs/messages/no-img-element
   */
  'next/no-img-element': 'error',

  /**
   * Prevent usage of `location.assign` or `location.href` assignment to navigate to internal Next.js pages.
   * @see https://nextjs.org/docs/messages/no-location-assign-relative-destination
   */
  'next/no-location-assign-relative-destination': 'error',

  /**
   * Prevent page-only custom fonts.
   * @see https://nextjs.org/docs/messages/no-page-custom-font
   */
  'next/no-page-custom-font': 'error',

  /**
   * Prevent usage of `styled-jsx` in `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-styled-jsx-in-document
   */
  'next/no-styled-jsx-in-document': 'error',

  /**
   * Prevent synchronous scripts.
   * @see https://nextjs.org/docs/messages/no-sync-scripts
   */
  'next/no-sync-scripts': 'error',

  /**
   * Prevent usage of `<title>` with `Head` component from `next/document`.
   * @see https://nextjs.org/docs/messages/no-title-in-document-head
   */
  'next/no-title-in-document-head': 'error',

  /**
   * Prevent common typos in Next.js data fetching functions.
   * @see https://nextjs.org/docs/messages/no-typos
   */
  'next/no-typos': 'error',

  /**
   * Prevent duplicate polyfills from Polyfill.io.
   * @see https://nextjs.org/docs/messages/no-unwanted-polyfillio
   */
  'next/no-unwanted-polyfillio': 'error',

  /**
   * Enforce `id` attribute on `next/script` components with inline content.
   * @see https://nextjs.org/docs/messages/inline-script-id
   */
  'next/inline-script-id': 'error',

  /**
   * Prevent assignment to the `module` variable.
   * @see https://nextjs.org/docs/messages/no-assign-module-variable
   */
  'next/no-assign-module-variable': 'error',

  /**
   * Prevent importing `next/document` outside of `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-document-import-in-page
   */
  'next/no-document-import-in-page': 'error',

  /**
   * Prevent duplicate usage of `<Head>` in `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-duplicate-head
   */
  'next/no-duplicate-head': 'error',

  /**
   * Prevent usage of `next/head` in `pages/_document.js`.
   * @see https://nextjs.org/docs/messages/no-head-import-in-document
   */
  'next/no-head-import-in-document': 'error',

  /**
   * Prevent usage of `next/script` in `next/head` component.
   * @see https://nextjs.org/docs/messages/no-script-component-in-head
   */
  'next/no-script-component-in-head': 'error',
} as const satisfies Linter.RulesRecord;
