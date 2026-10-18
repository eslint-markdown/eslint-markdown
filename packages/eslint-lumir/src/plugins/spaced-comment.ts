/**
 * @fileoverview Source code for `spaced-comment` rule.
 * @license MIT Copied from `eslint` package.
 * @see https://github.com/eslint/eslint/blob/v10.13.0/lib/rules/spaced-comment.js
 */

/*
 * MIT License
 *
 * Copyright OpenJS Foundation and other contributors, <www.openjsf.org>
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

import type { JSRuleDefinition, SourceCode } from 'eslint';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface CommentOptions {
  exceptions?: string[];
  markers?: string[];
}

export type RuleOptions = [
  ('always' | 'never')?,
  (CommentOptions & {
    line?: CommentOptions;
    block?: CommentOptions & { balanced?: boolean };
  })?,
];

interface StyleRule {
  beginRegex: RegExp;
  endRegex: RegExp;
  hasExceptions: boolean;
  captureMarker: RegExp;
  markers: Set<string>;
}

type Comment = ReturnType<SourceCode['getAllComments']>[number];

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Line terminators defined in ECMAScript.
 */
const LINEBREAKS = new Set(['\r\n', '\r', '\n', '\u2028', '\u2029']);

/**
 * Escape `RegExp` special characters.
 * @license MIT Copied from `escape-string-regexp` package.
 * @param string A string to escape.
 * @returns An escaped string.
 */
function escapeRegExp(string: string) {
  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

/**
 * Escapes the control characters of a given string.
 * @param s A string to escape.
 * @returns An escaped string.
 */
function escape(s: string) {
  return `(?:${escapeRegExp(s)})`;
}

/**
 * Escapes the control characters of a given string.
 * And adds a repeat flag.
 * @param s A string to escape.
 * @returns An escaped string.
 */
function escapeAndRepeat(s: string) {
  return `${escape(s)}+`;
}

/**
 * Parses `markers` option.
 * If markers don't include `"*"`, this adds `"*"` to allow JSDoc comments.
 * @param markers A marker list.
 * @returns A marker list.
 */
function parseMarkersOption(markers: string[]) {
  // `*` is a marker for JSDoc comments.
  if (!markers.includes('*')) {
    return markers.concat('*');
  }

  return markers;
}

/**
 * Creates string pattern for exceptions.
 * Generated pattern:
 *
 * 1. A space or an exception pattern sequence.
 * @param exceptions An exception pattern list.
 * @returns A regular expression string for exceptions.
 */
function createExceptionsPattern(exceptions: string[]) {
  let pattern = '';

  /*
   * A space or an exception pattern sequence.
   * []                 ==> "\s"
   * ["-"]              ==> "(?:\s|\-+$)"
   * ["-", "="]         ==> "(?:\s|(?:\-+|=+)$)"
   * ["-", "=", "--=="] ==> "(?:\s|(?:\-+|=+|(?:\-\-==)+)$)" ==> https://jex.im/regulex/#!embed=false&flags=&re=(%3F%3A%5Cs%7C(%3F%3A%5C-%2B%7C%3D%2B%7C(%3F%3A%5C-%5C-%3D%3D)%2B)%24)
   */
  if (exceptions.length === 0) {
    // a space.
    pattern += '\\s';
  } else {
    // a space or...
    pattern += '(?:\\s|';

    if (exceptions.length === 1) {
      // a sequence of the exception pattern.
      pattern += escapeAndRepeat(exceptions[0]);
    } else {
      // a sequence of one of the exception patterns.
      pattern += '(?:';
      pattern += exceptions.map(escapeAndRepeat).join('|');
      pattern += ')';
    }
    pattern += `(?:$|[${Array.from(LINEBREAKS).join('')}]))`;
  }

  return pattern;
}

/**
 * Creates RegExp object for `always` mode.
 * Generated pattern for beginning of comment:
 *
 * 1. First, a marker or nothing.
 * 2. Next, a space or an exception pattern sequence.
 * @param markers A marker list.
 * @param exceptions An exception pattern list.
 * @returns A RegExp object for the beginning of a comment in `always` mode.
 */
function createAlwaysStylePattern(markers: string[], exceptions: string[]) {
  let pattern = '^';

  /*
   * A marker or nothing.
   * ["*"]            ==> "\*?"
   * ["*", "!"]       ==> "(?:\*|!)?"
   * ["*", "/", "!<"] ==> "(?:\*|\/|(?:!<))?" ==> https://jex.im/regulex/#!embed=false&flags=&re=(%3F%3A%5C*%7C%5C%2F%7C(%3F%3A!%3C))%3F
   */
  if (markers.length === 1) {
    // the marker.
    pattern += escape(markers[0]);
  } else {
    // one of markers.
    pattern += '(?:';
    pattern += markers.map(escape).join('|');
    pattern += ')';
  }

  pattern += '?'; // or nothing.
  pattern += createExceptionsPattern(exceptions);

  return new RegExp(pattern, 'u');
}

/**
 * Creates RegExp object for `never` mode.
 * Generated pattern for beginning of comment:
 *
 * 1. First, a marker or nothing (captured).
 * 2. Next, a space or a tab.
 * @param markers A marker list.
 * @returns A RegExp object for `never` mode.
 */
function createNeverStylePattern(markers: string[]) {
  const pattern = `^(${markers.map(escape).join('|')})?[ \t]+`;

  return new RegExp(pattern, 'u');
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const spacedComment: JSRuleDefinition<{ RuleOptions: RuleOptions }> = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'Enforce consistent spacing after the `//` or `/*` in a comment',
      recommended: false,
      url: 'https://eslint.style/rules/spaced-comment',
    },

    fixable: 'whitespace',

    schema: [
      {
        enum: ['always', 'never'],
      },
      {
        type: 'object',
        properties: {
          exceptions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          markers: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          line: {
            type: 'object',
            properties: {
              exceptions: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              markers: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            additionalProperties: false,
          },
          block: {
            type: 'object',
            properties: {
              exceptions: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              markers: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              balanced: {
                type: 'boolean',
                default: false,
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    ],

    messages: {
      unexpectedSpaceAfterMarker:
        'Unexpected space or tab after marker ({{refChar}}) in comment.',
      expectedExceptionAfter:
        "Expected exception block, space or tab after '{{refChar}}' in comment.",
      unexpectedSpaceBefore: "Unexpected space or tab before '*/' in comment.",
      unexpectedSpaceAfter: "Unexpected space or tab after '{{refChar}}' in comment.",
      expectedSpaceBefore: "Expected space or tab before '*/' in comment.",
      expectedSpaceAfter: "Expected space or tab after '{{refChar}}' in comment.",
    },
  },

  create(context) {
    const { sourceCode, options } = context;

    // Unless the first option is never, require a space
    const requireSpace = options[0] !== 'never';

    /*
     * Parse the second options.
     * If markers don't include `"*"`, it's added automatically for JSDoc
     * comments.
     */
    const config = options[1] || {};
    const balanced = config.block && config.block.balanced;

    const styleRules = (['block', 'line'] as const).reduce(
      (rule, type) => {
        const markers = parseMarkersOption(
          (config[type] && config[type].markers) || config.markers || [],
        );
        const exceptions =
          (config[type] && config[type].exceptions) || config.exceptions || [];
        const endNeverPattern = '[ \t]+$';

        // Create RegExp object for valid patterns.
        rule[type] = {
          beginRegex: requireSpace
            ? createAlwaysStylePattern(markers, exceptions)
            : createNeverStylePattern(markers),
          endRegex:
            balanced && requireSpace
              ? new RegExp(`${createExceptionsPattern(exceptions)}$`, 'u')
              : new RegExp(endNeverPattern, 'u'),
          hasExceptions: exceptions.length > 0,
          captureMarker: new RegExp(`^(${markers.map(escape).join('|')})`, 'u'),
          markers: new Set(markers),
        };

        return rule;
      },
      {} as Record<'block' | 'line', StyleRule>,
    );

    /**
     * Reports a beginning spacing error with an appropriate message.
     * @param node A comment node to check.
     * @param messageId An error message to report.
     * @param match An array of match results for markers.
     * @param refChar Character used for reference in the error message.
     */
    function reportBegin(
      node: Comment,
      messageId: string,
      match: RegExpExecArray | null,
      refChar: string,
    ) {
      const type = node.type.toLowerCase();
      const commentIdentifier = type === 'block' ? '/*' : '//';

      context.report({
        node,
        fix(fixer) {
          const [start] = sourceCode.getRange(node);
          let end = start + 2;

          if (requireSpace) {
            if (match) {
              end += match[0].length;
            }
            return fixer.insertTextAfterRange([start, end], ' ');
          }
          // In never mode, callers only report when the pattern matches.
          end += match![0].length;
          return fixer.replaceTextRange(
            [start, end],
            commentIdentifier + (match![1] ? match![1] : ''),
          );
        },
        messageId,
        data: { refChar },
      });
    }

    /**
     * Reports an ending spacing error with an appropriate message.
     * @param node A comment node to check.
     * @param messageId An error message to report.
     * @param [match] An array of the matched whitespace characters.
     */
    function reportEnd(node: Comment, messageId: string, match?: RegExpExecArray) {
      context.report({
        node,
        fix(fixer) {
          const [nodeStart, nodeEnd] = sourceCode.getRange(node);

          if (requireSpace) {
            return fixer.insertTextAfterRange([nodeStart, nodeEnd - 2], ' ');
          }
          const end = nodeEnd - 2;
          // In never mode, callers only report when the pattern matches.
          const start = end - match![0].length;

          return fixer.replaceTextRange([start, end], '');
        },
        messageId,
      });
    }

    /**
     * Reports a given comment if it's invalid.
     * @param node a comment node to check.
     */
    function checkCommentForSpace(node: Comment) {
      const type = node.type === 'Block' ? 'block' : 'line';
      const rule = styleRules[type];
      const commentIdentifier = type === 'block' ? '/*' : '//';

      // Ignores empty comments and comments that consist only of a marker.
      if (node.value.length === 0 || rule.markers.has(node.value)) {
        return;
      }

      const beginMatch = rule.beginRegex.exec(node.value);
      const endMatch = rule.endRegex.exec(node.value);

      // Checks.
      if (requireSpace) {
        if (!beginMatch) {
          const hasMarker = rule.captureMarker.exec(node.value);
          const marker = hasMarker ? commentIdentifier + hasMarker[0] : commentIdentifier;

          if (rule.hasExceptions) {
            reportBegin(node, 'expectedExceptionAfter', hasMarker, marker);
          } else {
            reportBegin(node, 'expectedSpaceAfter', hasMarker, marker);
          }
        }

        if (balanced && type === 'block' && !endMatch) {
          reportEnd(node, 'expectedSpaceBefore');
        }
      } else {
        if (beginMatch) {
          if (!beginMatch[1]) {
            reportBegin(node, 'unexpectedSpaceAfter', beginMatch, commentIdentifier);
          } else {
            reportBegin(node, 'unexpectedSpaceAfterMarker', beginMatch, beginMatch[1]);
          }
        }

        if (balanced && type === 'block' && endMatch) {
          reportEnd(node, 'unexpectedSpaceBefore', endMatch);
        }
      }
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        // @ts-expect-error -- TODO: ESLint returns Shebang comments, but its comment type omits them.
        comments.filter(token => token.type !== 'Shebang').forEach(checkCommentForSpace);
      },
    };
  },
};

export default spacedComment;
