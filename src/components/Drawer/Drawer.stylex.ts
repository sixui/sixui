import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';

const vars = {
  // container
  containerHeight: '100vh',
  containerMaxWidth: `calc(400px * ${scaleTokens.scale})`,
  containerMargin: '0px',
};

export const drawerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const drawerTheme = stylex.createTheme(drawerTokens, vars);
