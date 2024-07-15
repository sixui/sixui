import stylex from '@stylexjs/stylex';

import { circularProgressIndicatorTokens } from '@/components/atoms/CircularProgressIndicator/CircularProgressIndicator.stylex';
import { stateLayerTokens } from '@/components/utils/StateLayer/StateLayer.stylex';
import { focusRingTokens } from '@/components/utils/FocusRing/FocusRing.stylex';
import { motionTokens } from '@/themes/base/tokens/motion.stylex';
import { switchStateTokens } from './Switch.state.stylex';
import { switchTokens } from './Switch.stylex';

// https://github.com/material-components/material-web/blob/main/switch/internal/_switch.scss
// https://github.com/material-components/material-web/blob/main/switch/internal/_track.scss
// https://github.com/material-components/material-web/blob/main/switch/internal/_handle.scss
// https://github.com/material-components/material-web/blob/main/switch/internal/_icon.scss

export type ISwitchStylesKey = keyof typeof switchStyles;
export const switchStyles = stylex.create({
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
    width: switchTokens.trackWidth,
    height: switchTokens.trackHeight,
    borderRadius: switchTokens.trackShape,

    [switchStateTokens.stateLayerColor$hover]:
      switchTokens.stateLayerColor$hover,
    [switchStateTokens.stateLayerOpacity$hover]:
      switchTokens.stateLayerOpacity$hover,
  },
  switch$selected: {
    [switchStateTokens.stateLayerColor$hover]:
      switchTokens.selectedStateLayerColor$hover,
    [switchStateTokens.stateLayerOpacity$hover]:
      switchTokens.selectedStateLayerOpacity$hover,
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
      default: switchTokens.trackColor,
      ':is([data-focused])': switchTokens.trackColor$focus,
      ':is([data-hovered])': switchTokens.trackColor$hover,
      ':is([data-pressed])': switchTokens.trackColor$pressed,
    },
    borderColor: {
      default: switchTokens.trackOutlineColor,
      ':is([data-focused])': switchTokens.trackOutlineColor$focus,
      ':is([data-hovered])': switchTokens.trackOutlineColor$hover,
      ':is([data-pressed])': switchTokens.trackOutlineColor$pressed,
    },
    borderStyle: 'solid',
    borderWidth: switchTokens.trackOutlineWidth,
  },
  trackBackground$disabled: {
    borderColor: switchTokens.trackOutlineColor$disabled,
    backgroundColor: switchTokens.trackColor$disabled,
    opacity: switchTokens.trackOpacity$disabled,

    backgroundClip: 'content-box',
  },
  trackBackground$selected: {
    backgroundColor: {
      default: switchTokens.selectedTrackColor,
      ':is([data-focused])': switchTokens.selectedTrackColor$focus,
      ':is([data-hovered])': switchTokens.selectedTrackColor$hover,
      ':is([data-pressed])': switchTokens.selectedTrackColor$pressed,
    },
    borderStyle: 'unset',
  },
  trackBackground$disabled$selected: {
    backgroundColor: switchTokens.selectedTrackColor$disabled,
    opacity: switchTokens.trackOpacity$disabled,
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

    marginInlineEnd: `calc(${switchTokens.trackWidth} - ${switchTokens.trackHeight})`,
    marginInlineStart: 0,
  },
  handleContainer$selected: {
    marginInlineEnd: 0,
    marginInlineStart: `calc(${switchTokens.trackWidth} - ${switchTokens.trackHeight})`,
  },
  handleContainer$disabled: {
    transitionProperty: 'none',
  },
  handle: {
    borderRadius: switchTokens.handleShape,

    transformOrigin: 'center',
    zIndex: 0,

    transitionProperty: 'width, height',
    transitionTimingFunction: {
      default: motionTokens.easing$standard,
      ':is([data-pressed])': 'linear',
    },
    transitionDuration: {
      default: '250ms',
      ':is([data-pressed])': '100ms',
    },

    width: {
      default: switchTokens.handleWidth,
      ':is([data-pressed])': switchTokens.handleWidth$pressed,
    },
    height: {
      default: switchTokens.handleHeight,
      ':is([data-pressed])': switchTokens.handleHeight$pressed,
    },

    [switchStateTokens.selectedIconTransform$on]: 'rotate(-45deg)',
  },
  handle$selected: {
    width: {
      default: switchTokens.selectedHandleWidth,
      ':is([data-pressed])': switchTokens.handleWidth$pressed,
    },
    height: {
      default: switchTokens.selectedHandleHeight,
      ':is([data-pressed])': switchTokens.handleHeight$pressed,
    },
  },
  handle$loading: {
    width: switchTokens.selectedHandleWidth,
    height: switchTokens.selectedHandleHeight,
  },
  handle$disabled: {
    width: switchTokens.handleWidth,
    height: switchTokens.handleHeight,
  },
  handle$disabled$selected: {
    width: switchTokens.selectedHandleWidth,
    height: switchTokens.selectedHandleHeight,
  },
  handle$withIcon: {
    [switchStateTokens.selectedIconTransform$on]: 'none',

    width: {
      default: switchTokens.handleWidth$withIcon,
      ':is([data-pressed])': switchTokens.handleWidth$pressed,
    },
    height: {
      default: switchTokens.handleHeight$withIcon,
      ':is([data-pressed])': switchTokens.handleHeight$pressed,
    },
  },
  handleBackground: {
    // Background color. Separate node for disabled opacity styles.
    inset: 0,

    backgroundColor: {
      default: switchTokens.handleColor,
      ':is([data-focused])': switchTokens.handleColor$focus,
      ':is([data-hovered])': switchTokens.handleColor$hover,
      ':is([data-pressed])': switchTokens.handleColor$pressed,
    },
  },
  handleBackground$selected: {
    backgroundColor: {
      default: switchTokens.selectedHandleColor,
      ':is([data-focused])': switchTokens.selectedHandleColor$focus,
      ':is([data-hovered])': switchTokens.selectedHandleColor$hover,
      ':is([data-pressed])': switchTokens.selectedHandleColor$pressed,
    },
  },
  handleBackground$disabled: {
    backgroundColor: switchTokens.handleColor$disabled,
    opacity: switchTokens.handleOpacity$disabled,
  },
  handleBackground$disabled$selected: {
    backgroundColor: switchTokens.selectedHandleColor$disabled,
    opacity: switchTokens.selectedHandleOpacity$disabled,
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
    transform: switchStateTokens.selectedIconTransform$on,

    transitionProperty: 'fill, opacity, transform',
    transitionDuration: '67ms, 67ms, 167ms',
    transitionTimingFunction: `linear, linear, ${motionTokens.easing$standard}`,

    color: switchStateTokens.iconColor,
    opacity: 0,
  },
  icon$size: {
    fontSize: switchTokens.iconSize,
    width: switchTokens.iconSize,
    height: switchTokens.iconSize,
  },
  icon$size$selected: {
    fontSize: switchTokens.selectedIconSize,
    width: switchTokens.selectedIconSize,
    height: switchTokens.selectedIconSize,
  },
  icon$on: {
    [switchStateTokens.iconColor]: {
      default: switchTokens.iconColor,
      ':is([data-focused])': switchTokens.iconColor$focus,
      ':is([data-hovered])': switchTokens.iconColor$hover,
      ':is([data-pressed])': switchTokens.iconColor$pressed,
    },
    opacity: 1,
  },
  icon$on$disabled: {
    transitionProperty: 'none',

    [switchStateTokens.iconColor]: switchTokens.iconColor$disabled,
    opacity: switchTokens.iconOpacity$disabled,
  },
  icon$on$selected: {
    [switchStateTokens.iconColor]: {
      default: switchTokens.selectedIconColor,
      ':is([data-focused])': switchTokens.selectedIconColor$focus,
      ':is([data-hovered])': switchTokens.selectedIconColor$hover,
      ':is([data-pressed])': switchTokens.selectedIconColor$pressed,
    },
    opacity: 1,
  },
  icon$on$selected$disabled: {
    [switchStateTokens.iconColor]: switchTokens.selectedIconColor$disabled,
    opacity: switchTokens.selectedIconOpacity$disabled,
  },
});

export const switchStateLayerStyles = stylex.create({
  host: {
    [stateLayerTokens.color$hover]: switchStateTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: switchStateTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: switchStateTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      switchStateTokens.stateLayerOpacity$pressed,
    borderRadius: switchTokens.stateLayerShape,
    width: switchTokens.stateLayerSize,
    height: switchTokens.stateLayerSize,
    inset: 'unset',
  },
});

export const switchFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: switchTokens.trackShape,
  },
});

export const switchCircularProgressIndicatorStyles = stylex.create({
  host: {
    [circularProgressIndicatorTokens.color]: switchStateTokens.iconColor,
  },
});
