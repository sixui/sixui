import { calc } from '@vanilla-extract/css-utils';

import { themeTokens } from '~/components/Theme';
import { getNumericPixelValue } from './getNumericPixelValue';

export const px = (value: number | string): string => {
  if (
    typeof value === 'string' &&
    ['auto', 'inherit', 'unset'].includes(value)
  ) {
    return value;
  }

  const numericValue = getNumericPixelValue(value);

  if (numericValue === 0) {
    return '0px';
  }

  if (numericValue === undefined) {
    return calc.multiply(value, themeTokens.scale);
  }

  return calc.multiply(`${numericValue}px`, themeTokens.scale);
};
