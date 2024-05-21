import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as baseComponentVars } from './Button.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.errorContainer,
  containerElevation: elevationVars.boxShadow$level0,
  // &:disabled
  containerColor$disabled: colorRolesVars.onErrorContainer,
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
  stateLayerColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.error,

  // label
  labelTextColor: colorRolesVars.onErrorContainer,
  // &:focus
  labelTextColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  labelTextColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onErrorContainer,

  // icon
  iconColor: colorRolesVars.onErrorContainer,
  // &:focus
  iconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onErrorContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
