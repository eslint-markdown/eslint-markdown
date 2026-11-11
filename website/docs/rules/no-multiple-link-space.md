<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows spaces or tabs at the start and end of inline and reference link text.

Link text is defined as the content between square brackets. Consistent spacing around link text makes Markdown sources easier to read.

It ignores autolinks, images, and multiline link text, allows internal spaces, and avoids fixes that would break links.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

[ ESLint ](https://eslint.org)

[ESLint ](https://eslint.org)

[   ESLint   ](https://eslint.org)

[ESLint\ ](https://eslint.org)

[ ESLint ][eslint]

[eslint]: https://eslint.org
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

[ESLint](https://eslint.org)

[
ESLint
](https://eslint.org)

[ESLint  
](https://eslint.org)

<https://eslint.org>

[The ESLint website](https://eslint.org)

[ESLint][eslint]

[eslint]: https://eslint.org

![ ESLint ](https://eslint.org/logo.png)

- [x ] details

[x]: https://eslint.org
```

## Options

No options are available for this rule.

## Fix

This rule fixes the link text by removing the spaces and tabs next to the brackets.

## Prior Art

- [`MD039` - Spaces inside link text](https://github.com/DavidAnson/markdownlint/blob/main/doc/md039.md#md039---spaces-inside-link-text)
- [`remark-lint-no-inline-padding`](https://github.com/remarkjs/remark-lint/tree/9cdda8091355364cbb9a5c9e75889d5d67b08bdf/packages/remark-lint-no-inline-padding#remark-lint-no-inline-padding)
