import { createTheme, style } from '@vanilla-extract/css';

import { stylesFactory, type IStylesFactory } from '~/utils/styles/stylesFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  color: {
    hover: themeTokens.colorScheme.onSurface,
    pressed: themeTokens.colorScheme.onSurface,
    dragged: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    hover: themeTokens.state.stateLayerOpacity.hover,
    pressed: themeTokens.state.stateLayerOpacity.pressed,
    dragged: themeTokens.state.stateLayerOpacity.dragged,
  },
});

const classNames = {
  root: style({
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

      backgroundImage: `radial-gradient(closest-side, ${tokens.color.pressed} max(calc(100% - ${px(70)}), 65%), transparent 100%)`,
      transformOrigin: 'center center',
      transitionProperty: 'opacity',
      transitionDuration: '375ms',
      transitionTimingFunction: 'linear',
    },
    selectors: {
      [`${getModifierSelector('hovered')}::before`]: {
        backgroundColor: tokens.color.hover,
        opacity: tokens.opacity.hover,
      },
      [`${getModifierSelector('animating')}::before`]: {
        backgroundColor: tokens.color.hover,
        opacity: tokens.opacity.hover,
      },
      [`${getModifierSelector('animating')}::after`]: {
        opacity: tokens.opacity.pressed,
        transitionDuration: '105ms',
      },
      [`${getModifierSelector('static-pressed')}::before`]: {
        backgroundColor: tokens.color.hover,
        opacity: tokens.opacity.hover,
      },
      [`${getModifierSelector('static-pressed')}::after`]: {
        backgroundColor: tokens.color.pressed,
        opacity: tokens.opacity.pressed,
      },
      [`${getModifierSelector('dragged')}::before`]: {
        backgroundColor: tokens.color.dragged,
        opacity: tokens.opacity.dragged,
      },
      [`${getModifierSelector('dragged')}::after`]: {
        display: 'none',
      },
    },
  }),
};

export type IStateLayerStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const stateLayerStyles = stylesFactory<IStateLayerStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
