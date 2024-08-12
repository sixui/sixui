import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { dialogTokens } from './Dialog.stylex';

export type IDialogStylesKey = keyof typeof dialogStyles;
export const dialogStyles = stylex.create({
  host: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    overflow: 'auto',
    zIndex: zIndexTokens.modal,
  },
  dialogContent: {
    maxWidth: dialogTokens.containerMaxWidth,
    minWidth: dialogTokens.containerMinWidth,
    maxHeight: dialogTokens.containerMaxHeight,
  },
});
