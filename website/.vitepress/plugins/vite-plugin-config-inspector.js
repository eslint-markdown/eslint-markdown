/**
 * @fileoverview Redirects the built config inspector route to its local development server.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const CONFIG_INSPECTOR_ESLINT_MARKDOWN_PATH = '/inspector/eslint-markdown';
export const CONFIG_INSPECTOR_DEV_URL = 'http://localhost:7777/';

/**
 * Vite plugin that redirects the built config inspector route to its local development server.
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
    },
  };
}
