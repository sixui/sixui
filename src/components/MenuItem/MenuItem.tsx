import { useFloatingTree, useListItem } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { iconTriangleRight } from '~/assets/icons';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { ListItem } from '../ListItem';
import { Menu } from '../Menu';
import { SvgIcon } from '../SvgIcon';
import { useMenuItemContext } from './MenuItem.context';

const COMPONENT_NAME = 'MenuItem';

export const MenuItem = polymorphicComponentFactory<IMenuItemFactory>(
  (props, forwardedRef) => {
    const { children, label, keepOpenOnClick, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const menuItemContext = useMenuItemContext();
    const item = useListItem({ label: props.disabled ? null : undefined });
    const tree = useFloatingTree();
    const handleRef = useMergeRefs(item.ref, forwardedRef);
    const isActive =
      menuItemContext !== undefined &&
      item.index === menuItemContext.activeIndex;

    const renderListItem = (): React.JSX.Element => (
      <ListItem
        role="menuitem"
        tabIndex={isActive ? 0 : -1}
        interactions={{ hovered: isActive }}
        interactionsMergeStrategy="override"
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

    const renderNestedMenuItem = (): React.JSX.Element => (
      <Menu
        trigger={(renderProps) => (
          <MenuItem
            trailingIcon={<SvgIcon icon={iconTriangleRight} fz="$4" />}
            keepOpenOnClick
            label={label}
            ref={handleRef}
            {...mergeProps(renderProps.getProps(), other)}
          />
        )}
      >
        {children}
      </Menu>
    );

    return children ? renderNestedMenuItem() : renderListItem();
  },
);

MenuItem.theme = ListItem.theme;
MenuItem.displayName = `@sixui/${COMPONENT_NAME}`;
