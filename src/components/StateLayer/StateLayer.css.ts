import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'hovered' | 'dragged' | 'animating' | 'static-pressed';

const [tokensClassName, tokens] = createTheme({
  color: {
    hovered: themeTokens.colorScheme.onSurface,
    pressed: themeTokens.colorScheme.onSurface,
    dragged: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    hovered: themeTokens.state.stateLayerOpacity.hovered,
    pressed: themeTokens.state.stateLayerOpacity.pressed,
    dragged: themeTokens.state.stateLayerOpacity.dragged,
  },
});

const classNames = createStyles({
  root: {
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    // pointerEvents: 'none',

    '::before': {
      // This is the background color of the ripple.

      borderRadius: 'inherit',
      content: '',
      opacity: 0,
      position: 'absolute',
      inset: 0,
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
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${getModifierSelector('animating')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${getModifierSelector('animating')}::after`]: {
        opacity: tokens.opacity.pressed,
        transitionDuration: '105ms',
      },
      [`${getModifierSelector('static-pressed')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
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
  },
  root$hover: {
    // border: '2px solid red',
  },
});

export type IStateLayerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stateLayerTheme = componentThemeFactory<IStateLayerThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
