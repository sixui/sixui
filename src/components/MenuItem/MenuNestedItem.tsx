import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useContext } from 'react';

import type { IMenuItemProps } from './MenuItem.types';
import { MenuContext } from '../Menu';
import { SvgIcon } from '../SvgIcon';
import { MenuItem } from './MenuItem';
import { iconTriangleLeft, iconTriangleRight } from '~/assets/icons';

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
      leadingIcon={
        menuContext.placement?.startsWith('left-') ? (
          <SvgIcon icon={iconTriangleLeft} />
        ) : undefined
      }
      trailingIcon={
        menuContext.placement?.startsWith('left-') ? undefined : (
          <SvgIcon icon={iconTriangleRight} />
        )
      }
      keepOpenOnClick={true}
      label={other.label}
      {...menuContext.getTriggerProps(other)}
      ref={handleRef}
    />
  );
});
