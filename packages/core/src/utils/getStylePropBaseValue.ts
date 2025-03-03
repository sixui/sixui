import type { IResponsiveProp } from '~/components/Box';
import type { IAny } from './types';

export const getStylePropBaseValue = <TValue = IAny>(
  value: IResponsiveProp<TValue>,
): TValue | undefined => {
  if (typeof value === 'object' && value !== null) {
    if ('base' in value) {
      return value.base;
    }

    return undefined;
  }

  return value;
};
