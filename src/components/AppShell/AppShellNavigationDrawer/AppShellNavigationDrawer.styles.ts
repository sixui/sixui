import stylex from '@stylexjs/stylex';
import { appShellTokens } from '../AppShell.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';

export type IAppShellNavigationDrawerStylesKey =
  keyof typeof appShellNavigationDrawerStyles;
export const appShellNavigationDrawerStyles = stylex.create({
  host: {
    height: '100vh',
    width: {
      default: `min(${appShellTokens.navigationDrawerWidth$expanded} * ${scaleTokens.scale}, 100vw)`,
      '@container expanded (min-width: 0)':
        appShellTokens.navigationDrawerWidth$expanded,
      '@container largeAndUp (min-width: 0)':
        appShellTokens.navigationDrawerWidth$largeAndUp,
    },
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  },
  sideSheet: {
    height: '100%',
    width: {
      default: `min(${appShellTokens.navigationDrawerWidth$expanded} * ${scaleTokens.scale}, 100vw)`,
      '@container expanded (min-width: 0)':
        appShellTokens.navigationDrawerWidth$expanded,
      '@container largeAndUp (min-width: 0)':
        appShellTokens.navigationDrawerWidth$largeAndUp,
    },
  },
});
