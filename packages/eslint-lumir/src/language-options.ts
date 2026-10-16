/**
 * @fileoverview ESLint language options.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import globalsModule from 'globals';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const globals = {
  ...globalsModule.browser,
  ...globalsModule.builtin,
  ...globalsModule.es2026,
  ...globalsModule.node,
  // Browser Web Speech APIs which are not yet supported by `globals`: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
  webkitSpeechRecognition: false,
} as const;

export const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
} as const;
