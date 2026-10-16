---
description: "Package documentation for the `eslint-lumir` package."
---

# `eslint-config-bananass` {#eslint-config-bananass}

TODO: why `^10.3.0`: `@eslint-react/eslint-plugin` requires ESLint v10.3.0 or higher.

[![GitHub Repository](https://img.shields.io/badge/Repository-fff478?label=GitHub&color=fff478&labelColor=333333&logo=github)](https://github.com/lumirlumir/npm-bananass/tree/main/packages/eslint-config-bananass)&nbsp;
![Node Current](https://img.shields.io/node/v/eslint-config-bananass?label=Node&color=fff478&labelColor=333333&logo=node.js)  
[![npm package eslint-config-bananass latest version](https://img.shields.io/npm/v/eslint-config-bananass?label=eslint-config-bananass@latest&color=fff478&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-config-bananass)&nbsp;
[![npm package eslint-config-bananass next version](https://img.shields.io/npm/v/eslint-config-bananass/next?label=eslint-config-bananass@next&color=fff478&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-config-bananass)

`eslint-config-bananass`는 [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb) 및 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript?tab=readme-ov-file#airbnb-javascript-style-guide-)를 기반으로 하는 [ESLint](https://eslint.org) 설정 파일 패키지입니다.

코딩 테스트 관련하여 자주 쓰이는 문법 및 사용자에 따라 호불호가 나뉠 수 있는 일부 규칙들을 해제하였기에, [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb) 및 [`eslint-config-airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base#eslint-config-airbnb-base-) 보다 훨씬 느슨한 규칙들을 만나보실 수 있습니다.

`eslint-config-bananass`에 포함된 정확한 규칙들은 [ESLint Config Inspector](https://eslint-config-bananass.lumir.page)를 참고해주세요.

::: danger 반드시 읽어주세요!

- `eslint-config-bananass`는 최신 사양의 [ESLint v9 Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)만 지원하며, ESM 모듈 시스템만<sup>ESM Only</sup> 지원합니다.
- `eslint-config-bananass`는 스타일 관련 규칙들을 포함하지 않습니다. 스타일 포맷팅을 진행하고 싶으시다면 [Prettier](https://prettier.io/)를 이용해 주세요.

:::

---

[[TOC]]

## 설치하기 {#installation}

::: code-group

```sh [npm]
npm install -D eslint@latest eslint-config-bananass@latest
```

```sh [pnpm]
pnpm add -D eslint@latest eslint-config-bananass@latest
```

```sh [yarn]
yarn add --dev eslint@latest eslint-config-bananass@latest
```

```sh [bun]
bun add -d eslint@latest eslint-config-bananass@latest
```

:::

## API 참고서 {#apis}

```ts
import bananass from 'eslint-lumir';

// 초기 로딩 속도 최적화를 위해, 설정별 Subpath Import도 지원합니다.
import js from 'eslint-lumir/js';
import ts from 'eslint-lumir/ts';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';

// `eslint-config-bananass` 패키지의 `package.json` 파일도 불러올 수 있습니다.
import pkg from 'eslint-lumir/package.json' with { type: 'json' };
```

---

### `bananass` {#bananass}

> 타입: `ESLint.Plugin`

정확한 구성은 [깃허브 리포지토리](https://github.com/lumirlumir/npm-bananass/blob/main/packages/eslint-config-bananass/src/index.ts)를 참고해주세요.

### `js`, `ts`, `jsx`, `tsx`, `next`, `json`, `jsonc`, `json5` {#subpath-imports}

> 타입: `Linter.Config`

정확한 구성은 [깃허브 리포지토리](https://github.com/lumirlumir/npm-bananass/tree/main/packages/eslint-config-bananass/src/configs)를 참고해주세요.

### `pkg` {#pkg}

> 타입: `Record<string, any>`

정확한 구성은 [깃허브 리포지토리](https://github.com/lumirlumir/npm-bananass/blob/main/packages/eslint-config-bananass/package.json)를 참고해주세요.

## ESLint Config 설정 방법 {#eslint-config-setting}

`eslint-lumir` provides eight configurations. Select the configurations required by your project.

각각의 구성에 포함된 정확한 규칙들은 [ESLint Config Inspector](https://eslint-config-bananass.lumir.page)를 참고해주세요.

- `js`: 자바스크립트
- `jsx`: 자바스크립트 + React
- `ts`: 타입스크립트
- `tsx`: 타입스크립트 + React
- `next`: Next.js rules to combine with `jsx` or `tsx`
- `json`: JSON
- `jsonc`: JSONC
- `json5`: JSON5

### Subpath Import 방식 {#subpath-import}

Subpath Import 방식을 이용하여, 필요한 설정만 선택적으로 불러와 사용할 수 있습니다. 해당 방식은 초기 로딩 속도 최적화에 도움이 됩니다.

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

export default defineConfig([
  js, // JavaScript
  jsx, // JavaScript + React
  ts, // TypeScript
  tsx, // TypeScript + React
  next, // Next.js
  json, // JSON
  jsonc, // JSONC
  json5, // JSON5
]);
```

### Next.js configuration {#next}

The `next` configuration adds Next.js rules to `jsx` or `tsx`. Install its optional peer dependency explicitly in the project that uses this configuration:

```sh
npm install -D @next/eslint-plugin-next@^16.3.0
```

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';

export default defineConfig([jsx, tsx, next]);
```

Use `[jsx, next]` for JavaScript, `[tsx, next]` for TypeScript, or both as shown above for mixed projects. The Next.js configuration preserves the parser, React rules, and settings provided by the base configuration.

The package entrypoint exposes `configs.jsx` and `configs.tsx`. Import `next` separately from `eslint-lumir/next`; it is not included in `configs`, so importing the package does not require the optional Next.js plugin.

Migrate `jsx-react` to `jsx`, `tsx-react` to `tsx`, `jsx-next` to `[jsx, next]`, and `tsx-next` to `[tsx, next]`. The former subpath exports have been removed.

### Package Entrypoint 방식 {#package-entrypoint}

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import bananass from 'eslint-lumir';

export default defineConfig([
  bananass.configs.js, // JavaScript
  bananass.configs.jsx, // JavaScript + React
  bananass.configs.ts, // TypeScript
  bananass.configs.tsx, // TypeScript + React
  bananass.configs.json, // JSON
  bananass.configs.jsonc, // JSONC
  bananass.configs.json5, // JSON5
]);
```

## 참고 사항 {#additional-notes}

- `eslint-config-bananass`는 스타일 관련 규칙들을 포함하지 않기 때문에, Prettier와 충돌을 일으키는 스타일 관련 규칙들을 모두 끄는 [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)가 필요하지 않습니다.
- 스타일 포맷팅을 진행하고 싶으시다면 [Prettier](https://prettier.io/)를 이용해 주세요.
