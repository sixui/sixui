import type { IAny } from './types';
import { isObject } from './isObject';

export const deepMerge = <T extends object>(
  target: T,
  ...sources: Array<IAny>
): T => {
  const result: Record<string, IAny> = { ...target };

  sources
    .filter((source) => !!source)
    .forEach((source) => {
      if (!isObject(source)) {
        return;
      }

      const anySource: Record<string, IAny> = source;

      Object.keys(anySource).forEach((key) => {
        if (isObject(anySource[key])) {
          if (!(key in target)) {
            result[key] = anySource[key];
          } else {
            result[key] = deepMerge(result[key], anySource[key]);
          }
        } else {
          result[key] = anySource[key];
        }
      });
    });

  return result as T;
};
