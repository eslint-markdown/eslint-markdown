import md from 'eslint-markdown';

/** @type {import("eslint").Linter.Config[]} */
export default [
  md.configs.recommended,
  md.configs.stylistic,
  md.configs.base,
  md.configs.all,
];
