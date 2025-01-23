import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { StandardAside } from '../StandardAside';
import { cssLayers } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    height: px(80),
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(StandardAside.theme.tokens, {
      container: {
        size: tokens.container.height,
      },
    }),
  },
  navigationBarContent: {},
});

export type INavigationBarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationBarTheme =
  componentThemeFactory<INavigationBarThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
