import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

const vars = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace: '16px',
  bottomSpace: '16px',
  textColor: colorSchemeTokens.onSurface,
  // &:actionable
  leadingSpace$actionable: '16px',
  trailingSpace$actionable: '16px',
  topSpace$actionable: '16px',
  bottomSpace$actionable: '16px',
};

export const cardContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const cardContentTheme = stylex.createTheme(cardContentTokens, vars);
