import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { iconTriangleLeft, iconTriangleRight } from '~/assets/icons';
import { ListItem } from '../../ListItem';
import { SvgIcon } from '../../SvgIcon';
import { useMenuItemContext } from './MenuItem.context';
import { useMenuContext } from '../Menu.context';

const COMPONENT_NAME = 'MenuItem';

export const MenuItem = polymorphicComponentFactory<IMenuItemFactory>(
  (props, forwardedRef) => {
    const { as, children, label, keepOpenOnClick, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const menuContext = useMenuContext();
    const menuItemContext = useMenuItemContext();
    const item = useListItem({ label: props.disabled ? null : undefined });
    const tree = useFloatingTree();
    const handleRef = useMergeRefs([item.ref, forwardedRef]);
    const isActive =
      menuItemContext !== undefined &&
      item.index === menuItemContext.activeIndex;

    const renderListItem = (): JSX.Element => (
      <ListItem
        as={as}
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        interactions={{ hovered: isActive }}
        {...menuItemContext?.getItemProps({
          ...other,
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            other.onClick?.(event);
            if (!keepOpenOnClick) {
              tree?.events.emit('click');
            }
          },
        })}
        ref={handleRef}
      >
        {label}
      </ListItem>
    );

    const renderNestedMenuItem = (): JSX.Element => (
      <MenuItem
        as={as}
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
        {...menuContext.getTriggerProps(other)}
        label={label}
        ref={handleRef}
      >
        {children}
      </MenuItem>
    );

    return children ? renderNestedMenuItem() : renderListItem();
  },
);

MenuItem.theme = ListItem.theme;
MenuItem.displayName = `@sixui/${COMPONENT_NAME}`;
