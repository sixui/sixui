import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-icon-button.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-icon-button.scss

const vars = {
  // container
  containerColor: 'unset',
  containerWidth: '40px',
  containerHeight: '40px',
  containerShape: shapeTokens.corner$full,
  // &:disabled
  containerColor$disabled: 'unset',
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // selectedContainer
  selectedContainerColor: 'unset',

  // unselectedContainer
  unselectedContainerColor: 'unset',

  // icon
  iconColor: 'inherit',
  iconSize: '18px',
  // &:hover
  iconColor$hover: 'inherit',
  // &:focus
  iconColor$focus: 'inherit',
  // &:pressed
  iconColor$pressed: 'inherit',
  // &:disabled
  iconColor$disabled: colorSchemeTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,

  // toggleIcon
  toggleIconColor: 'inherit',
  // &:hover
  toggleIconColor$hover: 'inherit',
  // &:focus
  toggleIconColor$focus: 'inherit',
  // &:pressed
  toggleIconColor$pressed: 'inherit',

  // toggleSelectedIcon
  toggleSelectedIconColor: 'inherit',
  // &:hover
  toggleSelectedIconColor$hover: 'inherit',
  // &:focus
  toggleSelectedIconColor$focus: 'inherit',
  // &:pressed
  toggleSelectedIconColor$pressed: 'inherit',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // toggleStateLayer
  // &:hover
  toggleStateLayerColor$hover: 'unset',
  // &:pressed
  toggleStateLayerColor$pressed: 'unset',

  // toggleSelectedStateLayer
  // &:hover
  toggleSelectedStateLayerColor$hover: 'unset',
  // &:pressed
  toggleSelectedStateLayerColor$pressed: 'unset',

  // outline
  outlineStyle: 'unset',
  outlineWidth: 'unset',
  outlineColor: 'unset',
  // &:focus
  outlineColor$focus: 'unset',
  // &:pressed
  outlineColor$pressed: 'unset',
  // &:disabled
  outlineColor$disabled: 'unset',
  outlineOpacity$disabled: stateTokens.outlineOpacity$disabled,
};

export const iconButtonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const iconButtonTheme = stylex.createTheme(iconButtonTokens, vars);
