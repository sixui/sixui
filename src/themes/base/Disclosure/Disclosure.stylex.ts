import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IDisclosureStyleVarKey } from '@/components/atoms/Disclosure';
import { shapeVars } from '../vars/shape.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IDisclosureStyleVarKey>> = {
  // button
  buttonContainerShape: shapeVars.corner$sm,
  buttonContainerColor: colorRolesVars.secondaryContainer,
  buttonTextColor: colorRolesVars.onSecondaryContainer,
  buttonIconColor: colorRolesVars.onSecondaryContainer,

  // panel
  panelTextColor: colorRolesVars.onSurface,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IDisclosureStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
