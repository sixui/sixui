import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';

const vars = {
  // container
  containerMinWidth: '40px',
  containerHeight: '40px',
  containerColor: colorSchemeTokens.surfaceContainerHighest,
  containerShape: shapeTokens.corner$xs,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorSchemeTokens.onSurface,
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.labelFont$md,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$md,
  labelTextSize: typeScaleTokens.labelSize$md,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$md,
  labelTextWeight: typeScaleTokens.labelWeight$md,

  // icon
  iconSize: '18px',
  iconColor: colorSchemeTokens.onSurface,
};

export const colorButtonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const colorButtonTheme = stylex.createTheme(colorButtonTokens, vars);
