import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { ModalAside } from '~/components/ModalAside';
import { StandardAside } from '~/components/StandardAside';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './SideSheet.constants';
import { SideSheetContent } from './SideSheetContent';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    width: px(360),
    color: themeTokens.colorScheme.surface,
    elevation: elevationLevelPreset[0],
  },
});

const classNames = createStyles({
  root: {
    vars: {
      ...overrideTokens(ModalAside.theme.tokens, {
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
        elevation: tokens.container.elevation,
      },
    }),
  },
});

export type ISideSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const sideSheetTheme = componentThemeFactory<ISideSheetThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
