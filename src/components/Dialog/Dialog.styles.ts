import { dialogTokens } from './Dialog.stylex';

export type IDialogStylesKey = keyof typeof dialogStyles;
export const dialogStyles = stylex.create({
  host: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    overflow: 'auto',
  },
  dialogContent: {
    maxWidth: dialogTokens.containerMaxWidth,
    minWidth: dialogTokens.containerMinWidth,
    maxHeight: dialogTokens.containerMaxHeight,
  },
});
