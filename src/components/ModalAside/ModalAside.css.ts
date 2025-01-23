import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: px(360),
    color: themeTokens.colorScheme.surface,
  },
});

const classNames = createStyles({
  root: {
    width: `min(${tokens.container.width}, 100vw - ${px(48)})`,
  },
});

export type IModalAsideThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const modalAsideTheme = componentThemeFactory<IModalAsideThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
