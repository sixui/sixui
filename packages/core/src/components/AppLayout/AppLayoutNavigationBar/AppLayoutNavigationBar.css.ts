import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { NavigationBar } from '~/components/NavigationBar';
import { NavigationBarContent } from '~/components/NavigationBar/NavigationBarContent';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutNavigationBar.constants';

type IModifier = 'with-header';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    vars: overrideTokens(NavigationBar.theme.tokens, {
      container: {
        height: appLayoutTheme.tokens.navigationBar.height,
      },
    }),
  },
  navigationBarContent: {
    vars: overrideTokens(NavigationBarContent.theme.tokens, {
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
