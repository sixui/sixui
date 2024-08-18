import stylex from '@stylexjs/stylex';
import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appShellTokens } from '../AppShell.stylex';

export type IAppShellAsideStylesKey = keyof typeof appShellAsideStyles;
export const appShellAsideStyles = stylex.create({
  host: {
    width: `min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth})`,
    height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  },
  host$collapsed: {
    pointerEvents: 'none',
  },
  aside: {
    width: `min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth})`,
    height: '100%',
  },
});
