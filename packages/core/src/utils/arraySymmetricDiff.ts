import { arrayDiff } from './arrayDiff';

export const arraySymmetricDiff = <T>(a: Array<T>, b: Array<T>): Array<T> =>
  arrayDiff(a, b).concat(arrayDiff(b, a));
