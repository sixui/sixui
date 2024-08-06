import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IDialogStylesKey = keyof typeof dialogStyles;
export const dialogStyles = stylex.create({
  host: {
    position: 'fixed',
    overflow: 'auto',
    inset: 0,

    zIndex: zIndexTokens.modal,

    display: 'grid',
    placeItems: 'center',
  },
  dialogContent: {
    maxWidth: 'min(560px, calc(100% - 48px))',
    minWidth: 280,
    maxHeight: 'min(460px, calc(100% - 48px))',
  },
});
