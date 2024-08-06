import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-radio.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-radio-button.scss

const vars = {
  // icon
  iconSize: '18px',
  iconColor: colorSchemeTokens.onSurfaceVariant,
  // &:disabled
  iconColor$disabled: colorSchemeTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  iconColor$focus: colorSchemeTokens.onSurface,
  // &:hover
  iconColor$hover: colorSchemeTokens.onSurface,
  // &:pressed
  iconColor$pressed: colorSchemeTokens.onSurface,

  // selectedIcon
  selectedIconColor: colorSchemeTokens.primary,
  // &:disabled
  selectedIconColor$disabled: colorSchemeTokens.onSurface,
  selectedIconOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  selectedIconColor$focus: colorSchemeTokens.primary,
  // &:hover
  selectedIconColor$hover: colorSchemeTokens.primary,
  // &:pressed
  selectedIconColor$pressed: colorSchemeTokens.primary,

  // stateLayer
  stateLayerSize: densityTokens.minTargetSize,
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.primary,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // selectedStateLayer
  // &:hover
  selectedStateLayerColor$hover: colorSchemeTokens.primary,
  selectedStateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  selectedStateLayerColor$pressed: colorSchemeTokens.onSurface,
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
