import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useContext } from 'react';

import type { IMenuItemProps } from './MenuItem.types';
import { MenuContext } from '@/components/Menu';
import { IconTriangleLeft, IconTriangleRight } from '@/components/Icons';
import { MenuItem } from './MenuItem';

export type IMenuNestedItemProps = IMenuItemProps;

export const MenuNestedItem = forwardRef<
  HTMLButtonElement,
  IMenuNestedItemProps
>(function MenuNestedItem(props, forwardedRef) {
  const { ...other } = props;
  const menuContext = useContext(MenuContext);
  const handleRef = useMergeRefs([menuContext.triggerRef, forwardedRef]);

  return (
    <MenuItem
      leading={
        menuContext.placement?.startsWith('left-') ? (
          <IconTriangleLeft aria-hidden />
        ) : undefined
      }
      trailing={
        menuContext.placement?.startsWith('left-') ? undefined : (
          <IconTriangleRight aria-hidden />
        )
      }
      keepOpenOnClick={true}
      label={other.label}
      {...menuContext.getTriggerProps(other)}
      ref={handleRef}
    />
  );
});
