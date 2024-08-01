import stylex from '@stylexjs/stylex';

import { dialogContentTokens } from './DialogContent.stylex';

// https://github.com/material-components/material-web/blob/main/dialog/internal/_dialog.scss

export type IDialogContentStylesKey = keyof typeof dialogContentStyles;
export const dialogContentStyles = stylex.create({
  host: {
    borderRadius: dialogContentTokens.containerShape,
    display: 'contents',
    height: 'fit-content',
    width: 'min-content',
  },
  dialog: {
    background: 'transparent',
    borderStyle: 'unset',
    borderRadius: 'inherit',
    flexDirection: 'column',
    height: 'inherit',
    margin: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    outline: 'none',
    overflow: 'visible',
    padding: 0,
    width: 'inherit',
    display: 'flex',
  },
  container: {
    borderRadius: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    // Safari won't show content with "flex: 1", but container needs to grow if
    // height is set on the dialog, so use flex-grow instead.
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    transformOrigin: 'top',

    '::before': {
      background: dialogContentTokens.containerColor,
      borderRadius: 'inherit',
      content: '',
      inset: 0,
      position: 'absolute',
    },
  },
  header: {
    alignItems: 'center',
    color: dialogContentTokens.headlineColor,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: dialogContentTokens.headlineFont,
    fontSize: dialogContentTokens.headlineSize,
    fontWeight: dialogContentTokens.headlineWeight,
    lineHeight: dialogContentTokens.headlineLineHeight,
    letterSpacing: dialogContentTokens.headlineLetterSpacing,
    position: 'relative',
  },
  headline: {
    alignSelf: 'stretch',
    // unset: all
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    margin: 0,
  },
  headlineSlot: {
    alignItems: 'center',
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    gap: 8,
    paddingTop: 24,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
  },
  headlineSlot$scrollable: {
    paddingBottom: 16,
  },
  headlineSlot$hasIcon: {
    justifyContent: 'center',
    paddingTop: 16,
  },
  icon: {
    display: 'flex',
  },
  iconSlot: {
    color: dialogContentTokens.iconColor,
    fill: 'currentColor',
    fontSize: dialogContentTokens.iconSize,
    marginTop: 24,
    height: dialogContentTokens.iconSize,
    width: dialogContentTokens.iconSize,
  },
  scroller: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0.0%',
    flexDirection: 'column',
    overflow: 'hidden',
    // Needed to display scrollbars on Chrome linux. Also needs to be > 0 so
    // that content that is `position: fixed` in the content can render above
    // the actions bar.
    zIndex: 1,
  },
  scroller$scrollable: {
    // Only add scrollbars if the content is overflowing. This prevents extra
    // space from appearing on platforms that reserve scrollbar space.
    // Note: we only scroll vertically. Horizontal scrolling should be handled
    // by the content.
    overflowY: 'scroll',
  },
  content: {
    color: dialogContentTokens.supportingTextColor,
    fontFamily: dialogContentTokens.supportingTextFont,
    fontSize: dialogContentTokens.supportingTextSize,
    fontWeight: dialogContentTokens.supportingTextWeight,
    letterSpacing: dialogContentTokens.supportingTextLetterSpacing,
    height: 'min-content', // Needed for Safari
    position: 'relative',
  },
  contentSlot: {
    boxSizing: 'border-box',
    paddingLeft: 24,
    paddingTop: 24,
    paddingRight: 24,
  },
  contentSlot$hasHeadline: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  contentSlot$scrollable: {
    paddingBottom: 8,
  },
  contentSlot$scrollable$hasHeadline: {
    paddingTop: 8,
  },
  footer: {
    position: 'relative',
    paddingBottom: 24,
  },
  footer$hasActions: {
    paddingBottom: 0,
  },
  actions: {
    boxSizing: 'border-box',
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end',
    paddingTop: 16,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
  },
  divider: {
    display: 'none',
    position: 'absolute',
  },
  headlineDivider: {
    bottom: 0,
  },
  headlineDivider$showTopDivider: {
    display: 'flex',
  },
  actionsDivider: {
    top: 0,
  },
  actionsDivide$showBottomDivider: {
    display: 'flex',
  },
});
