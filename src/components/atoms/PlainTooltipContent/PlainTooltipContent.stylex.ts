import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

const vars = {
  topSpace: '8px',
  bottomSpace: '8px',
  leadingSpace: '8px',
  trailingSpace: '8px',

  // container
  containerColor: colorRolesVars.inverseSurface,
  containerShape: shapeVars.corner$xs,
  containerMaxWidth: '215px',
  containerMinHeight: '24px',

  // supportingText
  supportingTextColor: colorRolesVars.inverseOnSurface,
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextWeight: typescaleVars.bodyWeight$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
};

export const plainTooltipContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const plainTooltipContentTheme = stylex.createTheme(
  plainTooltipContentTokens,
  vars,
);
