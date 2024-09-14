import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { ListItem } from '../../ListItem';
import { Menu } from '../Menu';
import { useMenuItemContext } from './MenuItem.context';
import { NestedMenuItem } from './NestedMenuItem';

const COMPONENT_NAME = 'MenuItem';

export const MenuItem = componentFactory<IMenuItemFactory>(
  (props, forwardedRef) => {
    const { children, label, keepOpenOnClick, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const menuItemContext = useMenuItemContext();
    const item = useListItem({ label: props.disabled ? null : undefined });
    const tree = useFloatingTree();
    const handleRef = useMergeRefs([item.ref, forwardedRef]);
    const isActive = item.index === menuItemContext.activeIndex;

    const renderListItem = (): React.ReactNode => (
      <ListItem
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        interactions={{ hovered: isActive }}
        {...menuItemContext.getItemProps({
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

    return children ? (
      <Menu trigger={() => <NestedMenuItem label={label} {...other} />}>
        {children}
      </Menu>
    ) : (
      renderListItem()
    );
  },
);

MenuItem.theme = ListItem.theme;
MenuItem.displayName = `@sixui/${COMPONENT_NAME}`;
