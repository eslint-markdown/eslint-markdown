/**
 * @fileoverview Test for `html.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { getElementsByTagName } from './html.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const html = '<p>hello world</p>';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('html', () => {
  it('should parse tag name case-insensitively', () => {
    const elements = getElementsByTagName(html, 'P');

    assert.strictEqual(elements.length, 1);
    assert.strictEqual(elements[0].tagName, 'p');
    assert.ok(elements[0].sourceCodeLocation);
  });

  it('should have `sourceCodeLocation` property', () => {
    const elements = getElementsByTagName(html, 'p');

    assert.strictEqual(elements.length, 1);
    assert.strictEqual(elements[0].tagName, 'p');
    assert.ok(elements[0].sourceCodeLocation);
  });

  it('should match multiple nested heading tags with a regex in document order', () => {
    const elements = getElementsByTagName(
      '<div><h6>Six</h6><p>Text</p><h1>One</h1></div>',
      /^h[1-6]$/,
    );

    assert.strictEqual(elements.length, 2);
    assert.strictEqual(elements[0].tagName, 'h6');
    assert.strictEqual(elements[1].tagName, 'h1');
    assert.ok(elements[0].sourceCodeLocation);
    assert.ok(elements[1].sourceCodeLocation);
  });

  it('should return no elements when a regex does not match', () => {
    const elements = getElementsByTagName(html, /^h[1-6]$/);

    assert.strictEqual(elements.length, 0);
  });

  it('should respect the case-insensitive regex flag', () => {
    const elements = getElementsByTagName(html, /^P$/i);

    assert.strictEqual(elements.length, 1);
    assert.strictEqual(elements[0].tagName, 'p');
    assert.ok(elements[0].sourceCodeLocation);
  });

  it('should keep regex matching case-sensitive without the ignore-case flag', () => {
    const elements = getElementsByTagName(html, /^P$/);

    assert.strictEqual(elements.length, 0);
  });
});
