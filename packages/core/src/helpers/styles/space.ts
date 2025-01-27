import { calc } from '@vanilla-extract/css-utils';

import { themeTokens } from '~/components/ThemeProvider';

export const space = (value: number): string =>
  calc.multiply(value, themeTokens.spacing.gridSize);
