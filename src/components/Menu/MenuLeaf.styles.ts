import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IMenuLeafStylesKey = keyof typeof menuLeafStyles;
export const menuLeafStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.popover,
  },
  inner: {
    // FIXME:
    display: 'flex',
    flexGrow: 1,
  },
});
