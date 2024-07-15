import stylex from '@stylexjs/stylex';

import { stateLayerTokens as vars } from './StateLayer.stylex';

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

      backgroundColor: vars.color$hover,
      transitionProperty: 'opacity, background-color',
      transitionDuration: '15ms, 15ms',
      transitionTimingFunction: 'linear, linear',
    },
    '::after': {
      content: '',
      opacity: 0,
      position: 'absolute',

      // press ripple fade-out
      backgroundImage: `radial-gradient(closest-side, ${vars.color$pressed} max(calc(100% - 70px), 65%), transparent 100%)`,
      transformOrigin: 'center center',
      transitionProperty: 'opacity',
      transitionDuration: '375ms',
      transitionTimingFunction: 'linear',
    },
  },
  rippleSurface$hover: {
    '::before': {
      opacity: vars.opacity$hover,
    },
  },
  rippleSurface$pressed: {
    '::after': {
      // press ripple fade-in
      opacity: vars.opacity$pressed,
      transitionDuration: '105ms',
    },
  },
  rippleSurface$pressedStatic: {
    '::before': {
      backgroundColor: vars.color$hover,
      opacity: vars.opacity$hover,
    },

    '::after': {
      inset: 0,
      backgroundColor: vars.color$pressed,
      opacity: vars.opacity$pressed,
    },
  },
  rippleSurface$dragged: {
    '::before': {
      backgroundColor: vars.color$dragged,
      opacity: vars.opacity$dragged,
    },

    '::after': {
      display: 'none',
    },
  },
});
