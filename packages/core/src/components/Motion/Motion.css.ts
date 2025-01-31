import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { COMPONENT_NAME } from './Motion.constants';

type IModifier = 'status' | 'orientation' | 'pattern' | 'side' | 'alignment';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    transitionDuration: themeTokens.motion.duration.long3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [modifierSelector<IModifier>({ pattern: 'fade' })]: {
        opacity: 1,
      },
      [modifierSelector<IModifier>({ pattern: 'enterExit' })]: {
        opacity: 1,
        transform: 'scale(1)',
      },
      [modifierSelector<IModifier>({ pattern: 'enterExitOffScreen' })]: {
        opacity: 1,
        transform: 'translate(0)',
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleX(1)',
      },
      [modifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleY(1)',
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExitOffScreen',
      })]: {
        transform: 'translateX(0)',
      },
      [modifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExitOffScreen',
      })]: {
        transform: 'translateY(0)',
      },
    },
  },
  motion$close: {
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [modifierSelector<IModifier>({ pattern: 'fade' })]: {
        opacity: 0,
      },
      [modifierSelector<IModifier>({ pattern: 'enterExit' })]: {
        opacity: 0,
        transform: 'scale(0.5)',
      },
      [modifierSelector<IModifier>({ pattern: 'enterExitOffScreen' })]: {
        opacity: 0,
        transform: 'translate(-30%, -30%)',
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleX(0.5)',
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExitOffScreen',
        side: 'left',
      })]: {
        transform: 'translateX(-30%)',
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        pattern: 'enterExitOffScreen',
        side: 'right',
      })]: {
        transform: 'translateX(30%)',
      },
      [modifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExit',
      })]: {
        transform: 'scaleY(0.75)',
      },
      [modifierSelector<IModifier>({
        orientation: 'vertical',
        pattern: 'enterExitOffScreen',
        side: 'top',
      })]: {
        transform: 'translateY(-30%)',
      },
      [modifierSelector<IModifier>({
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
