import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { SideSheetContent } from '../SideSheetContent';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'expanded' | 'detached' | 'modal';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.aside.width, px(360)),
    color: fallbackVar(
      appLayoutTheme.tokens.aside.color,
      themeTokens.colorScheme.surface,
    ),
  },
});

const classNames = createStyles({
  sideSheetContent: {
    height: '100%',
    width: tokens.container.width,

    vars: createTokensVars(SideSheetContent.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('modal')]: {
        width: `min(${tokens.container.width}, 100vw - ${px(48)})`,
      },
    },
  },
});

export type IModalSideSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const modalSideSheetTheme =
  componentThemeFactory<IModalSideSheetThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
