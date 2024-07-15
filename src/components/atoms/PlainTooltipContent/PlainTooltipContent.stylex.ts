import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

const vars = {
  topSpace: '8px',
  bottomSpace: '8px',
  leadingSpace: '8px',
  trailingSpace: '8px',

  // container
  containerColor: colorRolesTokens.inverseSurface,
  containerShape: shapeTokens.corner$xs,
  containerMaxWidth: '215px',
  containerMinHeight: '24px',

  // supportingText
  supportingTextColor: colorRolesTokens.inverseOnSurface,
  supportingTextFont: typescaleTokens.bodyFont$sm,
  supportingTextSize: typescaleTokens.bodySize$sm,
  supportingTextWeight: typescaleTokens.bodyWeight$sm,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
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
