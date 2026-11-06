<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of capital letters at the beginning of sentences in Markdown documents. Maintaining consistent capitalization improves document readability and professionalism.

The rule checks the leading text in paragraphs, headings, blockquotes, footnote definitions, list items, and table cells (depending on the configured selectors) to ensure proper capitalization. When the checked text begins with a lowercase ASCII letter (`a` through `z`), the rule flags it as a violation and can automatically fix the issue by converting that letter to uppercase.

::: info

This rule doesn't report any errors by default. You must configure it with selectors matching the Markdown nodes you want to check.

:::

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### With `'paragraph'`, `'heading'`, and `'tableCell'` Selectors

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'paragraph', 'heading', 'tableCell'] -->

hello world!

# hello world!

> hello world!

[^note]: footnote text

- hello world!

| heading |
| ------- |
| cell    |
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### With `'paragraph'`, `'heading'`, and `'tableCell'` Selectors

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'paragraph', 'heading', 'tableCell'] -->

Hello world!

# Hello world!

> Hello world!

[^note]: Footnote text

- Hello world!

| Heading |
| ------- |
| Cell    |
```

#### With `'root > paragraph'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'root > paragraph'] -->

Hello world!

# hello world!

- hello world!
```

## Options

Like ESLint's [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax#options), this rule accepts a list of [AST selector](https://eslint.org/docs/latest/extend/selectors) strings:

```js
'md/require-capitalization': ['error', 'paragraph', 'heading', 'tableCell']
```

Selectors match Markdown AST nodes. For example, `'heading'` selects all headings, while `'heading[depth=2]'` selects only second-level headings. Use [ESLint Code Explorer](https://explorer.eslint.org) with Markdown selected to inspect node types and properties.

Alternatively, each option can be an object with:

- `selector` (required): The AST selector to check.
- `message` (optional): The message reported for violations matching that selector. When omitted, the default message is used, for example: `` `h` should be capitalized. ``

Selectors and custom messages must be non-empty strings. String and object options can be mixed:

```js
'md/require-capitalization': ['error',
  'paragraph',
  {
    selector: 'heading',
    message: 'Headings must begin with a capital letter.',
  },
]
```

## Fix

This rule fixes the reported lowercase letter by replacing it with its uppercase form.

Autolinks such as `<user@example.com>`, `<https://example.com>`, and GFM bare URLs or email addresses are ignored to preserve their destinations. Explicit link labels, such as `[hello](https://example.com)`, are still checked.

## When Not To Use It

You might want to disable this rule if:

- You're working with a documentation style guide that permits or requires lowercase at the beginning of sentences.
- Your document contains many code examples or technical terms that conventionally start with lowercase.
- You're writing in a language other than English or a language that doesn't follow the same capitalization rules.

## Prior Art

- [`capitalized-comments`](https://eslint.org/docs/latest/rules/capitalized-comments)
- [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax)
