import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

const vars = {
  // container
  containerColor: 'inherit',
  containerElevation: 'unset',
  containerShape: shapeTokens.corner$md,
  // &:hover
  containerElevation$hover: 'unset',
  // &:focus
  containerElevation$focus: 'unset',
  // &:pressed
  containerElevation$pressed: 'unset',
  // &:dragged
  containerElevation$dragged: 'unset',
  // &:disabled
  containerElevation$disabled: 'unset',
  containerColor$disabled: 'inherit',
  containerOpacity$disabled: '0.38',

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.onSurface,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
  // &:dragged
  stateLayerColor$dragged: colorSchemeTokens.onSurface,
  stateLayerOpacity$dragged: stateTokens.stateLayerOpacity$dragged,

  // outline
  outlineColor: 'unset',
  outlineWidth: 'unset',
  // &:hover
  outlineColor$hover: 'unset',
  // &:focus
  outlineColor$focus: 'unset',
  // &:pressed
  outlineColor$pressed: 'unset',
  // &:dragged
  outlineColor$dragged: 'unset',
  // &:disabled
  outlineColor$disabled: 'unset',
  outlineOpacity$disabled: 'unset',
};

export const cardTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardTheme = stylex.createTheme(cardTokens, vars);
