import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardContentStyleVarKey } from '@/components/atoms/CardContent';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<ICardContentStyleVarKey>> = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace: '16px',
  bottomSpace: '16px',
  textColor: colorRolesVars.onSurface,
  // &:actionable
  leadingSpace$actionable: '16px',
  trailingSpace$actionable: '16px',
  topSpace$actionable: '16px',
  bottomSpace$actionable: '16px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ICardContentStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
