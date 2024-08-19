import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { dividerTokens } from '../Divider/Divider.stylex';
import { sideSheetContentTokens } from './SideSheetContent.stylex';

export type ISideSheetContentStylesKey = keyof typeof sideSheetContentStyles;
export const sideSheetContentStyles = stylex.create({
  host: {
    [paperBaseTokens.containerShape$topLeft]:
      sideSheetContentTokens.containerShape$topStart,
    [paperBaseTokens.containerShape$topRight]:
      sideSheetContentTokens.containerShape$topEnd,
    [paperBaseTokens.containerShape$bottomRight]:
      sideSheetContentTokens.containerShape$bottomEnd,
    [paperBaseTokens.containerShape$bottomLeft]:
      sideSheetContentTokens.containerShape$bottomStart,
    [paperBaseTokens.containerColor]: sideSheetContentTokens.containerColor,
    [paperBaseTokens.containerElevation]:
      sideSheetContentTokens.containerElevation,
  },
  host$left: {
    borderRightWidth: sideSheetContentTokens.dividerWidth,
    borderRightColor: sideSheetContentTokens.dividerColor,
    borderRightStyle: 'solid',
  },
  host$right: {
    borderLeftWidth: sideSheetContentTokens.dividerWidth,
    borderLeftColor: sideSheetContentTokens.dividerColor,
    borderLeftStyle: 'solid',
  },
  inner: {
    paddingTop: sideSheetContentTokens.containerTopSpace,
    paddingBottom: sideSheetContentTokens.containerBottomSpace,
    display: 'flex',
    flexDirection: 'column',
    gap: sideSheetContentTokens.containerGap,
    height: '100%',
  },
  header: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: sideSheetContentTokens.headerLeadingSpace,
    paddingRight: sideSheetContentTokens.headerTrailingSpace,
    gap: sideSheetContentTokens.topElementsGap,
  },
  header$withLeadingActions: {
    paddingLeft: sideSheetContentTokens.headerLeadingSpace$withIcons,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  content: {
    overflowY: 'auto',
  },
  footer: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: sideSheetContentTokens.headerLeadingSpace,
    paddingRight: sideSheetContentTokens.headerTrailingSpace,
  },
  divider: {
    [dividerTokens.color]: sideSheetContentTokens.dividerColor,
  },
});
