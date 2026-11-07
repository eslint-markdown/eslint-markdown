/**
 * @fileoverview ESLint plugins for custom rules.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import noAbsolutePath from './no-absolute-path.js';
import noEmptyNamedBlocks from './no-empty-named-blocks.js';
import order from './order.js';
import spacedComment from './spaced-comment.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const importPlugin = {
  rules: {
    'no-absolute-path': noAbsolutePath,
    'no-empty-named-blocks': noEmptyNamedBlocks,
    order,
  },
} as const;

export const stylisticPlugin = {
  rules: {
    'spaced-comment': spacedComment,
  },
} as const;
