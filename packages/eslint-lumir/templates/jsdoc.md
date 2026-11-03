# JSDoc Template

Every file under `eslint-lumir/src/rules` directory should follow the format below.

```ts
/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed on XXX.
 *   - @see link-to-the-website
 *
 * - The best practices outlined in `XXX`.
 *   - @see link-to-the-website
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Linter } from 'eslint';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const rules = {
  /**
   * Descriptions from the official documentation.
   * @description Additional descriptions provided by the maintainers if needed.
   * @see link-to-the-website (other references, e.g., airbnb, prettier, etc.)
   * @see link-to-the-website (other references, e.g., airbnb, prettier, etc.)
   */
  'rule-name': 'value',
} as const satisfies Linter.RulesRecord;
```
