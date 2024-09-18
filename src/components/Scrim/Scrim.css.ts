import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'variant' | 'status';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: {
      darken: `color-mix(in srgb, ${themeTokens.colorScheme.scrim} 50%, transparent)`,
      lighten: `rgba(255, 255, 255, 0.5)`,
    },
  },
});

const classNames = createStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    zIndex: themeTokens.zIndex.overlay,

    selectors: {
      [getModifierSelector<IModifier>({ variant: 'darken' })]: {
        backgroundColor: tokens.container.color.darken,
      },
      [getModifierSelector<IModifier>({ variant: 'lighten' })]: {
        backgroundColor: tokens.container.color.lighten,
      },
      [getModifierSelector({ status: 'initial' })]: {
        opacity: 0,
      },
      [getModifierSelector({ status: 'open' })]: {
        opacity: 1,
        transitionProperty: 'opacity',
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector({ status: 'close' })]: {
        opacity: 0,
        transitionProperty: 'opacity',
        transitionDuration: themeTokens.motion.duration.short.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.accelerate,
      },
    },
  },
});

export type IScrimThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const scrimTheme = componentThemeFactory<IScrimThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
