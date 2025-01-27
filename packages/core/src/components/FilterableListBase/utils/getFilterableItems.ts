import type { IFilterableListBaseProps } from '../FilterableListBase.types';

export const getFilterableItems = <TItem, TElement extends HTMLElement>(
  query: string | undefined,
  itemsProps: Pick<
    IFilterableListBaseProps<TItem, TElement>,
    'items' | 'itemPredicate' | 'listPredicate'
  >,
): Array<TItem> => {
  if (!query) {
    return itemsProps.items;
  }

  if (itemsProps.listPredicate) {
    // note that implementations can reorder the items here
    return itemsProps.listPredicate(itemsProps.items, query);
  } else if (itemsProps.itemPredicate) {
    return itemsProps.items.filter((item, index) =>
      itemsProps.itemPredicate?.(item, query, index),
    );
  }

  return itemsProps.items;
};
