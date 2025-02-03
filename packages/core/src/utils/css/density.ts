import { calc } from '@vanilla-extract/css-utils';

import type { IRange } from '~/utils/types';
import { themeTokens } from '~/components/Theme';

export const density = (scaleRange?: IRange): string =>
  calc.multiply(
    themeTokens.density.interval,
    scaleRange
      ? `clamp(${scaleRange.min}, ${themeTokens.density.scale}, ${scaleRange.max})`
      : themeTokens.density.scale,
  );
