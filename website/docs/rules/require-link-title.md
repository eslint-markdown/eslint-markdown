<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of title attributes for all links in Markdown documents. Having title attributes on links provides additional context and can improve accessibility by offering supplementary information when hovering over a link.

The rule examines all link elements in a Markdown document and reports any links that lack a title attribute. It checks:

- Standard Markdown link syntax: `[text](url "title")`
- Link reference definitions: `[ref]: url "title"`
- HTML link tags: `<a href="url" title="title">text</a>`

HTML `<a>` elements without an `href` attribute or with `aria-hidden="true"` are ignored.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/require-link-title: 'error' -->

[Text](https://example.com)

<a href="https://example.com">Text</a>

<div>
  <a href="https://example.com">Text</a>
</div>

[Text][reference]

[reference]: https://example.com
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

```md
<!-- eslint md/require-link-title: 'error' -->

[Text](https://example.com "Link title")

<a href="https://example.com" title="Link title">Text</a>

<a id="section">Placeholder</a>

<a href="https://example.com" aria-hidden="true">Hidden link</a>

<div>
  <a href="https://example.com" title="Link title">Text</a>
</div>

[Text][reference]

[reference]: https://example.com "Link title"
```

::: tip NOTE

Please note that this rule doesn't report definition-style comments (e.g., `[//]: ...`) by default.

```md eslint-check
<!-- eslint md/require-link-title: 'error' -->

[Text][//]

[//]: https://example.com
```

:::

#### With `{ allowDefinitions: ['reference'] }` Option

```md eslint-check
<!-- eslint md/require-link-title: ['error', { allowDefinitions: ['reference'] }] -->

[Text][reference]

[reference]: https://example.com
```

## Options

```js
'md/require-link-title': ['error', {
  allowDefinitions: ['//'],
}]
```

### `allowDefinitions`

> Type: `string[]` / Default: `['//']`

When specified, specific definitions are allowed if they match one of the identifiers in this array. This is useful for ignoring definitions that are intentionally left without titles, such as comments or placeholders.

## When Not To Use It

You might want to disable this rule if:

- Your documentation style guide doesn't require link titles.
- You're working with legacy documentation where adding titles to all links would be impractical.
- You're using a documentation system that provides alternative methods for link descriptions or captions.
