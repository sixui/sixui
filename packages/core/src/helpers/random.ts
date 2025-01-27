import type { IRange } from './types';

export const random = (range: IRange, floating?: boolean): number => {
  const randomValue = Math.random() * (range.max - range.min) + range.min;

  return floating ? randomValue : Math.floor(randomValue);
};
