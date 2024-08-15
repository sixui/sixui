import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { drawerTokens } from './Drawer.stylex';

export type IDrawerStylesKey = keyof typeof drawerStyles;
export const drawerStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    zIndex: zIndexTokens.modal,
    top: 0,
    bottom: 0,
  },
  host$left: {
    left: drawerTokens.containerMargin,
  },
  host$right: {
    right: drawerTokens.containerMargin,
  },
  content: {
    maxWidth: `min(100%, ${drawerTokens.containerMaxWidth})`,
    height: `calc(${drawerTokens.containerHeight} - ${drawerTokens.containerMargin} * 2)`,
  },
});
