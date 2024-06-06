import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as baseComponentVars } from './Button.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-button.scss

const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.primary,
  containerElevation: elevationVars.boxShadow$level0,
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerElevation$disabled: elevationVars.boxShadow$level0,
  containerOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  containerElevation$focus: elevationVars.boxShadow$level0,
  // &:hover
  containerElevation$hover: elevationVars.boxShadow$level1,
  // &:pressed
  containerElevation$pressed: elevationVars.boxShadow$level0,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onPrimary,

  // labelText
  labelTextColor: colorRolesVars.onPrimary,
  // &:focus
  labelTextColor$focus: colorRolesVars.onPrimary,
  // &:hover
  labelTextColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onPrimary,

  // icon
  iconColor: colorRolesVars.onPrimary,
  // &:focus
  iconColor$focus: colorRolesVars.onPrimary,
  // &:hover
  iconColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  iconColor$pressed: colorRolesVars.onPrimary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
