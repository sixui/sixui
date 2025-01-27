import { em } from './styles/em';
import { getNumericPixelValue } from './styles/getNumericPixelValue';

export const getMaxWidthMinusEpsilon = (
  maxWidth: string,
): string | undefined => {
  const isPx = maxWidth.includes('px');
  const pxValue = getNumericPixelValue(maxWidth);
  if (!pxValue) {
    return undefined;
  }

  const epsilon = 0.1;
  const maxWidthMinusEpsilon = isPx
    ? `${pxValue - epsilon}px`
    : em(pxValue - epsilon);

  return maxWidthMinusEpsilon;
};
