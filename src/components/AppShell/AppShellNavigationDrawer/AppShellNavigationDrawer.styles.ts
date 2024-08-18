import stylex from '@stylexjs/stylex';
import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appShellTokens } from '../AppShell.stylex';

export type IAppShellNavigationDrawerStylesKey =
  keyof typeof appShellNavigationDrawerStyles;
export const appShellNavigationDrawerStyles = stylex.create({
  host: {
    width: `min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth})`,
    height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  },
  host$collapsed: {
    pointerEvents: 'none',
  },
  sideSheet: {
    width: `min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth})`,
    height: '100%',
  },
});
