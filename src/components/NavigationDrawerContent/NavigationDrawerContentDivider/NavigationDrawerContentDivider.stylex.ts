import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  color: colorSchemeTokens.outline,
  space: spacingTokens.padding$2,
};

export const navigationDrawerContentDividerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const navigationDrawerContentDividerTheme = stylex.createTheme(
  navigationDrawerContentDividerTokens,
  vars,
);
