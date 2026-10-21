---
description: "Package documentation for the `eslint-lumir` ESLint configuration presets."
---

# `eslint-lumir`

> Lumir's ESLint configuration presets.

::: warning Internal Workspace

This package is currently marked as private and excluded from npm publishing. It will be made public once it's ready for release.

:::

`eslint-lumir` provides shared ESLint configurations for JavaScript, TypeScript, React, Next.js, JSON, and Markdown. Its presets are inspired by the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript?tab=readme-ov-file#airbnb-javascript-style-guide-). All rules are configured as either `error` or `off`, never `warn`.

## Config Inspector

<!-- eslint-disable-next-line markdown/no-html -->
If you want to inspect the ESLint configuration for `eslint-lumir`, use the <a href="/inspector/eslint-lumir" target="_self">config inspector</a>.

## Exports {#apis}

The package provides subpath exports primarily for individual configurations and has no main entrypoint.

| Name                         | Description                                   |
| :--------------------------- | :-------------------------------------------- |
| `eslint-lumir/js`            | JavaScript configuration.                     |
| `eslint-lumir/ts`            | TypeScript configuration.                     |
| `eslint-lumir/jsx`           | JavaScript and React configuration.           |
| `eslint-lumir/tsx`           | TypeScript and React configuration.           |
| `eslint-lumir/next`          | Next.js rules to combine with `jsx` or `tsx`. |
| `eslint-lumir/json`          | JSON configuration.                           |
| `eslint-lumir/jsonc`         | JSONC configuration.                          |
| `eslint-lumir/json5`         | JSON5 configuration.                          |
| `eslint-lumir/md`            | Markdown configuration.                       |
| `eslint-lumir/package.json`  | Package metadata.                             |

## Installation {#installation}

### Prerequisites

- Node.js: `{{ $version['eslint-lumir'].nodejs }}`
- ESLint: `{{ $version['eslint-lumir'].eslint }}` & Flat Config Only
- `@next/eslint-plugin-next`: `{{ $version['eslint-lumir'].eslintPluginNext }}` (optional peer dependency; required only for the `next` configuration)
- Module Support: ECMAScript Modules (ESM) Only

::: tip NOTE

- `eslint-lumir` requires ESLint `{{ $version['eslint-lumir'].eslint }}` for compatibility with [`@eslint-react/eslint-plugin`](https://eslint-react.xyz/), which is used by its React configurations.

:::

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

## ESLint Configuration {#eslint-config-setting}

Select the configurations required by your project. For the exact rules included in each configuration, see the [ESLint configurations](https://github.com/eslint-markdown/eslint-markdown/tree/main/packages/eslint-lumir/src/configs).

### Subpath Imports {#subpath-import}

Use subpath imports to load only the configurations you need. This can help reduce startup time.

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import js from 'eslint-lumir/js';
import ts from 'eslint-lumir/ts';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import md from 'eslint-lumir/md';
import pkg from 'eslint-lumir/package.json' with { type: 'json' };

export default defineConfig([
  js, // JavaScript
  ts, // TypeScript
  jsx, // JavaScript + React
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

Use `[jsx, next]` for JavaScript, `[tsx, next]` for TypeScript, or `[jsx, tsx, next]` for mixed projects.

## Plugins Renaming

Flat config lets us explicitly choose plugin names instead of deriving them from npm package names. We rename some plugins to make rule prefixes more consistent and easier to write.

| Prefix         | Original Prefix        | Source Plugin                                                                                     |
| :------------- | :--------------------- | :------------------------------------------------------------------------------------------------ |
| `import/*`     | `import-lite/*`        | [eslint-plugin-import-lite](https://github.com/9romise/eslint-plugin-import-lite)                     |
| `node/*`       | `n/*`                  | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)                                |
| `typescript/*` | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)            |
| `react-x/*`    | `@eslint-react/*`      | [@eslint-react/eslint-plugin](https://github.com/Rel1cx/eslint-react)                                 |
| `next/*`       | `@next/next/*`         | [@next/eslint-plugin-next](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next) |
| `jsx-a11y-x/*` | `jsx-a11y-x/*`         | [eslint-plugin-jsx-a11y-x](https://github.com/es-tooling/eslint-plugin-jsx-a11y-x)                     |
| `json/*`      | `json/*`               | [@eslint/json](https://github.com/eslint/json)                                                      |
| `markdown/*`  | `markdown/*`           | [@eslint/markdown](https://github.com/eslint/markdown)                                              |
| `md/*`        | `md/*`                 | [eslint-markdown](eslint-markdown)                                                                |
| `style/*`     | -                      | Internal rules provided by `eslint-lumir`.                                                        |

Use the prefixes in the first column when overriding rules, for example `typescript/no-unused-vars` or `node/no-process-exit`.

The `import/*` namespace also includes internal rules. The `style/*` namespace contains the internal `style/spaced-comment` rule, rather than the `@stylistic/eslint-plugin` package. This helps reduce the overall dependency footprint.
