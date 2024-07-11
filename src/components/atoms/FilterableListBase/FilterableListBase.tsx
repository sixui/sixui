import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

import type {
  IFilterableListItemModifiers,
  IFilterableListBaseInternalRenderer,
  IFilterableListBaseProps,
} from './FilterableListBaseProps';
import { useControlledValue } from '@/hooks/useControlledValue';
import { usePrevious } from '@/hooks/usePrevious';
import {
  executeFilterableItemsEqual,
  renderFilterableItems,
} from './FilterableListBaseUtils';

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/components/query-list/FilterableList.tsx

const getFilterableItems = <TItem, TElement extends HTMLElement>(
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

const isItemDisabled = <TItem, TElement extends HTMLElement>(
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

export const FilterableListBase = <
  TItem,
  TElement extends HTMLElement = HTMLElement,
>(
  props: IFilterableListBaseProps<TItem, TElement>,
): React.ReactNode => {
  const {
    items,
    query: queryProp,
    defaultQuery,
    createNewItemPosition,
    createNewItemFromQuery,
    createNewItemRenderer,
    itemsEqual,
    disabled,
    itemDisabled,
    itemRenderer,
    initialContent,
    noResults,
    renderer,
    onQueryChange,
    onItemSelect,
    itemPredicate,
    listPredicate,
  } = props;
  const isCreateItemFirst = createNewItemPosition === 'first';
  const canCreateItems = !!createNewItemFromQuery && !!createNewItemRenderer;
  const [query, setQuery] = useControlledValue({
    controlled: queryProp,
    default: defaultQuery ?? '',
    name: 'FilterableListBase',
  });
  const [filteredItems, setFilterableItems] = useState<Array<TItem>>(
    getFilterableItems(query, {
      items,
      itemPredicate,
      listPredicate,
    }),
  );

  const previousQuery = usePrevious(query);
  useEffect(() => {
    if (previousQuery !== undefined && previousQuery !== query) {
      setFilterableItems(
        getFilterableItems(query, {
          items,
          itemPredicate,
          listPredicate,
        }),
      );
    }
  }, [previousQuery, query, items, itemPredicate, listPredicate]);

  const defaultListRenderer: IFilterableListBaseInternalRenderer<TItem> = (
    listProps,
  ): React.ReactNode => {
    // Omit noResults if createNewItemFromQuery and createNewItemRenderer are
    // both supplied, and query is not empty.
    const createItemView = listProps.renderCreateItem();
    const maybeNoResults = createItemView != null ? null : noResults;
    const menuContent = renderFilterableItems(
      listProps,
      maybeNoResults,
      initialContent,
    );
    if (menuContent == null && createItemView == null) {
      return undefined;
    }

    return (
      <>
        {isCreateItemFirst && createItemView}
        {menuContent}
        {!isCreateItemFirst && createItemView}
      </>
    );
  };
  const itemListRenderer = props.listRenderer ?? defaultListRenderer;

  // Search only the filtered items, not the full items list, because we
  // only need to check items that match the current query.
  const wouldCreatedItemMatchSomeExistingItem = (
    createNewItem: TItem | Array<TItem>,
  ): boolean =>
    filteredItems.some((item) => {
      const newItems = Array.isArray(createNewItem)
        ? createNewItem
        : [createNewItem];

      return newItems.some((newItem) =>
        executeFilterableItemsEqual(itemsEqual, item, newItem),
      );
    });

  const isCreateItemRendered = (createNewItem: TItem | Array<TItem>): boolean =>
    canCreateItems &&
    !!query?.length &&
    // this check is unfortunately O(N) on the number of items, but
    // alas, hiding the "Create Item" option when it exactly matches an
    // existing item is much clearer.
    !wouldCreatedItemMatchSomeExistingItem(createNewItem);

  const handleQueryChange = (
    newQuery: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (query === newQuery) {
      return;
    }

    setQuery(newQuery);
    onQueryChange?.(newQuery, event);
  };

  const renderCreateItem = (): React.JSX.Element | null | undefined => {
    if (!query) {
      return undefined;
    }

    const createNewItem = createNewItemFromQuery?.(query);
    if (!createNewItem || !isCreateItemRendered(createNewItem)) {
      return null;
    }

    const trimmedQuery = query.trim();
    const modifiers: IFilterableListItemModifiers = {
      active: false,
      selected: false,
      disabled: false,
      matchesPredicate: false,
    };

    return createNewItemRenderer?.({
      index: filteredItems.length,
      modifiers,
      query: trimmedQuery,
      handleClick: (event) => onItemSelect(createNewItem, event),
      getButtonAttributes: (userProps) => ({ ...userProps }),
    });
  };

  const renderItem = (item: TItem, index: number): React.ReactNode => {
    const modifiers: IFilterableListItemModifiers = {
      active: false,
      selected: false,
      disabled: disabled || isItemDisabled(item, index, itemDisabled),
      matchesPredicate: filteredItems.indexOf(item) >= 0,
    };

    return itemRenderer(item, {
      index,
      modifiers,
      query,
      handleClick: (event) => onItemSelect(item, event),
      getButtonAttributes: (userProps) => ({ ...userProps }),
    });
  };

  return renderer({
    filteredItems,
    query,
    filteredList: itemListRenderer({
      filteredItems,
      query,
      items,
      renderCreateItem,
      renderItem,
    }),
    handleQueryChange: (event) => handleQueryChange(event.target.value),
    disabled,
    getInputFilterProps: (userProps) => ({ ...userProps }),
  });
};
