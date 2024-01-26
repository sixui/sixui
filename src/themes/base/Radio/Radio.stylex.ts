import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IRadioStyleVarKey } from '@/components/atoms/Radio';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-radio.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-radio-button.scss
const vars: Partial<IStyleVars<IRadioStyleVarKey>> = {
  // icon
  iconSize: '20px',
  iconColor: colorRolesVars.onSurfaceVariant,
  // &:disabled
  iconColor$disabled: colorRolesVars.onSurface,
  iconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  iconColor$focus: colorRolesVars.onSurface,
  // &:hover
  iconColor$hover: colorRolesVars.onSurface,
  // &:pressed
  iconColor$pressed: colorRolesVars.onSurface,

  // selectedIcon
  selectedIconColor: colorRolesVars.primary,
  // &:disabled
  selectedIconColor$disabled: colorRolesVars.onSurface,
  selectedIconOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  selectedIconColor$focus: colorRolesVars.primary,
  // &:hover
  selectedIconColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedIconColor$pressed: colorRolesVars.primary,

  // stateLayer
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesVars.primary,
  selectedStateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesVars.onSurface,
  selectedStateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IRadioStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
