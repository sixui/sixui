import { createTheme, style } from '@vanilla-extract/css';

import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export type IStateLayerClassName = keyof typeof stateLayerStyles;

export const [stateLayerTheme, stateLayerTokens] = createTheme({
  color: {
    hover: colorSchemeTokens.onSurface,
    pressed: colorSchemeTokens.onSurface,
    dragged: colorSchemeTokens.onSurface,
  },
  opacity: {
    hover: themeTokens.state.stateLayerOpacity.hover,
    pressed: themeTokens.state.stateLayerOpacity.pressed,
    dragged: themeTokens.state.stateLayerOpacity.dragged,
  },
});

const root = style({
  display: 'flex',
  margin: 'auto',
  borderRadius: 'inherit',
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  // pointerEvents: 'none',
});

export const stateLayerStyles = {
  root,
  rippleSurface: style({
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',

    '::before': {
      content: '',
      opacity: 0,
      position: 'absolute',
      inset: 0,

      backgroundColor: stateLayerTokens.color.hover,
      transitionProperty: 'opacity, background-color',
      transitionDuration: '15ms, 15ms',
      transitionTimingFunction: 'linear, linear',
    },
    '::after': {
      content: '',
      opacity: 0,
      position: 'absolute',

      // press ripple fade-out
      backgroundImage: `radial-gradient(closest-side, ${stateLayerTokens.color.pressed} max(calc(100% - 70px), 65%), transparent 100%)`,
      transformOrigin: 'center center',
      transitionProperty: 'opacity',
      transitionDuration: '375ms',
      transitionTimingFunction: 'linear',
    },
  }),
  rippleSurface$hover: style({
    '::before': {
      opacity: stateLayerTokens.opacity.hover,
    },
  }),
  rippleSurface$pressed: style({
    '::after': {
      // press ripple fade-in
      opacity: stateLayerTokens.opacity.pressed,
      transitionDuration: '105ms',
    },
  }),
  rippleSurface$pressedStatic: style({
    '::before': {
      backgroundColor: stateLayerTokens.color.hover,
      opacity: stateLayerTokens.opacity.hover,
    },

    '::after': {
      inset: 0,
      backgroundColor: stateLayerTokens.color.pressed,
      opacity: stateLayerTokens.opacity.pressed,
    },
  }),
  rippleSurface$dragged: style({
    '::before': {
      backgroundColor: stateLayerTokens.color.dragged,
      opacity: stateLayerTokens.opacity.dragged,
    },

    '::after': {
      display: 'none',
    },
  }),
};
