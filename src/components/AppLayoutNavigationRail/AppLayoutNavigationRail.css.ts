import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { NavigationRail } from '../NavigationRail';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.navigationRail.width, px(80)),
  },
  divider: {
    color: fallbackVar(
      appLayoutTheme.tokens.divider.color,
      themeTokens.colorScheme.outline,
    ),
    width: fallbackVar(
      appLayoutTheme.tokens.divider.width,
      themeTokens.outline.width.xs,
    ),
  },
});

const classNames = createStyles({
  root: {
    height: '100%',

    vars: createTokensVars(NavigationRail.theme.tokens, {
      container: {
        width: tokens.container.width,
      },
      divider: {
        color: tokens.divider.color,
        width: tokens.divider.width,
      },
    }),
  },
  transitionContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: tokens.container.width,
  },
});

export type IAppLayoutNavigationRailThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutNavigationRailTheme =
  componentThemeFactory<IAppLayoutNavigationRailThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
