import type { IFilterableListItem } from '../FilterableList.types';

/**
 * Compares two items for equality.
 */
export const areFilterableListItemsEqual = (
  itemA: IFilterableListItem,
  itemB: IFilterableListItem,
): boolean => itemA.value === itemB.value;
