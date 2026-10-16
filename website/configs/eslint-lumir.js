import lumir from 'eslint-lumir';

/** @type {import("eslint").Linter.Config[]} */
export default [
  lumir.configs.js,
  lumir.configs.jsx,
  lumir.configs.ts,
  lumir.configs.tsx,
  lumir.configs.next,
  lumir.configs.json,
  lumir.configs.jsonc,
  lumir.configs.json5,
  lumir.configs.md,
];
