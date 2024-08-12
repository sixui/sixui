import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { sideSheetTokens } from './SideSheet.stylex';

export type ISideSheetStylesKey = keyof typeof sideSheetStyles;
export const sideSheetStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    insetInline: 0,
    zIndex: zIndexTokens.modal,
    inset: sideSheetTokens.containerMargin,
  },
  host$left: {
    left: sideSheetTokens.containerMargin,
  },
  host$right: {
    right: sideSheetTokens.containerMargin,
  },
  sideSheetContent: {
    maxWidth: `min(100%, ${sideSheetTokens.containerMaxWidth})`,
    height: `calc(${sideSheetTokens.containerHeight} - ${sideSheetTokens.containerMargin} * 2)`,
  },
});
