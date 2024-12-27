import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier =
  | 'hovered'
  | 'dragged'
  | 'animating'
  | 'static-pressed'
  | 'no-ripple-effect';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  color: {
    hovered: themeTokens.colorScheme.onSurface,
    pressed: 'inherit',
    dragged: 'inherit',
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

    '::before': {
      // This is the background color of the ripple.
      pointerEvents: 'none',
      borderRadius: 'inherit',
      content: '',
      opacity: 0,
      position: 'absolute',
      inset: 0,
    },
    '::after': {
      // This is the ripple animation.
      pointerEvents: 'none',
      borderRadius: 'inherit',
      content: '',
      opacity: 0,
      position: 'absolute',
      inset: 0,

      backgroundImage: `radial-gradient(closest-side, ${fallbackVar(
        tokens.color.pressed,
        tokens.color.hovered,
      )} max(calc(100% - ${px(70)}), 65%), transparent 100%)`,
      transformOrigin: 'center center',
      transitionProperty: 'opacity',
      transitionDuration: '375ms',
      transitionTimingFunction: 'linear',
    },
    selectors: {
      [`${getModifierSelector<IModifier>('hovered')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${getModifierSelector<IModifier>('animating')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${getModifierSelector<IModifier>('animating')}::after`]: {
        opacity: tokens.opacity.pressed,
        transitionDuration: '105ms',
      },
      [`${getModifierSelector<IModifier>('static-pressed')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${getModifierSelector<IModifier>('static-pressed')}::after`]: {
        backgroundColor: fallbackVar(
          tokens.color.pressed,
          tokens.color.hovered,
        ),
        opacity: tokens.opacity.pressed,
      },
      [`${getModifierSelector<IModifier>('no-ripple-effect')}::after`]: {
        backgroundImage: 'none',
        transition: 'none',
      },
      [`${getModifierSelector<IModifier>('dragged')}::before`]: {
        backgroundColor: fallbackVar(
          tokens.color.dragged,
          tokens.color.hovered,
        ),
        opacity: tokens.opacity.dragged,
      },
      [`${getModifierSelector<IModifier>('dragged')}::after`]: {
        display: 'none',
      },
    },
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
