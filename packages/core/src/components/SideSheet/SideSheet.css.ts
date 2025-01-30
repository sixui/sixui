import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { ModalAside } from '~/components/ModalAside';
import { StandardAside } from '~/components/StandardAside';
import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
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
      ...createTokensVars(ModalAside.theme.tokens, {
        container: {
          width: tokens.container.width,
        },
      }),
      ...createTokensVars(StandardAside.theme.tokens, {
        container: {
          size: tokens.container.width,
        },
      }),
    },
  },
  sideSheetContent: {
    width: '100%',

    vars: createTokensVars(SideSheetContent.theme.tokens, {
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

export const navigationDrawerTheme =
  componentThemeFactory<ISideSheetThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
