import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';

const vars = {
  // legend
  legendTextColor: colorRolesTokens.secondary,
  legendTextFont: typescaleTokens.labelFont$md,
  legendTextLineHeight: typescaleTokens.labelLineHeight$md,
  legendTextSize: typescaleTokens.labelSize$md,
  legendTextLetterSpacing: typescaleTokens.labelLetterSpacing$md,
  legendTextWeight: typescaleTokens.labelWeight$md,

  // groupBorder
  groupBorderColor: colorRolesTokens.onSurface,
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
