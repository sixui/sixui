import type { IArrayElement, IZeroOrMore } from './types';
import { asArray } from '@olivierpascal/helpers';

export const asFlatArray = <T>(
  zeroOrMore: Array<IZeroOrMore<IArrayElement<T>>>,
): Array<IArrayElement<T> | undefined> =>
  asArray(zeroOrMore).flat() as Array<IArrayElement<T> | undefined>;
