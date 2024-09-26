import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'shake';

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
  floating: ({ root }) => ({
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',

    selectors: {
      [getModifierSelector<IModifier>('shake', root)]: {
        animationName: shakeKeyframes,
        animationDuration: themeTokens.motion.duration.short.$2,
        animationTimingFunction: themeTokens.motion.easing.standard.normal,
        animationIterationCount: 'infinite',
      },
    },
  }),
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
