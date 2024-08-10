import stylex from '@stylexjs/stylex';

import { elevationTokens } from '../Elevation/Elevation.stylex';
import { snackbarContentTokens } from './SnackbarContent.stylex';
import { snackbarContentStateTokens } from './SnackbarContent.state.stylex';

export type ISnackbarContentStylesKey = keyof typeof snackbarContentStyles;
export const snackbarContentStyles = stylex.create({
  host: {
    position: 'relative',
    paddingTop: snackbarContentTokens.topSpace,
    paddingBottom: snackbarContentTokens.bottomSpace,
    paddingLeft: snackbarContentTokens.leadingSpace,
    paddingRight: snackbarContentTokens.trailingSpace,
    backgroundColor: snackbarContentTokens.containerColor,
    [snackbarContentStateTokens.elevation]:
      snackbarContentTokens.containerElevation,
    borderRadius: snackbarContentTokens.containerShape,
    minHeight: snackbarContentTokens.containerMinHeight,
    flexGrow: {
      default: 'initial',
      '@media (max-width: 600px)': 1,
    },
    minWidth: {
      default: snackbarContentTokens.containerMinWidth,
      '@media (max-width: 600px)': 'unset',
    },
  },
  host$trailingAction: {
    paddingRight: snackbarContentTokens.actionTrailingSpace,
  },
  host$trailingIcon: {
    paddingRight: snackbarContentTokens.iconTrailingSpace,
  },
  supportingText: {
    flexGrow: 1,
    color: snackbarContentTokens.supportingTextColor,
    fontFamily: snackbarContentTokens.supportingTextFont,
    fontSize: snackbarContentTokens.supportingTextSize,
    fontWeight: snackbarContentTokens.supportingTextWeight,
    lineHeight: snackbarContentTokens.supportingTextLineHeight,
    letterSpacing: snackbarContentTokens.supportingTextLetterSpacing,
  },
  actions: {
    marginLeft: 'auto',
    alignItems: 'center',
    height: snackbarContentTokens.supportingTextLineHeight,
  },
});

export const snackbarContentElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: snackbarContentStateTokens.elevation,
  },
});
