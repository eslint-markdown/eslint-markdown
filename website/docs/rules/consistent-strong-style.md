<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for strong emphasis (bold text) in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different strong styles can reduce readability.

A strong emphasis is defined as text wrapped in either `**` (asterisks) or `__` (underscores). While Markdown allows any of these styles, this rule ensures that only one is used throughout the document.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-strong-style: 'error' -->

**foo**
__bar__
**baz**
__*bar*__
**_foo_**
*__bar__*
_**foo**_
___foo___
***bar***
```

```md eslint-check
<!-- eslint md/consistent-strong-style: 'error' -->

__foo__
**bar**
__baz__
**_bar_**
__*foo*__
_**bar**_
*__foo__*
***foo***
___bar___
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint md/consistent-strong-style: ['error', { style: '*' }] -->

__foo__
__*bar*__
*__baz__*
___qux___
```

#### With `{ style: '_' }` Option

```md eslint-check
<!-- eslint md/consistent-strong-style: ['error', { style: '_' }] -->

**foo**
**_bar_**
_**baz**_
***qux***
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-strong-style: 'error' -->

**foo**
**_bar_**
_**baz**_
***qux***
```

```md eslint-check
<!-- eslint md/consistent-strong-style: 'error' -->

__foo__
__*bar*__
*__baz__*
___qux___
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint md/consistent-strong-style: ['error', { style: '*' }] -->

**foo**
**_bar_**
_**baz**_
***qux***
```

#### With `{ style: '_' }` Option

```md eslint-check
<!-- eslint md/consistent-strong-style: ['error', { style: '_' }] -->

__foo__
__*bar*__
*__baz__*
___qux___
```

## Options

```js
'md/consistent-strong-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | '*' | '_'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all strong in the document use the same style as the first one encountered.

You can also specify a particular style by setting style to `'*'` or `'_'`, which will enforce that all strong use the specified style.

## Fix

This rule fixes the strong by replacing them with the configured style.

## Prior Art

- [`MD050` - Strong style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md050.md#md050---strong-style)
- [`remark-lint-strong-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-strong-marker#remark-lint-strong-marker)
