import { useMergeRefs } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { iconTriangleLeft, iconTriangleRight } from '~/assets/icons';
import { SvgIcon } from '../../SvgIcon';
import { useMenuContext } from '../Menu.context';
import { MenuItem } from './MenuItem';

const COMPONENT_NAME = 'MenuNestedItem';

export const NestedMenuItem = componentFactory<IMenuItemFactory>(
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
