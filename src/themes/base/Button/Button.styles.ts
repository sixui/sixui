import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IButtonStyleKey } from '@/components/atoms/Button';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './Button.stylex';
import { componentVars as buttonStateVars } from './Button.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

const halfSpinKeyframes = stylex.keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(180deg)',
  },
});

// https://github.com/material-components/material-web/blob/main/button/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/button/internal/_elevation.scss
type IButtonStyles = IStyles<IButtonStyleKey>;
export const styles: MapNamespaces<IButtonStyles> =
  stylex.create<IButtonStyles>({
    host: {
      borderRadius: vars.containerShape,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-flex',
      outline: 'none',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      justifyItems: 'center',
      position: 'relative',
      fontFamily: vars.labelTextFont,
      fontSize: vars.labelTextSize,
      lineHeight: vars.labelTextLineHeight,
      fontWeight: vars.labelTextWeight,
      // Long labels are cut off with ellipsis by default. `text-overflow` and
      // `text-wrap` can customize this.
      textOverflow: 'ellipsis',
      textWrap: 'nowrap',
      userSelect: 'none',
      // Override vertical-align with shortest value "top". Vertical-align's
      // default "baseline" value causes buttons to be misaligned next to each
      // other if one button has an icon and the other does not.
      verticalAlign: 'top',

      gap: vars.gap,
      paddingInlineStart: vars.leadingSpace,
      paddingInlineEnd: vars.trailingSpace,
      // min-height instead of height so that label can wrap and expand height
      minHeight: vars.containerHeight,
      // Add extra space between label and the edge for if the label text wraps.
      // The padding added should be relative to the height of the container and
      // the height of its content on a single line (label or icon, whichever is
      // bigger).
      paddingBlock: `calc((${vars.containerHeight} - ${vars.labelTextLineHeight}) / 2)`,
      minWidth: `calc(64px - ${vars.leadingSpace} - ${vars.trailingSpace})`,

      [buttonStateVars.iconColor]: {
        default: vars.iconColor,
        ':is([data-focused])': vars.iconColor$focus,
        ':is([data-hovered])': vars.iconColor$hover,
        ':is([data-pressed])': vars.iconColor$pressed,
      },
      [buttonStateVars.elevation]: {
        default: vars.containerElevation,
        ':is([data-focused])': vars.containerElevation$focus,
        ':is([data-hovered])': vars.containerElevation$hover,
        ':is([data-pressed])': vars.containerElevation$pressed,
      },
    },
    host$disabled: {
      cursor: 'default',
      pointerEvents: 'none',
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonStateVars.elevation]: vars.containerElevation$disabled,
    },
    host$withLeadingIcon: {
      paddingInlineStart: vars.leadingIconLeadingSpace,
      paddingInlineEnd: vars.leadingIconTrailingSpace,
    },
    host$withTrailingIcon: {
      paddingInlineStart: vars.trailingIconLeadingSpace,
      paddingInlineEnd: vars.trailingIconTrailingSpace,
    },
    button: {
      borderRadius: 'inherit',
      cursor: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'unset',
      outline: 'none',
      verticalAlign: 'middle',
      backgroundColor: 'unset',
      textDecoration: 'none',
      font: 'inherit',
      padding: 0,
      // Place content on top of elevation and ripple
      zIndex: 0,
      width: '100%',
      height: '100%',
      gap: 'inherit',
    },
    touchTarget: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      transform: 'translateY(-50%)',

      height: vars.touchHeight,
    },
    background: {
      // Background color. Separate node for disabled opacity styles.
      backgroundColor: vars.containerColor,
      borderRadius: 'inherit',
      inset: 0,
      position: 'absolute',
    },
    background$disabled: {
      backgroundColor: vars.containerColor$disabled,
      opacity: vars.containerOpacity$disabled,
    },
    label: {
      overflow: 'hidden',

      color: {
        default: vars.labelTextColor,
        ':is([data-focused])': vars.labelTextColor$focus,
        ':is([data-hovered])': vars.labelTextColor$hover,
        ':is([data-pressed])': vars.labelTextColor$pressed,
      },
    },
    label$disabled: {
      color: vars.labelTextColor$disabled,
      opacity: vars.labelTextOpacity$disabled,
    },
    icon: {
      display: 'inline-flex',
      position: 'relative',
      writingMode: 'horizontal-tb',
      flexShrink: 0,
      color: buttonStateVars.iconColor,

      fontSize: vars.iconSize,
      inlineSize: vars.iconSize,
      blockSize: vars.iconSize,
    },
    icon$disabled: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonStateVars.iconColor]: vars.iconColor$disabled,
      opacity: vars.iconOpacity$disabled,
    },
    icon$halfSpin: {
      animationName: halfSpinKeyframes,
      animationDuration: '0.5s',
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
    },
  });

type IRippleStyles = IStyles<IRippleStyleKey>;
export const rippleStyles: MapNamespaces<IRippleStyles> = stylex.create<
  IStyles<IRippleStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: vars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: vars.containerShape,
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [elevationVars.boxShadow]: buttonStateVars.elevation,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [circularProgressIndicatorVars.color]: buttonStateVars.iconColor,
    },
  });
