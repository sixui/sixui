import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const MIN_DENSITY_SCALE = -3;
const MAX_DENSITY_SCALE = 2;
const DENSITY_SCALE = `${densityTokens.interval} * clamp(${densityTokens.scale}, ${MIN_DENSITY_SCALE}, ${MAX_DENSITY_SCALE})`;

const vars = {
  // container
  containerMinWidth: `calc(40px + ${DENSITY_SCALE})`,
  containerHeight: `calc(40px + ${DENSITY_SCALE})`,
  containerShape: shapeTokens.corner$xs,
  containerColor: colorSchemeTokens.surfaceContainerHighest,
  containerOutlineWidth: '0',
  containerOutlineColor: 'unset',
  // &:empty
  containerColor$empty: 'transparent',
  containerOutlineWidth$empty: '1px',
  containerOutlineColor$empty: colorSchemeTokens.outline,
  // &:invalid
  containerColor$invalid: 'transparent',
  containerOutlineWidth$invalid: '1px',
  containerOutlineColor$invalid: colorSchemeTokens.outline,

  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.bodyFont$md,
  labelTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  labelTextSize: typeScaleTokens.bodySize$md,
  labelTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  labelTextWeight: typeScaleTokens.bodyWeight$md,

  // icon
  iconSize: '18px',
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
