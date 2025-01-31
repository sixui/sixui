import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { COMPONENT_NAME } from './PopoverBase.constants';

type IModifier = 'shake' | 'positioned';

const shakeKeyframes = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(1deg)' },
  '50%': { transform: 'rotate(0deg)' },
  '75%': { transform: 'rotate(-1deg)' },
  '100%': { transform: 'rotate(0deg)' },
});

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
      [modifierSelector<IModifier>('shake', root)]: {
        animationName: shakeKeyframes,
        animationDuration: themeTokens.motion.duration.short2,
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
    tokensClassName,
    tokens,
  },
);
