import stylex from '@stylexjs/stylex';

import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { sideSheetContentTokens } from './SideSheetContent.stylex';
import { dividerTokens } from '../Divider/Divider.stylex';

export type ISideSheetContentStylesKey = keyof typeof sideSheetContentStyles;
export const sideSheetContentStyles = stylex.create({
  host: {
    [paperBaseTokens.containerColor]: sideSheetContentTokens.containerColor,
    [paperBaseTokens.containerElevation]:
      sideSheetContentTokens.containerElevation,
    [paperBaseTokens.containerShape$topLeft]:
      sideSheetContentTokens.containerShape$topLeft,
    [paperBaseTokens.containerShape$topRight]:
      sideSheetContentTokens.containerShape$topRight,
    [paperBaseTokens.containerShape$bottomRight]:
      sideSheetContentTokens.containerShape$bottomRight,
    [paperBaseTokens.containerShape$bottomLeft]:
      sideSheetContentTokens.containerShape$bottomLeft,
  },
  headline: {
    color: sideSheetContentTokens.headlineColor,
    fontFamily: sideSheetContentTokens.headlineFont,
    lineHeight: sideSheetContentTokens.headlineLineHeight,
    fontSize: sideSheetContentTokens.headlineSize,
    letterSpacing: sideSheetContentTokens.headlineLetterSpacing,
    fontWeight: sideSheetContentTokens.headlineWeight,
  },
  divider: {
    [dividerTokens.color]: sideSheetContentTokens.dividerColor,
  },
});
