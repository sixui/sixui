import type { StyleRule } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IThemeTypeScaleStyle } from '~/components/ThemeProvider';
import { themeTokens } from '~/components/ThemeProvider';

export const getTypographyStyles = (
  typography: IThemeTypeScaleStyle | null,
): StyleRule =>
  typography
    ? {
        fontFamily: typography.family,
        lineHeight: calc.multiply(typography.lineHeight, themeTokens.scale),
        fontSize: calc.multiply(typography.size, themeTokens.scale),
        letterSpacing: calc.multiply(
          typography.letterSpacing,
          themeTokens.scale,
        ),
        fontWeight: typography.weight,
      }
    : {
        fontFamily: 'unset',
        lineHeight: 'unset',
        fontSize: 'unset',
        letterSpacing: 'unset',
        fontWeight: 'unset',
      };
