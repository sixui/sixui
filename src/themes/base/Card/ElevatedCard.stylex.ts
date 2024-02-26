import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardStyleVarKey } from '@/components/atoms/Card';
import { componentVars as baseComponentVars } from './Card.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-elevated-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-elevated-card.scss

const vars: Partial<IStyleVars<ICardStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surfaceContainerLow,
  containerElevation: elevationVars.boxShadow$level1,
  // &:disabled
  containerColor$disabled: colorRolesVars.surface,
  containerElevation$disabled: elevationVars.boxShadow$level1,
  // &:focus
  containerElevation$focus: elevationVars.boxShadow$level1,
  // &:hover
  containerElevation$hover: elevationVars.boxShadow$level2,
  // &:pressed
  containerElevation$pressed: elevationVars.boxShadow$level1,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
