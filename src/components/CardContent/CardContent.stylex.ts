import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,
  topSpace: spacingTokens.padding$4,
  bottomSpace: spacingTokens.padding$4,
  textColor: colorSchemeTokens.onSurface,
  // &:actionable
  leadingSpace$actionable: spacingTokens.padding$4,
  trailingSpace$actionable: spacingTokens.padding$4,
  topSpace$actionable: spacingTokens.padding$4,
  bottomSpace$actionable: spacingTokens.padding$4,
};

export const cardContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardContentTheme = stylex.createTheme(cardContentTokens, vars);
