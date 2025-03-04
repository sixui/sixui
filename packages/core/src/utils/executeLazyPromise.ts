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
  maybePromise: () => IMaybeAsync<unknown>,
  onLoadingChange: (loading: boolean) => void,
  optionsProp?: IExecuteLazyPromiseOptions,
): Promise<unknown> => {
  const options = {
    ...defaultOptions,
    ...optionsProp,
  };

  if (!options.minDuration) {
    return Promise.resolve(maybePromise()).catch((error: unknown) => {
      throw error;
    });
  }

  const timeout = setTimeout(() => {
    onLoadingChange(true);
  }, options.minDuration);

  return Promise.resolve(maybePromise())
    .then(() => {
      if (options.resetEvent === 'success') {
        onLoadingChange(false);
      }
    })
    .catch((error: unknown) => {
      if (options.resetEvent === 'error') {
        onLoadingChange(false);
      }

      throw error;
    })
    .finally(() => {
      clearTimeout(timeout);

      if (options.resetEvent === 'always') {
        onLoadingChange(false);
      }
    });
};
