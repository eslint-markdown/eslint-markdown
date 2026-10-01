<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a consistent style for tables in Markdown files. Consistent formatting makes it easier to see where a table begins and ends, and some Markdown parsers do not parse tables that are not surrounded by blank lines correctly.

Currently, this rule can require a specific number of blank lines above and below each table. The blank line checks are skipped at the beginning and the end of a document, so a table at the very beginning of a document does not need a blank line above it, and a table at the very end of a document does not need a blank line below it.

Text directly below the table rows is parsed as part of the table, not as content following the table. Therefore, the rule checks the blank lines below the last line that is parsed as part of the table.

::: tip NOTE

This rule only applies to [GFM tables](https://github.github.com/gfm/#tables-extension-) and requires the `markdown/gfm` language.

:::

::: warning This rule is partially compatible with `markdownlint`'s `MD058`

To get the same checks as [`MD058` - Tables should be surrounded by blank lines](https://github.com/DavidAnson/markdownlint/blob/main/doc/md058.md#md058---tables-should-be-surrounded-by-blank-lines), set both `blankLineAbove` and `blankLineBelow` to `1`:

```js
'md/consistent-table-style': ['error', {
  blankLineAbove: 1,
  blankLineBelow: 1,
}]
```

There are two differences:

- This rule does not provide an autofix, while `MD058` can fix some violations.
- `MD058` regards a line that contains only HTML comments, such as `<!-- prettier-ignore -->`, as a blank line. This rule only regards a line that contains only whitespace (and blockquote markers in blockquotes) as a blank line.

:::

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### With `{ blankLineAbove: 1 }` Option

```md eslint-check
<!-- eslint md/consistent-table-style: ['error', { blankLineAbove: 1 }] -->

Paragraph
| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

#### With `{ blankLineBelow: 1 }` Option

```md eslint-check
<!-- eslint md/consistent-table-style: ['error', { blankLineBelow: 1 }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
> Blockquote
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-table-style: 'error' -->

Paragraph
| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
> Blockquote
```

#### With `{ blankLineAbove: 1 }` Option

```md eslint-check
<!-- eslint md/consistent-table-style: ['error', { blankLineAbove: 1 }] -->

Paragraph

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
```

#### With `{ blankLineBelow: 1 }` Option

```md eslint-check
<!-- eslint md/consistent-table-style: ['error', { blankLineBelow: 1 }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |

> Blockquote
```

#### With `{ blankLineAbove: 1, blankLineBelow: 1 }` Options

```md eslint-check
<!-- eslint md/consistent-table-style: ['error', { blankLineAbove: 1, blankLineBelow: 1 }] -->

Paragraph

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |

> Blockquote
```

Text directly below the table rows is parsed as a table row, so it is not regarded as content following the table:

```md eslint-check
<!-- eslint md/consistent-table-style: ['error', { blankLineBelow: 1 }] -->

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |
Text parsed as a table row
```

## Options

```js
'md/consistent-table-style': ['error', {
  blankLineAbove: false,
  blankLineBelow: false,
}]
```

### `blankLineAbove`

> Type: `number | false` / Default: `false`

Require a specific number of blank lines above each table.

Set this option to `false` to disable the blank line check above tables. Set it to a positive integer to require that many blank lines before every table.

### `blankLineBelow`

> Type: `number | false` / Default: `false`

Require a specific number of blank lines below each table.

Set this option to `false` to disable the blank line check below tables. Set it to a positive integer to require that many blank lines after every table.

## Further Reading

- [GFM Spec: Tables (extension)](https://github.github.com/gfm/#tables-extension-)

## Prior Art

- [`MD058` - Tables should be surrounded by blank lines](https://github.com/DavidAnson/markdownlint/blob/main/doc/md058.md#md058---tables-should-be-surrounded-by-blank-lines)
