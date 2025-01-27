import type { IFilterableListItem } from '../FilterableList.types';

export const isFilterableListItemDisabled = (
  item: IFilterableListItem,
): boolean => !!item.disabled;
