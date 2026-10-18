/**
 * @fileoverview Redirects the built config inspector routes to their local development servers.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const CONFIG_INSPECTOR_ESLINT_MARKDOWN_PATH = '/inspector/eslint-markdown';
export const CONFIG_INSPECTOR_DEV_URL = 'http://localhost:7777/';
export const CONFIG_INSPECTOR_ESLINT_LUMIR_PATH = '/inspector/eslint-lumir';
export const CONFIG_INSPECTOR_ESLINT_LUMIR_DEV_URL = 'http://localhost:7778/';

/**
 * Vite plugin that redirects the built config inspector routes to their local development servers.
 * @returns {import("vite").Plugin}
 */
export function vitePluginConfigInspector() {
  return {
    name: 'vite-plugin-config-inspector',

    configureServer(server) {
      server.middlewares.use(CONFIG_INSPECTOR_ESLINT_MARKDOWN_PATH, (_, response) => {
        response.writeHead(302, {
          Location: CONFIG_INSPECTOR_DEV_URL,
        });
        response.end();
      });
      server.middlewares.use(CONFIG_INSPECTOR_ESLINT_LUMIR_PATH, (_, response) => {
        response.writeHead(302, {
          Location: CONFIG_INSPECTOR_ESLINT_LUMIR_DEV_URL,
        });
        response.end();
      });
    },
  };
}
