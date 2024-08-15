import type {
  FlipOptions,
  FloatingFocusManagerProps,
  Middleware,
  OpenChangeReason,
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
  IFloatingTransitionProps,
} from '../FloatingTransition';
import type { IPortalProps } from '../Portal';
import type { IScrimProps } from '../Scrim';
import type { IPopoverBaseStylesKey } from './PopoverBase.styles';

export type IPopoverBaseContentRendererProps = {
  isOpen: boolean;
  placement: Placement;
  close: (event?: React.MouseEvent) => void;
  renderCursor: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
};

export type IPopoverBaseTriggerRendererProps = {
  isOpen: boolean;
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

export type IPopoverBaseProps<TForwardedProps extends object = object> = Pick<
  IPortalProps,
  'root'
> &
  IBaseProps<IPopoverBaseStylesKey> &
  IForwardableProps & {
    contentRenderer: IRendererWithForwardedProps<
      IPopoverBaseContentRendererProps,
      TForwardedProps
    >;
    children?:
      | ((props: IPopoverBaseTriggerRendererProps) => React.ReactNode)
      | React.ReactNode;
    placement?: Placement;
    transitionOrientation?: IOrientation;
    transitionOrigin?: IFloatingTransitionOrigin;
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    cursor?: IPopoverCursorType;
    onOpenChange?: (
      isOpen: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;
    disabled?: boolean;
    role?: UseRoleProps['role'];
    openOnHover?: boolean;
    openOnFocus?: boolean;
    openOnClick?: boolean;
    trapFocus?: boolean;
    matchTargetWidth?: boolean;
    referenceRef?: React.RefObject<HTMLElement>;
    withScrim?: boolean;
    slotProps?: {
      floatingFocusManager?: Partial<FloatingFocusManagerProps>;
      floatingTransition?: Partial<IFloatingTransitionProps>;
      scrim?: Partial<IScrimProps>;
    };
    floatingStrategy?: Strategy;
    middlewares?: {
      shift?: boolean | ShiftOptions;
      flip?: boolean | FlipOptions;
      size?: boolean | SizeOptions;
    };
    additionalMiddlewares?: Array<Middleware | null | undefined | false>;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    closeOnFocusOut?: boolean;
    reference?: 'trigger' | 'viewport';
  };
