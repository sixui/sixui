import type { IAny } from './types';

export const isFunction = (
  value: unknown,
): value is (...args: Array<IAny>) => IAny => typeof value === 'function';
