import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';

const vars = {
  // header
  headerHeight: `calc(64px * ${scaleTokens.scale})`,

  // navigationRail
  navigationRailWidth: `calc(80px * ${scaleTokens.scale})`,

  // navigationDrawer
  navigationDrawerMaxWidth: '100vw - 48px',
  navigationDrawerWidth: `calc(360px * ${scaleTokens.scale})`,

  // aside
  asideMaxWidth: '100vw - 48px',
  asideWidth: `calc(360px * ${scaleTokens.scale})`,

  // footer
  footerHeight: `calc(64px * ${scaleTokens.scale})`,
};

export const appLayoutTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const appLayoutTheme = stylex.createTheme(appLayoutTokens, vars);
