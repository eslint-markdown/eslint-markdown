<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces consistent indentation for list item markers that are parsed at the same nesting level in Markdown files.

List items at the same nesting level should be aligned with the first list item of their list. Misaligned indentation makes a document harder to read, and when a list item is indented inconsistently it can easily be mistaken for a differently nested list.

For ordered lists, the markers may be either left-aligned (all markers start at the same column) or right-aligned (all markers end at the same column), matching [`markdownlint`](https://github.com/DavidAnson/markdownlint/blob/main/doc/md005.md#md005---inconsistent-indentation-for-list-items-at-the-same-level).

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-list-indentation: 'error' -->

* Item 1
  * Nested item 1
  * Nested item 2
   * Misaligned item
```

#### Ordered Lists

```md eslint-check
<!-- eslint md/consistent-list-indentation: 'error' -->

  1. Item 1
2. Item 2
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-list-indentation: 'error' -->

* Item 1
  * Nested item 1
  * Nested item 2
  * Nested item 3
```

#### Ordered Lists

Ordered list markers may be left-aligned, so that all items start at the same column:

```md eslint-check
<!-- eslint md/consistent-list-indentation: 'error' -->

1. Item 1
2. Item 2
10. Item 3
```

They may also be right-aligned, so that markers with a different width still end at the same column:

```md eslint-check
<!-- eslint md/consistent-list-indentation: 'error' -->

  9. Item 1
100. Item 2
```

## Options

No options are available for this rule.

## Fix

This rule fixes the indentation of a list item by aligning its marker with the first list item of the same list. The autofix adjusts the leading whitespace before the marker only when it consists solely of spaces, so that indentation belonging to another block construct, such as a block quote, is never modified.

## Prior Art

- [`MD005` - Inconsistent indentation for list items at the same level](https://github.com/DavidAnson/markdownlint/blob/main/doc/md005.md#md005---inconsistent-indentation-for-list-items-at-the-same-level)
- [`remark-lint-list-item-indent`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-indent#remark-lint-list-item-indent)
