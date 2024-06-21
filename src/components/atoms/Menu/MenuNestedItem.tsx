import type { Placement } from '@floating-ui/react';
import { forwardRef, useContext } from 'react';
import { ReactComponent as TriangleLeft } from '@/assets/TriangleLeft.svg';
import { ReactComponent as TriangleRight } from '@/assets/TriangleRight.svg';

import { MenuItem, type IMenuItemProps } from './MenuItem';
import { MenuContext } from './MenuContext';

export type IMenuNestedItemProps = IMenuItemProps & {
  placement?: Placement;
};

export const MenuNestedItem = forwardRef<
  HTMLButtonElement,
  IMenuNestedItemProps
>(function MenuNestedItem(props, forwardedRef) {
  const { placement } = useContext(MenuContext);

  return (
    <MenuItem
      leading={
        placement?.startsWith('left-') ? (
          <TriangleLeft aria-hidden />
        ) : undefined
      }
      trailing={
        placement?.startsWith('right-') || placement === undefined ? (
          <TriangleRight aria-hidden />
        ) : undefined
      }
      keepOpenOnClick={true}
      {...props}
      ref={forwardedRef}
    />
  );
});
