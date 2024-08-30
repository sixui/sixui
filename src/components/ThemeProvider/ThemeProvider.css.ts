import { createTheme, createThemeContract, style } from '@vanilla-extract/css';

import { defaultTheme } from './defaultTheme';

const { colorScheme, ...otherTokens } = defaultTheme.tokens;
const defaultThemeTokens = {
  ...otherTokens,
  colorScheme: colorScheme.light,
};

export const themeTokens = createThemeContract(defaultThemeTokens);

export const themeTokensClassName = createTheme(
  themeTokens,
  defaultThemeTokens,
);

export const styles = {
  root: style({
    color: themeTokens.colorScheme.onSurface,
    '@media': {
      '(pointer: fine)': {
        scrollbarColor: `${themeTokens.colorScheme.primary} transparent`,
      },
    },
  }),
};
