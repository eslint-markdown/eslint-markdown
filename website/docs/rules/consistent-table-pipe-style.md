<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for leading and trailing pipe characters (`|`) in GFM tables. Consistent formatting makes tables easier to read, and some parsers have difficulty with tables that are missing their leading or trailing pipes.

Every row of a table is checked, including the header row, the delimiter row, and the body rows. By default, this rule enforces that all table rows in the document use the same style as the header row of the first table.

Text immediately following a table without a blank line is part of the table, so it is also checked as a table row.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: 'error' -->

| Header | Header |
| ------ | ------
  Cell   | Cell   |
```

#### With `{ style: 'leading-and-trailing' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'leading-and-trailing' }] -->

Header | Header
------ | ------
Cell   | Cell
```

#### With `{ style: 'leading-only' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'leading-only' }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

#### With `{ style: 'trailing-only' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'trailing-only' }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

#### With `{ style: 'no-leading-or-trailing' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'no-leading-or-trailing' }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: 'error' -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

#### With `{ style: 'leading-and-trailing' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'leading-and-trailing' }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

#### With `{ style: 'leading-only' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'leading-only' }] -->

| Header | Header
| ------ | ------
| Cell   | Cell
```

#### With `{ style: 'trailing-only' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'trailing-only' }] -->

Header | Header |
------ | ------ |
Cell   | Cell   |
```

#### With `{ style: 'no-leading-or-trailing' }` Option

```md eslint-check
<!-- eslint md/consistent-table-pipe-style: ['error', { style: 'no-leading-or-trailing' }] -->

Header | Header
------ | ------
Cell   | Cell
```

## Options

```js
'md/consistent-table-pipe-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | 'leading-and-trailing' | 'leading-only' | 'trailing-only' | 'no-leading-or-trailing'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all table rows in the document use the same style as the header row of the first table.

You can also specify a particular style by setting `style` to one of the following values:

- `'leading-and-trailing'`: Require both leading and trailing pipes, such as `| a | b |`.
- `'leading-only'`: Require a leading pipe and disallow a trailing pipe, such as `| a | b`.
- `'trailing-only'`: Require a trailing pipe and disallow a leading pipe, such as `a | b |`.
- `'no-leading-or-trailing'`: Disallow both leading and trailing pipes, such as `a | b`.

## Fix

This rule fixes rows that are only missing a leading or trailing pipe by adding it.

Rows with an extra pipe are reported but not fixed, because removing a pipe can change the table structure. For example, removing the leading pipe from `| | b |` drops its empty first cell, and removing it from `| - a | b |` turns the row into a list item.

## Prior Art

- [`MD055` - Table pipe style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md055.md#md055---table-pipe-style)
