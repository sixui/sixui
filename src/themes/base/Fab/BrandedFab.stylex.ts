import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFabStyleVarKey } from '@/components/atoms/Fab';
import { componentVars as baseComponentVars } from './Fab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-branded.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-branded.scss

const vars: Partial<IStyleVars<IFabStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surfaceContainerHigh,

  // loweredContainer
  loweredContainerColor: colorRolesVars.surfaceContainerLow,

  // icon
  iconSize$md: '36px',
  iconSize$lg: '48px',

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.primary,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,

  // label
  labelTextColor: colorRolesVars.primary,
  // &:hover
  labelTextColor$hover: colorRolesVars.primary,
  // &:focus
  labelTextColor$focus: colorRolesVars.primary,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.primary,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
