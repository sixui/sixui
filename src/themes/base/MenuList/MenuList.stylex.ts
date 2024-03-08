import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IMenuListStyleVarKey } from '@/components/atoms/MenuList';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-menulist.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-menulist.scss

const vars: Partial<IStyleVars<IMenuListStyleVarKey>> = {
  containerColor: colorRolesVars.surfaceContainer,
  containerElevation: elevationVars.boxShadow$level2,
  containerShape: shapeVars.corner$xs,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IMenuListStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
