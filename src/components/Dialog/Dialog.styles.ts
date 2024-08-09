import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';
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
    maxWidth: `calc(min(560px, calc(100% - 48px))  * ${scaleTokens.scale})`,
    minWidth: `calc(280px * ${scaleTokens.scale})`,
    maxHeight: `calc(min(460px, calc(100% - 48px))  * ${scaleTokens.scale})`,
  },
});
