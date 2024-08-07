import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.error,
  containerShape: shapeTokens.corner$full,
  containerShape$dot: shapeTokens.corner$full,
  containerMinWidth: '16px',
  containerHeight: '16px',
  containerDotScaleX: '0.5', // 8px
  containerDotScaleY: '0.5', // 8px
  containerPadding: spacingTokens.padding$1,

  // labelText
  labelTextColor: colorSchemeTokens.onError,
  labelTextFont: typeScaleTokens.labelFont$sm,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$sm,
  labelTextSize: typeScaleTokens.labelSize$sm,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  labelTextWeight: typeScaleTokens.labelWeight$sm,
};

export const badgeTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const badgeTheme = stylex.createTheme(badgeTokens, vars);
