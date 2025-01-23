import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { NavigationBarContent } from '../NavigationBarContent';
import { StandardAside } from '../StandardAside';
import { themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'with-header';

const classNames = createStyles({
  root: {
    vars: createTokensVars(StandardAside.theme.tokens, {
      container: {
        startSpace: appLayoutTheme.tokens.header.height,
      },
    }),
  },
  navigationBarContent: {
    vars: createTokensVars(NavigationBarContent.theme.tokens, {
      container: {
        color: fallbackVar(
          appLayoutTheme.tokens.navigationBar.color,
          themeTokens.colorScheme.surface,
        ),
      },
    }),
  },
});

export type IAppLayoutNavigationBarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const appLayoutNavigationBarTheme =
  componentThemeFactory<IAppLayoutNavigationBarThemeFactory>({
    classNames,
    tokens: undefined,
  });
