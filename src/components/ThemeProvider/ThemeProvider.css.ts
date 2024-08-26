import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { defaultTheme } from './defaultTheme';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const { colorScheme, ...other } = defaultTheme;

export const themeTokens = createThemeContract(other);

export const themeClass = createTheme(themeTokens, other);
