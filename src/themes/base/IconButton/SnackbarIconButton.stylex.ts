import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { componentVars as baseComponentVars } from './IconButton.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // container
  containerWidth: '32px',
  containerHeight: '32px',
  containerColor: 'transparent',
  // &:disabled
  containerColor$disabled: 'transparent',

  // unselectedContainer
  unselectedContainerColor: 'transparent',

  // selectedContainer
  selectedContainerColor: 'transparent',

  // icon
  iconSize: '24px',
  iconColor: colorRolesVars.inverseOnSurface,
  // &:focus
  iconColor$focus: colorRolesVars.inverseOnSurface,
  // &:hover
  iconColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  iconColor$pressed: colorRolesVars.inverseOnSurface,
  // &:disabled
  iconColor$disabled: colorRolesVars.inverseOnSurface,

  // toggleIcon
  toggleIconColor: colorRolesVars.inverseOnSurface,
  // &:focus
  toggleIconColor$focus: colorRolesVars.inverseOnSurface,
  // &:hover
  toggleIconColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  toggleIconColor$pressed: colorRolesVars.inverseOnSurface,

  // toggleSelectedIcon
  toggleSelectedIconColor: colorRolesVars.inverseOnSurface,
  // &:focus
  toggleSelectedIconColor$focus: colorRolesVars.inverseOnSurface,
  // &:hover
  toggleSelectedIconColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  toggleSelectedIconColor$pressed: colorRolesVars.inverseOnSurface,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.inverseOnSurface,

  // toggleStateLayer
  // &:hover
  toggleStateLayerColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  toggleStateLayerColor$pressed: colorRolesVars.inverseOnSurface,

  // toggleSelectedStateLayer
  // &:hover
  toggleSelectedStateLayerColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  toggleSelectedStateLayerColor$pressed: colorRolesVars.inverseOnSurface,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
