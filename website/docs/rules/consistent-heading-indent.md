<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows indentation before headings.

While Markdown allows up to three spaces before a heading, four or more spaces turn the line into an indented code block. Such small indentation is easy to miss when reading the source, so this rule ensures that every heading starts at the beginning of the line, or of the [container block](https://spec.commonmark.org/0.31.2/#container-blocks) that contains it.

The `>` marker of a [block quote](https://spec.commonmark.org/0.31.2/#block-quotes) and the single space after it are not treated as indentation, so `> # Heading` is allowed. Any extra spaces or tabs after the marker are reported.

Inside a [list item](https://spec.commonmark.org/0.31.2/#list-items) or a footnote definition, indentation is measured from where the content of the item starts. For example, a heading indented by two spaces under `- item` is allowed, because the two spaces align it with the list item content.

Tabs are expanded to the next tab stop of four columns, as defined in [CommonMark](https://spec.commonmark.org/0.31.2/#tabs).

For Setext headings, the check applies to the text line. The underline is not checked.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

Some text

  # Indented heading
```

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

>   # Extra spaces after the block quote marker
```

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

  Setext heading
========
```

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

- List item

    # Heading indented beyond the list item content
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

Some text

# Heading

> # Heading in Block Quote
```

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

- List item

  # Heading aligned with the list item content
```

::: warning Differences from `markdownlint` rule `MD023`

Unlike `markdownlint` rule `MD023`, this rule does not treat spaces before a block quote marker as heading indentation, because they belong to the block quote. It does not report this heading.

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

  > # Heading
```

:::

## Options

No options are available for this rule.

## Fix

This rule fixes the heading indentation by removing the spaces or tabs before the heading. If a tab covers both the block quote marker or list item indentation and the heading indentation, only the heading indentation is removed and the rest of the tab is kept as spaces.

## Prior Art

- [`MD023` - Headings Must Start at the Beginning of the Line](https://github.com/DavidAnson/markdownlint/blob/main/doc/md023.md)
