import type { IMaybeAsync } from './types';

export interface IExecuteLazyPromiseOptions {
  minDuration?: number;
  resetEvent?: 'always' | 'success' | 'error';
}

const defaultOptions = {
  minDuration: 10,
  resetEvent: 'always',
};

export const executeLazyPromise = (
  promise: () => IMaybeAsync<unknown>,
  onLoadingChange: (loading: boolean) => void,
  optionsProp?: IExecuteLazyPromiseOptions,
): Promise<unknown> => {
  const options = {
    ...defaultOptions,
    ...optionsProp,
  };

  if (!options.minDuration) {
    return Promise.resolve(promise());
  }

  const timeout = setTimeout(() => {
    onLoadingChange(true);
  }, options.minDuration);

  return Promise.resolve(promise())
    .then(() => {
      if (options.resetEvent === 'success') {
        onLoadingChange(false);
      }
    })
    .catch(() => {
      if (options.resetEvent === 'error') {
        onLoadingChange(false);
      }
    })
    .finally(() => {
      clearTimeout(timeout);

      if (options.resetEvent === 'always') {
        onLoadingChange(false);
      }
    });
};
