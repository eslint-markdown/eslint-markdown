<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows indentation before headings.

While Markdown allows up to three spaces before a heading, four or more spaces turn the line into an indented code block. Such small indentation is easy to miss when reading the source, so this rule ensures that every heading starts at the beginning of the line.

The `>` marker of a [block quote](https://spec.commonmark.org/0.31.2/#block-quotes) and the single space after it are not treated as indentation, so `> # Heading` is allowed. Any extra spaces after the marker are reported.

For Setext headings, the check applies to the text line. The underline is not checked.

A heading that has a non-whitespace character before it, other than a block quote marker, is not checked. For example, a heading after a list marker such as `- # Heading` is not checked.

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

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

```md eslint-check
<!-- eslint md/consistent-heading-indent: 'error' -->

Some text

# Heading

> # Heading in Block Quote
```

## Options

No options are available for this rule.

## Fix

This rule fixes the heading indentation by removing the spaces or tabs before the heading.

## Prior Art

- [`MD023` - Headings Must Start at the Beginning of the Line](https://github.com/DavidAnson/markdownlint/blob/main/doc/md023.md)
