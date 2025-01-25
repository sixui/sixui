import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'status' | 'orientation' | 'pattern' | 'side' | 'alignment';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  transformOrigin: 'unset',
});

const classNames = createStyles({
  motion: {
    transformOrigin: tokens.transformOrigin,
  },
  motion$unmounted: {},
  motion$initial: {},
  motion$open: {
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.long.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [getModifierSelector<IModifier>({ pattern: 'fade' })]: {
        opacity: 1,
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExit' })]: {
        opacity: 1,
        transform: 'scale(1)',
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' })]: {
        opacity: 1,
        transform: 'translate(0)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleX(1)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleY(1)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExitOffScreen',
      })]: {
        transform: 'translateX(0)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExitOffScreen',
      })]: {
        transform: 'translateY(0)',
      },
    },
  },
  motion$close: {
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>({ pattern: 'fade' })]: {
        opacity: 0,
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExit' })]: {
        opacity: 0,
        transform: 'scale(0.5)',
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' })]: {
        opacity: 0,
        transform: 'translate(-30%, -30%)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleX(0.5)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExitOffScreen',
        side: 'left',
      })]: {
        transform: 'translateX(-30%)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExitOffScreen',
        side: 'right',
      })]: {
        transform: 'translateX(30%)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleY(0.75)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExitOffScreen',
        side: 'top',
      })]: {
        transform: 'translateY(-30%)',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExitOffScreen',
        side: 'bottom',
      })]: {
        transform: 'translateY(30%)',
      },
    },
  },
});

export type IMotionThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const motionTheme = componentThemeFactory<IMotionThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
