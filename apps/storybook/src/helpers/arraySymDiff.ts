import { arrayDiff } from './arrayDiff';

export const arraySymDiff = <T>(a: Array<T>, b: Array<T>): Array<T> => {
  return arrayDiff(a, b).concat(arrayDiff(b, a));
};
