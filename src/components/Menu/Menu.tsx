import { forwardRef } from 'react';
import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react';

import type { IMenuProps } from './Menu.types';
import { MenuLeaf } from './MenuLeaf';

export const Menu = forwardRef<HTMLButtonElement, IMenuProps>(
  function Menu(props, forwardedRef) {
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
