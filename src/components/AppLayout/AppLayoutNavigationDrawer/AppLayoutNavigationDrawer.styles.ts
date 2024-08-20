import stylex from '@stylexjs/stylex';

import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationDrawerStylesKey =
  keyof typeof appLayoutNavigationDrawerStyles;
export const appLayoutNavigationDrawerStyles = stylex.create({
  host: {
    height: `calc(100vh - ${appLayoutTokens.headerHeight} - 2 * ${drawerTokens.containerInset})`,
    position: 'sticky',
    flexShrink: 0,
    width: appLayoutTokens.navigationDrawerWidth,
    top: appLayoutTokens.headerHeight,
  },
  host$fullHeight: {
    height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
    top: 0,
  },
  sideSheet: {
    width: `min(${appLayoutTokens.navigationDrawerWidth}, ${appLayoutTokens.navigationDrawerMaxWidth})`,
    height: '100%',
  },
});
