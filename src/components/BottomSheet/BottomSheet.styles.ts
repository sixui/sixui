import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { bottomSheetTokens } from './BottomSheet.stylex';

export type IBottomSheetStylesKey = keyof typeof bottomSheetStyles;
export const bottomSheetStyles = stylex.create({
  host: {
    position: 'fixed',
    bottom: 0,
    insetInline: 0,
    zIndex: zIndexTokens.modal,
  },
  bottomSheetContent: {
    marginInline: 'auto',
    width: bottomSheetTokens.containerMaxWidth,
    maxHeight: bottomSheetTokens.containerInitialMaxHeight,
  },
});
