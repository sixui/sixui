import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as baseComponentVars } from './Button.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-tonal-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-tonal-button.scss
const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.secondaryContainer,
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
  stateLayerColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSecondaryContainer,

  // label
  labelTextColor: colorRolesVars.onSecondaryContainer,
  // &:focus
  labelTextColor$focus: colorRolesVars.onSecondaryContainer,
  // &:hover
  labelTextColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onSecondaryContainer,

  // icon
  iconColor: colorRolesVars.onSecondaryContainer,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  // &:focus
  iconColor$focus: colorRolesVars.onSecondaryContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onSecondaryContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
