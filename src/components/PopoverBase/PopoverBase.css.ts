import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'shake' | 'positioned';

const shakeKeyframes = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(1deg)' },
  '50%': { transform: 'rotate(0deg)' },
  '75%': { transform: 'rotate(-1deg)' },
  '100%': { transform: 'rotate(0deg)' },
});

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.popover,
  },
  scrim: {
    position: 'fixed',
    inset: 0,
    zIndex: themeTokens.zIndex.popover,
  },
  popover: ({ root }) => ({
    zIndex: themeTokens.zIndex.popover,
    width: 'inherit',
    height: 'inherit',

    selectors: {
      [getModifierSelector<IModifier>('shake', root)]: {
        animationName: shakeKeyframes,
        animationDuration: themeTokens.motion.duration.short.$2,
        animationTimingFunction: themeTokens.motion.easing.standard.normal,
        animationIterationCount: 'infinite',
      },
    },
  }),
  removeScroll: {
    display: 'contents',
  },
});

export type IPopoverBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const popoverBaseTheme = componentThemeFactory<IPopoverBaseThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
