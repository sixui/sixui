import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { stateLayerTokens } from './StateLayer.stylex';

// https://github.com/material-components/material-web/blob/main/ripple/internal/_ripple.scss

export type IStateLayerStylesKey = keyof typeof stateLayerStyles;
export const stateLayerStyles = stylex.create({
  host: {
    display: 'flex',
    margin: 'auto',

    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: `calc(${zIndexTokens.app} + 1)`,
  },
  host$asTouchTarget$hover: {
    zIndex: `calc(${zIndexTokens.app} + 2)`,
  },
  rippleSurface: {
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',

    '::before': {
      content: '',
      opacity: 0,
      position: 'absolute',
      inset: 0,

      backgroundColor: stateLayerTokens.color$hover,
      transitionProperty: 'opacity, background-color',
      transitionDuration: '15ms, 15ms',
      transitionTimingFunction: 'linear, linear',
    },
    '::after': {
      content: '',
      opacity: 0,
      position: 'absolute',

      // press ripple fade-out
      backgroundImage: `radial-gradient(closest-side, ${stateLayerTokens.color$pressed} max(calc(100% - 70px), 65%), transparent 100%)`,
      transformOrigin: 'center center',
      transitionProperty: 'opacity',
      transitionDuration: '375ms',
      transitionTimingFunction: 'linear',
    },
  },
  rippleSurface$hover: {
    '::before': {
      opacity: stateLayerTokens.opacity$hover,
    },
  },
  rippleSurface$pressed: {
    '::after': {
      // press ripple fade-in
      opacity: stateLayerTokens.opacity$pressed,
      transitionDuration: '105ms',
    },
  },
  rippleSurface$pressedStatic: {
    '::before': {
      backgroundColor: stateLayerTokens.color$hover,
      opacity: stateLayerTokens.opacity$hover,
    },

    '::after': {
      inset: 0,
      backgroundColor: stateLayerTokens.color$pressed,
      opacity: stateLayerTokens.opacity$pressed,
    },
  },
  rippleSurface$dragged: {
    '::before': {
      backgroundColor: stateLayerTokens.color$dragged,
      opacity: stateLayerTokens.opacity$dragged,
    },

    '::after': {
      display: 'none',
    },
  },
});
