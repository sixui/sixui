import { forwardRef } from 'react';
import { isFunction } from 'lodash';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  type Placement,
} from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import { useControlledValue } from '@/hooks/useControlledValue';

export type ITooltipRenderProps = {
  isOpen: boolean;
  placement: Placement;
};

export type ITooltipProps = IContainerProps & {
  content: React.ReactNode;
  children?:
    | React.ReactElement
    | ((props: ITooltipRenderProps) => React.ReactElement);
  placement?: Placement;
  open?: boolean;
};

// FIXME: continue
export const Tooltip = forwardRef<HTMLDivElement, ITooltipProps>(
  function Tooltip(props, forwardedRef) {
    const {
      styles,
      sx,
      content,
      children,
      placement = 'top-center',
      open: openProp,
      ...other
    } = props;
    const [isOpen, setIsOpen] = useControlledValue({
      controlled: openProp,
      default: false,
      name: 'Tooltip',
    });
    const floating = useFloating({
      placement,
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        // TODO: 4 with visual boundary (ie. buttons), 8 without (ie. text)
        offset(8),
        flip({
          crossAxis: placement.includes('-'),
          fallbackAxisSideDirection: 'start',
          padding: 5,
        }),
        shift({ padding: 8 }),
      ],
    });

    return (
      // <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
      <div ref={forwardedRef}>
        {isFunction(children) ? children({ isOpen }) : children}
      </div>
    );
  },
);
