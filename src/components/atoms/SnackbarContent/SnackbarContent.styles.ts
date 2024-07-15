import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { snackbarContentTokens as vars } from './SnackbarContent.stylex';
import { snackbarContentStateTokens } from './SnackbarContent.state.stylex';

export type ISnackbarContentStylesKey = keyof typeof snackbarContentStyles;
export const snackbarContentStyles = stylex.create({
  host: {
    gap: vars.gap,
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
    paddingLeft: vars.leadingSpace,
    paddingRight: vars.trailingSpace,
    backgroundColor: vars.containerColor,
    [snackbarContentStateTokens.elevation]: vars.containerElevation,
    borderRadius: vars.containerShape,
    minHeight: vars.containerMinHeight,
    flexGrow: {
      default: 'initial',
      '@media (max-width: 600px)': 1,
    },
    minWidth: {
      default: vars.containerMinWidth,
      '@media (max-width: 600px)': 'unset',
    },
  },
  host$trailingAction: {
    paddingRight: vars.actionTrailingSpace,
  },
  host$trailingIcon: {
    paddingRight: vars.iconTrailingSpace,
  },
  supportingText: {
    flexGrow: 1,
    color: vars.supportingTextColor,
    fontFamily: vars.supportingTextFont,
    fontSize: vars.supportingTextSize,
    fontWeight: vars.supportingTextWeight,
    lineHeight: vars.supportingTextLineHeight,
    letterSpacing: vars.supportingTextLetterSpacing,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: vars.gap,
    alignItems: 'center',
    height: vars.supportingTextLineHeight,
  },
});

export const snackbarContentElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: snackbarContentStateTokens.elevation,
  },
});
