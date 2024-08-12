import type {
  Middleware,
  OpenChangeReason,
  Placement,
  ReferenceType,
  UseRoleProps,
} from '@floating-ui/react';

import type { IOrientation } from '~/helpers/types';
import type {
  IRendererWithForwardedProps,
  IForwardableProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IPopoverCursorType } from '~/hooks/usePopoverCursor';
import type { IBaseProps } from '../Base';
import type { IFloatingTransitionOrigin } from '../FloatingTransition';
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

export type IPopoverBaseProps<TForwardedProps extends object = object> =
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
      modal?: boolean;
      trapFocus?: boolean;
      matchTargetWidth?: boolean;
      middleware?: Array<Middleware | null | undefined | false>;
      referenceRef?: React.RefObject<HTMLElement>;
      scrim?: boolean;
    };
