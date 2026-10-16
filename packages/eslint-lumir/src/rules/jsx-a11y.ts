/**
 * @fileoverview This file follows:
 *
 * - The order of the rules listed on `eslint-plugin-jsx-a11y`.
 *   - @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#supported-rules
 *
 * - The best practices outlined in `eslint-config-airbnb@19.0.4`.
 *   - @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js
 *
 * - I've set almost every `'error'` rules to `'warn'` because I don't want to enforce them.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint, Linter } from 'eslint';
import jsxA11yPluginModule from 'eslint-plugin-jsx-a11y';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const jsxA11yPlugin: { 'jsx-a11y': ESLint.Plugin } = {
  'jsx-a11y': jsxA11yPluginModule,
};

export const jsxA11yRules = {
  /**
   * Enforce all elements that require alternative text have meaningful information to relay back to end user.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L21-L27
   */
  'jsx-a11y/alt-text': 'warn',

  /**
   * Enforce `<a>` text to not exactly match "click here", "here", "link", or "a link".
   * @description This rule is not included in `airbnb-base`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-ambiguous-text.md
   */
  'jsx-a11y/anchor-ambiguous-text': 'off',

  /**
   * Enforce all anchors to contain accessible content.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L31
   */
  'jsx-a11y/anchor-has-content': 'warn',

  /**
   * Enforce all anchors are valid, navigable elements.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L35-L39
   */
  'jsx-a11y/anchor-is-valid': [
    'warn',
    {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    },
  ],

  /**
   * Enforce elements with `aria-activedescendant` are tabbable.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L43
   */
  'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',

  /**
   * Enforce all `aria-*` props are valid.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L47
   */
  'jsx-a11y/aria-props': 'error',

  /**
   * Enforce ARIA state and property values are valid.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L51
   */
  'jsx-a11y/aria-proptypes': 'error',

  /**
   * Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L55
   */
  'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],

  /**
   * Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L60
   */
  'jsx-a11y/aria-unsupported-elements': 'error',

  /**
   * Enforce that autocomplete attributes are used correctly.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L64-L66
   */
  'jsx-a11y/autocomplete-valid': 'off',

  /**
   * Enforce a clickable non-interactive element has at least one keyboard event listener.
   * @description I've set this rule to `'off'`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L70
   */
  'jsx-a11y/click-events-have-key-events': 'off',

  /**
   * Enforce that a control (an interactive element) has a text label.
   * @description I've set this rule to `'off'`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L74-L99
   */
  'jsx-a11y/control-has-associated-label': 'off',

  /**
   * Enforce heading (`h1`, `h2`, etc) elements contain accessible content.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L103
   */
  'jsx-a11y/heading-has-content': 'error',

  /**
   * Enforce `<html>` element has lang prop.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/html-has-lang.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L107
   */
  'jsx-a11y/html-has-lang': 'warn',

  /**
   * Enforce iframe elements have a title attribute.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L111
   */
  'jsx-a11y/iframe-has-title': 'warn',

  /**
   * Enforce `<img>` alt prop does not contain the word "image", "picture", or "photo".
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L115
   */
  'jsx-a11y/img-redundant-alt': 'warn',

  /**
   * Enforce that elements with interactive handlers like `onClick` must be focusable.
   * @description I've set this rule to `'off'`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L119
   */
  'jsx-a11y/interactive-supports-focus': 'off',

  /**
   * Enforce that a `label` tag has a text label and an associated control.
   * @description I've set this rule to `'off'`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L123-L129
   */
  'jsx-a11y/label-has-associated-control': 'off',

  /**
   * Enforce `lang` attribute has a valid value.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/lang.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L133
   */
  'jsx-a11y/lang': 'error',

  /**
   * Enforces that `<audio>` and `<video>` elements must have a `<track>` for captions.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L137-L141
   */
  'jsx-a11y/media-has-caption': 'warn',

  /**
   * Enforce that `onMouseOver`/`onMouseOut` are accompanied by `onFocus`/`onBlur` for keyboard-only users.
   * @description I've set this rule to `'off'`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L145
   */
  'jsx-a11y/mouse-events-have-key-events': 'off',

  /**
   * Enforce that the `accessKey` prop is not used on any element to avoid complications with keyboard commands used by a screen reader.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L149
   */
  'jsx-a11y/no-access-key': 'warn',

  /**
   * Disallow `aria-hidden="true"` from being set on focusable elements.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-aria-hidden-on-focusable.md
   */
  'jsx-a11y/no-aria-hidden-on-focusable': 'warn',

  /**
   * Enforce `autoFocus` prop is not enabled.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L153
   */
  'jsx-a11y/no-autofocus': ['warn', { ignoreNonDOM: true }],

  /**
   * Enforce distracting elements are not used.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L157-L159
   */
  'jsx-a11y/no-distracting-elements': 'error',

  /**
   * Interactive elements should not be assigned non-interactive roles.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L163-L165
   */
  'jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',

  /**
   * Non-interactive elements should not be assigned mouse or keyboard event listeners.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L169-L178
   */
  'jsx-a11y/no-noninteractive-element-interactions': 'warn',

  /**
   * Non-interactive elements should not be assigned interactive roles.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L182-L188
   */
  'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',

  /**
   * `tabIndex` should only be declared on interactive elements.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L192-L195
   */
  'jsx-a11y/no-noninteractive-tabindex': 'warn',

  /**
   * Enforce explicit role property is not the same as implicit/default role property on element.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L203
   */
  'jsx-a11y/no-redundant-roles': 'error',

  /**
   * Enforce that non-interactive, visible elements (such as `<div>`) that have click handlers use the role attribute.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L207-L216
   */
  'jsx-a11y/no-static-element-interactions': 'warn',

  /**
   * Enforces using semantic DOM elements over the ARIA `role` property.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/prefer-tag-over-role.md
   */
  'jsx-a11y/prefer-tag-over-role': 'off',

  /**
   * Enforce that elements with ARIA roles must have all required attributes for that role.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L221
   */
  'jsx-a11y/role-has-required-aria-props': 'warn',

  /**
   * Enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L226
   */
  'jsx-a11y/role-supports-aria-props': 'warn',

  /**
   * Enforce `scope` prop is only used on `<th>` elements.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L230
   */
  'jsx-a11y/scope': 'warn',

  /**
   * Enforce `tabIndex` value is not greater than zero.
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md
   * @see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js#L234
   */
  'jsx-a11y/tabindex-no-positive': 'warn',
} as const satisfies Linter.RulesRecord;
