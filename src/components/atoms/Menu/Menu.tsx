import { forwardRef } from 'react';
import {
  FloatingTree,
  useFloatingParentNodeId,
  type Placement,
} from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import { MenuLeaf } from './MenuLeaf';

export type IMenuTriggerRenderProps = {
  isOpen: boolean;
  placement: Placement;
  getProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
};

export type IMenuProps = IOmit<IContainerProps, 'styles'> & {
  trigger:
    | React.ReactNode
    | ((renderProps: IMenuTriggerRenderProps) => React.ReactNode);
  children: React.ReactNode;
  placement?: Placement;
  matchTargetWidth?: boolean;
};

export const Menu = forwardRef<HTMLButtonElement, IMenuProps>(
  function MenuParent(props, forwardedRef) {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
      return (
        <FloatingTree>
          <MenuLeaf {...props} ref={forwardedRef} />
        </FloatingTree>
      );
    }

    return <MenuLeaf {...props} ref={forwardedRef} />;
  },
);
