import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { dividerTokens } from '../Divider/Divider.stylex';
import { sideSheetContentTokens as tokens } from './SideSheetContent.stylex';

export type ISideSheetContentStylesKey = keyof typeof sideSheetContentStyles;
export const sideSheetContentStyles = stylex.create({
  host: {
    flexShrink: 0,
    [paperBaseTokens.containerShape$topLeft]: tokens.containerShape$topStart,
    [paperBaseTokens.containerShape$topRight]: tokens.containerShape$topEnd,
    [paperBaseTokens.containerShape$bottomRight]:
      tokens.containerShape$bottomEnd,
    [paperBaseTokens.containerShape$bottomLeft]:
      tokens.containerShape$bottomStart,
    [paperBaseTokens.containerColor]: tokens.containerColor,
    [paperBaseTokens.containerElevation]: tokens.containerElevation,
  },
  host$left: {},
  host$right: {},
  host$divider$left: {
    borderRightWidth: tokens.dividerWidth,
    borderRightColor: tokens.dividerColor,
    borderRightStyle: 'solid',
  },
  host$divider$right: {
    borderLeftWidth: tokens.dividerWidth,
    borderLeftColor: tokens.dividerColor,
    borderLeftStyle: 'solid',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    height: tokens.headerHeight,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: tokens.headerLeadingSpace,
    paddingRight: tokens.headerTrailingSpace,
    gap: tokens.topElementsGap,
  },
  header$withLeadingActions: {
    paddingLeft: tokens.headerLeadingSpace$withIcons,
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
    color: tokens.headlineColor,
    fontFamily: tokens.headlineFont,
    lineHeight: tokens.headlineLineHeight,
    fontSize: tokens.headlineSize,
    letterSpacing: tokens.headlineLetterSpacing,
    fontWeight: tokens.headlineWeight,
  },
  content: {
    overflowY: 'auto',
    paddingTop: tokens.contentTopSpace,
    paddingBottom: tokens.contentBottomSpace,
  },
  innerContent: {
    paddingLeft: spacingTokens.padding$7,
    paddingRight: spacingTokens.padding$7,
  },
  footer: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: tokens.headerLeadingSpace,
    paddingRight: tokens.headerTrailingSpace,
  },
  divider: {
    [dividerTokens.color]: tokens.dividerColor,
  },
});
