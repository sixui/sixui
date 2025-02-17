import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './StateLayer.constants';

type IModifier =
  | 'focused'
  | 'hovered'
  | 'dragged'
  | 'animating'
  | 'static-pressed'
  | 'no-ripple-effect'
  | 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  color: {
    focused: 'unset',
    hovered: themeTokens.colorScheme.onSurface,
    pressed: 'inherit',
    dragged: 'inherit',
  },
  opacity: {
    focused: themeTokens.state.stateLayerOpacity.focused,
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
      [modifierSelector<IModifier>('disabled')]: {
        pointerEvents: 'none',
      },
      [`${modifierSelector<IModifier>('focused')}::before`]: {
        backgroundColor: tokens.color.focused,
        opacity: tokens.opacity.focused,
      },
      [`${modifierSelector<IModifier>('hovered')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${modifierSelector<IModifier>('animating')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${modifierSelector<IModifier>('animating')}::after`]: {
        opacity: tokens.opacity.pressed,
        transitionDuration: '105ms',
      },
      [`${modifierSelector<IModifier>('static-pressed')}::before`]: {
        backgroundColor: tokens.color.hovered,
        opacity: tokens.opacity.hovered,
      },
      [`${modifierSelector<IModifier>('static-pressed')}::after`]: {
        backgroundColor: fallbackVar(
          tokens.color.pressed,
          tokens.color.hovered,
        ),
        opacity: tokens.opacity.pressed,
      },
      [`${modifierSelector<IModifier>('no-ripple-effect')}::after`]: {
        backgroundImage: 'none',
        transition: 'none',
      },
      [`${modifierSelector<IModifier>('dragged')}::before`]: {
        backgroundColor: fallbackVar(
          tokens.color.dragged,
          tokens.color.hovered,
        ),
        opacity: tokens.opacity.dragged,
      },
      [`${modifierSelector<IModifier>('dragged')}::after`]: {
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
