import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

const vars = {
  // headline
  headlineColor: colorRolesVars.onSurface,
  headlineFont: typescaleVars.titleFont$lg,
  headlineLineHeight: typescaleVars.titleLineHeight$lg,
  headlineSize: typescaleVars.titleSize$lg,
  headlineLetterSpacing: typescaleVars.titleLetterSpacing$lg,
  headlineWeight: typescaleVars.titleWeight$lg,

  // subhead
  subheadColor: colorRolesVars.onSurface,
  subheadFont: typescaleVars.titleFont$md,
  subheadLineHeight: typescaleVars.titleLineHeight$md,
  subheadSize: typescaleVars.titleSize$md,
  subheadLetterSpacing: typescaleVars.titleLetterSpacing$md,
  subheadWeight: typescaleVars.titleWeight$md,

  // supportingText
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextTextFont: typescaleVars.bodyFont$md,
  supportingTextTextLineHeight: typescaleVars.bodyLineHeight$md,
  supportingTextTextSize: typescaleVars.bodySize$md,
  supportingTextTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
  supportingTextTextWeight: typescaleVars.bodyWeight$md,
};

export const cardTitleTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardTitleTheme = stylex.createTheme(cardTitleTokens, vars);
