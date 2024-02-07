import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IPaperStyleVarKey } from '@/components/atoms/Paper';
import { componentVars as baseComponentVars } from './Paper.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-Paper.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-Paper.scss
const vars: Partial<IStyleVars<IPaperStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surface,
  containerElevation: elevationVars.boxShadow$level0,

  // outline
  outlineColor: colorRolesVars.outlineVariant,
  outlineWidth: '1px',
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
