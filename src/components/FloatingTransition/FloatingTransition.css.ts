import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'status' | 'orientation' | 'pattern';

const [tokensClassName, tokens] = createTheme({
  transformOrigin: 'unset',
});

const classNames = createStyles({
  root: {
    transformOrigin: tokens.transformOrigin,
  },
  root$unmounted: {},
  root$initial: {
    opacity: 0,

    selectors: {
      [getModifierSelector<IModifier>('pattern^=enterExit')]: {
        transform: 'scale(0.5)',
      },
      [getModifierSelector<IModifier>('pattern^=enterExitOffScreen')]: {
        transform: 'translate(-30%, -30%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExit'),
      ].join('')]: {
        transform: 'scaleX(0.5)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExit'),
      ].join('')]: {
        transform: 'scaleY(0.75)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-left'),
      ].join('')]: {
        transform: 'translateX(-30%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-right'),
      ].join('')]: {
        transform: 'translateX(130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-top'),
      ].join('')]: {
        transform: 'translateY(-30%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-bottom'),
      ].join('')]: {
        transform: 'translateY(130%)',
      },
    },
  },
  root$open: {
    opacity: 1,
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.long.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [getModifierSelector<IModifier>('pattern^=enterExit')]: {
        transform: 'scale(1)',
      },
      [getModifierSelector<IModifier>('pattern^=enterExitOffScreen')]: {
        transform: 'translate(0)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExit'),
      ].join('')]: {
        transform: 'scaleX(1)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExit'),
      ].join('')]: {
        transform: 'scaleY(1)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen'),
      ].join('')]: {
        transform: 'translateX(0)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen'),
      ].join('')]: {
        transform: 'translateY(0)',
      },
    },
  },
  root$close: {
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>('pattern^=enterExit')]: {
        transform: 'scale(0.5)',
      },
      [getModifierSelector<IModifier>('pattern^=enterExitOffScreen')]: {
        transform: 'translate(-30%, -30%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExit'),
      ].join('')]: {
        transform: 'scaleX(0.5)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-left'),
      ].join('')]: {
        transform: 'translateX(-30%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'horizontal' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-right'),
      ].join('')]: {
        transform: 'translateX(130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExit'),
      ].join('')]: {
        transform: 'scaleY(0.75)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-top'),
      ].join('')]: {
        transform: 'translateY(-130%)',
      },
      [[
        getModifierSelector<IModifier>({ orientation: 'vertical' }),
        getModifierSelector<IModifier>('pattern^=enterExitOffScreen-bottom'),
      ].join('')]: {
        transform: 'translateY(30%)',
      },
    },
  },
});

export type IFloatingTransitionThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const floatingTransitionTheme =
  componentThemeFactory<IFloatingTransitionThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
