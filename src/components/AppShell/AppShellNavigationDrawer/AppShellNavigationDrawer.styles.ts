import stylex from '@stylexjs/stylex';
import { appShellTokens } from '../AppShell.stylex';

export type IAppShellNavigationDrawerStylesKey =
  keyof typeof appShellNavigationDrawerStyles;
export const appShellNavigationDrawerStyles = stylex.create({
  host: {
    height: '100dvh',
    width: appShellTokens.navigationDrawerWidth,
  },
});
