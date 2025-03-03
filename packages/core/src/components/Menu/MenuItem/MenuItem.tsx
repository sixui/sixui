import { useFloatingTree, useListItem } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { iconTriangleRight } from '~/assets/icons';
import { ListItem } from '~/components/List/ListItem';
import { MenuLeaf } from '~/components/Menu/MenuLeaf';
import { SvgIcon } from '~/components/SvgIcon';
import { useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './MenuItem.constants';
import { useMenuItemContext } from './MenuItem.context';

/**
 * @see https://m3.material.io/components/items/overview
 */
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
      <MenuLeaf
        trigger={(renderProps) => (
          <MenuItem
            trailingIcon={<SvgIcon icon={iconTriangleRight} fz="16px" />}
            keepOpenOnClick
            label={label}
            ref={handleRef}
            {...mergeProps(renderProps.getProps(), other)}
          />
        )}
      >
        {children}
      </MenuLeaf>
    );

    return children ? renderNestedMenuItem() : renderListItem();
  },
);

MenuItem.theme = ListItem.theme;
MenuItem.displayName = `@sixui/core/${COMPONENT_NAME}`;
