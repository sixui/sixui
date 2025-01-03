export const arrayDiff = <T>(a: Array<T>, b: Array<T>): Array<T> =>
  a.filter((value) => !b.includes(value));
