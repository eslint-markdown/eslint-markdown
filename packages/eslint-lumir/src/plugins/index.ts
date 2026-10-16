/**
 * @fileoverview ESLint plugins for custom rules.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Rule } from 'eslint';
import spacedComment from './spaced-comment.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const stylistic = {
  rules: {
    'spaced-comment': spacedComment as Rule.RuleModule,
  },
} as const;
