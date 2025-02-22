import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { DrawerAside } from '~/components/DrawerAside';
import { SideSheetContent } from '~/components/SideSheet/SideSheetContent';
import { StandardAside } from '~/components/StandardAside';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './StandardSideSheet.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    width: px(360),
    color: themeTokens.colorScheme.surface,
  },
});

const classNames = createStyles({
  root: {
    vars: {
      ...overrideTokens(DrawerAside.theme.tokens, {
        container: {
          width: tokens.container.width,
        },
      }),
      ...overrideTokens(StandardAside.theme.tokens, {
        container: {
          size: tokens.container.width,
        },
      }),
    },
  },
  sideSheetContent: {
    width: '100%',

    vars: overrideTokens(SideSheetContent.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),
  },
});

export type IStandardSideSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const standardSideSheetTheme =
  componentThemeFactory<IStandardSideSheetThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
