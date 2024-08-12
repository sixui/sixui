import stylex from '@stylexjs/stylex';

import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { bottomSheetContentTokens } from './BottomSheetContent.stylex';

export type IBottomSheetContentStylesKey =
  keyof typeof bottomsheetcontentStyles;
export const bottomsheetcontentStyles = stylex.create({
  host: {
    [paperBaseTokens.containerColor]: bottomSheetContentTokens.containerColor,
    [paperBaseTokens.containerElevation]:
      bottomSheetContentTokens.containerElevation,
    // [paperBaseTokens.containerShape$topLeft]: bottomsheetcontentTokens.corner$xs,
    // [paperBaseTokens.containerShape$topRight]: bottomsheetcontentTokens.corner$xs,
    // [paperBaseTokens.containerShape$bottomRight]: bottomsheetcontentTokens.corner$xs,
    // [paperBaseTokens.containerShape$bottomLeft]: bottomsheetcontentTokens.corner$xs,
  },
});
