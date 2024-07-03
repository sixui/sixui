import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

import type {
  IFilterableItemModifiers,
  IFilterableCreateNewItemRenderer,
  IFilterableListInternalRenderer,
  IFilterableItemRenderer,
  IFilterableItemPredicate,
  IFilterableListPredicate,
  IFilterableItemsEqualProp as IFilterableItemsEqual,
  IFilterableListState,
} from './FilterableListProps';
import type { IExtendedFloatingProps } from '@/helpers/extendFloatingProps';
import { useControlledValue } from '@/hooks/useControlledValue';
import { usePrevious } from '@/hooks/usePrevious';
import {
  executeFilterableItemsEqual,
  renderFilterableItems,
} from './FilterableListUtils';

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/components/query-list/FilterableList.tsx

/**
 * An object describing how to render a `FilterableList`.
 * A `FilterableList` `renderer` receives this object as its sole argument.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListRendererProps<TItem> =
  IFilterableListState<TItem> & {
    /**
     * Change handler for query string. Attach this to an input element to allow
     * `FilterableList` to control the query.
     */
    handleQueryChange: React.ChangeEventHandler<HTMLInputElement>;

    /**
     * Rendered elements returned from `filteredListRenderer` prop.
     */
    filteredList: React.ReactNode;

    /**
     * Whether the list is disabled.
     *
     * @defaultValue false
     */
    disabled?: boolean;

    /**
     * Ref object for the input element that receives the query string.
     */
    inputFilterRef?: React.Ref<HTMLInputElement>;

    /**
     * A function that returns the props to apply to the input filter element.
     *
     * @param userProps - All event handlers you pass in should be done so through
     * the this argument. This is because your handler may be either overwritten
     * or overwrite one of the Floating UI hooks' handlers.
     */
    getInputFilterProps: (
      userProps?: IExtendedFloatingProps<React.HTMLProps<HTMLInputElement>>,
    ) => IExtendedFloatingProps<React.HTMLProps<HTMLInputElement>>;
  };

/**
 * Type alias for a function that renders the entire `FilterableList` component.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListRenderer<TItem> = (
  listProps: IFilterableListRendererProps<TItem>,
) => React.ReactNode;

/**
 * Props for `FilterableList` component.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListProps<TItem, TElement extends HTMLElement> = {
  /**
   * Unfiltered list of items to render in the list.
   */
  items: Array<TItem>;

  /**
   * Specifies how to test if two items are equal.
   *
   * By default, simple strict equality (`===`) is used to compare two items.
   *
   * If your items have a unique identifier field, simply provide the name of a
   * property on the item that can be compared with strict equality to determine
   * equivalence: `itemsEqual="id"` will check `a.id === b.id`.
   *
   * If more complex comparison logic is required, provide an equality
   * comparator function that returns `true` if the two items are equal. The
   * arguments to this function will never be `null` or `undefined`, as those
   * values are handled before calling the function.
   */
  itemsEqual?: IFilterableItemsEqual<TItem>;

  /**
   * Determine if the given item is disabled.
   *
   * Provide a callback function, or simply provide the name of a boolean
   * property on the item that exposes its disabled state.
   */
  itemDisabled?: keyof TItem | ((item: TItem, index: number) => boolean);

  /**
   * Customize querying of entire `items` array.
   *
   * Return new list of items. This method can reorder, add, or remove items at
   * will. (Supports filter algorithms that operate on the entire set, rather
   * than individual items.)
   *
   * If `itemPredicate` is also defined, this prop takes priority and the other
   * will be ignored.
   */
  listPredicate?: IFilterableListPredicate<TItem>;

  /**
   * Customize querying of individual items.
   *
   * __Filtering a list of items.__ This function is invoked to filter the list
   * of items as a query is typed. Return `true` to keep the item, or `false` to
   * hide. This method is invoked once for each item, so it should be
   * performant. For more complex queries, use `listPredicate` to operate once
   * on the entire array. For the purposes of filtering the list, this prop is
   * ignored if `listPredicate` is also defined.
   */
  itemPredicate?: IFilterableItemPredicate<TItem>;

  /**
   * Custom renderer for an item in the filtered list.
   */
  itemRenderer: IFilterableItemRenderer<TItem, TElement>;

  /**
   * Custom renderer for the contents of the list.
   *
   * The default implementation invokes `itemRenderer` for each item that passes
   * the predicate. If the query is empty then `initialContent` is returned, and
   * if there are no items that match the predicate then `noResults` is
   * returned.
   */
  listRenderer?: IFilterableListInternalRenderer<TItem>;

  /**
   * React content to render when query is empty.
   *
   * If omitted, all items will be rendered (or result of `listPredicate` with
   * empty query). If explicit `null`, nothing will be rendered when query is
   * empty.
   *
   * This prop is ignored if a custom `listRenderer` is supplied.
   */
  initialContent?: React.JSX.Element | null | undefined;

  /**
   * React content to render when filtering items returns zero results. If
   * omitted, nothing will be rendered in this case.
   *
   * This prop is ignored if a custom `listRenderer` is supplied.
   */
  noResults?: React.ReactNode;

  /**
   * Callback invoked when an item from the list is selected, typically by
   * clicking or pressing `Enter` key.
   */
  onItemSelect: (
    item: TItem,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  /**
   * Callback invoked when the query string changes.
   */
  onQueryChange?: (
    query: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * If provided, allows new items to be created using the current query string.
   *
   * This is invoked when user interaction causes one or many items to be
   * created, either by pressing the `Enter` key or by clicking on the "Create
   * Item" option. It transforms a query string into one or many items type.
   */
  createNewItemFromQuery?: (query: string) => TItem;

  /**
   * Custom renderer to transform the current query string into a selectable
   * "Create Item" option.
   *
   * If this function is provided, a "Create Item" option will be rendered at
   * the end of the list of items. If this function is not provided, a "Create
   * Item" option will not be displayed.
   */
  createNewItemRenderer?: IFilterableCreateNewItemRenderer<TElement>;

  /**
   * Determines the position of the `createNewItem` within the list: first or
   * last. Only relevant when `createNewItemRenderer` is defined.
   *
   * @defaultvalue last
   */
  createNewItemPosition?: 'first' | 'last';

  /**
   * Query string passed to `listPredicate` or `itemPredicate` to filter items.
   *
   * If defined, this query will be used in controlled mode. If not defined,
   * this component will manage its own uncontrolled query state.
   */
  query?: string;

  /**
   * Default query string when uncontrolled.
   *
   * Do not change this prop after initial render.
   */
  defaultQuery?: string;

  /**
   * Customize rendering of the component.
   *
   * Receives an object with props that should be applied to elements as
   * necessary.
   */
  renderer: IFilterableListRenderer<TItem>;

  /**
   * Whether the list is disabled.
   *
   * @defaultValue false
   */
  disabled?: boolean;
};

const getFilterableItems = <TItem, TElement extends HTMLElement>(
  query: string | undefined,
  itemsProps: Pick<
    IFilterableListProps<TItem, TElement>,
    'items' | 'itemPredicate' | 'listPredicate'
  >,
): Array<TItem> => {
  if (!query) {
    return itemsProps.items;
  }

  if (itemsProps.listPredicate) {
    // note that implementations can reorder the items here
    return itemsProps.listPredicate(query, itemsProps.items);
  } else if (itemsProps.itemPredicate) {
    return itemsProps.items.filter((item, index) =>
      itemsProps.itemPredicate?.(query, item, index),
    );
  }

  return itemsProps.items;
};

const isItemDisabled = <TItem, TElement extends HTMLElement>(
  item: TItem | null,
  index: number,
  itemDisabled?: IFilterableListProps<TItem, TElement>['itemDisabled'],
): boolean => {
  if (itemDisabled == null || item == null) {
    return false;
  } else if (isFunction(itemDisabled)) {
    return itemDisabled(item, index);
  }
  return !!item[itemDisabled];
};

export const FilterableList = <TItem, TElement extends HTMLElement>(
  props: IFilterableListProps<TItem, TElement>,
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
    name: 'FilterableList',
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

  const defaultListRenderer: IFilterableListInternalRenderer<TItem> = (
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
    const modifiers: IFilterableItemModifiers = {
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
    const modifiers: IFilterableItemModifiers = {
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
