import type { OpenChangeReason, Placement } from '@floating-ui/react';

import type {
  IRendererWithForwardedProps,
  IForwardableProps,
} from '@/helpers/react/forwardablePropsTypes';
import type { ITooltipCursorType } from '@/hooks/useTooltipCursor';

export type ITooltipBaseContentRendererProps = {
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
  onClose: (event?: React.MouseEvent) => void;
};

export type ITooltipBaseChildrenRendererProps = {
  isOpen: boolean;
  placement: Placement;
};

export type ITooltipBaseProps<TForwardedProps extends object = object> =
  IForwardableProps & {
    contentRenderer: IRendererWithForwardedProps<
      ITooltipBaseContentRendererProps,
      TForwardedProps
    >;
    children?:
      | React.ReactNode
      | ((props: ITooltipBaseChildrenRendererProps) => React.ReactNode);
    placement?: Placement;
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    cursor?: ITooltipCursorType;
    onOpenChange?: (
      isOpen: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;
    persistent?: boolean;
    disabled?: boolean;
  };
