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
  | 'positioned';

const [tokensClassName, tokens] = createTheme({
  transformOrigin: 'unset',
  position: {
    top: 'unset',
    bottom: 'unset',
    left: 'unset',
    right: 'unset',
    transform: '',
  },
});

const classNames = createStyles({
  root: {
    selectors: {
      [getModifierSelector<IModifier>('positioned')]: {
        position: 'absolute',
        top: tokens.position.top,
        bottom: tokens.position.bottom,
        left: tokens.position.left,
        right: tokens.position.right,
        transform: tokens.position.transform,
      },
    },
  },
  motion: {
    transformOrigin: tokens.transformOrigin,
  },
  motion$unmounted: {},
  motion$initial: {},
  motion$open: ({ root }) => ({
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.long.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [getModifierSelector<IModifier>({ pattern: 'fade' }, root)]: {
        opacity: 1,
        transitionTimingFunction: themeTokens.motion.easing.linear,
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExit' }, root)]: {
        opacity: 1,
        transform: 'scale(1)',
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }, root)]:
        {
          opacity: 1,
          transform: 'translate(0)',
        },
      [getModifierSelector<IModifier>(
        { orientation: 'horizontal', pattern: 'enterExit' },
        root,
      )]: {
        transform: 'scaleX(1)',
      },
      [getModifierSelector<IModifier>(
        { orientation: 'vertical', pattern: 'enterExit' },
        root,
      )]: {
        transform: 'scaleY(1)',
      },
      [getModifierSelector<IModifier>(
        { orientation: 'horizontal', pattern: 'enterExitOffScreen' },
        root,
      )]: {
        transform: 'translateX(0)',
      },
      [getModifierSelector<IModifier>(
        { orientation: 'vertical', pattern: 'enterExitOffScreen' },
        root,
      )]: {
        transform: 'translateY(0)',
      },
    },
  }),
  motion$close: ({ root }) => ({
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>({ pattern: 'fade' }, root)]: {
        opacity: 0,
        transitionTimingFunction: themeTokens.motion.easing.linear,
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExit' }, root)]: {
        opacity: 0,
        transform: 'scale(0.5)',
      },
      [getModifierSelector<IModifier>({ pattern: 'enterExitOffScreen' }, root)]:
        {
          opacity: 0,
          transform: 'translate(-130%, -130%)',
        },
      [getModifierSelector<IModifier>(
        { orientation: 'horizontal', pattern: 'enterExit' },
        root,
      )]: {
        transform: 'scaleX(0.5)',
      },
      [getModifierSelector<IModifier>(
        {
          orientation: 'horizontal',
          pattern: 'enterExitOffScreen',
          side: 'left',
        },
        root,
      )]: {
        transform: 'translateX(-130%)',
      },
      [getModifierSelector<IModifier>(
        {
          orientation: 'horizontal',
          pattern: 'enterExitOffScreen',
          side: 'right',
        },
        root,
      )]: {
        transform: 'translateX(130%)',
      },
      [getModifierSelector<IModifier>(
        { orientation: 'vertical', pattern: 'enterExit' },
        root,
      )]: {
        transform: 'scaleY(0.75)',
      },
      [getModifierSelector<IModifier>(
        {
          orientation: 'vertical',
          pattern: 'enterExitOffScreen',
          side: 'top',
        },
        root,
      )]: {
        transform: 'translateY(-130%)',
      },
      [getModifierSelector<IModifier>(
        {
          orientation: 'vertical',
          pattern: 'enterExitOffScreen',
          side: 'bottom',
        },
        root,
      )]: {
        transform: 'translateY(130%)',
      },
    },
  }),
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
