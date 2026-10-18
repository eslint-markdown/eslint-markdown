/**
 * @fileoverview Tests ported from the no-absolute-path rule in eslint-plugin-import-x.
 * @license MIT Copied from `eslint-plugin-import-x` package.
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/test/rules/no-absolute-path.spec.ts
 */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Ben Mosher
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import parser from '@typescript-eslint/parser';
import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from './no-absolute-path.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

RuleTester.describe = describe;
RuleTester.it = it;
const ruleTester = new RuleTester();

function tValid(test: RuleTester.ValidTestCase): RuleTester.ValidTestCase {
  return { languageOptions: { parser }, ...test };
}

function tInvalid(test: RuleTester.InvalidTestCase): RuleTester.InvalidTestCase {
  return { languageOptions: { parser }, ...test };
}

const ABSOLUTE_ERROR: RuleTester.TestCaseError = {
  messageId: 'absolute',
};

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester.run('no-absolute-path', rule, {
  valid: [
    tValid({ code: 'import _ from "lodash"' }),
    tValid({ code: 'import find from "lodash.find"' }),
    tValid({ code: 'import foo from "./foo"' }),
    tValid({ code: 'import foo from "../foo"' }),
    tValid({ code: 'import foo from "foo"' }),
    tValid({ code: 'import foo from "./"' }),
    tValid({ code: 'import foo from "@scope/foo"' }),
    tValid({ code: 'var _ = require("lodash")' }),
    tValid({ code: 'var find = require("lodash.find")' }),
    tValid({ code: 'var foo = require("./foo")' }),
    tValid({ code: 'var foo = require("../foo")' }),
    tValid({ code: 'var foo = require("foo")' }),
    tValid({ code: 'var foo = require("./")' }),
    tValid({ code: 'var foo = require("@scope/foo")' }),

    tValid({ code: 'import events from "events"' }),
    tValid({ code: 'import path from "path"' }),
    tValid({ code: 'var events = require("events")' }),
    tValid({ code: 'var path = require("path")' }),
    tValid({ code: 'import path from "path";import events from "events"' }),

    // still works if only `amd: true` is provided
    tValid({
      code: 'import path from "path"',
      options: [{ amd: true }],
    }),

    // amd not enabled by default
    tValid({ code: 'require(["/some/path"], function (f) { /* ... */ })' }),
    tValid({
      code: 'define(["/some/path"], function (f) { /* ... */ })',
      languageOptions: {},
    }),
    tValid({
      code: 'require(["./some/path"], function (f) { /* ... */ })',
      options: [{ amd: true }],
    }),
    tValid({
      code: 'define(["./some/path"], function (f) { /* ... */ })',
      options: [{ amd: true }],
    }),
  ],
  invalid: [
    tInvalid({
      code: `import f from "/foo"`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'import f from ".."',
    }),
    tInvalid({
      code: `import f from "/foo/bar/baz.js"`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'import f from "./baz.js"',
    }),
    tInvalid({
      code: `import f from "/foo/path"`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'import f from "../path"',
    }),
    tInvalid({
      code: `import f from "/some/path"`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'import f from "../../some/path"',
    }),
    tInvalid({
      code: `import f from "/some/path"`,
      filename: '/foo/bar/index.js',
      options: [{ amd: true }],
      errors: [ABSOLUTE_ERROR],
      output: 'import f from "../../some/path"',
    }),
    tInvalid({
      code: `var f = require("/foo")`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'var f = require("..")',
    }),
    tInvalid({
      code: `var f = require("/foo/path")`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'var f = require("../path")',
    }),
    tInvalid({
      code: `var f = require("/some/path")`,
      filename: '/foo/bar/index.js',
      errors: [ABSOLUTE_ERROR],
      output: 'var f = require("../../some/path")',
    }),
    tInvalid({
      code: `var f = require("/some/path")`,
      filename: '/foo/bar/index.js',
      options: [{ amd: true }],
      errors: [ABSOLUTE_ERROR],
      output: 'var f = require("../../some/path")',
    }),
    // validate amd
    tInvalid({
      code: `require(["/some/path"], function (f) { /* ... */ })`,
      filename: '/foo/bar/index.js',
      options: [{ amd: true }],
      errors: [ABSOLUTE_ERROR],
      output: 'require(["../../some/path"], function (f) { /* ... */ })',
    }),
    tInvalid({
      code: `define(["/some/path"], function (f) { /* ... */ })`,
      filename: '/foo/bar/index.js',
      languageOptions: {},
      options: [{ amd: true }],
      errors: [ABSOLUTE_ERROR],
      output: 'define(["../../some/path"], function (f) { /* ... */ })',
    }),
  ],
});
