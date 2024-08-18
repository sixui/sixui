import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // navigationDrawer
  navigationDrawerMaxWidth: '100vw - 48px',
  navigationDrawerWidth: `calc(360px * ${scaleTokens.scale})`,

  // aside
  asideMaxWidth: '100vw - 48px',
  asideWidth: `calc(360px * ${scaleTokens.scale})`,

  // FIXME: in spacing tokens?
  windowHorizontalSpace$compact: spacingTokens.padding$4,
  windowHorizontalSpace$medium: spacingTokens.padding$6,
  windowHorizontalSpace$expanded: spacingTokens.padding$6,
  windowHorizontalSpace$large: spacingTokens.padding$6,
  windowHorizontalSpace$extraLarge: spacingTokens.padding$6,
};

export const appShellTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const appShellTheme = stylex.createTheme(appShellTokens, vars);
