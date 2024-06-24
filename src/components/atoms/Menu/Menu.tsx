import { forwardRef } from 'react';
import {
  FloatingTree,
  useFloatingParentNodeId,
  type Placement,
} from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { MenuLeaf } from './MenuLeaf';
import { MenuItem } from './MenuItem';
import { MenuNestedItem } from './MenuNestedItem';

export type IMenuRenderProps = {
  open: boolean;
  placement: Placement;
};

export type IMenuProps = IOmit<IContainerProps, 'styles'> & {
  button:
    | React.ReactElement
    | ((props: IMenuRenderProps) => React.ReactElement);
  children: React.ReactNode;
  placement?: Placement;
};

const Menu = forwardRef<HTMLButtonElement, IMenuProps>(
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

const MenuNamespace = Object.assign(Menu, {
  Item: MenuItem,
  NestedItem: MenuNestedItem,
  Divider: MenuListDivider,
});

export { MenuNamespace as Menu };
