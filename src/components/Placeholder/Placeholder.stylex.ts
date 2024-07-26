import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surfaceContainer,
  containerShape: shapeTokens.corner$md,

  // crosshairs
  crosshairsColor: colorSchemeTokens.surfaceContainerHighest,

  // labelText
  labelTextColor: colorSchemeTokens.onSurface,
  labelTextFont: typeScaleTokens.labelFont$sm,
  labelTextSize: typeScaleTokens.labelSize$sm,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$sm,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  labelTextWeight: typeScaleTokens.labelWeight$sm,
};

export const placeholderTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const placeholderTheme = stylex.createTheme(placeholderTokens, vars);
