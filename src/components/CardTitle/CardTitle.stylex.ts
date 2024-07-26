import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  // headline
  headlineColor: colorSchemeTokens.onSurface,
  headlineFont: typeScaleTokens.titleFont$lg,
  headlineLineHeight: typeScaleTokens.titleLineHeight$lg,
  headlineSize: typeScaleTokens.titleSize$lg,
  headlineLetterSpacing: typeScaleTokens.titleLetterSpacing$lg,
  headlineWeight: typeScaleTokens.titleWeight$lg,

  // subhead
  subheadColor: colorSchemeTokens.onSurface,
  subheadFont: typeScaleTokens.titleFont$md,
  subheadLineHeight: typeScaleTokens.titleLineHeight$md,
  subheadSize: typeScaleTokens.titleSize$md,
  subheadLetterSpacing: typeScaleTokens.titleLetterSpacing$md,
  subheadWeight: typeScaleTokens.titleWeight$md,

  // supportingText
  supportingTextColor: colorSchemeTokens.onSurfaceVariant,
  supportingTextTextFont: typeScaleTokens.bodyFont$md,
  supportingTextTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  supportingTextTextSize: typeScaleTokens.bodySize$md,
  supportingTextTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  supportingTextTextWeight: typeScaleTokens.bodyWeight$md,
};

export const cardTitleTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardTitleTheme = stylex.createTheme(cardTitleTokens, vars);
