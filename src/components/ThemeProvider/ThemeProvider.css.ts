import { createThemeContract, style } from '@vanilla-extract/css';

import { defaultTheme } from './defaultTheme';

const { colorScheme, ...otherTokens } = defaultTheme.tokens;

export const themeTokens = createThemeContract({
  ...otherTokens,
  colorScheme: colorScheme.light,
});

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
