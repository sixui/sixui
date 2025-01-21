import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  header: {
    height: px(64),
  },
  navigationRail: {
    width: px(80),
  },
  navigationDrawer: {
    width: px(360),
  },
  aside: {
    width: px(400),
  },
  footer: {
    height: px(64),
  },
  divider: {
    width: px(themeTokens.outline.width.xs),
    color: themeTokens.colorScheme.outline,
  },
});

const classNames = createStyles();

export type IAppLayoutThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const appLayoutTheme = componentThemeFactory<IAppLayoutThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
