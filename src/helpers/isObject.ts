import type { IAny } from './types';

export const isObject = (value: IAny): value is Record<string, IAny> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
