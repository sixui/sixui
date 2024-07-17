import type { IAny } from './types';

export const isObject = (value: IAny): value is object => {
  return value !== null && typeof value === 'object';
};
