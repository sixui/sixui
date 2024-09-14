import { useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';

import type { IMenuItemProps } from './MenuItem.types';
import { iconTriangleLeft, iconTriangleRight } from '~/assets/icons';
import { SvgIcon } from '../../SvgIcon';
import { useMenuContext } from '../Menu.context';
import { MenuItem } from './MenuItem';

export type IMenuNestedItemProps = IMenuItemProps;

export const MenuNestedItem = forwardRef<
  HTMLButtonElement,
  IMenuNestedItemProps
>(function MenuNestedItem(props, forwardedRef) {
  const { ...other } = props;
  const menuContext = useMenuContext;
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
      {...other}
      {...menuContext.getTriggerProps()}
      ref={handleRef}
    />
  );
});
