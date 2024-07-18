import type { IAny } from './types';

export const isObject = (value: IAny): value is object => {
  const type = typeof value;

  return value !== null && (type === 'object' || type === 'function');
};
