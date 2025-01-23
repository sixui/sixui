import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { ModalAside } from '../ModalAside';
import { SideSheetContent } from '../SideSheetContent';
import { StandardAside } from '../StandardAside';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.navigationDrawer.width, px(360)),
    color: fallbackVar(
      appLayoutTheme.tokens.navigationDrawer.color,
      themeTokens.colorScheme.surface,
    ),
    elevation: elevationLevelPreset[0],
  },
});

const classNames = createStyles({
  root: {
    vars: {
      ...createTokensVars(ModalAside.theme.tokens, {
        container: {
          width: tokens.container.width,
        },
      }),
      ...createTokensVars(StandardAside.theme.tokens, {
        container: {
          width: tokens.container.width,
        },
      }),
    },
  },
  sideSheetContent: {
    vars: createTokensVars(SideSheetContent.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
      },
    }),
  },
});

export type INavigationDrawerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationDrawerTheme =
  componentThemeFactory<INavigationDrawerThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
