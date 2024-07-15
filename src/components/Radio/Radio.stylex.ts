import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-radio.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-radio-button.scss

const vars = {
  // icon
  iconSize: '18px',
  iconColor: colorRolesTokens.onSurfaceVariant,
  // &:disabled
  iconColor$disabled: colorRolesTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  iconColor$focus: colorRolesTokens.onSurface,
  // &:hover
  iconColor$hover: colorRolesTokens.onSurface,
  // &:pressed
  iconColor$pressed: colorRolesTokens.onSurface,

  // selectedIcon
  selectedIconColor: colorRolesTokens.primary,
  // &:disabled
  selectedIconColor$disabled: colorRolesTokens.onSurface,
  selectedIconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  selectedIconColor$focus: colorRolesTokens.primary,
  // &:hover
  selectedIconColor$hover: colorRolesTokens.primary,
  // &:pressed
  selectedIconColor$pressed: colorRolesTokens.primary,

  // stateLayer
  stateLayerSize: '40px',
  // &:hover
  stateLayerColor$hover: colorRolesTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesTokens.primary,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorRolesTokens.primary,
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorRolesTokens.onSurface,
  selectedStateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
};

export const radioTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const radioTheme = stylex.createTheme(radioTokens, vars);
