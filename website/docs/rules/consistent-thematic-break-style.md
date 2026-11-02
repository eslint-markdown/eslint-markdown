<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for thematic breaks (horizontal rules) in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different thematic break styles can reduce readability.

A thematic break is defined as a line that contains only a `*`, `-`, or `_` character repeated at least three times, optionally separated by spaces or tabs. While Markdown allows any of these styles, this rule ensures that only one is used throughout the document.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: 'error' -->

---
- - -
***
* * *
****
___
```

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: 'error' -->

***
* * *
****
___
---
- - -
```

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: 'error' -->

___
---
- - -
***
* * *
****
```

#### With `{ style: '- - -' }` Option

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: ['error', { style: '- - -' }] -->

---
***
___
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: 'error' -->

---
---
---
```

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: 'error' -->

***
***
***
```

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: 'error' -->

___
___
___
```

#### With `{ style: '- - -' }` Option

```md eslint-check
<!-- eslint md/consistent-thematic-break-style: ['error', { style: '- - -' }] -->

- - -
- - -
- - -
```

## Options

```js
'md/consistent-thematic-break-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `string` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all thematic breaks in the document use the same style as the first one encountered.

You can also specify a particular style by setting style to `'---'`, `'***'`, `'___'`, or any other valid thematic break, which will enforce that all thematic breaks use the specified style. A valid thematic break is a sequence of three or more matching `-`, `*`, or `_` characters, each optionally followed by any number of spaces or tabs.

## Fix

This rule fixes the thematic breaks by replacing them with the configured style.

## Prior Art

- [`MD035` - Horizontal rule style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md035.md#md035---horizontal-rule-style)
- [`remark-lint-rule-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-rule-style#remark-lint-rule-style)
