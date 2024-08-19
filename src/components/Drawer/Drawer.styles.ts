import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { drawerTokens } from './Drawer.stylex';

export type IDrawerStylesKey = keyof typeof drawerStyles;
export const drawerStyles = stylex.create({
  host: {
    position: 'fixed',
    zIndex: zIndexTokens.modal,
    height: `calc(100vh - 2 * ${drawerTokens.containerInset})`,
  },
  host$vertical: {
    top: drawerTokens.containerInset,
    bottom: drawerTokens.containerInset,
  },
  host$horizontal: {
    left: drawerTokens.containerInset,
    right: drawerTokens.containerInset,
  },
  host$left: {
    left: drawerTokens.containerInset,
  },
  host$right: {
    right: drawerTokens.containerInset,
  },
  host$top: {
    top: drawerTokens.containerInset,
  },
  host$bottom: {
    bottom: drawerTokens.containerInset,
  },
  content: {
    display: 'flex',
    height: '100%',
    flexGrow: 1,
  },
});
