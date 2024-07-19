import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '@/components/FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '@/components/StateLayer/StateLayer.stylex';
import { colorButtonTokens } from './ColorButton.stylex';

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
    [stateLayerTokens.color$hover]: colorButtonTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: colorButtonTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: colorButtonTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      colorButtonTokens.stateLayerOpacity$pressed,
  },
});
