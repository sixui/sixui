import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as baseComponentVars } from './Button.stylex';
import { shapeVars } from '../vars/shape.stylex';

// https://m3.material.io/components/snackbar/specs

const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  leadingIconLeadingSpace: '12px',
  leadingIconTrailingSpace: '16px',
  trailingIconLeadingSpace: '16px',
  trailingIconTrailingSpace: '12px',

  // touch
  touchTargetSpace: '12px',

  // container
  containerHeight: '32px',
  containerColor: 'transparent',
  containerShape: shapeVars.corner$xs,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.inversePrimary,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.inversePrimary,

  // label
  labelTextColor: colorRolesVars.inversePrimary,
  // &:focus
  labelTextColor$focus: colorRolesVars.inversePrimary,
  // &:hover
  labelTextColor$hover: colorRolesVars.inversePrimary,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.inversePrimary,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.inversePrimary,

  // withIcon
  iconColor: colorRolesVars.inversePrimary,
  // &:focus
  iconColor$focus: colorRolesVars.inversePrimary,
  // &:hover
  iconColor$hover: colorRolesVars.inversePrimary,
  // &:pressed
  iconColor$pressed: colorRolesVars.inversePrimary,
  // &:disabled
  iconColor$disabled: colorRolesVars.inversePrimary,

  // outline
  outlineColor: colorRolesVars.outline,
  outlineWidth: '1px',
  // &:pressed
  outlineColor$pressed: colorRolesVars.outline,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
