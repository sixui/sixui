import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IDrawerVariant } from './Drawer.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'side';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  inset: px(0),
});

const classNames = createStyles({
  root: {},
  content: ({ root }) => ({
    position: 'fixed',
    zIndex: themeTokens.zIndex.modal,
    // FIXME: prop for full height or not
    height: calc.subtract('100vh', calc.multiply(2, tokens.inset)),
    border: '2px solid red',

    selectors: {
      [getModifierSelector<IModifier>({ side: 'left' }, root)]: {
        left: tokens.inset,
      },
      [getModifierSelector<IModifier>({ side: 'right' }, root)]: {
        right: tokens.inset,
      },
      [getModifierSelector<IModifier>({ side: 'top' }, root)]: {
        left: tokens.inset,
        right: tokens.inset,
        top: tokens.inset,
      },
      [getModifierSelector<IModifier>({ side: 'bottom' }, root)]: {
        left: tokens.inset,
        right: tokens.inset,
        bottom: tokens.inset,
      },
    },
  }),
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
