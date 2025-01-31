import type { IRange } from '~/utils/types';

export const random = (range: IRange, floating?: boolean): number => {
  const randomValue = Math.random() * (range.max - range.min) + range.min;

  return floating ? randomValue : Math.floor(randomValue);
};
