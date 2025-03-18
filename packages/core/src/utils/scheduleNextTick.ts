import type { IAny } from './types';

export const scheduleNextTick = (
  callback: (...args: Array<IAny>) => void,
): (() => void) => {
  const handle = setTimeout(() => {
    callback();
  }, 0);

  return () => {
    clearTimeout(handle);
  };
};
