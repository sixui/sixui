import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '@/components/utils/FocusRing/FocusRing.stylex';
import { componentVars as statelayerVars } from '@/themes/base/StateLayer/StateLayer.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { cardTokens } from './Card.stylex';
import { cardStateTokens } from './Card.state.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/_shared.scss

export type ICardStylesKey = keyof typeof cardStyles;
export const cardStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    background: 'none',
    borderStyle: 'unset',
    padding: 0,
    margin: 0,
    textAlign: 'unset',
    textDecoration: 'none',
    // hide android tap color since we have statelayer
    WebkitTapHighlightColor: 'transparent',

    borderRadius: cardTokens.containerShape,
    position: 'relative',
    zIndex: 0,

    [cardStateTokens.elevation]: {
      default: cardTokens.containerElevation,
      ':is([data-dragged])': cardTokens.containerElevation$dragged,
    },
    cursor: {
      default: 'inherit',
      ':is([data-dragged])': 'grabbing',
    },
  },
  host$actionable: {
    cursor: {
      default: 'pointer',
      ':is([data-dragged])': 'grabbing',
    },
    [cardStateTokens.elevation]: {
      default: cardTokens.containerElevation,
      ':is([data-focused])': cardTokens.containerElevation$focus,
      ':is([data-hovered])': cardTokens.containerElevation$hover,
      ':is([data-pressed])': cardTokens.containerElevation$pressed,
      ':is([data-dragged])': cardTokens.containerElevation$dragged,
    },
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    [cardStateTokens.elevation]: cardTokens.containerElevation$disabled,
  },
  background: {
    // Background color. Separate node for disabled opacity styles.
    backgroundColor: cardTokens.containerColor,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    zIndex: -1,
  },
  background$disabled: {
    backgroundColor: cardTokens.containerColor$disabled,
    opacity: cardTokens.containerOpacity$disabled,
  },
  outline: {
    zIndex: 1,
  },
});

export const cardElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: cardStateTokens.elevation,

    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    zIndex: -1,
  },
});

export const cardStateLayerStyles = stylex.create({
  host: {
    [statelayerVars.color$hover]: cardTokens.stateLayerColor$hover,
    [statelayerVars.opacity$hover]: cardTokens.stateLayerOpacity$hover,

    [statelayerVars.color$pressed]: cardTokens.stateLayerColor$pressed,
    [statelayerVars.opacity$pressed]: cardTokens.stateLayerOpacity$pressed,

    [statelayerVars.color$dragged]: cardTokens.stateLayerColor$dragged,
    [statelayerVars.opacity$dragged]: cardTokens.stateLayerOpacity$dragged,

    zIndex: 1,
  },
});

export const cardFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: cardTokens.containerShape,
  },
});
