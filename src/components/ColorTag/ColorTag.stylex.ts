import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const MIN_DENSITY = -3;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  // container
  containerMinWidth: `calc(40px * ${scaleTokens.scale})`,
  containerHeight: `calc(40px * ${scaleTokens.scale} + ${DENSITY})`,
  containerShape: shapeTokens.corner$xs,
  containerColor: colorSchemeTokens.surfaceContainerHighest,
  containerOutlineWidth: outlineTokens.width$none,
  containerOutlineColor: 'unset',
  // &:empty
  containerColor$empty: 'transparent',
  containerOutlineWidth$empty: outlineTokens.width$xs,
  containerOutlineColor$empty: colorSchemeTokens.outline,
  // &:invalid
  containerColor$invalid: 'transparent',
  containerOutlineWidth$invalid: outlineTokens.width$xs,
  containerOutlineColor$invalid: colorSchemeTokens.outline,

  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.bodyFont$md,
  labelTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  labelTextSize: typeScaleTokens.bodySize$md,
  labelTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  labelTextWeight: typeScaleTokens.bodyWeight$md,

  // icon
  iconSize: `calc(18px * ${scaleTokens.scale})`,
  iconColor: colorSchemeTokens.onSurface,
};

export const colorTagTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const colorTagTheme = stylex.createTheme(colorTagTokens, vars);
