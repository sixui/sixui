import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { NavigationRailContent } from '~/components/NavigationRail/NavigationRailContent';
import { StandardAside } from '~/components/StandardAside';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './NavigationRail.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    vars: overrideTokens(StandardAside.theme.tokens, {
      container: {
        size: tokens.container.width,
      },
    }),
  },
  navigationRailContent: {
    height: '100%',
    width: tokens.container.width,

    vars: overrideTokens(NavigationRailContent.theme.tokens, {
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
