import { isFunction } from 'lodash';

import type { IAny } from '@/helpers/types';
import type {
  IFilterableListItemsEqualProp,
  IFilterableListBaseInternalRendererProps,
} from './FilterableListBase.types';

/**
 * Utility function for executing the {@link IFilterableListBaseProps#itemsEqual} prop
 * to test for equality between two items.
 *
 * @returns `true` if the two items are equivalent according to
 * `itemsEqualProp`.
 */
export const executeFilterableItemsEqual = <TItem>(
  itemsEqualProp: IFilterableListItemsEqualProp<TItem> | undefined,
  itemA: TItem | null | undefined,
  itemB: TItem | null | undefined,
): boolean => {
  // Use strict equality if:
  // A) Default equality check is necessary because itemsEqualProp is undefined.
  // OR
  // B) Either item is null/undefined. Note that null represents "no item", while
  //    undefined represents an uncontrolled prop. This strict equality check ensures
  //    nothing will ever be considered equivalent to an uncontrolled prop.
  if (itemsEqualProp === undefined || itemA == null || itemB == null) {
    return itemA === itemB;
  }

  if (isFunction(itemsEqualProp)) {
    // itemsEqualProp is an equality comparator function, so use it
    return itemsEqualProp(itemA, itemB);
  } else {
    // itemsEqualProp is a property name, so strictly compare the values of the property.
    return itemA[itemsEqualProp] === itemB[itemsEqualProp];
  }
};

/**
 * `IFilterableListBaseInternalRenderer` helper method for rendering each item in
 * `filteredItems`, with optional support for `noResults` (when filtered items
 * is empty) and `initialContent` (when query is empty).
 *
 * @param props - Props describing how to render the filtered list.
 * @param noResults - React content to render when filtering items returns zero
 * results.
 * @param initialContent - React content to render when query is empty. If
 * omitted, all items will be rendered (or result of `listPredicate` with
 * empty query). If explicit `null`, nothing will be rendered when query is
 * empty.
 */
export const renderFilterableItems = (
  props: IFilterableListBaseInternalRendererProps<IAny>,
  noResults?: React.ReactNode,
  initialContent?: React.ReactNode | null,
): React.ReactNode => {
  if (!props.query?.length && initialContent !== undefined) {
    return initialContent;
  }

  const items = props.filteredItems
    .map(props.renderItem)
    .filter((item) => item != null);

  return items.length > 0 ? items : noResults;
};

export const arrayContainsItem = <TItem>(
  itemsEqualProp: IFilterableListItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  itemToFind: TItem,
): boolean =>
  items.some((item: TItem) =>
    executeFilterableItemsEqual(itemsEqualProp, item, itemToFind),
  );

export const addItemToArray = <TItem>(
  items: Array<TItem>,
  itemToAdd: TItem,
): Array<TItem> => [...items, itemToAdd];

export const deleteItemFromArray = <TItem>(
  items: Array<TItem>,
  itemToDelete: TItem,
): Array<TItem> => items.filter((item) => item !== itemToDelete);

export const maybeAddCreatedItemToArrays = <TItem>(
  itemsEqualProp: IFilterableListItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  createdItems: Array<TItem>,
  item: TItem,
): { createdItems: Array<TItem>; items: Array<TItem> } => {
  const isNewlyCreatedItem = !arrayContainsItem(itemsEqualProp, items, item);

  return {
    createdItems: isNewlyCreatedItem
      ? addItemToArray(createdItems, item)
      : createdItems,
    // Add a created item to `items` so that the item can be deselected.
    items: isNewlyCreatedItem ? addItemToArray(items, item) : items,
  };
};

export const maybeDeleteCreatedItemFromArrays = <TItem>(
  itemsEqualProp: IFilterableListItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  createdItems: Array<TItem>,
  item: TItem | undefined,
): { createdItems: Array<TItem>; items: Array<TItem> } => {
  if (item === undefined) {
    return {
      createdItems,
      items,
    };
  }

  const wasItemCreatedByUser = arrayContainsItem(
    itemsEqualProp,
    createdItems,
    item,
  );

  // Delete the item if the user manually created it.
  return {
    createdItems: wasItemCreatedByUser
      ? deleteItemFromArray(createdItems, item)
      : createdItems,
    items: wasItemCreatedByUser ? deleteItemFromArray(items, item) : items,
  };
};
