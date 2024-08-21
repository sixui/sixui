import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // container
  containerInset: '0px',
  detachedContainerInset: spacingTokens.padding$4,
};

export const drawerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const drawerTheme = stylex.createTheme(drawerTokens, vars);
