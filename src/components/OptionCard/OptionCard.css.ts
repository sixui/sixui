import { createTheme } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Card } from '../Card';
import { cssLayers } from '../ThemeProvider';

type IModifier = IInteraction | 'disabled' | 'checked';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  //
});

const classNames = createStyles({
  root: {
    //

    vars: createTokensVars(Card.theme.tokens, {
      //
    }),

    selectors: {
      //
    },
  },
});

export type IOptionCardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const optionCardTheme = componentThemeFactory<IOptionCardThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
