import type {
  ElementProps,
  FlipOptions,
  FloatingFocusManagerProps,
  Middleware,
  Placement,
  ReferenceType,
  ShiftOptions,
  SizeOptions,
  Strategy,
  UseRoleProps,
} from '@floating-ui/react';

import type { IOrientation } from '~/helpers/types';
import type {
  IRendererWithForwardedProps,
  IForwardableProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IPopoverCursorType } from '~/hooks/usePopoverCursor';
import type { IBaseProps } from '../Base';
import type {
  IFloatingTransitionOrigin,
  IFloatingTransitionPattern,
  IFloatingTransitionProps,
} from '../FloatingTransition';
import type { IPortalProps } from '../Portal';
import type { IScrimProps } from '../Scrim';
import type { IPopoverBaseStylesKey } from './PopoverBase.styles';

export type IPopoverBaseContentRendererProps = {
  placement: Placement;
  close: (event?: React.MouseEvent) => void;
  renderCursor: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
};

export type IPopoverBaseTriggerRendererProps = {
  opened: boolean;
  placement: Placement;
  close: (event?: React.MouseEvent) => void;

  /**
   * A callback to set the trigger element.
   */
  setRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   */
  getProps: () => Record<string, unknown>;
};

export type IPopoverOpenEvent = 'hover' | 'focus' | 'click' | 'touch';
export type IPopoverOpenEvents = Partial<Record<IPopoverOpenEvent, boolean>>;

export type IPopoverCloseEvent = 'clickOutside' | 'focusOut' | 'escapeKey';
export type IPopoverCloseEvents = Partial<Record<IPopoverCloseEvent, boolean>>;

export type IPopoverMiddlewares = {
  shift?: boolean | ShiftOptions;
  flip?: boolean | FlipOptions;
  size?: boolean | SizeOptions;
};

export type IPopoverBaseProps<TForwardedProps extends object = object> = Pick<
  IPortalProps,
  'root'
> &
  IBaseProps<IPopoverBaseStylesKey> &
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
    placement?: Placement;

    /**
     * The orientation of the transition. If not provided, the orientation will
     * be determined by the placement. If the placement is top or bottom, the
     * transition orientation will be vertical. If the placement is left or
     * right, the transition orientation will be horizontal.
     */
    transitionOrientation?: IOrientation;

    /**
     * The origin of the transition. Possible values are:
     * - `center`: The transition will originate from the center of the content.
     * - `corner`: The transition will originate from the corner of the content.
     *   The corner is determined by the placement.
     * - `edge`: The transition will originate from the edge of the content. The
     *  edge is determined by the placement.
     * - `cursor`: The transition will originate from the cursor.
     * @defaultValue `cursor`
     */
    transitionOrigin?: IFloatingTransitionOrigin;

    /**
     * The pattern of the transition.
     * @defaultValue `enterExit`
     */
    transitionPattern?: IFloatingTransitionPattern;

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
      floatingTransition?: Partial<IFloatingTransitionProps>;
      scrim?: Partial<IScrimProps>;
    };

    /**
     * The positoning strategy of the floating element.
     * @defaultValue `absolute`
     * @see https://floating-ui.com/docs/usefloating#strategy
     */
    floatingStrategy?: Strategy | false;

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
  };
