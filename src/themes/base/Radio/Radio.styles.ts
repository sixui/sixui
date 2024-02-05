import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IRadioStyleKey } from '@/components/atoms/Radio';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Radio.stylex';
import { componentVars as radioStateVars } from './Radio.states.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { motionVars } from '../vars/motion.stylex';
import { shapeVars } from '../vars/shape.stylex';

const innerCircleGrowKeyframes = stylex.keyframes({
  '0%': {
    transform: 'scale(0)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

// https://github.com/material-components/material-web/blob/main/radio/internal/_radio.scss
type IRadioStyles = IStyles<IRadioStyleKey>;
export const styles: MapNamespaces<IRadioStyles> = stylex.create<IRadioStyles>({
  host: {
    display: 'inline',
    width: vars.iconSize,
    height: vars.iconSize,
    outline: 'none',
    position: 'relative',
    verticalAlign: 'top', // Fix extra space when placed inside display: block
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',

    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerOpacity$pressed]: vars.stateLayerOpacity$pressed,
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
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerColor$hover]: vars.selectedStateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerOpacity$hover]:
      vars.selectedStateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerColor$pressed]:
      vars.selectedStateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [radioStateVars.stateLayerOpacity$pressed]:
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

type IRippleStyles = IStyles<IRippleStyleKey>;
export const rippleStyles: MapNamespaces<IRippleStyles> = stylex.create<
  IStyles<IRippleStyleKey>
>({
  host: {
    borderRadius: '50%',
    width: vars.stateLayerSize,
    height: vars.stateLayerSize,
    inset: 'unset',

    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$hover]: radioStateVars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: radioStateVars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: radioStateVars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: radioStateVars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    width: 44,
    height: 44,
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: shapeVars.corner$full,
  },
  host$outward: {
    inset: 'unset',
  },
  host$inward: {
    inset: 'unset',
  },
});
