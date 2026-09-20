<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows spaces and tabs at the start and end of link text.

Link text is the part between the brackets of a link. Padding there is part of the label, so it widens the underlined region of the rendered link and keeps exact searches such as `[ESLint]` from matching the source.

The rule checks inline links and reference links. Autolinks and images are out of scope, because neither carries link text between brackets.

Only spaces and tabs count as padding. Other whitespace, such as a no-break space, is left in place, which differs from `MD039`.

Padding is also left alone where removing it would change more than spacing:

- **Link text spanning more than one line.** Such text can hold a hard break, a backslash before a line ending, or a blockquote marker opening each line, all in the place padding would be removed from. The rule skips the whole label rather than telling those apart.
- **Trailing padding that follows an odd number of backslashes.** Removing it would leave the backslash escaping the closing bracket. Padding at the start of the same link is still removed.
- **A shortcut reference that would open a task list item.** Removing the padding would leave `[x]`, which GFM reads as a checked task list item, replacing the link with a checkbox. This needs the reference to open the first paragraph of an item that has no checkbox yet, to read `x` or `X`, and to be followed by whitespace and further content. The same reference anywhere else in the item is still fixed. CommonMark has no task list items, but the padding is kept there too, so that one position behaves the same in both dialects.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

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
<!-- eslint md/no-multiple-link-space: 'error' -->

[ESLint](https://eslint.org)

[ESLint][eslint]

[eslint]: https://eslint.org
```

Spaces between words of the link text are untouched:

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

[The ESLint website](https://eslint.org)
```

Autolinks and images have no link text to check:

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

<https://eslint.org>

![ ESLint ](https://eslint.org/logo.png)
```

Link text spanning more than one line keeps its padding:

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

[
ESLint
](https://eslint.org)

[ESLint  
](https://eslint.org)
```

Trailing padding after a backslash is kept, since removing it would escape the closing bracket:

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

[ESLint\ ](https://eslint.org)
```

A shortcut reference at the head of a list item keeps its padding when the fix would produce a checkbox:

```md eslint-check
<!-- eslint md/no-multiple-link-space: 'error' -->

- [x ] details

[x]: https://eslint.org
```

## Options

No options are available for this rule.

## Fix

This rule fixes the link text by removing the spaces and tabs next to the brackets.

## Prior Art

- [`MD039` - Spaces inside link text](https://github.com/DavidAnson/markdownlint/blob/main/doc/md039.md#md039---spaces-inside-link-text)
