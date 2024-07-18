import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

const vars = {
  // container
  containerColor: 'unset',
  containerShape: shapeTokens.corner$full,
  // &:disabled
  containerColor$disabled: 'unset',
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // labelText
  labelTextColor: colorSchemeTokens.primary,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,

  // stateLayer
  stateLayerSpace: '1em',
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.onSurface,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // touchTarget
  touchTargetSpace: 'max(1em, 16px)',

  // focusRing
  focusRingOutwardOffset: '3px',
};

export const fluidButtonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const fluidButtonTheme = stylex.createTheme(fluidButtonTokens, vars);
