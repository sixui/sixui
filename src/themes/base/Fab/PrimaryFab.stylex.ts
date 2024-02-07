import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFabStyleVarKey } from '@/components/atoms/Fab';
import { componentVars as baseComponentVars } from './Fab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-primary.scss
const vars: Partial<IStyleVars<IFabStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.primaryContainer,

  // loweredContainer
  loweredContainerColor: colorRolesVars.primaryContainer,

  // icon
  iconColor: colorRolesVars.onPrimaryContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onPrimaryContainer,
  // &:focus
  iconColor$focus: colorRolesVars.onPrimaryContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onPrimaryContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onPrimaryContainer,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onPrimaryContainer,

  // label
  labelTextColor: colorRolesVars.onPrimaryContainer,
  // &:hover
  labelTextColor$hover: colorRolesVars.onPrimaryContainer,
  // &:focus
  labelTextColor$focus: colorRolesVars.onPrimaryContainer,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onPrimaryContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
