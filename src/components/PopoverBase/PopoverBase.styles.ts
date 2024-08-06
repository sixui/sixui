import stylex from '@stylexjs/stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IPopoverBaseStylesKey = keyof typeof popoverBaseStyles;
export const popoverBaseStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.popover,
  },
});
