import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFabStyleVarKey } from '@/components/atoms/Fab';
import { componentVars as baseComponentVars } from './Fab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-tertiary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-tertiary.scss
const vars: Partial<IStyleVars<IFabStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.tertiaryContainer,

  // loweredContainer
  loweredContainerColor: colorRolesVars.tertiaryContainer,

  // icon
  iconColor: colorRolesVars.onTertiaryContainer,
  // &:hover
  iconColor$hover: colorRolesVars.onTertiaryContainer,
  // &:focus
  iconColor$focus: colorRolesVars.onTertiaryContainer,
  // &:pressed
  iconColor$pressed: colorRolesVars.onTertiaryContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onTertiaryContainer,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.onTertiaryContainer,

  // label
  labelTextColor: colorRolesVars.onTertiaryContainer,
  // &:hover
  labelTextColor$hover: colorRolesVars.onTertiaryContainer,
  // &:focus
  labelTextColor$focus: colorRolesVars.onTertiaryContainer,
  // &:pressed
  labelTextColor$pressed: colorRolesVars.onTertiaryContainer,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
