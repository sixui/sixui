import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IScrimStyleVarKey } from '@/components/atoms/Scrim';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IScrimStyleVarKey>> = {
  containerColor$darken: `color-mix(in srgb, ${colorRolesVars.scrim} 50%, transparent)`,
  containerColor$lighten: `rgba(255, 255, 255, 0.5)`,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IScrimStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
