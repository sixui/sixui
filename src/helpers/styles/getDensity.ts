import { calc } from '@vanilla-extract/css-utils';

import type { IRange } from '../types';
import { themeTokens } from '~/components/ThemeProvider';

export const getDensity = (scaleRange?: IRange): string =>
  calc.multiply(
    themeTokens.density.interval,
    scaleRange
      ? `clamp(${scaleRange.min}, ${themeTokens.density.scale}, ${scaleRange.max})`
      : themeTokens.density.scale,
  );
