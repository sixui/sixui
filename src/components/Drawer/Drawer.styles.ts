import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { drawerTokens } from './Drawer.stylex';
import { drawerStateTokens } from './Drawer.state.stylex';

export type IDrawerStylesKey = keyof typeof drawerStyles;
export const drawerStyles = stylex.create({
  host: {
    [drawerStateTokens.containerInset]: drawerTokens.containerInset,

    position: 'fixed',
    zIndex: zIndexTokens.modal,
    height: `calc(100vh - 2 * ${drawerStateTokens.containerInset})`,
  },
  host$detached: {
    [drawerStateTokens.containerInset]: drawerTokens.detachedContainerInset,
  },
  host$vertical: {
    top: drawerStateTokens.containerInset,
    bottom: drawerStateTokens.containerInset,
  },
  host$horizontal: {
    left: drawerStateTokens.containerInset,
    right: drawerStateTokens.containerInset,
  },
  host$left: {
    left: drawerStateTokens.containerInset,
  },
  host$right: {
    right: drawerStateTokens.containerInset,
  },
  host$top: {
    top: drawerStateTokens.containerInset,
  },
  host$bottom: {
    bottom: drawerStateTokens.containerInset,
  },
  content: {
    display: 'flex',
    height: '100%',
    flexGrow: 1,
  },
});
