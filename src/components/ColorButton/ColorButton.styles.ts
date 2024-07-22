import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '@/components/FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '@/components/StateLayer/StateLayer.stylex';
import { colorButtonTokens } from './ColorButton.stylex';
import { motionTokens } from '@/themes/base/motion.stylex';
import { colorButtonStateTokens } from './ColorButton.state.stylex';

export type IColorButtonStylesKey = keyof typeof colorButtonStyles;
export const colorButtonStyles = stylex.create({
  host: {
    position: 'relative',
  },
});

export const colorButtonButtonBaseStyles = stylex.create({
  host: {
    borderRadius: colorButtonTokens.containerShape,
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
    borderRadius: colorButtonTokens.containerShape,
    [stateLayerTokens.color$hover]: colorButtonStateTokens.stateLayerColor,
    [stateLayerTokens.opacity$hover]: colorButtonTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: colorButtonStateTokens.stateLayerColor,
    [stateLayerTokens.opacity$pressed]:
      colorButtonTokens.stateLayerOpacity$pressed,

    transform: 'scale(1)',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasized,
  },
  host$hover: {
    borderRadius: colorButtonTokens.containerShape$hover,
    transform: 'scale(1.2)',
    zIndex: 10,
  },
  host$pressed: {
    zIndex: 10,
    transform: 'scale(1.1)',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short1,
    transitionTimingFunction: motionTokens.easing$emphasized,
  },
});
