import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { componentVars as baseComponentVars } from './IconButton.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-tonal-icon-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-tonal-icon-button.scss
const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.secondaryContainer,
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,

  // unselectedContainer
  unselectedContainerColor: colorRolesVars.surfaceContainerHighest,

  // selectedContainer
  selectedContainerColor: colorRolesVars.secondaryContainer,

  // icon
  iconColor: colorRolesVars.onSecondaryContainer,
  // &:focus
  iconColor$focus: colorRolesVars.onSecondaryContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onSecondaryContainer,

  // toggleIcon
  toggleIconColor: colorRolesVars.primary,
  // &:focus
  toggleIconColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  toggleIconColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  toggleIconColor$pressed: colorRolesVars.onSurfaceVariant,

  // toggleSelectedIcon
  toggleSelectedIconColor: colorRolesVars.onSecondaryContainer,
  // &:focus
  toggleSelectedIconColor$focus: colorRolesVars.onSecondaryContainer,
  // &:hover
  toggleSelectedIconColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  toggleSelectedIconColor$pressed: colorRolesVars.onSecondaryContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSecondaryContainer,

  // toggleStateLayer
  // &:hover
  toggleStateLayerColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  toggleStateLayerColor$pressed: colorRolesVars.onSurfaceVariant,

  // toggleSelectedStateLayer
  // &:hover
  toggleSelectedStateLayerColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  toggleSelectedStateLayerColor$pressed: colorRolesVars.onSecondaryContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
