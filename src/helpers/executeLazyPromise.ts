import type { IAny, IMaybeAsync } from './types';

export const executeLazyPromise = (
  promise: () => IMaybeAsync<IAny>,
  onLoadingChange: (loading: boolean) => void,
  minDuration = 10,
): Promise<IAny> => {
  if (!minDuration) {
    return Promise.resolve(promise());
  }

  const timeout = setTimeout(() => onLoadingChange(true), minDuration);

  return Promise.resolve(promise()).then(() => {
    clearTimeout(timeout);
    onLoadingChange(false);
  });
};
