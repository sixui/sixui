import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { defaultTheme } from '../ThemeProvider/defaultTheme';

export const colorSchemeTokens = createThemeContract(
  defaultTheme.colorScheme.light,
);

export const lightColorSchemeTheme2 = createTheme(
  colorSchemeTokens,
  defaultTheme.colorScheme.light,
);

export const darkColorSchemeTheme2 = createTheme(
  colorSchemeTokens,
  defaultTheme.colorScheme.dark,
);
