import type { IBoxProps } from '~/components/Box';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/itemListRenderer.ts

export type IFilterableListBaseState<TItem> = {
  /**
   * Array of items filtered by `listPredicate` or `itemPredicate`. See `items`
   * for the full list of items.
   *
   * Use `renderFilterableItems()` utility function from this library to map
   * each item in this array through `renderItem`, with support for optional
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
 * `IFilterableListBaseInternalRenderer` receives this object as its sole
 * argument.
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

    cols: number;
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
export type IFilterableListItemModifiers = {
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

export type IFilterableListItemFocus = 'icon';

/**
 * An object describing how to render a particular filtered item. An
 * `itemRenderer` receives the item as its first argument, and this object as
 * its second argument.
 *
 * @typeParam TItemElement - Type of the DOM element rendered
 */
export type IFilterableListItemRendererProps<TItemElement extends Element> = {
  /**
   * Click event handler to select this item.
   */
  handleClick: React.MouseEventHandler<TItemElement>;

  /**
   * Index of the item in the `filteredItems` array.
   */
  index: number;

  /**
   * Modifiers that describe how to render this item, such as `active` or
   * `disabled`.
   */
  modifiers: IFilterableListItemModifiers;

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
    userProps?: React.HTMLProps<TItemElement>,
  ) => Record<string, unknown>;

  focus?: IFilterableListItemFocus;
};

/**
 * Type alias for a function that receives an item and props and renders a JSX
 * element (or `null`).
 *
 * @typeParam TItem - Tist item data type
 * @typeParam TItemElement - Type of the DOM element rendered
 */
export type IFilterableListItemRenderer<TItem, TItemElement extends Element> = (
  item: TItem,
  itemProps: IFilterableListItemRendererProps<TItemElement>,
) => React.JSX.Element | null;

/**
 * Type alias for a function that receives item props and renders a JSX element
 * for creating a new item.
 *
 * @typeParam TItemElement - Type of the DOM element rendered
 */
export type IFilterableCreateNewListItemRenderer<TItemElement extends Element> =
  (
    itemProps: IFilterableListItemRendererProps<TItemElement>,
  ) => React.JSX.Element | undefined;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/predicate.ts

/**
 * A custom predicate for returning an entirely new `items` array based on the
 * provided query. See usage sites in `IFilterableListBaseProps`.
 */
export type IFilterableListPredicate<TItem> = (
  items: Array<TItem>,
  query: string,
) => Array<TItem>;

/**
 * A custom predicate for filtering items based on the provided query. See usage
 * sites in `IFilterableListBaseProps`.
 */
export type IFilterableListItemPredicate<TItem> = (
  item: TItem,
  query: string,
  index?: number,
  exactMatch?: boolean,
) => boolean;

// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/common/listItemsProps.ts

/**
 * Equality test comparator to determine if two {@link IFilterableListBaseProps}
 * items are equivalent.
 *
 * @returns `true` if the two items are equivalent.
 */
export type IFilterableListItemsEqualComparator<TItem> = (
  itemA: TItem,
  itemB: TItem,
) => boolean;

/**
 * Union of all possible types for {@link IFilterableListBaseProps#itemsEqual}.
 */
export type IFilterableListItemsEqualProp<TItem> =
  | IFilterableListItemsEqualComparator<TItem>
  | keyof TItem;

/**
 * An object describing how to render a `FilterableListBase`.
 * A `FilterableListBase` `renderer` receives this object as its sole argument.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListBaseRendererProps<TItem> =
  IFilterableListBaseState<TItem> & {
    /**
     * Change handler for query string. Attach this to an input element to allow
     * `FilterableListBase` to control the query.
     */
    handleQueryChange: (value: string) => void;

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
     * @param userProps - All event handlers you pass in should be done so
     * through the this argument. This is because your handler may be either
     * overwritten or overwrite one of the Floating UI hooks' handlers.
     */
    getInputFilterProps: (
      userProps?: React.ComponentPropsWithoutRef<'input'>,
    ) => Record<string, unknown>;
  };

/**
 * Type alias for a function that renders the entire `FilterableListBase`
 * component.
 *
 * @typeParam TItem - List item data type
 */
export type IFilterableListBaseRenderer<TItem> = (
  listProps: IFilterableListBaseRendererProps<TItem>,
) => React.ReactNode;

/**
 * Props for `FilterableListBase` component.
 *
 * @typeParam TItem - List item data type
 */
export interface IFilterableListBaseOwnProps<
  TItem,
  TItemElement extends HTMLElement = HTMLElement,
> {
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
  itemsEqual?: IFilterableListItemsEqualProp<TItem>;

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
  itemPredicate?: IFilterableListItemPredicate<TItem>;

  /**
   * Custom renderer for an item in the filtered list.
   */
  itemRenderer: IFilterableListItemRenderer<TItem, TItemElement>;

  /**
   * Custom renderer for the contents of the list.
   *
   * The default implementation invokes `itemRenderer` for each item that passes
   * the predicate. If the query is empty then `initialContent` is returned, and
   * if there are no items that match the predicate then `noResults` is
   * returned.
   */
  listRenderer?: IFilterableListBaseInternalRenderer<TItem>;

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
  createNewItemRenderer?: IFilterableCreateNewListItemRenderer<TItemElement>;

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
  renderer: IFilterableListBaseRenderer<TItem>;

  /**
   * Whether the list is disabled.
   *
   * @defaultValue false
   */
  disabled?: boolean;

  cols?: number;
}

export interface IFilterableListBaseProps<
  TItem,
  TItemElement extends HTMLElement = HTMLElement,
> extends IBoxProps,
    IFilterableListBaseOwnProps<TItem, TItemElement> {}

export type IFilterableListBaseFactory<
  TItem,
  TItemElement extends HTMLElement,
> = IPolymorphicComponentFactory<{
  props: IFilterableListBaseProps<TItem, TItemElement>;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
