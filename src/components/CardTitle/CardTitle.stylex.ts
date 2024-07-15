import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

const vars = {
  // headline
  headlineColor: colorRolesTokens.onSurface,
  headlineFont: typescaleTokens.titleFont$lg,
  headlineLineHeight: typescaleTokens.titleLineHeight$lg,
  headlineSize: typescaleTokens.titleSize$lg,
  headlineLetterSpacing: typescaleTokens.titleLetterSpacing$lg,
  headlineWeight: typescaleTokens.titleWeight$lg,

  // subhead
  subheadColor: colorRolesTokens.onSurface,
  subheadFont: typescaleTokens.titleFont$md,
  subheadLineHeight: typescaleTokens.titleLineHeight$md,
  subheadSize: typescaleTokens.titleSize$md,
  subheadLetterSpacing: typescaleTokens.titleLetterSpacing$md,
  subheadWeight: typescaleTokens.titleWeight$md,

  // supportingText
  supportingTextColor: colorRolesTokens.onSurfaceVariant,
  supportingTextTextFont: typescaleTokens.bodyFont$md,
  supportingTextTextLineHeight: typescaleTokens.bodyLineHeight$md,
  supportingTextTextSize: typescaleTokens.bodySize$md,
  supportingTextTextLetterSpacing: typescaleTokens.bodyLetterSpacing$md,
  supportingTextTextWeight: typescaleTokens.bodyWeight$md,
};

export const cardTitleTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardTitleTheme = stylex.createTheme(cardTitleTokens, vars);
