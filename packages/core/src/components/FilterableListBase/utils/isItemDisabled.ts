import type { IFilterableListBaseProps } from '../FilterableListBase.types';
import { isFunction } from '~/utils/isFunction';

export const isItemDisabled = <TItem, TElement extends HTMLElement>(
  item: TItem | null,
  index: number,
  itemDisabled?: IFilterableListBaseProps<TItem, TElement>['itemDisabled'],
): boolean => {
  if (itemDisabled == null || item == null) {
    return false;
  } else if (isFunction(itemDisabled)) {
    return itemDisabled(item, index);
  }
  return !!item[itemDisabled];
};
