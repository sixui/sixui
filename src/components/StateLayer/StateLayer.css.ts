import { createTheme, style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

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
  borderRadius: 'inherit',
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',

  '::before': {
    // This is the background color of the ripple.

    borderRadius: 'inherit',
    content: '',
    opacity: 0,
    position: 'absolute',
    inset: 0,

    transitionProperty: 'opacity, background-color',
    transitionDuration: '15ms, 15ms',
    transitionTimingFunction: 'linear, linear',
  },
  '::after': {
    // This is the ripple animation.

    borderRadius: 'inherit',
    content: '',
    opacity: 0,
    position: 'absolute',
    inset: 0,

    backgroundImage: `radial-gradient(closest-side, ${stateLayerTokens.color.pressed} max(calc(100% - ${px(70)}), 65%), transparent 100%)`,
    transformOrigin: 'center center',
    transitionProperty: 'opacity',
    transitionDuration: '375ms',
    transitionTimingFunction: 'linear',
  },
  selectors: {
    [`${getModifierSelector('hovered')}::before`]: {
      backgroundColor: stateLayerTokens.color.hover,
      opacity: stateLayerTokens.opacity.hover,
    },
    [`${getModifierSelector('animating')}::before`]: {
      backgroundColor: stateLayerTokens.color.hover,
      opacity: stateLayerTokens.opacity.hover,
    },
    [`${getModifierSelector('animating')}::after`]: {
      opacity: stateLayerTokens.opacity.pressed,
      transitionDuration: '105ms',
    },
    [`${getModifierSelector('static-pressed')}::before`]: {
      backgroundColor: stateLayerTokens.color.hover,
      opacity: stateLayerTokens.opacity.hover,
    },
    [`${getModifierSelector('static-pressed')}::after`]: {
      backgroundColor: stateLayerTokens.color.pressed,
      opacity: stateLayerTokens.opacity.pressed,
    },
    [`${getModifierSelector('dragged')}::before`]: {
      backgroundColor: stateLayerTokens.color.dragged,
      opacity: stateLayerTokens.opacity.dragged,
    },
    [`${getModifierSelector('dragged')}::after`]: {
      display: 'none',
    },
  },
});

export const stateLayerStyles = {
  root,
};
