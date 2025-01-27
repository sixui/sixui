import type { IMaybeAsync } from './types';

export const executeLazyPromise = (
  promise: () => IMaybeAsync<unknown>,
  onLoadingChange: (loading: boolean) => void,
  minDuration = 10,
): Promise<unknown> => {
  if (!minDuration) {
    return Promise.resolve(promise());
  }

  const timeout = setTimeout(() => {
    onLoadingChange(true);
  }, minDuration);

  return Promise.resolve(promise()).finally(() => {
    clearTimeout(timeout);
    onLoadingChange(false);
  });
};
