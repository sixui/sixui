import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-radio.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-radio-button.scss

const vars = {
  // icon
  iconSize: '18px',
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

export const radioTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const radioTheme = stylex.createTheme(radioTokens, vars);
