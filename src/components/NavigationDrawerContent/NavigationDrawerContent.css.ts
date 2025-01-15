import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { INavigationDrawerContentVariant } from './NavigationDrawerContent.types';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { SideSheetContent } from '../SideSheetContent';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surface,
    elevation: elevationLevelPreset[0],
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(SideSheetContent.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
      },
    }),
  },
});

export type INavigationDrawerContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: INavigationDrawerContentVariant;
}>;

export const navigationDrawerContentTheme =
  componentThemeFactory<INavigationDrawerContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const navigationDrawerContentThemeVariants = {
  standard: createStyles(),
  modal: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerLow,
          elevation: elevationLevelPreset[1],
        },
      }),
    },
  }),
  detachedModal: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerLow,
          elevation: elevationLevelPreset[1],
        },
      }),
    },
  }),
};
