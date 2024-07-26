import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

const vars = {
  // caret
  caretColor: colorSchemeTokens.primary,
  // &:focus
  caretColor$focus: colorSchemeTokens.primary,
  // &:error:focus
  caretColor$error$focus: colorSchemeTokens.error,
};

export const textFieldBaseTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const textFieldBaseTheme = stylex.createTheme(textFieldBaseTokens, vars);
