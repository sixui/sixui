import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { NavigationRail } from '~/components/NavigationRail';
import { StandardAside } from '~/components/StandardAside';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutNavigationRail.constants';

type IModifier = 'with-header';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    vars: {
      ...overrideTokens(StandardAside.theme.tokens, {
        container: {
          startSpace: appLayoutTheme.tokens.header.height,
          size: fallbackVar(appLayoutTheme.tokens.navigationRail.width, px(80)),
        },
      }),
      ...overrideTokens(NavigationRail.theme.tokens, {
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
