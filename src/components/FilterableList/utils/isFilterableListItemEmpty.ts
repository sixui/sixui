import type { IFilterableListItem } from '../FilterableList.types';

/**
 * Checks if a list item is a placeholder for an empty value. Used, for example,
 * to determine if we should hide or show the "clear" button.
 */
export const isFilterableListItemEmpty = (item: IFilterableListItem): boolean =>
  !item.value;
