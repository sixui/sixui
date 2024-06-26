import { useRef } from 'react';
import { isFunction } from 'lodash';

import { useControlledValue } from '@/hooks/useControlledValue';
import {
  executeItemsEqual,
  IItemModifiers,
  renderFilteredItems,
  type IItemListRendererProps,
  type IListItemsProps,
} from './ListItemProps';

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/components/query-list/queryList.tsx

export type IQueryListRenderer<TItem> = (
  listProps: IQueryListRendererProps<TItem>,
) => React.ReactNode;

export type IQueryListProps<TItem> = IListItemsProps<TItem> & {
  /**
   * Customize rendering of the component.
   * Receives an object with props that should be applied to elements as necessary.
   */
  renderer: IQueryListRenderer<TItem>;

  /**
   * Whether the list is disabled.
   *
   * @defaultValue false
   */
  disabled?: boolean;
};

/**
 * An object describing how to render a `QueryList`.
 * A `QueryList` `renderer` receives this object as its sole argument.
 */
export type IQueryListRendererProps<TItem> = Pick<
  IQueryListState<TItem>,
  'filteredItems' | 'query'
> & {
  /**
   * Change handler for query string. Attach this to an input element to allow
   * `QueryList` to control the query.
   */
  handleQueryChange: React.ChangeEventHandler<HTMLInputElement>;

  /** Rendered elements returned from `itemListRenderer` prop. */
  itemList: React.ReactNode;

  disabled?: boolean;

  inputFilterRef?: React.Ref<HTMLInputElement>;
  inputFilterAttributes?: React.HTMLAttributes<HTMLInputElement>;
};

/** Exported for testing, not part of public API */
export type IQueryListState<TItem> = {
  /**
   * The item returned from `createNewItemFromQuery(this.state.query)`, cached
   * to avoid continuous reinstantions within `isCreateItemRendered`, where
   * this element will be used to hide the "Create Item" option if its value
   * matches the current `query`.
   */
  createNewItem: TItem | Array<TItem> | undefined;

  /** The original `items` array filtered by `itemListPredicate` or `itemPredicate`. */
  filteredItems: Array<TItem>;

  /** The current query string. */
  query: string;
};

const getFilteredItems = <TItem,>(
  query: string,
  { items, itemPredicate, itemListPredicate }: IQueryListProps<TItem>,
): Array<TItem> => {
  if (itemListPredicate) {
    // note that implementations can reorder the items here
    return itemListPredicate(query, items);
  } else if (itemPredicate) {
    return items.filter((item, index) => itemPredicate(query, item, index));
  }

  return items;
};

const isItemDisabled = <TItem,>(
  item: TItem | null,
  index: number,
  itemDisabled?: IListItemsProps<TItem>['itemDisabled'],
): boolean => {
  if (itemDisabled == null || item == null) {
    return false;
  } else if (isFunction(itemDisabled)) {
    return itemDisabled(item, index);
  }
  return !!item[itemDisabled];
};

export const QueryList = <TItem,>(
  props: IQueryListProps<TItem>,
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
  } = props;
  const isCreateItemFirst = createNewItemPosition === 'first';
  const canCreateItems =
    createNewItemFromQuery != null && createNewItemRenderer != null;
  const [queryValue, setQuery] = useControlledValue({
    controlled: queryProp,
    default: defaultQuery,
    name: 'QueryList',
  });
  const query = queryValue ?? '';
  const filteredItemsRef = useRef<Array<TItem>>(getFilteredItems(query, props));
  const createNewItem = createNewItemFromQuery?.(query);

  const renderItemList = (
    listProps: IItemListRendererProps<TItem>,
  ): React.ReactNode => {
    // omit noResults if createNewItemFromQuery and createNewItemRenderer are both supplied, and query is not empty
    const createItemView = listProps.renderCreateItem();
    const maybeNoResults = createItemView != null ? null : noResults;
    const menuContent = renderFilteredItems(
      listProps,
      maybeNoResults,
      initialContent,
    );
    if (menuContent == null && createItemView == null) {
      return undefined;
    }

    const createFirst = isCreateItemFirst;

    return (
      <>
        {createFirst && createItemView}
        {menuContent}
        {!createFirst && createItemView}
      </>
    );
  };
  const itemListRenderer = props.itemListRenderer ?? renderItemList;

  const wouldCreatedItemMatchSomeExistingItem = (
    createNewItem?: TItem | Array<TItem>,
  ): boolean => {
    // search only the filtered items, not the full items list, because we
    // only need to check items that match the current query.
    return filteredItemsRef.current.some((item) => {
      const newItems = Array.isArray(createNewItem)
        ? createNewItem
        : [createNewItem];

      return newItems.some((newItem) =>
        executeItemsEqual(itemsEqual, item, newItem),
      );
    });
  };

  const isCreateItemRendered = (
    createNewItem?: TItem | Array<TItem>,
  ): boolean => {
    return (
      canCreateItems &&
      query !== '' &&
      // this check is unfortunately O(N) on the number of items, but
      // alas, hiding the "Create Item" option when it exactly matches an
      // existing item is much clearer.
      !wouldCreatedItemMatchSomeExistingItem(createNewItem)
    );
  };

  const renderCreateItemMenuItem = (): React.ReactNode => {
    if (!query) {
      return undefined;
    }

    if (isCreateItemRendered(createNewItem)) {
      const trimmedQuery = query.trim();

      return createNewItemRenderer?.({
        index: filteredItemsRef.current.length,
        query: trimmedQuery,
        modifiers: {
          active: false,
          selected: false,
          disabled: false,
          matchesPredicate: false,
        },
      });
    }

    return null;
  };

  const renderItem = (item: TItem, index: number): React.ReactNode => {
    if (disabled !== true) {
      const modifiers: IItemModifiers = {
        active: false,
        selected: false,
        disabled: isItemDisabled(item, index, itemDisabled),
        matchesPredicate: filteredItemsRef.current.indexOf(item) >= 0,
      };

      return itemRenderer(item, {
        index,
        modifiers,
        query,
      });
    }

    return null;
  };

  return renderer({
    filteredItems: filteredItemsRef.current,
    query: query ?? '',
    itemList: itemListRenderer({
      filteredItems: filteredItemsRef.current,
      query: query ?? '',
      items,
      renderCreateItem: renderCreateItemMenuItem,
      renderItem,
    }),
    handleQueryChange: (event) => {
      const newQuery = event.target.value;
      setQuery(newQuery);
      filteredItemsRef.current = getFilteredItems(newQuery, props);
      onQueryChange?.(newQuery, event);
    },
    disabled,
  });
};
