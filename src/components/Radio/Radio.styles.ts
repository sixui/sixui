import stylex from '@stylexjs/stylex';

import { radioTokens } from './Radio.stylex';
import { stateLayerTokens } from '~/components/StateLayer/StateLayer.stylex';
import { focusRingTokens } from '~/components/FocusRing/FocusRing.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { radioStateTokens } from './Radio.state.stylex';

// https://github.com/material-components/material-web/blob/main/radio/internal/_radio.scss

const innerCircleGrowKeyframes = stylex.keyframes({
  '0%': {
    transform: 'scale(0)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

export type IRadioStylesKey = keyof typeof radioStyles;
export const radioStyles = stylex.create({
  host: {
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    width: radioTokens.iconSize,
    height: radioTokens.iconSize,
    outline: 'none',
    position: 'relative',
    verticalAlign: 'top', // Fix extra space when placed inside display: block
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',

    [radioStateTokens.stateLayerColor$hover]: radioTokens.stateLayerColor$hover,
    [radioStateTokens.stateLayerOpacity$hover]:
      radioTokens.stateLayerOpacity$hover,
    [radioStateTokens.stateLayerColor$pressed]:
      radioTokens.stateLayerColor$pressed,
    [radioStateTokens.stateLayerOpacity$pressed]:
      radioTokens.stateLayerOpacity$pressed,
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    placeContent: 'center',
    placeItems: 'center',
  },
  container$checked: {
    [radioStateTokens.stateLayerColor$hover]:
      radioTokens.selectedStateLayerColor$hover,
    [radioStateTokens.stateLayerOpacity$hover]:
      radioTokens.selectedStateLayerOpacity$hover,
    [radioStateTokens.stateLayerColor$pressed]:
      radioTokens.selectedStateLayerColor$pressed,
    [radioStateTokens.stateLayerOpacity$pressed]:
      radioTokens.selectedStateLayerOpacity$pressed,
  },
  input: {
    // <input> is also the touch target
    appearance: 'none',
    width: 48,
    height: 48,
    margin: 0,
    position: 'absolute',
    cursor: 'inherit',
  },
  icon: {
    inset: 0,
    position: 'absolute',

    fill: {
      default: radioTokens.iconColor,
      ':is([data-focused])': radioTokens.iconColor$focus,
      ':is([data-hovered])': radioTokens.iconColor$hover,
      ':is([data-pressed])': radioTokens.iconColor$pressed,
    },
  },
  icon$disabled: {
    fill: radioTokens.iconColor$disabled,
    opacity: radioTokens.iconOpacity$disabled,
  },
  icon$checked: {
    fill: {
      default: radioTokens.selectedIconColor,
      ':is([data-focused])': radioTokens.selectedIconColor$focus,
      ':is([data-hovered])': radioTokens.selectedIconColor$hover,
      ':is([data-pressed])': radioTokens.selectedIconColor$pressed,
    },
  },
  icon$checked$disabled: {
    fill: radioTokens.selectedIconColor$disabled,
    opacity: radioTokens.selectedIconOpacity$disabled,
  },
  circle$outer: {
    // Outline color enter/exit transition
    transitionProperty: 'fill',
    transitionDuration: motionTokens.duration$short1,
    transitionTimingFunction: 'linear',
  },
  circle$inner: {
    opacity: 0,
    transformOrigin: 'center',
    transitionProperty: 'opacity',
    transitionDuration: motionTokens.duration$short1,
    transitionTimingFunction: 'linear',
  },
  circle$inner$checked: {
    animationName: innerCircleGrowKeyframes,
    animationDuration: motionTokens.duration$medium2,
    animationTimingFunction: motionTokens.easing$emphasizedDecelerate,
    opacity: 1,
  },
  circle$disabled: {
    // Don't animate when disabled
    animationDuration: '0s',
    transitionDuration: '0s',
  },
});

export const radioStateLayerStyles = stylex.create({
  host: {
    borderRadius: '50%',
    width: radioTokens.stateLayerSize,
    height: radioTokens.stateLayerSize,
    inset: 'unset',

    [stateLayerTokens.color$hover]: radioStateTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: radioStateTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: radioStateTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      radioStateTokens.stateLayerOpacity$pressed,
  },
});

export const radioFocusRingStyles = stylex.create({
  host: {
    width: 44,
    height: 44,
    [focusRingTokens.shape]: shapeTokens.corner$full,
  },
  host$outward: {
    inset: 'unset',
  },
  host$inward: {
    inset: 'unset',
  },
});
