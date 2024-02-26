import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISwitchStyleKey } from '@/components/atoms/Switch';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as switchStateVars } from './Switch.states.stylex';
import { componentVars as vars } from './Switch.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { motionVars } from '../vars/motion.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

// https://github.com/material-components/material-web/blob/main/switch/internal/_switch.scss
// https://github.com/material-components/material-web/blob/main/switch/internal/_track.scss
// https://github.com/material-components/material-web/blob/main/switch/internal/_handle.scss
// https://github.com/material-components/material-web/blob/main/switch/internal/_icon.scss

type ISwitchStyles = IStyles<ISwitchStyleKey>;
export const styles: MapNamespaces<ISwitchStyles> =
  stylex.create<ISwitchStyles>({
    host: {
      display: 'inline-flex',
      outline: 'none',
      verticalAlign: 'top',
      cursor: 'pointer',
    },
    host$disabled: {
      cursor: 'default',
      pointerEvents: 'none',
    },
    switch: {
      alignItems: 'center',
      display: 'inline-flex',
      flexShrink: 0, // Stop from collapsing in flex containers
      position: 'relative',
      width: vars.trackWidth,
      height: vars.trackHeight,
      borderRadius: vars.trackShape,

      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    },
    switch$selected: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.stateLayerColor$hover]:
        vars.selectedStateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.stateLayerOpacity$hover]:
        vars.selectedStateLayerOpacity$hover,
    },
    // Input is also touch target
    input: {
      appearance: 'none',
      height: 48,
      outline: 'none',
      margin: 0,
      position: 'absolute',
      width: '100%',
      zIndex: '1',
      cursor: 'inherit',
    },
    track: {
      position: 'absolute',
      width: '100%',
      height: '100%',

      borderRadius: 'inherit',

      // Center content
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    track$disabled: {
      backgroundColor: 'unset',
      borderStyle: 'unset',
    },
    track$selected$disabled: {
      backgroundClip: 'border-box',
    },
    background: {
      display: 'flex',
      position: 'absolute',
      borderRadius: 'inherit',
      transitionProperty: 'opacity, background-color',
      transitionTimingFunction: 'linear',
      transitionDuration: '67ms',
    },
    background$disabled: {
      transitionProperty: 'none',
    },
    trackBackground: {
      // Background color. Separate node for disabled opacity styles.
      width: '100%',
      height: '100%',

      backgroundColor: {
        default: vars.trackColor,
        ':is([data-focused])': vars.trackColor$focus,
        ':is([data-hovered])': vars.trackColor$hover,
        ':is([data-pressed])': vars.trackColor$pressed,
      },
      borderColor: {
        default: vars.trackOutlineColor,
        ':is([data-focused])': vars.trackOutlineColor$focus,
        ':is([data-hovered])': vars.trackOutlineColor$hover,
        ':is([data-pressed])': vars.trackOutlineColor$pressed,
      },
      borderStyle: 'solid',
      borderWidth: vars.trackOutlineWidth,
    },
    trackBackground$disabled: {
      borderColor: vars.trackOutlineColor$disabled,
      backgroundColor: vars.trackColor$disabled,
      opacity: vars.trackOpacity$disabled,

      backgroundClip: 'content-box',
    },
    trackBackground$selected: {
      backgroundColor: {
        default: vars.selectedTrackColor,
        ':is([data-focused])': vars.selectedTrackColor$focus,
        ':is([data-hovered])': vars.selectedTrackColor$hover,
        ':is([data-pressed])': vars.selectedTrackColor$pressed,
      },
      borderStyle: 'unset',
    },
    trackBackground$disabled$selected: {
      backgroundColor: vars.selectedTrackColor$disabled,
      opacity: vars.trackOpacity$disabled,
    },
    handleContainer: {
      display: 'flex',
      placeContent: 'center',
      placeItems: 'center',
      position: 'relative',
      // This easing is custom to perform the "overshoot" animation.
      transitionProperty: 'margin',
      transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      transitionDuration: '300ms',

      marginInlineEnd: `calc(${vars.trackWidth} - ${vars.trackHeight})`,
      marginInlineStart: 0,
    },
    handleContainer$selected: {
      marginInlineEnd: 0,
      marginInlineStart: `calc(${vars.trackWidth} - ${vars.trackHeight})`,
    },
    handleContainer$disabled: {
      transitionProperty: 'none',
    },
    handle: {
      borderRadius: vars.handleShape,

      transformOrigin: 'center',
      zIndex: 0,

      transitionProperty: 'width, height',
      transitionTimingFunction: {
        default: motionVars.easing$standard,
        ':is([data-pressed])': 'linear',
      },
      transitionDuration: {
        default: '250ms',
        ':is([data-pressed])': '100ms',
      },

      width: {
        default: vars.handleWidth,
        ':is([data-pressed])': vars.handleWidth$pressed,
      },
      height: {
        default: vars.handleHeight,
        ':is([data-pressed])': vars.handleHeight$pressed,
      },

      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.selectedIconTransform$on]: 'rotate(-45deg)',
    },
    handle$selected: {
      width: {
        default: vars.selectedHandleWidth,
        ':is([data-pressed])': vars.handleWidth$pressed,
      },
      height: {
        default: vars.selectedHandleHeight,
        ':is([data-pressed])': vars.handleHeight$pressed,
      },
    },
    handle$loading: {
      width: vars.selectedHandleWidth,
      height: vars.selectedHandleHeight,
    },
    handle$disabled: {
      width: vars.handleWidth,
      height: vars.handleHeight,
    },
    handle$disabled$selected: {
      width: vars.selectedHandleWidth,
      height: vars.selectedHandleHeight,
    },
    handle$withIcon: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.selectedIconTransform$on]: 'none',

      width: {
        default: vars.handleWidth$withIcon,
        ':is([data-pressed])': vars.handleWidth$pressed,
      },
      height: {
        default: vars.handleHeight$withIcon,
        ':is([data-pressed])': vars.handleHeight$pressed,
      },
    },
    handleBackground: {
      // Background color. Separate node for disabled opacity styles.
      inset: 0,

      backgroundColor: {
        default: vars.handleColor,
        ':is([data-focused])': vars.handleColor$focus,
        ':is([data-hovered])': vars.handleColor$hover,
        ':is([data-pressed])': vars.handleColor$pressed,
      },
    },
    handleBackground$selected: {
      backgroundColor: {
        default: vars.selectedHandleColor,
        ':is([data-focused])': vars.selectedHandleColor$focus,
        ':is([data-hovered])': vars.selectedHandleColor$hover,
        ':is([data-pressed])': vars.selectedHandleColor$pressed,
      },
    },
    handleBackground$disabled: {
      backgroundColor: vars.handleColor$disabled,
      opacity: vars.handleOpacity$disabled,
    },
    handleBackground$disabled$selected: {
      backgroundColor: vars.selectedHandleColor$disabled,
      opacity: vars.selectedHandleOpacity$disabled,
    },
    icons: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    icon: {
      position: 'absolute',
      inset: 0,
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fill: 'currentColor',
      transform: switchStateVars.selectedIconTransform$on,

      transitionProperty: 'fill, opacity, transform',
      transitionDuration: '67ms, 67ms, 167ms',
      transitionTimingFunction: `linear, linear, ${motionVars.easing$standard}`,

      color: switchStateVars.iconColor,
      opacity: 0,
    },
    icon$size: {
      width: vars.iconSize,
      height: vars.iconSize,
    },
    icon$size$selected: {
      width: vars.selectedIconSize,
      height: vars.selectedIconSize,
    },
    icon$on: {
      [switchStateVars.iconColor]: {
        default: vars.iconColor,
        ':is([data-focused])': vars.iconColor$focus,
        ':is([data-hovered])': vars.iconColor$hover,
        ':is([data-pressed])': vars.iconColor$pressed,
      },
      opacity: 1,
    },
    icon$on$disabled: {
      transitionProperty: 'none',

      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.iconColor]: vars.iconColor$disabled,
      opacity: vars.iconOpacity$disabled,
    },
    icon$on$selected: {
      [switchStateVars.iconColor]: {
        default: vars.selectedIconColor,
        ':is([data-focused])': vars.selectedIconColor$focus,
        ':is([data-hovered])': vars.selectedIconColor$hover,
        ':is([data-pressed])': vars.selectedIconColor$pressed,
      },
      opacity: 1,
    },
    icon$on$selected$disabled: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [switchStateVars.iconColor]: vars.selectedIconColor$disabled,
      opacity: vars.selectedIconOpacity$disabled,
    },
  });

type IRippleStyles = IStyles<IRippleStyleKey>;
export const rippleStyles: MapNamespaces<IRippleStyles> = stylex.create<
  IStyles<IRippleStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$hover]: switchStateVars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: switchStateVars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: switchStateVars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: switchStateVars.stateLayerOpacity$pressed,
    borderRadius: vars.stateLayerShape,
    width: vars.stateLayerSize,
    height: vars.stateLayerSize,
    inset: 'unset',
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: vars.trackShape,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [circularProgressIndicatorVars.color]: switchStateVars.iconColor,
    },
  });
