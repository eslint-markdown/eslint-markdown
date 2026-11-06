---
description: "Package documentation for the `eslint-markdown` ESLint plugin."
---

# `eslint-markdown`

> The Markdown plugin for ESLint.

::: info

See [Get Started](../get-started/) for [installation](../get-started/installation) and [configuration](../get-started/configurations) guidance.

:::

`eslint-markdown` is an ESLint plugin that provides additional rules and shared configurations for linting Markdown. It is designed to work alongside ESLint's built-in Markdown support, [`@eslint/markdown`](https://github.com/eslint/markdown#readme), without duplicating its rules.

## Config Inspector

<!-- eslint-disable-next-line markdown/no-html -->
If you want to inspect the ESLint configuration for `eslint-markdown`, use the <a href="/inspector/eslint-markdown" target="_self">config inspector</a>.

## Exports

The package's default export is an ESLint plugin with the following properties:

| Name      | Description                                                                           |
| :-------- | :------------------------------------------------------------------------------------ |
| `meta`    | Object containing the package `name` and `version`.                                   |
| `rules`   | Object mapping rule names to the available [rule objects](../rules/).                 |
| `configs` | Object containing the [`recommended`], [`stylistic`], [`base`], and [`all`] configs.  |

[`recommended`]: ../get-started/configurations.md#recommended
[`stylistic`]: ../get-started/configurations.md#stylistic
[`base`]: ../get-started/configurations.md#base
[`all`]: ../get-started/configurations.md#all

```js
import md from 'eslint-markdown';

md.meta;
md.rules;
md.configs;
```
