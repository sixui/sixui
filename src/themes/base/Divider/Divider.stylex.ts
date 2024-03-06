import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IDividerStyleVarKey } from '@/components/atoms/Divider';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-divider.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-divider.scss
const vars: Partial<IStyleVars<IDividerStyleVarKey>> = {
  color: colorRolesVars.outlineVariant,
  thickness: '1px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IDividerStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
