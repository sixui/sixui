import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { modalSideSheetTokens } from './ModalSideSheet.stylex';

export type IModalSideSheetStylesKey = keyof typeof modalSideSheetStyles;
export const modalSideSheetStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    zIndex: zIndexTokens.modal,
    // inset: modalSideSheetTokens.containerMargin,
    top: 0,
    bottom: 0,
  },
  host$left: {
    left: modalSideSheetTokens.containerMargin,
  },
  host$right: {
    right: modalSideSheetTokens.containerMargin,
  },
  modalSideSheetContent: {
    maxWidth: `min(100%, ${modalSideSheetTokens.containerMaxWidth})`,
    height: `calc(${modalSideSheetTokens.containerHeight} - ${modalSideSheetTokens.containerMargin} * 2)`,
  },
});
