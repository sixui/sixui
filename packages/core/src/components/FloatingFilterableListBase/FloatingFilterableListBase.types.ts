import type {
  FloatingFocusManagerProps,
  OpenChangeReason,
  Placement,
} from '@floating-ui/react';

import type { IBoxProps } from '~/components/Box';
import type {
  IFilterableListBaseProps,
  IFilterableListItemFocus,
} from '~/components/FilterableListBase';
import type { IMotionProps } from '~/components/Motion';
import type { IPortalProps } from '~/components/Portal';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/utils/react/forwardablePropsTypes';
import type { IElementProps, IOmit, IOrientation } from '~/utils/types';

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
  inputFilterRef?: React.RefObject<HTMLInputElement | null>;

  /**
   * A function that returns the props to apply to the input filter element.
   *
   * @param userProps - All event handlers you pass in should be done so through
   * the this argument. This is because your handler may be either overwritten
   * or overwrite one of the Floating UI hooks' handlers.
   */
  getInputFilterProps: (
    userProps?: IElementProps<'input'>,
  ) => Record<string, unknown>;

  afterItemsRemove: (items: Array<TItem>, event?: React.SyntheticEvent) => void;

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

  floatingFocusManagerProps?: Partial<FloatingFocusManagerProps>;
  floatingMotionProps?: Partial<IMotionProps>;
  portalProps?: Partial<IPortalProps>;

  resetOnBlur?: boolean;
  initialFocus?: number;
  keepMounted?: boolean;
  cols?: number;
  itemFocus?: IFilterableListItemFocus;
  onChange?: (value: string) => void;
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
