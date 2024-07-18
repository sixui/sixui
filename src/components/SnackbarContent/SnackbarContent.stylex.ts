import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';

const vars = {
  gap: '12px',
  topSpace: '14px',
  bottomSpace: '14px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  actionTrailingSpace: '8px',
  iconTrailingSpace: '12px',

  // container
  containerColor: colorSchemeTokens.onSurface,
  containerElevation: elevationTokens.boxShadow$level3,
  containerShape: shapeTokens.corner$xs,
  containerMinWidth: '288px',
  containerMinHeight: '48px',

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
