import stylex from '@stylexjs/stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IPopoverBaseStylesKey = keyof typeof popoverBaseStyles;
export const popoverBaseStyles = stylex.create({
  floating: {
    zIndex: zIndexTokens.popover,
    width: 'inherit',
    height: 'inherit',
  },
  floating$absolute: {
    position: 'absolute',
  },
  floating$fixed: {
    position: 'fixed',
  },
});
