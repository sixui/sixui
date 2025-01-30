import { themeTokens } from '~/components/ThemeProvider';
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
    return `calc(${value} * ${themeTokens.scale})`;
  }

  return `calc(${numericValue}px * ${themeTokens.scale})`;
};
