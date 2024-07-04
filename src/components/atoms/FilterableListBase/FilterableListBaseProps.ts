// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/itemListRenderer.ts

export type IFilterableListBaseState<TItem> = {
  /**
   * Array of items filtered by `listPredicate` or `itemPredicate`. See `items`
   * for the full list of items.
   *
   * Use `renderFilterableItems()` utility function from this library to map each
   * item in this array through `renderItem`, with support for optional
   * `noResults` and `initialContent` states.
   */
  filteredItems: Array<TItem>;

  /**
   * The current query string.
   */
  query: string;
};

/**
 * An object describing how to render the filtered list of items. An
 * `IFilterableListBaseInternalRenderer` receives this object as its sole argument.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListBaseInternalRendererProps<TItem> =
  IFilterableListBaseState<TItem> & {
    /**
     * Array of all items in the list. See `filteredItems` for a filtered array
     * based on `query` and predicate props.
     */
    items: Array<TItem>;

    /**
     * Call this function to render an item.
     *
     * This retrieves the modifiers for the item and delegates actual rendering
     * to the owner component's `itemRenderer` prop.
     */
    renderItem: (item: TItem, index: number) => React.ReactNode;

    /**
     * Call this function to render the "create new item" view component.
     *
     * @returns null when creating a new item is not available, and undefined if
     * the `createNewItemRenderer` returns undefined.
     */
    renderCreateItem: () => React.JSX.Element | null | undefined;
  };

/**
 * Type alias for a function that renders the filtered list of items.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListBaseInternalRenderer<TItem> = (
  itemListProps: IFilterableListBaseInternalRendererProps<TItem>,
) => React.ReactNode;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/itemRenderer.ts

/**
 * Modifiers for an item in a filtered list. These are used to determine how to
 * render the item, such as `active` or `disabled`.
 */
export type IFilterableItemModifiers = {
  /**
   * Whether this is the "active" (focused) item, meaning keyboard interactions
   * will act upon it.
   */
  active: boolean;

  /**
   * Whether this item is currently selected.
   */
  selected: boolean;

  /**
   * Whether this item is disabled and should ignore interactions.
   * */
  disabled: boolean;

  /**
   * Whether this item matches the predicate. A typical renderer could hide
   * `false` values.
   */
  matchesPredicate: boolean;
};

/**
 * An object describing how to render a particular filtered item. An
 * `itemRenderer` receives the item as its first argument, and this object as
 * its second argument.
 *
 * @typeParam TElement - Type of the DOM element rendered
 */
export type IFilterableItemRendererProps<TElement extends HTMLElement> = {
  /**
   * Click event handler to select this item.
   */
  handleClick: React.MouseEventHandler<TElement>;

  /**
   * Index of the item in the `filteredItems` array.
   */
  index: number;

  /**
   * Modifiers that describe how to render this item, such as `active` or
   * `disabled`.
   */
  modifiers: IFilterableItemModifiers;

  /**
   * The current query string used to filter the items.
   */
  query: string;

  /**
   * Reference to the button element that renders this item. Use this to focus
   * the button.
   */
  buttonRef?: React.Ref<HTMLButtonElement>;

  /**
   * Get the attributes to apply to the button element that renders this item.
   */
  getButtonAttributes: (
    userProps?: React.HTMLProps<TElement>,
  ) => Record<string, unknown>;
};

/**
 * Type alias for a function that receives an item and props and renders a JSX
 * element (or `null`).
 *
 * @typeParam TItem - Tist item data type
 * @typeParam TElement - Type of the DOM element rendered
 */
export type IFilterableItemRenderer<TItem, TElement extends HTMLElement> = (
  item: TItem,
  itemProps: IFilterableItemRendererProps<TElement>,
) => React.JSX.Element | null;

/**
 * Type alias for a function that receives item props and renders a JSX element
 * for creating a new item.
 *
 * @typeParam TElement - Type of the DOM element rendered
 */
export type IFilterableCreateNewItemRenderer<TElement extends HTMLElement> = (
  itemProps: IFilterableItemRendererProps<TElement>,
) => React.JSX.Element | undefined;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/predicate.ts

/**
 * A custom predicate for returning an entirely new `items` array based on the
 * provided query. See usage sites in `IFilterableListBaseProps`.
 */
export type IFilterableListBasePredicate<TItem> = (
  query: string,
  items: Array<TItem>,
) => Array<TItem>;

/**
 * A custom predicate for filtering items based on the provided query. See usage
 * sites in `IFilterableListBaseProps`.
 */
export type IFilterableItemPredicate<TItem> = (
  query: string,
  item: TItem,
  index?: number,
  exactMatch?: boolean,
) => boolean;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/listItemsProps.ts

/**
 * Equality test comparator to determine if two {@link IFilterableListBaseProps} items
 * are equivalent.
 *
 * @returns `true` if the two items are equivalent.
 */
export type IFilterableItemsEqualComparator<TItem> = (
  itemA: TItem,
  itemB: TItem,
) => boolean;

/**
 * Union of all possible types for {@link IFilterableListBaseProps#itemsEqual}.
 */
export type IFilterableItemsEqualProp<TItem> =
  | IFilterableItemsEqualComparator<TItem>
  | keyof TItem;
