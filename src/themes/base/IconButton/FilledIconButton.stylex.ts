import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { componentVars as baseComponentVars } from './IconButton.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

//https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-icon-button.scss
//https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-icon-button.scss
const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.primary,
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,

  // unselectedContainer
  unselectedContainerColor: colorRolesVars.surfaceContainerHighest,

  // selectedContainer
  selectedContainerColor: colorRolesVars.primary,

  // icon
  iconColor: colorRolesVars.onPrimary,
  // &:focus
  iconColor$focus: colorRolesVars.onPrimary,
  // &:hover
  iconColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  iconColor$pressed: colorRolesVars.onPrimary,

  // toggleIcon
  toggleIconColor: colorRolesVars.primary,
  // &:focus
  toggleIconColor$focus: colorRolesVars.primary,
  // &:hover
  toggleIconColor$hover: colorRolesVars.primary,
  // &:pressed
  toggleIconColor$pressed: colorRolesVars.primary,

  // toggleSelectedIcon
  toggleSelectedIconColor: colorRolesVars.onPrimary,
  // &:focus
  toggleSelectedIconColor$focus: colorRolesVars.onPrimary,
  // &:hover
  toggleSelectedIconColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  toggleSelectedIconColor$pressed: colorRolesVars.onPrimary,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onPrimary,

  // toggleStateLayer
  // &:hover
  toggleStateLayerColor$hover: colorRolesVars.primary,
  // &:pressed
  toggleStateLayerColor$pressed: colorRolesVars.primary,

  // toggleSelectedStateLayer
  // &:hover
  toggleSelectedStateLayerColor$hover: colorRolesVars.onPrimary,
  // &:pressed
  toggleSelectedStateLayerColor$pressed: colorRolesVars.onPrimary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
