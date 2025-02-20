import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { SideSheetContent } from '~/components/SideSheet/SideSheetContent';
import { StandardAside } from '~/components/StandardAside';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutNavigationDrawer.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    vars: overrideTokens(StandardAside.theme.tokens, {
      container: {
        startSpace: fallbackVar(appLayoutTheme.tokens.topBar.height, px(0)),
        size: fallbackVar(
          appLayoutTheme.tokens.navigationDrawer.width,
          px(360),
        ),
      },
    }),
  },
  sideSheetContent: {
    vars: overrideTokens(SideSheetContent.theme.tokens, {
      container: {
        color: fallbackVar(
          appLayoutTheme.tokens.navigationDrawer.color,
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
});

export type IAppLayoutNavigationDrawerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const appLayoutNavigationDrawerTheme =
  componentThemeFactory<IAppLayoutNavigationDrawerThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
