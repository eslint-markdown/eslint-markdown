import js from 'eslint-lumir/js';
import jsx from 'eslint-lumir/jsx';
import ts from 'eslint-lumir/ts';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';

/** @type {import("eslint").Linter.Config[]} */
export default [js, jsx, ts, tsx, next, json, jsonc, json5];
