/**
 * @fileoverview VitePress theme entry file.
 * @see https://vitepress.dev/guide/custom-theme#using-a-custom-theme
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import theme from 'vitepress/theme';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import eslintLumirPackageJson from 'eslint-lumir/package.json' with { type: 'json' };
import eslintMarkdownPackageJson from 'eslint-markdown/package.json' with { type: 'json' };

import './style.css';
import 'virtual:group-icons.css'; // eslint-disable-line n/no-missing-import
import '@shikijs/vitepress-twoslash/style.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {import('vitepress').Theme} */
export default {
  ...theme,
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue);
    app.config.globalProperties.$version = {
      'eslint-lumir': {
        nodejs: eslintLumirPackageJson.engines.node,
        eslint: eslintLumirPackageJson.peerDependencies.eslint,
        eslintPluginNext:
          eslintLumirPackageJson.peerDependencies['@next/eslint-plugin-next'],
      },
      'eslint-markdown': {
        nodejs: eslintMarkdownPackageJson.engines.node,
        eslint: eslintMarkdownPackageJson.peerDependencies.eslint,
        eslintMarkdown: eslintMarkdownPackageJson.peerDependencies['@eslint/markdown'],
      },
    };
  },
};
