import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { NavigationBar } from '~/components/NavigationBar';
import { NavigationBarContent } from '~/components/NavigationBar/NavigationBarContent';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutNavigationBar.constants';

type IModifier = 'with-header';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    vars: createTokensVars(NavigationBar.theme.tokens, {
      container: {
        height: appLayoutTheme.tokens.navigationBar.height,
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
    tokensClassName,
    tokens,
  });
