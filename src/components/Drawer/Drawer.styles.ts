import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IDrawerStylesKey = keyof typeof drawerStyles;
export const drawerStyles = stylex.create({
  host: {
    position: 'fixed',
    display: 'flex',
    zIndex: zIndexTokens.modal,
  },
  host$horizontal: {
    top: 0,
    bottom: 0,
  },
  host$vertical: {
    left: 0,
    right: 0,
  },
  host$left: {
    left: 0,
  },
  host$right: {
    right: 0,
  },
  host$top: {
    top: 0,
  },
  host$bottom: {
    bottom: 0,
  },
  outOfScreen: {
    position: 'absolute',
    left: '-9999px',
  },
});
