<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule requires or disallows a final newline in non-empty Markdown files. A final newline helps keep concatenated files and terminal output on separate lines.

Empty files are always valid. By default, non-empty files must end with at least one newline. CR (`\r`), LF (`\n`), and CRLF (`\r\n`) are all accepted, including when they differ from the configured `newline` option. The rule does not limit the number of final newlines or change line endings elsewhere in the file.

To limit consecutive blank lines, use [`no-consecutive-blank-line`](no-consecutive-blank-line.md) alongside this rule.

## Examples

The examples below use escaped strings to show the exact Markdown content, including its final newline. The quotes are not part of the file.

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```txt
"# Heading"
"Text\n   "
```

#### With `'never'` Option

```txt
"Text\n"
"Text\r\n\r\n"
"Text\r"
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```txt
""
"# Heading\n"
"Text\n\n"
"Text\n   \n"
"Text\r\n"
"Text\r"
```

#### With `'never'` Option

```txt
""
"Text"
"First line\nLast line"
```

## Options

```js
'md/require-eol-last': ['error', 'always', { newline: 'LF' }]
```

The first option is a string:

- `'always'` (default) requires at least one newline at the end of non-empty files.
- `'never'` disallows newlines at the end of files.

The second option is an object with the following property:

### `newline`

> Type: `'CR' | 'LF' | 'CRLF'` / Default: `'LF'`

Choose the newline inserted when automatically fixing a missing final newline:

- `'CR'` inserts `\r`.
- `'LF'` inserts `\n`.
- `'CRLF'` inserts `\r\n`.

This option only affects automatic fixes in `'always'` mode. Existing final newlines are accepted regardless of their style. In `'never'` mode, all consecutive final CR, LF, and CRLF newlines are removed regardless of this option.

For example, to insert CRLF when a final newline is missing:

```js
'md/require-eol-last': ['error', 'always', { newline: 'CRLF' }]
```

## Fix

In `'always'` mode, this rule appends the configured newline after the last character, preserving trailing spaces. In `'never'` mode, it removes all consecutive newlines at the end of the file in one fix, preserving other whitespace and earlier line endings.

## Prior Art

- [`MD047` - Files should end with a single newline character](https://github.com/DavidAnson/markdownlint/blob/main/doc/md047.md#md047---files-should-end-with-a-single-newline-character)
- [`remark-lint-final-newline`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-final-newline#remark-lint-final-newline)
- [`eol-last`](https://eslint.org/docs/latest/rules/eol-last)
- [`@stylistic/eol-last`](https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/rules/eol-last/README.md)
