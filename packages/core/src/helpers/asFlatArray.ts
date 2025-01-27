import { asArray } from '@olivierpascal/helpers';

import type { IArrayElement, IZeroOrMore } from './types';

export const asFlatArray = <T>(
  zeroOrMore: Array<IZeroOrMore<IArrayElement<T>>>,
): Array<IArrayElement<T> | undefined> =>
  asArray(zeroOrMore).flat() as Array<IArrayElement<T> | undefined>;
