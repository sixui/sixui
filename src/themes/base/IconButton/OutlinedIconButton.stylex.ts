import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleVarKey } from '@/components/atoms/IconButton';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';
import { componentVars as baseComponentVars } from './IconButton.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-icon-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-icon-button.scss

const vars: Partial<IStyleVars<IIconButtonStyleVarKey>> = {
  // selectedContainer
  selectedContainerColor: colorRolesVars.inverseSurface,

  // outline
  outlineStyle: 'solid',
  outlineWidth: '1px',
  outlineColor: colorRolesVars.outline,
  // &:disabled
  outlineColor$disabled: colorRolesVars.onSurface,
  outlineOpacity$disabled: stateVars.outlineOpacity$disabled,
  // &:focus
  outlineColor$focus: colorRolesVars.outline,
  // &:pressed
  outlineColor$pressed: colorRolesVars.outline,

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
  toggleSelectedIconColor: colorRolesVars.inverseOnSurface,
  // &:focus
  toggleSelectedIconColor$focus: colorRolesVars.inverseOnSurface,
  // &:hover
  toggleSelectedIconColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  toggleSelectedIconColor$pressed: colorRolesVars.inverseOnSurface,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSurfaceVariant,

  // toggleStateLayer
  // &:hover
  toggleStateLayerColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  toggleStateLayerColor$pressed: colorRolesVars.onSurfaceVariant,

  // toggleSelectedStateLayer
  // &:hover
  toggleSelectedStateLayerColor$hover: colorRolesVars.inverseOnSurface,
  // &:pressed
  toggleSelectedStateLayerColor$pressed: colorRolesVars.inverseOnSurface,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
