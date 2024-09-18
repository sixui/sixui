import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surfaceContainerHighest,
  containerShape: shapeTokens.corner$xs,
  containerShape$hover: shapeTokens.corner$xs,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorSchemeTokens.onSurface,
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
  iconSize: `calc(18px * ${scaleTokens.scale})`,
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
