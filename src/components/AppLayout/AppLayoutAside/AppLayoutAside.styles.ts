import stylex from '@stylexjs/stylex';

import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appShellTokens } from '../AppLayout.stylex';

export type IAppLayoutAsideStylesKey = keyof typeof appShellAsideStyles;
export const appShellAsideStyles = stylex.create({
  host: {
    position: 'sticky',
    flexShrink: 0,
    width: appShellTokens.asideWidth,
    height: `calc(100vh - 2 * ${drawerTokens.containerInset} - ${appShellTokens.headerHeight})`,
    top: appShellTokens.headerHeight,
  },
  host$fullHeight: {
    height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
    top: 0,
  },
  host$collapsed: {
    pointerEvents: 'none',
  },
  sideSheet: {
    width: `min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth})`,
    height: '100%',
  },
});
