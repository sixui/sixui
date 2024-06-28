import {
  executeFilteredItemsEqual,
  type IFilteredItemsEqualProp,
} from '@/components/utils/FilteredList';

export const arrayContainsItem = <TItem>(
  itemsEqualProp: IFilteredItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  itemToFind: TItem,
): boolean =>
  items.some((item: TItem) =>
    executeFilteredItemsEqual(itemsEqualProp, item, itemToFind),
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
  itemsEqualProp: IFilteredItemsEqualProp<TItem> | undefined,
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
  itemsEqualProp: IFilteredItemsEqualProp<TItem> | undefined,
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
