<!-- eslint-disable-next-line markdown/no-html -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of capital letters at the beginning of sentences in Markdown documents. Maintaining consistent capitalization improves document readability and professionalism.

The rule checks the leading text of nodes matched by the configured selectors, such as paragraphs, headings, list items, and table cells, to ensure proper capitalization. When the checked text begins with a lowercase ASCII letter (`a` through `z`), the rule reports a violation.

::: info

This rule doesn't report any errors by default. You must configure it with selectors matching the Markdown nodes you want to check.

:::

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### With `'paragraph'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'paragraph'] -->

hello world!

> hello world!

[^note]: footnote text

- hello world!
```

#### With `'heading'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'heading'] -->

# hello world!
```

#### With `'tableCell'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'tableCell'] -->

| heading |
| ------- |
| cell    |
```

#### With `'heading[depth=2]'` Selector

This [ESQuery selector](https://eslint.org/docs/latest/extend/selectors) checks only second-level headings.

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'heading[depth=2]'] -->

# hello world!

## hello world!

### hello world!
```

#### With `'table > tableRow:first-child > tableCell'` Selector

This [ESQuery selector](https://eslint.org/docs/latest/extend/selectors) selects table cells in the first (header) row of the table.

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'table > tableRow:first-child > tableCell'] -->

| header |
| ------ |
| data   |
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### With `'paragraph'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'paragraph'] -->

Hello world!

> Hello world!

[^note]: Footnote text

- Hello world!
```

#### With `'heading'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'heading'] -->

# Hello world!
```

#### With `'tableCell'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'tableCell'] -->

| Heading |
| ------- |
| Cell    |
```

#### With `'heading[depth=2]'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'heading[depth=2]'] -->

# hello world!

## Hello world!

### hello world!
```

#### With `'root > paragraph'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'root > paragraph'] -->

Hello world!

# hello world!

- hello world!
```

#### With `'table > tableRow:first-child > tableCell'` Selector

```md eslint-check
<!-- eslint md/require-capitalization: ['error', 'table > tableRow:first-child > tableCell'] -->

| Header |
| ------ |
| data   |
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

## When Not To Use It

You can disable this rule if your documentation style, technical terminology, or language does not require initial capitalization.

## Prior Art

- [`capitalized-comments`](https://eslint.org/docs/latest/rules/capitalized-comments)
- [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax)
