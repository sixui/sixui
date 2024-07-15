import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

const vars = {
  gap: '12px',
  topSpace: '14px',
  bottomSpace: '14px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  actionTrailingSpace: '8px',
  iconTrailingSpace: '12px',

  // container
  containerColor: colorRolesVars.onSurface,
  containerElevation: elevationTokens.boxShadow$level3,
  containerShape: shapeVars.corner$xs,
  containerMinWidth: '288px',
  containerMinHeight: '48px',

  // supportingText
  supportingTextColor: colorRolesVars.inverseOnSurface,
  supportingTextFont: typescaleVars.bodyFont$md,
  supportingTextSize: typescaleVars.bodySize$md,
  supportingTextWeight: typescaleVars.bodyWeight$md,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$md,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
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
