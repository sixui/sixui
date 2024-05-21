import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { componentVars as baseComponentVars } from './IconButton.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.errorContainer,
  // &:disabled
  containerColor$disabled: colorRolesVars.onErrorContainer,

  // unselectedContainer
  unselectedContainerColor: colorRolesVars.surfaceContainerHighest,

  // selectedContainer
  selectedContainerColor: colorRolesVars.errorContainer,

  // icon
  iconColor: colorRolesVars.onErrorContainer,
  // &:focus
  iconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onErrorContainer,

  // toggleIcon
  toggleIconColor: colorRolesVars.onErrorContainer,
  // &:focus
  toggleIconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  toggleIconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  toggleIconColor$pressed: colorRolesVars.onErrorContainer,

  // toggleSelectedIcon
  toggleSelectedIconColor: colorRolesVars.onErrorContainer,
  // &:focus
  toggleSelectedIconColor$focus: colorRolesVars.onErrorContainer,
  // &:hover
  toggleSelectedIconColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  toggleSelectedIconColor$pressed: colorRolesVars.onErrorContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onErrorContainer,

  // toggleStateLayer
  // &:hover
  toggleStateLayerColor$hover: colorRolesVars.error,
  // &:pressed
  toggleStateLayerColor$pressed: colorRolesVars.error,

  // toggleSelectedStateLayer
  // &:hover
  toggleSelectedStateLayerColor$hover: colorRolesVars.onErrorContainer,
  // &:pressed
  toggleSelectedStateLayerColor$pressed: colorRolesVars.onErrorContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
