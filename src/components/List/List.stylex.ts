import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  topSpace: spacingTokens.padding$2,
  bottomSpace: spacingTokens.padding$2,
  gridSpace: spacingTokens.padding$1,
  itemSpace: '0px',
};

export const listTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const listTheme = stylex.createTheme(listTokens, vars);
