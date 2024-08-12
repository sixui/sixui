import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { dividerTokens } from '../Divider/Divider.stylex';
import { sideSheetContentTokens } from './SideSheetContent.stylex';

export type ISideSheetContentStylesKey = keyof typeof sideSheetContentStyles;
export const sideSheetContentStyles = stylex.create({
  host: {
    [paperBaseTokens.containerColor]: sideSheetContentTokens.containerColor,
    [paperBaseTokens.containerElevation]:
      sideSheetContentTokens.containerElevation,
  },
  host$left: {
    [paperBaseTokens.containerShape$topLeft]:
      sideSheetContentTokens.containerShape$topStart,
    [paperBaseTokens.containerShape$topRight]:
      sideSheetContentTokens.containerShape$topEnd,
    [paperBaseTokens.containerShape$bottomRight]:
      sideSheetContentTokens.containerShape$bottomEnd,
    [paperBaseTokens.containerShape$bottomLeft]:
      sideSheetContentTokens.containerShape$bottomStart,
    borderRightWidth: sideSheetContentTokens.dividerWidth,
    borderRightColor: sideSheetContentTokens.dividerColor,
    borderRightStyle: 'solid',
  },
  host$right: {
    [paperBaseTokens.containerShape$topLeft]:
      sideSheetContentTokens.containerShape$topEnd,
    [paperBaseTokens.containerShape$topRight]:
      sideSheetContentTokens.containerShape$topStart,
    [paperBaseTokens.containerShape$bottomRight]:
      sideSheetContentTokens.containerShape$bottomStart,
    [paperBaseTokens.containerShape$bottomLeft]:
      sideSheetContentTokens.containerShape$bottomEnd,
    borderLeftWidth: sideSheetContentTokens.dividerWidth,
    borderLeftColor: sideSheetContentTokens.dividerColor,
    borderLeftStyle: 'solid',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: sideSheetContentTokens.leadingSpace,
    paddingRight: sideSheetContentTokens.trailingSpace,
    paddingTop: sideSheetContentTokens.topSpace,
    gap: sideSheetContentTokens.topElementsGap,
  },
  header$withIcons: {
    paddingLeft: sideSheetContentTokens.leadingSpace$withIcons,
  },
  actions: {
    flexShrink: 0,
    flexGrow: 0,
    gap: spacingTokens.padding$2,
  },
  headline: {
    flexGrow: 1,
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
