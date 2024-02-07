import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { componentVars as baseComponentVars } from './IconButton.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-icon-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-icon-button.scss
const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // container
  containerColor: 'transparent',
  // &:disabled
  containerColor$disabled: 'transparent',

  // icon
  iconColor: colorRolesVars.onSurfaceVariant,
  // &:focus
  iconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  iconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  iconColor$pressed: colorRolesVars.onSurfaceVariant,

  // toggleIcon
  toggleIconColor: colorRolesVars.onSurfaceVariant,
  // &:focus
  toggleIconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  toggleIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  toggleIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // toggleSelectedIcon
  toggleSelectedIconColor: colorRolesVars.primary,
  // &:focus
  toggleSelectedIconColor$focus: colorRolesVars.primary,
  // &:hover
  toggleSelectedIconColor$hover: colorRolesVars.primary,
  // &:pressed
  toggleSelectedIconColor$pressed: colorRolesVars.primary,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesVars.primary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
