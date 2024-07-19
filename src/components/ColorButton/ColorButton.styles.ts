import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '@/components/FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '@/components/StateLayer/StateLayer.stylex';
import { colorButtonTokens } from './ColorButton.stylex';

export type IColorButtonStylesKey = keyof typeof colorButtonStyles;
export const colorButtonStyles = stylex.create({
  icon: {
    position: 'relative',
    color: colorButtonTokens.iconColor,
    fontSize: colorButtonTokens.iconSize,
    inlineSize: colorButtonTokens.iconSize,
    blockSize: colorButtonTokens.iconSize,
  },
  label: {
    position: 'relative',
    color: colorButtonTokens.labelTextColor,
    fontFamily: colorButtonTokens.labelTextFont,
    fontSize: colorButtonTokens.labelTextSize,
    fontWeight: colorButtonTokens.labelTextWeight,
    lineHeight: colorButtonTokens.labelTextLineHeight,
    letterSpacing: colorButtonTokens.labelTextLetterSpacing,
  },
});

export const colorButtonButtonBaseStyles = stylex.create({
  host: {
    minWidth: colorButtonTokens.containerMinWidth,
    height: colorButtonTokens.containerHeight,
    borderRadius: colorButtonTokens.containerShape,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  background: {
    backgroundColor: colorButtonTokens.containerColor,
  },
});

export const colorButtonFocusRingStyles = stylex.create({
  host$outward: {
    [focusRingTokens.shape]: colorButtonTokens.containerShape,
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
