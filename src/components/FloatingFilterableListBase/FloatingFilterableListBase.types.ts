import type {
  OpenChangeReason,
  Placement,
  ReferenceType,
} from '@floating-ui/react';

import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IOmit, IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type {
  IFilterableListBaseProps,
  IFilterableListItemFocus,
} from '../FilterableListBase';
import type { IPortalProps } from '../Portal';
import type { IFloatingFilterableListBaseStylesKey } from './FloatingFilterableListBase.styles';

export type IFloatingFilterableListBaseTriggerRenderProps<TItem> = {
  /**
   * Whether the floating filterable list is open.
   */
  opened: boolean;

  /**
   * Whether the trigger element has focus.
   */
  hasFocus: boolean;

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
    userProps?: React.HTMLProps<Element>,
  ) => Record<string, unknown>;

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
    userProps?: React.ComponentPropsWithoutRef<'input'>,
  ) => Record<string, unknown>;

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
> = IBaseProps<IFloatingFilterableListBaseStylesKey> &
  Pick<IPortalProps, 'root'> &
  IOmit<IFilterableListBaseProps<TItem, TElement>, 'onItemSelect'> &
  IForwardableProps & {
    /**
     * Element which triggers the select popover. In most cases, you should display
     * the name or label of the curently selected item here.
     */
    children: IRendererWithForwardedProps<
      IFloatingFilterableListBaseTriggerRenderProps<TItem>
    >;

    onItemSelect: (
      item: TItem,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => number | undefined;

    placement?: Placement;
    orientation?: IOrientation;
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
    cols?: number;
    itemFocus?: IFilterableListItemFocus;
    onOpenChange?: (
      opened: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;
  };
