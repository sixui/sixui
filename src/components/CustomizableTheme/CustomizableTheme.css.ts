import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surfaceContainerLowest,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),
  },
  controlBar: {},
});

export type ICustomizableThemeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const customizableThemeTheme =
  componentThemeFactory<ICustomizableThemeThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
