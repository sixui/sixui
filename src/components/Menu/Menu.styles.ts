import stylex from '@stylexjs/stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IMenuStylesKey = keyof typeof menuStyles;
export const menuStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.popover,
  },
  inner: {
    display: 'flex',
    flexGrow: 1,
  },
});
