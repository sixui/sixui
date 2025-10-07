import type { IAny } from '~/utils/types';

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
export const chain =
  (...callbacks: Array<IAny>): ((...args: Array<IAny>) => void) =>
  (...args: Array<IAny>) => {
    for (const callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args);
      }
    }
  };
