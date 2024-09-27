import { useMergeRefs } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { iconTriangleLeft, iconTriangleRight } from '~/assets/icons';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useMenuContext } from '../Menu';
import { SvgIcon } from '../SvgIcon';
import { MenuItem } from './MenuItem';

const COMPONENT_NAME = 'MenuNestedItem';

export const NestedMenuItem = polymorphicComponentFactory<IMenuItemFactory>(
  (props, forwardedRef) => {
    const { ...other } = props;
    const menuContext = useMenuContext();
    const handleRef = useMergeRefs([menuContext.triggerRef, forwardedRef]);

    return (
      <MenuItem
        leadingIcon={
          menuContext.placement?.startsWith('left-') && (
            <SvgIcon icon={iconTriangleLeft} />
          )
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
  },
);

NestedMenuItem.theme = MenuItem.theme;
NestedMenuItem.displayName = `@sixui/${COMPONENT_NAME}`;
