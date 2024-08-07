import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';
import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '../StateLayer/StateLayer.stylex';
import { circularProgressIndicatorTokens } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';
import { buttonTokens } from './Button.stylex';
import { buttonStateTokens } from './Button.state.stylex';

// https://github.com/material-components/material-web/blob/main/button/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/button/internal/_elevation.scss

const halfSpinKeyframes = stylex.keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(180deg)',
  },
});

export type IButtonStylesKey = keyof typeof buttonStyles;
export const buttonStyles = stylex.create({
  host: {
    alignContent: 'center',
    borderRadius: buttonTokens.containerShape,
    cursor: 'pointer',
    display: 'inline-flex',
    outline: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative',
    fontFamily: buttonTokens.labelTextFont,
    fontSize: buttonTokens.labelTextSize,
    fontWeight: buttonTokens.labelTextWeight,
    lineHeight: buttonTokens.labelTextLineHeight,
    letterSpacing: buttonTokens.labelTextLetterSpacing,
    // Override vertical-align with shortest value "top". Vertical-align's
    // default "baseline" value causes buttons to be misaligned next to each
    // other if one button has an icon and the other does not.
    verticalAlign: 'top',

    gap: buttonTokens.gap,
    paddingInlineStart: buttonTokens.leadingSpace,
    paddingInlineEnd: buttonTokens.trailingSpace,
    // min-height instead of height so that label can wrap and expand height
    minHeight: buttonTokens.containerHeight,
    // Add extra space between label and the edge for if the label text wraps.
    // The padding added should be relative to the height of the container and
    // the height of its content on a single line (label or icon, whichever is
    // bigger).
    paddingBlock: `calc((${buttonTokens.containerHeight} - ${buttonTokens.labelTextLineHeight}) / 2)`,
    minWidth: `calc(${buttonTokens.containerMinWidth} - ${buttonTokens.leadingSpace} - ${buttonTokens.trailingSpace})`,

    [buttonStateTokens.iconColor]: {
      default: buttonTokens.iconColor,
      ':is([data-focused])': buttonTokens.iconColor$focus,
      ':is([data-hovered])': buttonTokens.iconColor$hover,
      ':is([data-pressed])': buttonTokens.iconColor$pressed,
    },
    [buttonStateTokens.elevation]: {
      default: buttonTokens.containerElevation,
      ':is([data-focused])': buttonTokens.containerElevation$focus,
      ':is([data-hovered])': buttonTokens.containerElevation$hover,
      ':is([data-pressed])': buttonTokens.containerElevation$pressed,
    },
  },
  host$disabled: {
    cursor: 'default',
    [buttonStateTokens.elevation]: buttonTokens.containerElevation$disabled,
  },
  host$loading: {
    [buttonStateTokens.elevation]: buttonTokens.containerElevation$pressed,
  },
  host$withLeadingIcon: {
    paddingInlineStart: buttonTokens.leadingIconLeadingSpace,
    paddingInlineEnd: buttonTokens.leadingIconTrailingSpace,
  },
  host$withTrailingIcon: {
    paddingInlineStart: buttonTokens.trailingIconLeadingSpace,
    paddingInlineEnd: buttonTokens.trailingIconTrailingSpace,
  },
  background: {
    backgroundColor: buttonTokens.containerColor,
  },
  background$disabled: {
    backgroundColor: buttonTokens.containerColor$disabled,
    opacity: buttonTokens.containerOpacity$disabled,
  },
  label: {
    position: 'relative',
    flexGrow: 1,
    // Long labels are cut off with ellipsis by default. `text-overflow` and
    // `text-wrap` can customize this.
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap',

    color: {
      default: buttonTokens.labelTextColor,
      ':is([data-focused])': buttonTokens.labelTextColor$focus,
      ':is([data-hovered])': buttonTokens.labelTextColor$hover,
      ':is([data-pressed])': buttonTokens.labelTextColor$pressed,
    },
  },
  label$disabled: {
    color: buttonTokens.labelTextColor$disabled,
    opacity: buttonTokens.labelTextOpacity$disabled,
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    writingMode: 'horizontal-tb',
    flexShrink: 0,
    color: buttonStateTokens.iconColor,

    fontSize: buttonTokens.iconSize,
    inlineSize: buttonTokens.iconSize,
    blockSize: buttonTokens.iconSize,
  },
  icon$disabled: {
    [buttonStateTokens.iconColor]: buttonTokens.iconColor$disabled,
    opacity: buttonTokens.iconOpacity$disabled,
  },
  icon$halfSpin: {
    animationName: halfSpinKeyframes,
    animationDuration: motionTokens.duration$long2,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  invisible: {
    visibility: 'hidden',
  },
  overlay: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifyContent: 'center',
    paddingInlineStart: buttonTokens.leadingSpace,
    paddingInlineEnd: buttonTokens.trailingSpace,
  },
  outline: {
    borderStyle: buttonTokens.outlineStyle,
    borderWidth: buttonTokens.outlineWidth,
    borderColor: {
      default: buttonTokens.outlineColor,
      ':is([data-focused])': buttonTokens.outlineColor$focus,
      ':is([data-pressed])': buttonTokens.outlineColor$pressed,
    },
  },
  outline$disabled: {
    borderColor: buttonTokens.outlineColor$disabled,
    opacity: buttonTokens.outlineOpacity$disabled,
  },
});

export const buttonStateLayerStyles = stylex.create({
  host: {
    [stateLayerTokens.color$hover]: buttonTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: buttonTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: buttonTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]: buttonTokens.stateLayerOpacity$pressed,
  },
});

export const buttonFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: buttonTokens.containerShape,
  },
});

export const buttonElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: buttonStateTokens.elevation,
  },
});

export const buttonCircularProgressIndicatorStyles = stylex.create({
  host: {
    [circularProgressIndicatorTokens.color]: buttonStateTokens.iconColor,
  },
});
