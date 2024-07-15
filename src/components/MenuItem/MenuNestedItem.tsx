import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useContext } from 'react';
import { ReactComponent as TriangleLeft } from '@/assets/TriangleLeft.svg';
import { ReactComponent as TriangleRight } from '@/assets/TriangleRight.svg';

import type { IMenuItemProps } from './MenuItem.types';
import { MenuContext } from '@/components/Menu';
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
          <TriangleLeft aria-hidden />
        ) : undefined
      }
      trailing={
        menuContext.placement?.startsWith('left-') ? undefined : (
          <TriangleRight aria-hidden />
        )
      }
      keepOpenOnClick={true}
      label={other.label}
      {...menuContext.getTriggerProps(other)}
      ref={handleRef}
    />
  );
});
