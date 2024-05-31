import type { IRange } from './types';

export const randomInRange = (
  { min, max }: IRange,
  floating?: boolean,
): number => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return floating ? rand : Math.round(rand);
};
