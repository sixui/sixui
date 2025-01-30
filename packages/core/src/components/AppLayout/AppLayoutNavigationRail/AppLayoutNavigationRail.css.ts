import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { NavigationRail } from '~/components/NavigationRail';
import { StandardAside } from '~/components/StandardAside';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutNavigationRail.constants';

type IModifier = 'with-header';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    vars: {
      ...createTokensVars(StandardAside.theme.tokens, {
        container: {
          startSpace: appLayoutTheme.tokens.header.height,
          size: appLayoutTheme.tokens.navigationRail.width,
        },
      }),
      ...createTokensVars(NavigationRail.theme.tokens, {
        container: {
          width: appLayoutTheme.tokens.navigationRail.width,
          color: fallbackVar(
            appLayoutTheme.tokens.navigationRail.color,
            themeTokens.colorScheme.surface,
          ),
        },
        divider: {
          width: fallbackVar(
            appLayoutTheme.tokens.divider.width,
            themeTokens.outline.width.xs,
          ),
          color: fallbackVar(
            appLayoutTheme.tokens.divider.color,
            themeTokens.colorScheme.outline,
          ),
        },
      }),
    },
  },
});

export type IAppLayoutNavigationRailThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const appLayoutNavigationRailTheme =
  componentThemeFactory<IAppLayoutNavigationRailThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
