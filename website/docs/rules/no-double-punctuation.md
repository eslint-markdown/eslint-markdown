<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Consecutive punctuation in prose is usually a typo. It often slips through review because the sentence is still readable at a glance, but it makes Markdown sources look noisy and inconsistent. This rule helps catch those accidental punctuation pairs in text.

It reports cases where exactly two of the following punctuation marks appear in a row:

```txt
! , . : ; ?
```

For example, `!!`, `?!`, `..`, `::`, `??`, and `;:` are reported, whereas `...`, `!!!`, `?!?`, and `,.;` are not.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

This usually means a typo!.
Did you mean this?!
Maybe this..
Wait,. what about this?
```

#### With `{ allowTerms: [/etc\.;/] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { allowTerms: [/etc\.;/] }] -->

This is a typo.;
foo, bar, baz, etc.!
```

#### With `{ punctuation: ['.', '!'] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { punctuation: ['.', '!'] }] -->

This usually means a typo!.
Maybe this..
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

This is fine.
Is this correct?
Wait...
Amazing!!!
```

#### With `{ allow: ['!!', '?!'] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { allow: ['!!', '?!'] }] -->

Really!!
Are you sure?!
```

#### With `{ allowTerms: [/etc\.;/] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { allowTerms: [/etc\.;/] }] -->

foo, bar, baz, etc.;
```

#### With `{ punctuation: ['.', '!'] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { punctuation: ['.', '!'] }] -->

Is this correct?
Did you mean this?!
```

## Options

```js
'md/no-double-punctuation': ['error', {
  allow: [],
  allowTerms: [],
  punctuation: ['.', ',', ';', ':', '!', '?'],
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When `allow` is specified, the listed two-character punctuation patterns are ignored by this rule. This is useful when punctuation such as `!!` or `?!` is intentionally used for tone or emphasis instead of being treated as a typo.

::: warning

Patterns in [`allow`](#allow) containing characters outside [`punctuation`](#punctuation) are silently ignored.

:::

### `allowTerms`

> Type: `(RegExp | string)[]` / Default: `[]`

When `allowTerms` is specified, text matching the listed patterns is ignored by this rule. This is useful when terms such as `etc.;` are intentionally used instead of being treated as a typo. String patterns must be non-empty.

::: warning Escaping special characters
Escape special characters to match them literally. For example, use `/etc\.;/u` or `'etc\\.;'` to match `etc.;`.
:::

### `punctuation`

> Type: `string[]` / Default: `['.', ',', ';', ':', '!', '?']`

Specifies the characters that are treated as punctuation by this rule.

The configured array replaces the default punctuation characters. Each item must be a single character, and at least one character is required.

NOTE: Spaces, tabs, line feeds, carriage returns, and backslashes are not allowed.

## Fix

This rule provides a fix when two punctuation marks are the same by replacing the pair with a single punctuation mark. For example, `!!` is fixed to `!`, and `..` is fixed to `.`.

## Suggestion

This rule provides suggestions when the two punctuation marks are different. You can replace the pair with either the left punctuation mark or the right punctuation mark. For example, `?!` can be replaced with `?` or `!`.

## Prior Art

- [`remark-lint-no-repeat-punctuation`](https://github.com/laysent/remark-lint-plugins/tree/HEAD/packages/remark-lint-no-repeat-punctuation#remark-lint-no-repeat-punctuation)
