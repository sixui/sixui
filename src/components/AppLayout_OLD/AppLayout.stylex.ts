import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';

const vars = {
  // header
  headerHeight: `calc(64px * ${scaleTokens.scale})`,

  // navigationRail
  navigationRailWidth: `calc(80px * ${scaleTokens.scale})`,

  // navigationDrawer
  standardNavigationDrawerWidth: `calc(360px * ${scaleTokens.scale})`,
  modalNavigationDrawerWidth: `min(360px * ${scaleTokens.scale}, 100vw - 48px)`,

  // aside
  standardAsideWidth: `calc(400px * ${scaleTokens.scale})`,
  modalAsideWidth: `min(400px * ${scaleTokens.scale}, 100vw - 48px)`,

  // footer
  footerHeight: `calc(64px * ${scaleTokens.scale})`,

  // divider
  dividerWidth: outlineTokens.width$xs,
  dividerColor: colorSchemeTokens.outline,
};

export const appLayoutTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const appLayoutTheme = stylex.createTheme(appLayoutTokens, vars);
