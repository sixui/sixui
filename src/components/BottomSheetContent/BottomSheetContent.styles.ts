import stylex from '@stylexjs/stylex';

import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { bottomSheetContentTokens } from './BottomSheetContent.stylex';

export type IBottomSheetContentStylesKey =
  keyof typeof bottomSheetContentStyles;
export const bottomSheetContentStyles = stylex.create({
  host: {
    [paperBaseTokens.containerColor]: bottomSheetContentTokens.containerColor,
    [paperBaseTokens.containerElevation]:
      bottomSheetContentTokens.containerElevation,
    [paperBaseTokens.containerShape$topLeft]:
      bottomSheetContentTokens.containerShape$topLeft,
    [paperBaseTokens.containerShape$topRight]:
      bottomSheetContentTokens.containerShape$topRight,
    [paperBaseTokens.containerShape$bottomRight]:
      bottomSheetContentTokens.containerShape$bottomRight,
    [paperBaseTokens.containerShape$bottomLeft]:
      bottomSheetContentTokens.containerShape$bottomLeft,
  },
  dragHandle: {
    paddingTop: bottomSheetContentTokens.dragHandleTopSpace,
    height: bottomSheetContentTokens.dragHandleHeight,
  },
});
