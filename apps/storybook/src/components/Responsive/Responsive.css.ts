import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { cssLayers } from '~/components/ThemeProvider';
import { CSS_FALSE } from '~/helpers/styles/constants';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  windowSizeClass: {
    compact: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    medium: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    expanded: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    large: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    extraLarge: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
  },
});

const classNames = createStyles();

export type IResponsiveThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const responsiveTheme = componentThemeFactory<IResponsiveThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
