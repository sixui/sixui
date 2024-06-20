import { forwardRef } from 'react';
import { ReactComponent as TriangleRight } from '@/assets/TriangleRight.svg';

import { MenuItem, type IMenuItemProps } from './MenuItem';

export const MenuItemWithChildren = forwardRef<
  HTMLButtonElement,
  IMenuItemProps
>(function MenuItemWithChildren(props, forwardedRef) {
  return (
    <MenuItem
      end={<TriangleRight aria-hidden />}
      keepOpenOnClick={true}
      {...props}
      ref={forwardedRef}
    />
  );
});
