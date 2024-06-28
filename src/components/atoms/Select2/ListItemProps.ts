import type { UseInteractionsReturn } from '@floating-ui/react';
import { isFunction } from 'lodash';

import type { IAny } from '@/helpers/types';

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/itemListRenderer.ts

/**
 * An object describing how to render the list of items.
 * An `itemListRenderer` receives this object as its sole argument.
 */
export type IItemListRendererProps<TItem> = {
  /**
   * Array of items filtered by `itemListPredicate` or `itemPredicate`.
   * See `items` for the full list of items.
   *
   * Use `renderFilteredItems()` utility function from this library to
   * map each item in this array through `renderItem`, with support for
   * optional `noResults` and `initialContent` states.
   */
  filteredItems: Array<TItem>;

  /**
   * Array of all items in the list.
   * See `filteredItems` for a filtered array based on `query` and predicate props.
   */
  items: Array<TItem>;

  /**
   * The current query string.
   */
  query?: string;

  /**
   * Call this function to render an item.
   * This retrieves the modifiers for the item and delegates actual rendering
   * to the owner component's `itemRenderer` prop.
   */
  renderItem: (item: TItem, index: number) => React.ReactNode;

  /**
   * Call this function to render the "create new item" view component.
   *
   * @returns null when creating a new item is not available, and undefined if the createNewItemRenderer returns undefined
   */
  renderCreateItem: () => React.ReactNode;
};

/** Type alias for a function that renders the list of items. */
export type IItemListRenderer<TItem> = (
  itemListProps: IItemListRendererProps<TItem>,
) => React.ReactNode;

/**
 * `ItemListRenderer` helper method for rendering each item in `filteredItems`,
 * with optional support for `noResults` (when filtered items is empty)
 * and `initialContent` (when query is empty).
 */
export const renderFilteredItems = (
  props: IItemListRendererProps<IAny>,
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

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/itemRenderer.ts

export type IItemModifiers = {
  /** Whether this is the "active" (focused) item, meaning keyboard interactions will act upon it. */
  active: boolean;

  /** Whether this item is currently selected. */
  selected: boolean;

  /** Whether this item is disabled and should ignore interactions. */
  disabled: boolean;

  /** Whether this item matches the predicate. A typical renderer could hide `false` values. */
  matchesPredicate: boolean;
};

/**
 * An object describing how to render a particular item.
 * An `itemRenderer` receives the item as its first argument, and this object as its second argument.
 *
 * Make sure to forward the provided `ref` to the rendered element (usually via `<MenuItem ref={ref} />`)
 * to ensure that scrolling to active items works correctly.
 *
 * @typeParam TItem - type of the DOM element rendered for this item to which we can attach a ref (defaults to MenuItem's HTMLLIElement)
 */
export type IItemRendererProps = {
  /** Click event handler to select this item. */
  handleClick: React.MouseEventHandler<HTMLElement>;

  /** Index of the item in the QueryList items array. */
  index: number;

  /** Modifiers that describe how to render this item, such as `active` or `disabled`. */
  modifiers: IItemModifiers;

  /** The current query string used to filter the items. */
  query: string;
};

/**
 * Type alias for a function that receives an item and props and renders a JSX element (or `null`).
 *
 * @typeParam TItem -  list item data type
 */
export type IItemRenderer<TItem> = (
  item: TItem,
  itemProps: IItemRendererProps,
  buttonRef?: React.Ref<HTMLButtonElement>,
  buttonAttributes?: UseInteractionsReturn['getItemProps'],
) => React.ReactNode;

export type ICreateNewItemRenderer = (
  itemProps: IItemRendererProps,
  buttonRef?: React.Ref<HTMLButtonElement>,
  buttonAttributes?: UseInteractionsReturn['getItemProps'],
) => React.ReactNode;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/predicate.ts

/**
 * A custom predicate for returning an entirely new `items` array based on the provided query.
 * See usage sites in `IListItemsProps`.
 */
export type IItemListPredicate<TItem> = (
  query: string,
  items: Array<TItem>,
) => Array<TItem>;

/**
 * A custom predicate for filtering items based on the provided query.
 * See usage sites in `IListItemsProps`.
 */
export type IItemPredicate<TItem> = (
  query: string,
  item: TItem,
  index?: number,
  exactMatch?: boolean,
) => boolean;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/listItemsProps.ts

/**
 * Equality test comparator to determine if two {@link IListItemsProps} items are equivalent.
 *
 * @returns `true` if the two items are equivalent.
 */
export type IItemsEqualComparator<TItem> = (
  itemA: TItem,
  itemB: TItem,
) => boolean;

/**
 * Union of all possible types for {@link IListItemsProps#itemsEqual}.
 */
export type IItemsEqualProp<TItem> = IItemsEqualComparator<TItem> | keyof TItem;

/**
 * Reusable generic props for a component that operates on a filterable, selectable list of `items`.
 */
export type IListItemsProps<TItem> = {
  /** Array of items in the list. */
  items: Array<TItem>;

  /**
   * Specifies how to test if two items are equal. By default, simple strict
   * equality (`===`) is used to compare two items.
   *
   * If your items have a unique identifier field, simply provide the name of
   * a property on the item that can be compared with strict equality to
   * determine equivalence: `itemsEqual="id"` will check `a.id === b.id`.
   *
   * If more complex comparison logic is required, provide an equality
   * comparator function that returns `true` if the two items are equal. The
   * arguments to this function will never be `null` or `undefined`, as those
   * values are handled before calling the function.
   */
  itemsEqual?: IItemsEqualProp<TItem>;

  /**
   * Determine if the given item is disabled. Provide a callback function, or
   * simply provide the name of a boolean property on the item that exposes
   * its disabled state.
   */
  itemDisabled?: keyof TItem | ((item: TItem, index: number) => boolean);

  /**
   * Customize querying of entire `items` array. Return new list of items.
   * This method can reorder, add, or remove items at will.
   * (Supports filter algorithms that operate on the entire set, rather than individual items.)
   *
   * If `itemPredicate` is also defined, this prop takes priority and the other will be ignored.
   */
  itemListPredicate?: IItemListPredicate<TItem>;

  /**
   * Customize querying of individual items.
   *
   * __Filtering a list of items.__ This function is invoked to filter the
   * list of items as a query is typed. Return `true` to keep the item, or
   * `false` to hide. This method is invoked once for each item, so it should
   * be performant. For more complex queries, use `itemListPredicate` to
   * operate once on the entire array. For the purposes of filtering the list,
   * this prop is ignored if `itemListPredicate` is also defined.
   *
   * __Matching a pasted value to an item.__ This function is also invoked to
   * match a pasted value to an existing item if possible. In this case, the
   * function will receive `exactMatch=true`, and the function should return
   * true only if the item _exactly_ matches the query. For the purposes of
   * matching pasted values, this prop will be invoked even if
   * `itemListPredicate` is defined.
   */
  itemPredicate?: IItemPredicate<TItem>;

  /**
   * Custom renderer for an item in the dropdown list. Receives a boolean indicating whether
   * this item is active (selected by keyboard arrows) and an `onClick` event handler that
   * should be attached to the returned element.
   */
  itemRenderer: IItemRenderer<TItem>;

  /**
   * Custom renderer for the contents of the dropdown.
   *
   * The default implementation invokes `itemRenderer` for each item that passes the predicate.
   * If the query is empty then `initialContent` is returned,
   * and if there are no items that match the predicate then `noResults` is returned.
   */
  itemListRenderer?: IItemListRenderer<TItem>;

  /**
   * React content to render when query is empty.
   * If omitted, all items will be rendered (or result of `itemListPredicate` with empty query).
   * If explicit `null`, nothing will be rendered when query is empty.
   *
   * This prop is ignored if a custom `itemListRenderer` is supplied.
   */
  initialContent?: React.ReactNode | null;

  /**
   * React content to render when filtering items returns zero results.
   * If omitted, nothing will be rendered in this case.
   *
   * This prop is ignored if a custom `itemListRenderer` is supplied.
   *
   * NOTE: if passing a `MenuItem`, ensure it has `roleStructure="listoption"` prop.
   */
  noResults?: React.ReactNode;

  /**
   * Callback invoked when an item from the list is selected,
   * typically by clicking or pressing `enter` key.
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
   * If provided, allows new items to be created using the current query
   * string. This is invoked when user interaction causes one or many items to be
   * created, either by pressing the `Enter` key or by clicking on the "Create
   * Item" option. It transforms a query string into one or many items type.
   */
  createNewItemFromQuery?: (query: string) => TItem;

  /**
   * Custom renderer to transform the current query string into a selectable
   * "Create Item" option. If this function is provided, a "Create Item"
   * option will be rendered at the end of the list of items. If this function
   * is not provided, a "Create Item" option will not be displayed.
   */
  createNewItemRenderer?: ICreateNewItemRenderer;

  /**
   * Determines the position of the `createNewItem` within the list: first or
   * last. Only relevant when `createNewItemRenderer` is defined.
   *
   * @defaultvalue 'last'
   */
  createNewItemPosition?: 'first' | 'last';

  /**
   * Query string passed to `itemListPredicate` or `itemPredicate` to filter items.
   * This value is controlled: its state must be managed externally by attaching an `onChange`
   * handler to the relevant element in your `renderer` implementation.
   */
  query?: string;

  defaultQuery?: string;
};

/**
 * Utility function for executing the {@link IListItemsProps#itemsEqual} prop to test
 * for equality between two items.
 *
 * @returns `true` if the two items are equivalent according to `itemsEqualProp`.
 */
export function executeItemsEqual<TItem>(
  itemsEqualProp: IItemsEqualProp<TItem> | undefined,
  itemA: TItem | null | undefined,
  itemB: TItem | null | undefined,
): boolean {
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
}

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/listItemsUtils.ts

/**
 * The reserved type of the "Create Item" option in item lists. This is intended
 * not to conflict with any custom item type `T` that might be used in  item
 * list.
 */
export type ICreateNewItem = {
  __sixuiCreateNewItemBrand: 'sixui-create-new-item';
};

/** Returns an instance of a "Create Item" object. */
export const getCreateNewItem = (): ICreateNewItem => {
  return { __sixuiCreateNewItemBrand: 'sixui-create-new-item' };
};

/**
 * Type guard returning `true` if the provided item (e.g. the current
 * `activeItem`) is a "Create Item" option.
 */
export const isCreateNewItem = <TItem>(
  item: TItem | ICreateNewItem | null | undefined,
): item is ICreateNewItem => {
  if (item == null) {
    return false;
  }

  // see if the provided item exactly matches the `CreateNewItem` object,
  // with no superfluous keys.
  const keys = Object.keys(item);
  if (keys.length !== 1 || keys[0] !== '__sixuiCreateNewItemBrand') {
    return false;
  }
  return (
    (item as ICreateNewItem).__sixuiCreateNewItemBrand ===
    'sixui-create-new-item'
  );
};
