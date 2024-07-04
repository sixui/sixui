import type { IOmit } from '@/helpers/types';
import type { Placement, ReferenceType } from '@floating-ui/react';

import type { IFilterableListBaseProps } from '@/components/atoms/FilterableListBase';
import type {
  IExtendedFloatingProps,
  IExtendedHtmlFloatingProps,
} from '@/helpers/extendFloatingProps';

export type IFloatingFilterableListBaseTriggerRenderProps<TItem> = {
  /**
   * Whether the floating filterable list is open.
   */
  isOpen: boolean;

  /**
   * A callback to set the trigger element.
   */
  setTriggerRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   *
   * @param userProps - All event handlers you pass in should be done so through
   * the this argument. This is because your handler may be either overwritten
   * or overwrite one of the Floating UI hooks' handlers.
   */
  getTriggerProps: (
    userProps?: IExtendedHtmlFloatingProps,
  ) => IExtendedHtmlFloatingProps;

  /**
   * A reference to the input filter element.
   */
  inputFilterRef?: React.RefObject<HTMLInputElement>;

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

  afterItemsRemove: (
    items: Array<TItem>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  /** The current query string. */
  query: string;
};

export type IFloatingFilterableListBaseProps<
  TItem,
  TElement extends HTMLElement,
> = IOmit<IFilterableListBaseProps<TItem, TElement>, 'onItemSelect'> & {
  /**
   * Element which triggers the select popover. In most cases, you should display
   * the name or label of the curently selected item here.
   */
  children: (
    props: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
  ) => React.JSX.Element;

  onItemSelect: (
    item: TItem,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => number | undefined;

  onItemRemoveFocused?: () => void;

  onItemFocusPreviousSelected?: (
    inputFilterRef: React.RefObject<HTMLInputElement>,
  ) => void;
  onItemFocusNextSelected?: (
    inputFilterRef: React.RefObject<HTMLInputElement>,
  ) => void;

  placement?: Placement;
  matchTargetWidth?: boolean;
  closeOnSelect?: boolean;

  /**
   * Whether the active item should be reset to the first matching item _when
   * an item is selected_. The query will also be reset to the empty string.
   *
   * @defaultvalue false
   */
  resetOnSelect?: boolean;

  /**
   * Whether the active item should be reset to the first matching item _when
   * the popover closes_. The query will also be reset to the empty string.
   *
   * @defaultValue false
   */
  resetOnClose?: boolean;

  resetOnBlur?: boolean;

  initialFocus?: number;
};
