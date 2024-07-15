import stylex from '@stylexjs/stylex';

import { radioTokens as vars } from './Radio.stylex';
import { componentVars as statelayerVars } from '@/themes/base/StateLayer/StateLayer.stylex';
import { focusRingTokens } from '@/components/utils/FocusRing/FocusRing.stylex';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
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
    width: vars.iconSize,
    height: vars.iconSize,
    outline: 'none',
    position: 'relative',
    verticalAlign: 'top', // Fix extra space when placed inside display: block
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',

    [radioStateTokens.stateLayerColor$hover]: vars.stateLayerColor$hover,
    [radioStateTokens.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    [radioStateTokens.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
    [radioStateTokens.stateLayerOpacity$pressed]:
      vars.stateLayerOpacity$pressed,
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
      vars.selectedStateLayerColor$hover,
    [radioStateTokens.stateLayerOpacity$hover]:
      vars.selectedStateLayerOpacity$hover,
    [radioStateTokens.stateLayerColor$pressed]:
      vars.selectedStateLayerColor$pressed,
    [radioStateTokens.stateLayerOpacity$pressed]:
      vars.selectedStateLayerOpacity$pressed,
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
      default: vars.iconColor,
      ':is([data-focused])': vars.iconColor$focus,
      ':is([data-hovered])': vars.iconColor$hover,
      ':is([data-pressed])': vars.iconColor$pressed,
    },
  },
  icon$disabled: {
    fill: vars.iconColor$disabled,
    opacity: vars.iconOpacity$disabled,
  },
  icon$checked: {
    fill: {
      default: vars.selectedIconColor,
      ':is([data-focused])': vars.selectedIconColor$focus,
      ':is([data-hovered])': vars.selectedIconColor$hover,
      ':is([data-pressed])': vars.selectedIconColor$pressed,
    },
  },
  icon$checked$disabled: {
    fill: vars.selectedIconColor$disabled,
    opacity: vars.selectedIconOpacity$disabled,
  },
  circle$outer: {
    // Outline color enter/exit transition
    transitionProperty: 'fill',
    transitionDuration: motionVars.duration$short1,
    transitionTimingFunction: 'linear',
  },
  circle$inner: {
    opacity: 0,
    transformOrigin: 'center',
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$short1,
    transitionTimingFunction: 'linear',
  },
  circle$inner$checked: {
    animationName: innerCircleGrowKeyframes,
    animationDuration: motionVars.duration$medium2,
    animationTimingFunction: motionVars.easing$emphasizedDecelerate,
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
    width: vars.stateLayerSize,
    height: vars.stateLayerSize,
    inset: 'unset',

    [statelayerVars.color$hover]: radioStateTokens.stateLayerColor$hover,
    [statelayerVars.opacity$hover]: radioStateTokens.stateLayerOpacity$hover,
    [statelayerVars.color$pressed]: radioStateTokens.stateLayerColor$pressed,
    [statelayerVars.opacity$pressed]:
      radioStateTokens.stateLayerOpacity$pressed,
  },
});

export const radioFocusRingStyles = stylex.create({
  host: {
    width: 44,
    height: 44,
    [focusRingTokens.shape]: shapeVars.corner$full,
  },
  host$outward: {
    inset: 'unset',
  },
  host$inward: {
    inset: 'unset',
  },
});
