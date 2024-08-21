import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  // headline
  headlineTextColor: colorSchemeTokens.onSurfaceVariant,
  headlineTextFont: typeScaleTokens.titleFont$sm,
  headlineTextLineHeight: typeScaleTokens.titleLineHeight$sm,
  headlineTextSize: typeScaleTokens.titleSize$sm,
  headlineTextLetterSpacing: typeScaleTokens.titleLetterSpacing$sm,
  headlineTextWeight: typeScaleTokens.titleWeight$sm,

  // divider
  dividerColor: colorSchemeTokens.outline,
};

export const navigationDrawerContentDestinationListTokens =
  stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const navigationDrawerContentDestinationListTheme = stylex.createTheme(
  navigationDrawerContentDestinationListTokens,
  vars,
);
