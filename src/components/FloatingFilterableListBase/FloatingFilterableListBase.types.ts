import type {
  FloatingFocusManagerProps,
  OpenChangeReason,
  Placement,
} from '@floating-ui/react';

import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IOmit, IOrientation } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IBoxProps } from '../Box';
import type {
  IFilterableListBaseProps,
  IFilterableListItemFocus,
} from '../FilterableListBase';
import type { IMotionProps } from '../Motion';
import type { IPortalProps } from '../Portal';

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
  setTriggerRef: ((node: HTMLElement | null) => void) | null;

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

export interface IFloatingFilterableListBaseOwnProps<
  TItem,
  TItemElement extends HTMLElement,
> extends IOmit<IFilterableListBaseProps<TItem, TItemElement>, 'onItemSelect'>,
    IForwardableProps {
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

  /**
   * Contains the props for all slots within the component.
   */
  slotProps?: {
    floatingFocusManager?: Partial<FloatingFocusManagerProps>;
    floatingMotion?: Partial<IMotionProps>;
    portal?: Partial<IPortalProps>;
  };

  resetOnBlur?: boolean;
  initialFocus?: number;
  // FIXME: does not work
  keepMounted?: boolean;
  cols?: number;
  itemFocus?: IFilterableListItemFocus;
  onOpenChange?: (
    opened: boolean,
    event?: Event,
    reason?: OpenChangeReason,
  ) => void;
}

export interface IFloatingFilterableListBaseProps<
  TItem,
  TItemElement extends HTMLElement = HTMLElement,
> extends IBoxProps,
    IFloatingFilterableListBaseOwnProps<TItem, TItemElement> {}

export type IFloatingFilterableListBaseFactory<
  TItem,
  TItemElement extends HTMLElement,
> = IPolymorphicComponentFactory<{
  props: IFloatingFilterableListBaseProps<TItem, TItemElement>;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
