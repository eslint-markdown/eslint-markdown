<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a consistent number of spaces after list markers in Markdown files.

A list marker can be an unordered list marker such as `-`, `*`, or `+`, or an ordered list marker such as `1.`. The number of spaces after the marker can be configured separately for ordered and unordered lists, as well as for single-line and multi-line lists.

By default, this rule requires one space after every list marker.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### With Default Options

```md eslint-check
<!-- eslint md/no-multiple-list-space: 'error' -->

-  item
*   item
+    item
1.  item
```

#### With `{ ulSingle: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { ulSingle: 2 }] -->

- item
```

#### With `{ olSingle: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { olSingle: 2 }] -->

1. item
```

#### With `{ ulMulti: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { ulMulti: 2 }] -->

- item
  continuation
- item
```

#### With `{ olMulti: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { olMulti: 2 }] -->

1. item
    continuation
```

### :white_checkMark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-multiple-list-space: 'error' -->

- item
- item
- item

1. item
2. item
3. item
```

#### With `{ ulSingle: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { ulSingle: 2 }] -->

-  item
-  item
```

#### With `{ olSingle: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { olSingle: 2 }] -->

1.  item
2.  item
```

#### With `{ ulMulti: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { ulMulti: 2 }] -->

-  item
  continuation
-  item
```

#### With `{ olMulti: 2 }` Option

```md eslint-check
<!-- eslint md/no-multiple-list-space: ['error', { olMulti: 2 }] -->

1.  item
    continuation
```

## Options

```js
'md/no-multiple-list-space': ['error', {
  ulSingle: 1,
  ulMulti: 1,
  olSingle: 1,
  olMulti: 1,
}]
```

### `ulSingle`

> Type: `number` / Default: `1`

Require a specific number of spaces after unordered list markers when the list uses single-line items.

```md
-  item
-  item
```

For example, to require two spaces:

```js
'md/no-multiple-list-space': ['error', {
  ulSingle: 2,
}]
```

### `ulMulti`

> Type: `number` / Default: `1`

Require a specific number of spaces after unordered list markers when the list contains multi-line items.

```md
-  item
  continuation
```

For example, to require two spaces:

```js
'md/no-multiple-list-space': ['error', {
  ulMulti: 2,
}]
```

### `olSingle`

> Type: `number` / Default: `1`

Require a specific number of spaces after ordered list markers when the list uses single-line items.

```md
1.  item
2.  item
```

For example, to require two spaces:

```js
'md/no-multiple-list-space': ['error', {
  olSingle: 2,
}]
```

### `olMulti`

> Type: `number` / Default: `1`

Require a specific number of spaces after ordered list markers when the list contains multi-line items.

```md
1.  item
    continuation
```

For example, to require two spaces:

```js
'md/no-multiple-list-space': ['error', {
  olMulti: 2,
}]
```

## Further Reading

- [CommonMark Spec: Lists](https://spec.commonmark.org/current/#lists)
- [GFM Spec: Lists](https://github.github.com/gfm/#lists)

## Prior Art

- [`MD030` - Spaces after list markers](https://github.com/DavidAnson/markdownlint/blob/main/doc/md030.md#md030---spaces-after-list-markers)
