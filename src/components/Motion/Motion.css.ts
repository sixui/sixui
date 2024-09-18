import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier =
  | 'status'
  | 'orientation'
  | 'pattern'
  | 'side'
  | 'alignment'
  | 'anchored';

const [tokensClassName, tokens] = createTheme({
  transformOrigin: 'unset',
  position: {
    top: 'unset',
    bottom: 'unset',
    left: 'unset',
    right: 'unset',
  },
});

const classNames = createStyles({
  root: {
    transformOrigin: tokens.transformOrigin,

    selectors: {
      [getModifierSelector<IModifier>('anchored')]: {
        position: 'absolute',
        top: tokens.position.top,
        bottom: tokens.position.bottom,
        left: tokens.position.left,
        right: tokens.position.right,
      },
    },
  },
  root$unmounted: {},
  root$open: {
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>({ pattern: 'fade' })]: {
        opacity: 1,
        transitionTimingFunction: themeTokens.motion.easing.linear,
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExit' })]: {
        opacity: 1,
        transform: 'scale(1)',
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' })]: {
        opacity: 1,
        transform: 'translate(0)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>({ pattern: 'enterExit' }),
      ].join('')]: {
        transform: 'scaleX(1)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>({ pattern: 'enterExit' }),
      ].join('')]: {
        transform: 'scaleY(1)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }),
      ].join('')]: {
        transform: 'translateX(0)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }),
      ].join('')]: {
        transform: 'translateY(0)',
      },
    },
  },
  root$close: {
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.long.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [getModifierSelector<IModifier>({ pattern: 'fade' })]: {
        opacity: 0,
        transitionTimingFunction: themeTokens.motion.easing.linear,
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExit' })]: {
        opacity: 0,
        transform: 'scale(0.5)',
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' })]: {
        opacity: 0,
        transform: 'translate(-130%, -130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>({ pattern: 'enterExit' }),
      ].join('')]: {
        transform: 'scaleX(0.5)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }),
        getModifierSelector<IModifier>({ side: 'left' }),
      ].join('')]: {
        transform: 'translateX(-130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }),
        getModifierSelector<IModifier>({ side: 'right' }),
      ].join('')]: {
        transform: 'translateX(130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>({ pattern: 'enterExit' }),
      ].join('')]: {
        transform: 'scaleY(0.75)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }),
        getModifierSelector<IModifier>({ side: 'top' }),
      ].join('')]: {
        transform: 'translateY(-130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }),
        getModifierSelector<IModifier>({ side: 'bottom' }),
      ].join('')]: {
        transform: 'translateY(130%)',
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
