<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows spaces and tabs at the start and end of link text.

Link text is the part between the brackets of a link. Padding there is part of the label, so it widens the underlined region of the rendered link and keeps exact searches such as `[ESLint]` from matching the source.

The rule checks inline links and reference links. Autolinks and images are out of scope, because neither carries link text between brackets.

Only spaces and tabs count as padding, following the CommonMark definition of whitespace. Other characters such as a no-break space are left in place, which differs from `MD039`.

Link text is also left alone where removing its padding would change more than spacing:

- Link text spanning more than one line. A hard break, a backslash before a line ending, and the blockquote markers opening each line all sit where the padding would be removed.
- Link text whose trailing padding follows an odd number of backslashes, because removing it would leave the backslash escaping the closing bracket.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-space-in-link-text: 'error' -->

[ ESLint ](https://eslint.org)

[ESLint ](https://eslint.org)

[   ESLint   ](https://eslint.org)

[ ESLint ][eslint]

[eslint]: https://eslint.org
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-space-in-link-text: 'error' -->

[ESLint](https://eslint.org)

[ESLint][eslint]

[eslint]: https://eslint.org
```

Spaces between words of the link text are untouched:

```md eslint-check
<!-- eslint md/no-space-in-link-text: 'error' -->

[The ESLint website](https://eslint.org)
```

Autolinks and images have no link text to check:

```md eslint-check
<!-- eslint md/no-space-in-link-text: 'error' -->

<https://eslint.org>

![ ESLint ](https://eslint.org/logo.png)
```

Link text spanning more than one line keeps its padding:

```md eslint-check
<!-- eslint md/no-space-in-link-text: 'error' -->

[
ESLint
](https://eslint.org)

[ESLint  
](https://eslint.org)
```

Trailing padding after a backslash is kept, since removing it would escape the closing bracket:

```md eslint-check
<!-- eslint md/no-space-in-link-text: 'error' -->

[ESLint\ ](https://eslint.org)
```

## Options

No options are available for this rule.

## Fix

This rule fixes the link text by removing the spaces and tabs next to the brackets.

## Prior Art

- [`MD039` - Spaces inside link text](https://github.com/DavidAnson/markdownlint/blob/main/doc/md039.md#md039---spaces-inside-link-text)
