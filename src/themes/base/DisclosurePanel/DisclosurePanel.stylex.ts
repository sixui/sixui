import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IDisclosurePanelStyleVarKey } from '@/components/atoms/DisclosurePanel';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IDisclosurePanelStyleVarKey>> = {
  textColor: colorRolesVars.onSurface,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IDisclosurePanelStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
