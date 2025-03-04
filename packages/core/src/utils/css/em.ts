import { calc } from '@vanilla-extract/css-utils';

import { themeTokens } from '~/components/Theme/theme.css';

export const em = (value: number): string =>
  calc.multiply(`${value}em`, themeTokens.scale);
