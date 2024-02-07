import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { componentVars as baseComponentVars } from '@/themes/base/Button/Button.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

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

  // label
  labelTextColor: colorRolesVars.onPrimary,
  // &:focus
  labelTextColor$focus: colorRolesVars.onPrimary,
  // &:hover
  labelTextColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onPrimary,

  // icon
  iconColor: colorRolesVars.onPrimary,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  // &:focus
  iconColor$focus: colorRolesVars.onPrimary,
  // &:hover
  iconColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  iconColor$pressed: colorRolesVars.onPrimary,

  containerShape: shapeVars.corner$none,
};

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(baseComponentVars, vars);
