import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '../StateLayer/StateLayer.stylex';
import { colorButtonStateTokens } from './ColorButton.state.stylex';
import { colorButtonTokens } from './ColorButton.stylex';

export type IColorButtonStylesKey = keyof typeof colorButtonStyles;
export const colorButtonStyles = stylex.create({
  host: {
    position: 'relative',
  },
});

export const colorButtonButtonBaseStyles = stylex.create({
  host: {
    borderRadius: {
      default: colorButtonTokens.containerShape,
      ':is([data-hovered])': colorButtonTokens.containerShape$hover,
    },
    zIndex: {
      default: 0,
      ':is([data-hovered])': 10,
    },
  },
  background: {
    backgroundColor: colorButtonStateTokens.containerColor,
    transitionProperty: 'transform, border-radius',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasized,

    transform: {
      default: 'scale(1)',
      ':is([data-hovered])': 'scale(1.1)',
    },
  },
});

export const colorButtonFocusRingStyles = stylex.create({
  host$outward: {
    [focusRingTokens.shape]: colorButtonTokens.containerShape,
  },
});

export const colorButtonColorTagStyles = stylex.create({
  host: {
    borderRadius: colorButtonTokens.containerShape,
  },
});

export const colorButtonStateLayerStyles = stylex.create({
  host: {
    borderRadius: {
      default: colorButtonTokens.containerShape,
      ':is([data-hovered])': colorButtonTokens.containerShape$hover,
    },

    [stateLayerTokens.color$hover]: colorButtonTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: '0',
    [stateLayerTokens.color$pressed]: colorButtonTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      colorButtonTokens.stateLayerOpacity$pressed,

    transform: {
      default: 'scale(1)',
      ':is([data-hovered])': 'scale(1.1)',
    },
    transitionProperty: 'transform, border-radius',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasized,
  },
});
