import {
  createTheme,
  createThemeContract,
  layer,
  style,
} from '@vanilla-extract/css';

import { defaultTheme } from './defaultTheme';

const RESET_CSS_LAYER = 'reset';

export const cssLayers = {
  base: layer({ parent: RESET_CSS_LAYER }, 'base'),
  theme: layer('theme'),
  components: layer('components'),
  sprinkles: layer('sprinkles'),
};

const { colorScheme, ...otherTokens } = defaultTheme.tokens;
const defaultThemeTokens = {
  ...otherTokens,
  colorScheme: colorScheme.light,
};

export const themeTokens = createThemeContract(defaultThemeTokens);

export const themeTokensClassName = createTheme(themeTokens, {
  '@layer': cssLayers.theme,
  ...defaultThemeTokens,
});

export const styles = {
  root: style({
    '@layer': {
      [cssLayers.theme]: {
        color: themeTokens.colorScheme.onSurface,
        '@media': {
          '(pointer: fine)': {
            scrollbarColor: `${themeTokens.colorScheme.primary} transparent`,
          },
        },
      },
    },
  }),
};
