import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const vars = {
  // caret
  caretColor: colorRolesVars.primary,
  // &:focus
  caretColor$focus: colorRolesVars.primary,
  // &:error:focus
  caretColor$error$focus: colorRolesVars.error,
};

export const textFieldBaseTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const textFieldBaseTheme = stylex.createTheme(textFieldBaseTokens, vars);
