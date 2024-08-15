import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { modalSideSheetTokens } from './ModalSideSheet.stylex';

export type IModalSideSheetStylesKey = keyof typeof modalSideSheetStyles;
export const modalSideSheetStyles = stylex.create({
  host: {
    display: 'flex',
    position: 'fixed',
    insetInline: 0,
    zIndex: zIndexTokens.modal,
    inset: modalSideSheetTokens.containerMargin,
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
