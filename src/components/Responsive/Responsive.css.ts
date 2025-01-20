import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { CSS_FALSE, CSS_TRUE } from '~/helpers/styles/constants';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  windowSizeClass: {
    compact: {
      on: CSS_FALSE,
      off: CSS_TRUE,
      gte: CSS_FALSE,
      lt: CSS_FALSE,
    },
    medium: {
      on: CSS_FALSE,
      off: CSS_TRUE,
      gte: CSS_FALSE,
      lt: CSS_FALSE,
    },
    expanded: {
      on: CSS_FALSE,
      off: CSS_TRUE,
      gte: CSS_FALSE,
      lt: CSS_FALSE,
    },
    large: {
      on: CSS_FALSE,
      off: CSS_TRUE,
      gte: CSS_FALSE,
      lt: CSS_FALSE,
    },
    extraLarge: {
      on: CSS_FALSE,
      off: CSS_TRUE,
      gte: CSS_FALSE,
      lt: CSS_FALSE,
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
