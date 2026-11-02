<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for emphasis (italic text) in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different emphasis styles can reduce readability.

An emphasis is defined as text wrapped in either `*` (asterisks) or `_` (underscores). While Markdown allows any of these styles, this rule ensures that only one is used throughout the document.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-emphasis-style: 'error' -->

*foo*
_bar_
*baz*
**_foo_**
__*bar*__
_**foo**_
*__bar__*
___foo___
***bar***
```

```md eslint-check
<!-- eslint md/consistent-emphasis-style: 'error' -->

_foo_
*bar*
_baz_
__*foo*__
**_bar_**
*__foo__*
_**bar**_
***foo***
___bar___
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint md/consistent-emphasis-style: ['error', { style: '*' }] -->

_foo_
**_bar_**
_**baz**_
___qux___
```

#### With `{ style: '_' }` Option

```md eslint-check
<!-- eslint md/consistent-emphasis-style: ['error', { style: '_' }] -->

*foo*
__*bar*__
*__baz__*
***qux***
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-emphasis-style: 'error' -->

*foo*
__*bar*__
*__baz__*
***qux***
```

```md eslint-check
<!-- eslint md/consistent-emphasis-style: 'error' -->

_foo_
**_bar_**
_**baz**_
___qux___
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint md/consistent-emphasis-style: ['error', { style: '*' }] -->

*foo*
__*bar*__
*__baz__*
***qux***
```

#### With `{ style: '_' }` Option

```md eslint-check
<!-- eslint md/consistent-emphasis-style: ['error', { style: '_' }] -->

_foo_
**_bar_**
_**baz**_
___qux___
```

## Options

```js
'md/consistent-emphasis-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | '*' | '_'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all emphasis in the document use the same style as the first one encountered.

You can also specify a particular style by setting style to `'*'` or `'_'`, which will enforce that all emphasis use the specified style.

## Fix

This rule fixes the emphasis by replacing them with the configured style.

## Prior Art

- [`MD049` - Emphasis style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md049.md#md049---emphasis-style)
- [`remark-lint-emphasis-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-emphasis-marker#remark-lint-emphasis-marker)
