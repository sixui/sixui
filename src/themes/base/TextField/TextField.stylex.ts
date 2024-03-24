import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITextFieldStyleVarKey } from '@/components/atoms/TextField';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<ITextFieldStyleVarKey>> = {
  // caret
  caretColor: colorRolesVars.primary,
  // &:focus
  caretColor$focus: colorRolesVars.primary,
  // &:error:focus
  caretColor$error$focus: colorRolesVars.error,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ITextFieldStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
