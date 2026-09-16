/**
 * @fileoverview Test for `constants.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  URL_RULE_DOCS,
  punctuation,
  punctuationWithQuestionMark,
  escapedTrailingBackslashRegex,
  gemojiRegex,
} from './constants.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('constants', () => {
  describe('URL_RULE_DOCS', () => {
    it('should return the base rule documentation URL when no rule name is provided', () => {
      assert.strictEqual(
        URL_RULE_DOCS(),
        'https://eslint-markdown.lumir.page/docs/rules/',
      );
    });

    it('should append the rule name to the rule documentation URL', () => {
      assert.strictEqual(
        URL_RULE_DOCS('example-rule'),
        'https://eslint-markdown.lumir.page/docs/rules/example-rule',
      );
    });
  });

  describe('array', () => {
    describe('punctuation', () => {
      it('should contain the default normal and full-width punctuation characters', () => {
        assert.deepStrictEqual(punctuation, [
          '.',
          ',',
          ';',
          ':',
          '!',
          '。',
          '，',
          '；',
          '：',
          '！',
        ]);
      });
    });

    describe('punctuationWithQuestionMark', () => {
      it('should extend punctuation with normal and full-width question marks', () => {
        assert.deepStrictEqual(punctuationWithQuestionMark, [...punctuation, '?', '？']);
      });
    });
  });

  describe('regex', () => {
    describe('escapedTrailingBackslashRegex', () => {
      it('should match one trailing backslash because the run length is odd', () => {
        assert.match('text\\', escapedTrailingBackslashRegex);
      });

      it('should not match two trailing backslashes because the run length is even', () => {
        assert.notMatch(`text${'\\'.repeat(2)}`, escapedTrailingBackslashRegex);
      });

      it('should match three trailing backslashes because the run length is odd', () => {
        assert.match(`text${'\\'.repeat(3)}`, escapedTrailingBackslashRegex);
      });

      it('should not match four trailing backslashes because the run length is even', () => {
        assert.notMatch(`text${'\\'.repeat(4)}`, escapedTrailingBackslashRegex);
      });

      it('should not match a backslash before the end of a line', () => {
        assert.notMatch('text\\more', escapedTrailingBackslashRegex);
      });
    });

    describe('gemojiRegex', () => {
      describe('valid gemoji', () => {
        it('should match supported single-letter names', () => {
          assert.match(':a:', gemojiRegex);
          assert.match(':b:', gemojiRegex);
          assert.match(':m:', gemojiRegex);
          assert.match(':o:', gemojiRegex);
          assert.match(':v:', gemojiRegex);
          assert.match(':x:', gemojiRegex);
        });

        it('should match supported numeric names', () => {
          assert.match(':+1:', gemojiRegex);
          assert.match(':-1:', gemojiRegex);
          assert.match(':100:', gemojiRegex);
          assert.match(':1234:', gemojiRegex);
          assert.match(':8ball:', gemojiRegex);
          assert.match(':o2:', gemojiRegex);
        });

        it('should match supported place medal names', () => {
          assert.match(':1st_place_medal:', gemojiRegex);
          assert.match(':2nd_place_medal:', gemojiRegex);
          assert.match(':3rd_place_medal:', gemojiRegex);
        });

        it('should match clock names containing one to four digits', () => {
          assert.match(':clock1:', gemojiRegex);
          assert.match(':clock1234:', gemojiRegex);
        });

        it('should match supported hyphenated names', () => {
          assert.match(':e-mail:', gemojiRegex);
          assert.match(':non-potable_water:', gemojiRegex);
          assert.match(':t-rex:', gemojiRegex);
        });

        it('should match supported Unicode button names', () => {
          assert.match(':u5272:', gemojiRegex);
          assert.match(':u5408:', gemojiRegex);
          assert.match(':u55b6:', gemojiRegex);
          assert.match(':u6307:', gemojiRegex);
          assert.match(':u6708:', gemojiRegex);
          assert.match(':u6709:', gemojiRegex);
          assert.match(':u6e80:', gemojiRegex);
          assert.match(':u7121:', gemojiRegex);
          assert.match(':u7533:', gemojiRegex);
          assert.match(':u7981:', gemojiRegex);
          assert.match(':u7a7a:', gemojiRegex);
        });

        it('should match lowercase names at the allowed length boundaries', () => {
          assert.match(':ab:', gemojiRegex);
          assert.match(':abcdefghijklmno:', gemojiRegex);
          assert.match(':smile2:', gemojiRegex);
        });

        it('should match compound names at the allowed length boundaries', () => {
          assert.match(':a_b:', gemojiRegex);
          assert.match(':abcdefghijklmn_1234567890123456:', gemojiRegex);
          assert.match(':foo_bar2_baz3:', gemojiRegex);
        });

        it('should match a gemoji within surrounding text', () => {
          assert.match('Before :smile: after', gemojiRegex);
        });
      });

      describe('invalid gemoji', () => {
        it('should not match a name without both colon delimiters', () => {
          assert.notMatch('smile:', gemojiRegex);
          assert.notMatch(':smile', gemojiRegex);
        });

        it('should not match uppercase names', () => {
          assert.notMatch(':Smile:', gemojiRegex);
          assert.notMatch(':SMILE:', gemojiRegex);
        });

        it('should not match unsupported single-letter names', () => {
          assert.notMatch(':c:', gemojiRegex);
          assert.notMatch(':z:', gemojiRegex);
        });

        it('should not match clock names containing more than four digits', () => {
          assert.notMatch(':clock12345:', gemojiRegex);
        });

        it('should not match lowercase names longer than fifteen characters', () => {
          assert.notMatch(':abcdefghijklmnop:', gemojiRegex);
        });

        it('should not match malformed compound names', () => {
          assert.notMatch(':_foo:', gemojiRegex);
          assert.notMatch(':foo_:', gemojiRegex);
          assert.notMatch(':foo__bar:', gemojiRegex);
          assert.notMatch(':abcdefghijklmno_bar:', gemojiRegex);
          assert.notMatch(':foo_12345678901234567:', gemojiRegex);
        });

        it('should not match unsupported hyphenated names', () => {
          assert.notMatch(':foo-bar:', gemojiRegex);
        });

        it('should not match unsupported Unicode button names', () => {
          assert.notMatch(':u9999:', gemojiRegex);
        });
      });
    });
  });
});
