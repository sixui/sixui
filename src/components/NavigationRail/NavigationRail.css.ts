import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { NavigationRailContent } from '../NavigationRailContent';
import { StandardAside } from '../StandardAside';
import { cssLayers, themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: px(80),
    color: themeTokens.colorScheme.surface,
    topSpace: px(0),
    bottomSpace: px(0),
  },
  divider: {
    color: themeTokens.colorScheme.outline,
    width: themeTokens.outline.width.xs,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(StandardAside.theme.tokens, {
      container: {
        width: tokens.container.width,
      },
    }),
  },
  navigationRailContent: {
    height: '100%',
    width: tokens.container.width,

    vars: createTokensVars(NavigationRailContent.theme.tokens, {
      container: {
        width: tokens.container.width,
        color: tokens.container.color,
      },
      divider: {
        color: tokens.divider.color,
        width: tokens.divider.width,
      },
    }),
  },
});

export type INavigationRailThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationRailTheme =
  componentThemeFactory<INavigationRailThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
