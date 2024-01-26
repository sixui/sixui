import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { componentVars as baseComponentVars } from './Button.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-elevated-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-elevated-button.scss
const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surfaceContainerLow,
  containerElevation: elevationVars.boxShadow$level1,
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerElevation$disabled: elevationVars.boxShadow$level0,
  containerOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  containerElevation$focus: elevationVars.boxShadow$level1,
  // &:hover
  containerElevation$hover: elevationVars.boxShadow$level2,
  // &:pressed
  containerElevation$pressed: elevationVars.boxShadow$level1,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.primary,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,

  // label
  labelTextColor: colorRolesVars.primary,
  // &:focus
  labelTextColor$focus: colorRolesVars.primary,
  // &:hover
  labelTextColor$hover: colorRolesVars.primary,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.primary,

  // icon
  iconColor: colorRolesVars.primary,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  // &:focus
  iconColor$focus: colorRolesVars.primary,
  // &:hover
  iconColor$hover: colorRolesVars.primary,
  // &:pressed
  iconColor$pressed: colorRolesVars.primary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
