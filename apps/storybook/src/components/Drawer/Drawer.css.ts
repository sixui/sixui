import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IDrawerVariant } from './Drawer.types';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = 'side' | 'full-height' | 'full-width';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  inset: px(0),
});

const classNames = createStyles({
  root: {
    position: 'fixed',
    display: 'flex',

    selectors: {
      [getModifierSelector<IModifier>({ side: 'left' })]: {
        left: tokens.inset,
      },
      [getModifierSelector<IModifier>({ side: 'right' })]: {
        right: tokens.inset,
      },
      [getModifierSelector<IModifier>({ side: 'top' })]: {
        top: tokens.inset,
      },
      [getModifierSelector<IModifier>({ side: 'bottom' })]: {
        bottom: tokens.inset,
      },
      [getModifierSelector<IModifier>('full-height')]: {
        top: tokens.inset,
        bottom: tokens.inset,
      },
      [getModifierSelector<IModifier>('full-width')]: {
        left: tokens.inset,
        right: tokens.inset,
      },
    },
  },
  popover: {
    zIndex: themeTokens.zIndex.modal,
  },
});

export type IDrawerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IDrawerVariant;
}>;

export const drawerTheme = componentThemeFactory<IDrawerThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const drawerThemeVariants = {
  standard: createStyles(),
  detached: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        inset: px(space(4)),
      }),
    },
  }),
};
