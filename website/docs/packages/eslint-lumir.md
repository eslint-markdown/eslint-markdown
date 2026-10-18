---
description: "Lumir's ESLint config preset"
---

# `eslint-lumir` {#eslint-lumir}

Lumir's ESLint config preset.

::: info Internal workspace

This workspace is currently marked as private and excluded from npm publishing. Its version remains synchronized with `eslint-markdown`, but current workspace changes are only available within this monorepo.

:::

`eslint-lumir` requires ESLint `{{ $version['eslint-lumir'].eslint }}` because its React configurations use `@eslint-react/eslint-plugin`.

[![GitHub Repository](https://img.shields.io/badge/Repository-fff478?label=GitHub&color=fff478&labelColor=333333&logo=github)](https://github.com/eslint-markdown/eslint-markdown/tree/main/packages/eslint-lumir)&nbsp;
![Node Current](https://img.shields.io/node/v/eslint-lumir?label=Node&color=fff478&labelColor=333333&logo=node.js)  
[![npm package eslint-lumir latest version](https://img.shields.io/npm/v/eslint-lumir?label=eslint-lumir@latest&color=fff478&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-lumir)&nbsp;
[![npm package eslint-lumir next version](https://img.shields.io/npm/v/eslint-lumir/next?label=eslint-lumir@next&color=fff478&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-lumir)

`eslint-lumir` is an [ESLint](https://eslint.org) configuration package based on [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb) and the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript?tab=readme-ov-file#airbnb-javascript-style-guide-).

It relaxes rules that restrict syntax commonly used in coding challenges, along with some rules that depend on personal preference. This makes it more permissive than [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb) and [`eslint-config-airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base#eslint-config-airbnb-base-).

For the exact rules included in `eslint-lumir`, see the [ESLint configurations](https://github.com/eslint-markdown/eslint-markdown/tree/main/packages/eslint-lumir/src/configs).

All rules in the presets are configured as either `error` or `off`, never `warn`.

::: danger IMPORTANT

- `eslint-lumir` supports ESLint `{{ $version['eslint-lumir'].eslint }}` with [Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) and ES modules (ESM) only.
- `eslint-lumir` does not include stylistic rules. Use [Prettier](https://prettier.io/) for formatting.

:::

---

[[TOC]]

## Installation {#installation}

### Prerequisites

- Node.js: `{{ $version['eslint-lumir'].nodejs }}`
- ESLint: `{{ $version['eslint-lumir'].eslint }}` & Flat Config Only
- Module Support: ECMAScript Modules (ESM) Only

### Install

::: code-group

```sh [npm]
npm install -D eslint@latest eslint-lumir@latest
```

```sh [pnpm]
pnpm add -D eslint@latest eslint-lumir@latest
```

```sh [yarn]
yarn add --dev eslint@latest eslint-lumir@latest
```

```sh [bun]
bun add -d eslint@latest eslint-lumir@latest
```

:::

## Config Inspector

<!-- eslint-disable-next-line markdown/no-html -->
If you want to inspect the ESLint configuration for `eslint-lumir`, use the <a href="/inspector/eslint-lumir" target="_self">config inspector</a>.

## API Reference {#apis}

```ts
// Import each configuration from its subpath.
import js from 'eslint-lumir/js';
import ts from 'eslint-lumir/ts';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import md from 'eslint-lumir/md';

// You can also import the package's `package.json` file.
import pkg from 'eslint-lumir/package.json' with { type: 'json' };
```

---

### `js`, `ts`, `jsx`, `tsx`, `next`, `json`, `jsonc`, `json5`, `md` {#subpath-imports}

> Type: `Linter.Config`

For the exact configuration contents, see the [GitHub repository](https://github.com/eslint-markdown/eslint-markdown/tree/main/packages/eslint-lumir/src/configs).

### `pkg` {#pkg}

> Type: `Record<string, any>`

For the exact package metadata, see the [GitHub repository](https://github.com/eslint-markdown/eslint-markdown/blob/main/packages/eslint-lumir/package.json).

## ESLint Configuration {#eslint-config-setting}

`eslint-lumir` provides nine configurations. Select the configurations required by your project.

For the exact rules included in each configuration, see the [ESLint configurations](https://github.com/eslint-markdown/eslint-markdown/tree/main/packages/eslint-lumir/src/configs).

- `js`: JavaScript
- `jsx`: JavaScript + React
- `ts`: TypeScript
- `tsx`: TypeScript + React
- `next`: Next.js rules to combine with `jsx` or `tsx`
- `json`: JSON
- `jsonc`: JSONC
- `json5`: JSON5
- `md`: Markdown

### Subpath Imports {#subpath-import}

Use subpath imports to load only the configurations you need. This can help reduce startup time.

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import js from 'eslint-lumir/js';
import jsx from 'eslint-lumir/jsx';
import ts from 'eslint-lumir/ts';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import md from 'eslint-lumir/md';

export default defineConfig([
  js, // JavaScript
  jsx, // JavaScript + React
  ts, // TypeScript
  tsx, // TypeScript + React
  next, // Next.js
  json, // JSON
  jsonc, // JSONC
  json5, // JSON5
  md, // Markdown
]);
```

### Next.js configuration {#next}

The `next` configuration adds Next.js rules to `jsx` or `tsx`. Install its optional peer dependency explicitly in the project that uses this configuration:

```sh-vue
npm install -D "@next/eslint-plugin-next@{{ $version['eslint-lumir'].eslintPluginNext }}"
```

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';

export default defineConfig([jsx, tsx, next]);
```

Use `[jsx, next]` for JavaScript, `[tsx, next]` for TypeScript, or both as shown above for mixed projects. The Next.js configuration uses `@typescript-eslint/parser` for all matching JavaScript and TypeScript files, replacing the default Espree parser when combined with `jsx`. It preserves the React rules and settings provided by the base configuration.

Only importing `eslint-lumir/next` requires the optional Next.js plugin. The other configuration subpaths can be imported without it.

Migrate `jsx-react` to `jsx`, `tsx-react` to `tsx`, `jsx-next` to `[jsx, next]`, and `tsx-next` to `[tsx, next]`. The former subpath exports have been removed.

The package has no main entrypoint. Replace imports from `eslint-lumir` and accesses such as `lumir.configs.tsx` with direct subpath imports such as `import tsx from 'eslint-lumir/tsx'`.

## Additional Notes {#additional-notes}

- Since `eslint-lumir` does not include stylistic rules, you do not need [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier), which disables rules that conflict with Prettier.
- Use [Prettier](https://prettier.io/) for formatting.
