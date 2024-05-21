import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as baseComponentVars } from './Button.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-button.scss
// https://github.com/material-components/material-web/blob/main/button/internal/_outlined-button.scss

const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
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
  // &:focus
  iconColor$focus: colorRolesVars.primary,
  // &:hover
  iconColor$hover: colorRolesVars.primary,
  // &:pressed
  iconColor$pressed: colorRolesVars.primary,

  // outline
  outlineStyle: 'solid',
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
