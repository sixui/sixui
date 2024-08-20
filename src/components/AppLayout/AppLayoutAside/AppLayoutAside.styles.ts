import stylex from '@stylexjs/stylex';

import { drawerTokens } from '~/components/Drawer/Drawer.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutAsideStylesKey = keyof typeof appLayoutAsideStyles;
export const appLayoutAsideStyles = stylex.create({
  host: {
    position: 'sticky',
    flexShrink: 0,
    width: appLayoutTokens.asideWidth,
    height: `calc(100vh - 2 * ${drawerTokens.containerInset} - ${appLayoutTokens.headerHeight})`,
    top: appLayoutTokens.headerHeight,
  },
  host$fullHeight: {
    height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
    top: 0,
  },
  host$collapsed: {
    pointerEvents: 'none',
  },
  sideSheet: {
    width: `min(${appLayoutTokens.asideWidth}, ${appLayoutTokens.asideMaxWidth})`,
    height: '100%',
  },
});
