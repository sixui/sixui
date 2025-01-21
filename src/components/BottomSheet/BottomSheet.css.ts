import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { BottomSheetContent } from '../BottomSheetContent';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  // container: {
  //   width: fallbackVar(appLayoutTheme.tokens.bottomSheet.width, '100%'),
  //   color: fallbackVar(
  //     appLayoutTheme.tokens.aside.color,
  //     themeTokens.colorScheme.surfaceContainerLow,
  //   ),
  // },
});

const classNames = createStyles({
  root: {
    height: px(196),
    width: '100%',
  },
  wrapper: {
    //
  },
});

export type IBottomSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const bottomSheetTheme = componentThemeFactory<IBottomSheetThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
