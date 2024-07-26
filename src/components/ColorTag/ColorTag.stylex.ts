import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  emptyCrosshairsColor: colorSchemeTokens.outline,

  // container
  containerMinWidth: '40px',
  containerHeight: '40px',
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
