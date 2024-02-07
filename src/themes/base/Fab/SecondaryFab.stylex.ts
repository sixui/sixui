import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFabStyleVarKey } from '@/components/atoms/Fab';
import { componentVars as baseComponentVars } from './Fab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-secondary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-secondary.scss
const vars: Partial<IStyleVars<IFabStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.secondaryContainer,

  // loweredContainer
  loweredContainerColor: colorRolesVars.secondaryContainer,

  // icon
  iconColor: colorRolesVars.onSecondaryContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onSecondaryContainer,
  // &:focus
  iconColor$focus: colorRolesVars.onSecondaryContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onSecondaryContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSecondaryContainer,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onSecondaryContainer,

  // label
  labelTextColor: colorRolesVars.onSecondaryContainer,
  // &:hover
  labelTextColor$hover: colorRolesVars.onSecondaryContainer,
  // &:focus
  labelTextColor$focus: colorRolesVars.onSecondaryContainer,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onSecondaryContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
