import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '../StateLayer/StateLayer.stylex';
import { fluidButtonTokens } from './FluidButton.stylex';

export type IFluidButtonStylesKey = keyof typeof fluidButtonStyles;
export const fluidButtonStyles = stylex.create({
  textLabel: {
    color: fluidButtonTokens.labelTextColor,
    textDecoration: 'underline',
  },
  textLabel$disabled: {
    color: fluidButtonTokens.labelTextColor$disabled,
    opacity: fluidButtonTokens.labelTextOpacity$disabled,
    textDecoration: 'none',
  },
});

export const fluidButtonButtonBaseStyles = stylex.create({
  host: {
    display: 'inline-flex',
    minWidth: '1em',
    height: '1em',
    verticalAlign: 'baseline',
    alignItems: 'center',
    borderRadius: fluidButtonTokens.containerShape,
  },
  background: {
    backgroundColor: fluidButtonTokens.containerColor,
  },
  background$disabled: {
    backgroundColor: fluidButtonTokens.containerColor$disabled,
    opacity: fluidButtonTokens.containerOpacity$disabled,
  },
  touchTarget: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `calc(100% + ${fluidButtonTokens.touchTargetSpace})`,
    height: `calc(100% + ${fluidButtonTokens.touchTargetSpace})`,
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
    borderRadius: fluidButtonTokens.containerShape,
  },
});

export const fluidButtonFocusRingStyles = stylex.create({
  host$outward: {
    [focusRingTokens.shape]: fluidButtonTokens.containerShape,
    inset: `calc(-0.5 * ${fluidButtonTokens.stateLayerSpace} - ${fluidButtonTokens.focusRingOutwardOffset})`,
  },
});

export const fluidButtonStateLayerStyles = stylex.create({
  host: {
    borderRadius: fluidButtonTokens.containerShape,
    inset: `calc(-0.5 * ${fluidButtonTokens.stateLayerSpace})`,
    [stateLayerTokens.color$hover]: fluidButtonTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: fluidButtonTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: fluidButtonTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      fluidButtonTokens.stateLayerOpacity$pressed,
  },
});
