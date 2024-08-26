import { calc } from '@vanilla-extract/css-utils';

import {
  themeTokens,
  type IThemeSpacingGridSize,
} from '~/components/ThemeProvider';

export const space = (
  value: number,
  gridSize: IThemeSpacingGridSize = 'md',
): string => calc.multiply(value, themeTokens.spacing.grid[gridSize]);
