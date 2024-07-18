import type { IAny } from './types';

export const isObject = (value: IAny): value is object =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
