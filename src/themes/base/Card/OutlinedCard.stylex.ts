import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardStyleVarKey } from '@/components/atoms/Card';
import { componentVars as baseComponentVars } from './Card.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-card.scss
const vars: Partial<IStyleVars<ICardStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surface,
  containerElevation: elevationVars.boxShadow$level0,
  // &:disabled
  containerElevation$disabled: elevationVars.boxShadow$level0,
  // &:focus
  containerElevation$focus: elevationVars.boxShadow$level0,
  // &:hover
  containerElevation$hover: elevationVars.boxShadow$level0,
  // &:pressed
  containerElevation$pressed: elevationVars.boxShadow$level0,

  // outline
  outlineColor: colorRolesVars.outlineVariant,
  outlineWidth: '1px',
  // &:disabled
  outlineColor$disabled: colorRolesVars.outline,
  outlineOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  outlineColor$focus: colorRolesVars.outlineVariant,
  // &:hover
  outlineColor$hover: colorRolesVars.outlineVariant,
  // &:pressed
  outlineColor$pressed: colorRolesVars.outlineVariant,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
