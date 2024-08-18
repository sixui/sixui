import stylex from '@stylexjs/stylex';
import { appShellTokens } from '../AppShell.stylex';

export type IAppShellNavigationDrawerStylesKey =
  keyof typeof appShellNavigationDrawerStyles;
export const appShellNavigationDrawerStyles = stylex.create({
  host: {
    height: '100vh',
    width: `min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth})`,
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  },
  sideSheet: {
    height: '100%',
    width: `min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth})`,
  },
});
