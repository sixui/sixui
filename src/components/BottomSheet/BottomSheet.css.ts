import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { BottomSheetContent } from '../BottomSheetContent';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.bottomSheet.width, '100%'),
    color: fallbackVar(
      appLayoutTheme.tokens.aside.color,
      themeTokens.colorScheme.surfaceContainerLow,
    ),
  },
});

const classNames = createStyles({
  root: {
    height: '100%',
    width: tokens.container.width,

    vars: createTokensVars(BottomSheetContent.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),
  },
  wrapper: {
    width: '100%',
    height: 'min-content',
  },
  transitionContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: tokens.container.width,
    border: '2px solid red',
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
