import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

const vars = {
  gap: '12px',
  topSpace: '14px',
  bottomSpace: '14px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  actionTrailingSpace: '8px',
  iconTrailingSpace: '12px',

  // container
  containerColor: colorRolesTokens.onSurface,
  containerElevation: elevationTokens.boxShadow$level3,
  containerShape: shapeTokens.corner$xs,
  containerMinWidth: '288px',
  containerMinHeight: '48px',

  // supportingText
  supportingTextColor: colorRolesTokens.inverseOnSurface,
  supportingTextFont: typescaleTokens.bodyFont$md,
  supportingTextSize: typescaleTokens.bodySize$md,
  supportingTextWeight: typescaleTokens.bodyWeight$md,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$md,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$md,
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
