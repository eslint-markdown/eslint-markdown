<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for delete (strikethrough text) in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different delete styles can reduce readability.

A delete is defined as text wrapped in either `~` (single tilde) or `~~` (double tildes). While Markdown allows any of these styles, this rule ensures that only one is used throughout the document.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-delete-style: 'error' -->

~foo~
~~bar~~
~baz~
~~_foo_~~
__~bar~__
_~~foo~~_
~__bar__~
```

```md eslint-check
<!-- eslint md/consistent-delete-style: 'error' -->

~~foo~~
~bar~
~~baz~~
__~foo~__
~~_bar_~~
~__foo__~
_~~bar~~_
```

#### With `{ style: '~' }` Option

```md eslint-check
<!-- eslint md/consistent-delete-style: ['error', { style: '~' }] -->

~~foo~~
~~_bar_~~
_~~baz~~_
```

#### With `{ style: '~~' }` Option

```md eslint-check
<!-- eslint md/consistent-delete-style: ['error', { style: '~~' }] -->

~foo~
__~bar~__
~__baz__~
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-delete-style: 'error' -->

~foo~
~bar~
__~baz~__
~__qux__~
```

```md eslint-check
<!-- eslint md/consistent-delete-style: 'error' -->

~~foo~~
~~bar~~
~~_baz_~~
_~~qux~~_
```

#### With `{ style: '~' }` Option

```md eslint-check
<!-- eslint md/consistent-delete-style: ['error', { style: '~' }] -->

~foo~
~bar~
__~baz~__
~__qux__~
```

#### With `{ style: '~~' }` Option

```md eslint-check
<!-- eslint md/consistent-delete-style: ['error', { style: '~~' }] -->

~~foo~~
~~bar~~
~~_baz_~~
_~~qux~~_
```

## Options

```js
'md/consistent-delete-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | '~' | '~~'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all deletes in the document use the same style as the first one encountered.

You can also specify a particular style by setting style to `'~'` or `'~~'`, which will enforce that all deletes use the specified style.

## Fix

This rule fixes the deletes by replacing them with the configured style.

## Prior Art

- [`remark-lint-strikethrough-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-strikethrough-marker#remark-lint-strikethrough-marker)
