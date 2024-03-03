import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardStyleVarKey } from '@/components/atoms/Card';
import { componentVars as baseComponentVars } from './Card.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-card.scss

const vars: Partial<IStyleVars<ICardStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surfaceContainerHighest,
  containerElevation: elevationVars.boxShadow$level0,
  // &:disabled
  containerColor$disabled: colorRolesVars.surfaceContainerHighest,
  containerElevation$disabled: elevationVars.boxShadow$level0,
  // &:focus
  containerElevation$focus: elevationVars.boxShadow$level0,
  // &:hover
  containerElevation$hover: elevationVars.boxShadow$level1,
  // &:pressed
  containerElevation$pressed: elevationVars.boxShadow$level0,
  // &:dragged
  containerElevation$dragged: elevationVars.boxShadow$level3,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
