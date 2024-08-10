import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

const vars = {
  topSpace: spacingTokens.padding$4,
  bottomSpace: spacingTokens.padding$4,
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,
  actionTrailingSpace: spacingTokens.padding$2,
  iconTrailingSpace: spacingTokens.padding$3,

  // container
  containerColor: colorSchemeTokens.onSurface,
  containerElevation: elevationTokens.boxShadow$level3,
  containerShape: shapeTokens.corner$xs,
  containerMinWidth: `calc(288px * ${scaleTokens.scale})`,
  containerMinHeight: `calc(48px * ${scaleTokens.scale})`,

  // supportingText
  supportingTextColor: colorSchemeTokens.inverseOnSurface,
  supportingTextFont: typeScaleTokens.bodyFont$md,
  supportingTextSize: typeScaleTokens.bodySize$md,
  supportingTextWeight: typeScaleTokens.bodyWeight$md,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
};

export const snackbarContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const snackbarContentTheme = stylex.createTheme(
  snackbarContentTokens,
  vars,
);
