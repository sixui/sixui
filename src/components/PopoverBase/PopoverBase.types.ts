import type {
  OpenChangeReason,
  Placement,
  UseRoleProps,
} from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IRendererWithForwardedProps,
  IForwardableProps,
} from '@/helpers/react/forwardablePropsTypes';
import type { ITooltipCursorType } from '@/hooks/useTooltipCursor';
import type { IPopoverBaseStylesKey } from './PopoverBase.styles';

export type IPopoverBaseContentRendererProps = {
  renderCursor: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
  close: (event?: React.MouseEvent) => void;
};

export type IPopoverBaseChildrenRendererProps = {
  isOpen: boolean;
  placement: Placement;
};

export type IPopoverBaseProps<TForwardedProps extends object = object> =
  IContainerProps<IPopoverBaseStylesKey> &
    IForwardableProps & {
      contentRenderer: IRendererWithForwardedProps<
        IPopoverBaseContentRendererProps,
        TForwardedProps
      >;
      children?:
        | React.ReactNode
        | ((props: IPopoverBaseChildrenRendererProps) => React.ReactNode);
      placement?: Placement;
      isOpen?: boolean;
      defaultIsOpen?: boolean;
      cursor?: ITooltipCursorType;
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
      nonDismissable?: boolean;
      matchTargetWidth?: boolean;
    };
