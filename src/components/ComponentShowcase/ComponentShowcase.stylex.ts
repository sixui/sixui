import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

const vars = {
  // legend
  legendTextColor: colorSchemeTokens.secondary,
  legendTextFont: typeScaleTokens.labelFont$md,
  legendTextLineHeight: typeScaleTokens.labelLineHeight$md,
  legendTextSize: typeScaleTokens.labelSize$md,
  legendTextLetterSpacing: typeScaleTokens.labelLetterSpacing$md,
  legendTextWeight: typeScaleTokens.labelWeight$md,

  // groupBorder
  groupBorderColor: colorSchemeTokens.onSurface,
};

export const componentShowcaseTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentShowcaseTheme = stylex.createTheme(
  componentShowcaseTokens,
  vars,
);
