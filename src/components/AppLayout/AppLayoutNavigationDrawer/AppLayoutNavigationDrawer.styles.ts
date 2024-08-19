import stylex from '@stylexjs/stylex';

import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appShellTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationDrawerStylesKey =
  keyof typeof appShellNavigationDrawerStyles;
export const appShellNavigationDrawerStyles = stylex.create({
  host: {
    position: 'sticky',
    overflowX: 'hidden',
    flexShrink: 0,
    width: appShellTokens.navigationDrawerWidth,
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
    width: `min(${appShellTokens.navigationDrawerWidth}, ${appShellTokens.navigationDrawerMaxWidth})`,
    height: '100%',
  },
});
