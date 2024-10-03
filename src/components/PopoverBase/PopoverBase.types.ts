import type {
  ArrowOptions,
  ElementProps,
  FlipOptions,
  FloatingFocusManagerProps,
  Middleware,
  OffsetOptions,
  ReferenceType,
  ShiftOptions,
  SizeOptions,
  UseRoleProps,
} from '@floating-ui/react';
import type { IRemoveScrollSelfProps } from 'react-remove-scroll/dist/es5/types';

import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IPlacement } from '~/helpers/types';
import type { IPopoverCursorType } from '~/hooks/usePopoverCursor';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IMotionProps } from '../Motion';
import type { IPortalProps } from '../Portal';
import type { IScrimProps } from '../Scrim';
import type {
  IPopoverBaseThemeFactory,
  popoverBaseTheme,
} from './PopoverBase.css';

export type IPopoverBaseContentRendererProps = {
  parentProps: IPopoverBaseProps;
  placement: IPlacement;
  close: (event?: React.MouseEvent) => void;
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
};

export type IPopoverBaseTriggerRendererProps = {
  opened: boolean;
  placement: IPlacement;
  close: (event?: React.MouseEvent) => void;

  /**
   * A callback to set the trigger element.
   */
  setRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   */
  getProps: (props?: Record<string, unknown>) => Record<string, unknown>;
};

export type IPopoverOpenEvent = 'hover' | 'focus' | 'click' | 'touch';
export type IPopoverOpenEvents = Partial<Record<IPopoverOpenEvent, boolean>>;

export type IPopoverCloseEvent = 'clickOutside' | 'focusOut' | 'escapeKey';
export type IPopoverCloseEvents = Partial<Record<IPopoverCloseEvent, boolean>>;

export type IPopoverMiddlewares = {
  offset?: boolean | OffsetOptions;
  shift?: boolean | ShiftOptions;
  flip?: boolean | FlipOptions;
  size?: boolean | SizeOptions;
  arrow?: boolean | ArrowOptions;
};

export type IPopoverBaseOwnProps<TForwardedProps extends object = object> =
  IForwardableProps & {
    /**
     * The content renderer for the popover.
     */
    contentRenderer: IRendererWithForwardedProps<
      IPopoverBaseContentRendererProps,
      TForwardedProps
    >;

    /**
     * The trigger element for the popover.
     */
    children?:
      | ((props: IPopoverBaseTriggerRendererProps) => React.ReactNode)
      | React.ReactNode;

    /**
     * The placement of the popover relative to the reference element.
     * @defaultValue `top`
     * @see https://floating-ui.com/docs/usefloating#placement
     */
    placement?: IPlacement;

    /**
     * Controls the open state of the popover.
     */
    opened?: boolean;

    /**
     * The initial opened state of the popover.
     */
    defaultOpened?: boolean;

    /**
     * The type of cursor to use for the popover to point to the trigger element.
     */
    cursor?: IPopoverCursorType;

    /**
     * Called when the popover is closed.
     */
    onOpen?: () => void;

    /**
     * Called when the popover is closed.
     */
    onClose?: () => void;

    /**
     * If set, the popover will not be rendered.
     */
    disabled?: boolean;

    /**
     * The accessible role of the popover.
     */
    role?: UseRoleProps['role'];

    /**
     * If set, the popover will trap focus within the popover when it is
     * open.
     * @see https://floating-ui.com/docs/floatingfocusmanager
     */
    trapFocus?: boolean;

    /**
     * If set, the popover will match the width of the trigger element.
     */
    matchTargetWidth?: boolean;

    /**
     * If set, a temporary overlay will be rendered behind the popover to make
     * it more prominent.
     */
    withScrim?: boolean;

    /**
     * Contains the props for all slots within the component.
     */
    slotProps?: {
      floatingFocusManager?: Partial<FloatingFocusManagerProps>;
      scrimMotion?: Partial<IMotionProps>;
      floatingMotion?: Partial<IMotionProps>;
      scrim?: Partial<IScrimProps>;
      removeScroll?: Partial<IRemoveScrollSelfProps>;
      portal?: Partial<IPortalProps>;
    };

    /**
     * Whether the element should be positioned relative to its nearest
     * positioned ancestor.
     */
    positioned?: boolean;

    /**
     * Floating UI middlewares to apply th change the position of the floating
     * element.
     * @defaultValue `{ flip: true, shift: true, size: true }`
     * @see https://floating-ui.com/docs/usefloating#middleware
     */
    middlewares?: IPopoverMiddlewares;

    /**
     * Additional middlewares to apply to the floating element.
     * @see https://floating-ui.com/docs/usefloating#middleware
     */
    additionalMiddlewares?: Array<Middleware | null | undefined | false>;

    additionalInteractions?: Array<ElementProps>;

    /**
     * The events that will open the popover.
     * @defaultValue `{ hover: false, focus: false, click: false, touch: false }`
     */
    openEvents?: IPopoverOpenEvents;

    /**
     * The events that will close the popover.
     * @defaultValue `{ clickOutside: true, focusOut: true, escapeKey: true }`
     */
    closeEvents?: IPopoverCloseEvents;

    /**
     * Whether the <body> is prevented from scrolling while the overlay is
     * rendered.
     */
    lockScroll?: boolean;

    /**
     * Modal popovers interrupt interaction with the rest of the page being
     * inert, while non-modal popovers allow interaction with the rest of
     * the page.
     */
    modal?: boolean;

    keepMounted?: boolean;
  };

export interface IPopoverBaseProps
  extends IBoxProps,
    IComponentThemeProps<IPopoverBaseThemeFactory>,
    IPopoverBaseOwnProps {}

export type IPopoverBaseFactory = IComponentFactory<{
  props: IPopoverBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof popoverBaseTheme;
}>;
