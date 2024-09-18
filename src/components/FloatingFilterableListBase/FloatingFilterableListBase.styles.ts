import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IFloatingFilterableListBaseStylesKey =
  keyof typeof floatingFilterableListBaseStyles;
export const floatingFilterableListBaseStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.popover,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
});
