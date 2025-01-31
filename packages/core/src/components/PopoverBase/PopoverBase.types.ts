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

import type { IBoxProps } from '~/components/Box';
import type { IMotionProps } from '~/components/Motion';
import type { IPortalProps } from '~/components/Portal';
import type { IScrimProps } from '~/components/Scrim';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/utils/react/forwardablePropsTypes';
import type { IPlacement } from '~/utils/types';
import type { IPopoverCursorType } from './hooks/usePopoverCursor';
import type {
  IPopoverBaseThemeFactory,
  popoverBaseTheme,
} from './PopoverBase.css';

export interface IPopoverBaseContentRendererProps {
  parentProps: IPopoverBaseProps;
  placement: IPlacement;
  close: (event?: React.MouseEvent) => void;
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
}

export interface IPopoverBaseTriggerRendererProps {
  opened: boolean;
  placement: IPlacement;
  open: (event?: React.MouseEvent) => void;
  close: (event?: React.MouseEvent) => void;

  /**
   * A callback to set the trigger element.
   */
  setRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   */
  getProps: (props?: Record<string, unknown>) => Record<string, unknown>;
}

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
    scrim?: boolean;

    /**
     * Contains the props for all slots within the component.
     */
    floatingFocusManagerProps?: Partial<FloatingFocusManagerProps>;
    scrimMotionProps?: Partial<IMotionProps>;
    floatingMotionProps?: Partial<IMotionProps>;
    scrimProps?: Partial<IScrimProps>;
    removeScrollProps?: Partial<IRemoveScrollSelfProps>;
    portalProps?: Partial<IPortalProps>;

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
    middlewares?: IPopoverMiddlewares | false;

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
    openEvents?: IPopoverOpenEvents | false;

    /**
     * The events that will close the popover.
     * @defaultValue `{ clickOutside: true, focusOut: true, escapeKey: true }`
     */
    closeEvents?: IPopoverCloseEvents | false;

    /**
     * Modal popovers interrupt interaction with the rest of the page with a
     * scrim, while non-modal popovers allow interaction with the rest of the
     * page.
     */
    modal?: boolean;

    jail?: boolean;

    keepMounted?: boolean;
    popoverProps?: IBoxProps;
    preventAutoFocus?: boolean;
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
