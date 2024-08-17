import stylex from '@stylexjs/stylex';
import { appShellTokens } from '../AppShell.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';

export type IAppShellNavigationDrawerStylesKey =
  keyof typeof appShellNavigationDrawerStyles;
export const appShellNavigationDrawerStyles = stylex.create({
  host: {
    height: '100vh',
    width: `min(${appShellTokens.navigationDrawerWidth} * ${scaleTokens.scale}, 100vw)`,
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  },
  sideSheet: {
    height: '100%',
    width: `min(${appShellTokens.navigationDrawerWidth} * ${scaleTokens.scale}, 100vw)`,
  },
});
