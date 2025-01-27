import { em } from '~/helpers/styles/em';
import { getNumericPixelValue } from '~/helpers/styles/getNumericPixelValue';

export const getBreakpointPlusEpsilon = (
  breakpoint: string,
  epsilon = 0.1,
): string => {
  const isPxBreakpoint = breakpoint.includes('px');
  const pxValue = getNumericPixelValue(breakpoint);
  if (!pxValue) {
    throw new Error(`sixui: Invalid breakpoint value: ${breakpoint}`);
  }

  const pxValuePlusEpsilon = pxValue + epsilon;
  const breakpointPlusEpsilon = isPxBreakpoint
    ? `${pxValuePlusEpsilon}px`
    : em(pxValuePlusEpsilon);

  return breakpointPlusEpsilon;
};
