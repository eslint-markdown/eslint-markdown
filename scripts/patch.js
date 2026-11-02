/**
 * @fileoverview Script to patch packages.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// --------------------------------------------------------------------------------
// Patch: Config Inspector
// --------------------------------------------------------------------------------

const configInspectorDirectory = dirname(
  fileURLToPath(import.meta.resolve('@eslint/config-inspector/package.json')),
);
const publicDirectory = join(configInspectorDirectory, 'dist/public');
const indexFile = join(publicDirectory, 'index.html');

for (const route of ['configs', 'files', 'rules']) {
  const routeDirectory = join(publicDirectory, route);

  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(indexFile, join(routeDirectory, 'index.html'));
}
