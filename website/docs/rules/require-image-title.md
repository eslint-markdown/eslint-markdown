<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of title attributes for all images in Markdown documents. Having title attributes on images provides additional context and can improve accessibility by offering supplementary information when hovering over an image.

The rule examines all image elements in a Markdown document and reports any images that lack a title attribute. It checks:

- Standard Markdown image syntax: `![alt text](url "title")`
- Image reference definitions: `[ref]: url "title"`
- HTML image tags: `<img src="url" alt="alt text" title="title">`

::: tip NOTE

HTML `<img>` elements without any of the `src`, `srcset`, or `alt` attributes, as well as elements with an empty `alt` attribute or `aria-hidden="true"`, are ignored.

:::

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/require-image-title: 'error' -->

![Alt text](https://example.com/image.png)

<img src="https://example.com/image.png" alt="Alt text">

<div>
  <img src="https://example.com/image.png" alt="Alt text">
</div>

![Alt text][reference]

[reference]: https://example.com/image.png
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

```md
<!-- eslint md/require-image-title: 'error' -->

![Alt text](https://example.com/image.png "Image title")

<img src="https://example.com/image.png" alt="Alt text" title="Image title">

<img id="placeholder">

<img src="https://example.com/image.png" alt="">

<img src="https://example.com/image.png" aria-hidden="true">

<div>
  <img src="https://example.com/image.png" alt="Alt text" title="Image title">
</div>

![Alt text][reference]

[reference]: https://example.com/image.png "Image title"
```

::: tip NOTE

Please note that this rule doesn't report definition-style comments (e.g., `[//]: ...`) by default.

```md eslint-check
<!-- eslint md/require-image-title: 'error' -->

![Alt text][//]

[//]: https://example.com/image.png
```

:::

#### With `{ allowDefinitions: ['reference'] }` Option

```md eslint-check
<!-- eslint md/require-image-title: ['error', { allowDefinitions: ['reference'] }] -->

![Alt text][reference]

[reference]: https://example.com/image.png
```

## Options

```js
'md/require-image-title': ['error', {
  allowDefinitions: ['//'],
}]
```

### `allowDefinitions`

> Type: `string[]` / Default: `['//']`

When specified, specific definitions are allowed if they match one of the identifiers in this array. This is useful for ignoring definitions that are intentionally left without titles, such as comments or placeholders.

## When Not To Use It

You might want to disable this rule if:

- Your documentation style guide doesn't require image titles.
- You're working with legacy documentation where adding titles to all images would be impractical.
- You're using a documentation system that provides alternative methods for image descriptions or captions.
