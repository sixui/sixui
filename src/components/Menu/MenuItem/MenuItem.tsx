import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';

import type { IMenuItemFactory } from './MenuItem.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ListItem } from '../../ListItem';
import { Menu } from '../Menu';
import {
  listItemTheme,
  type IListItemThemeFactory,
} from '../../ListItem/ListItem.css';
import { useMenuItemContext } from './MenuItem.context';
import { MenuNestedItem } from './MenuNestedItem';

const COMPONENT_NAME = 'MenuItem';

export const MenuItem = componentFactory<IMenuItemFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      label,
      keepOpenOnClick,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useComponentTheme<IListItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: listItemTheme,
      variant,
    });

    const menuItemContext = useMenuItemContext();
    const item = useListItem({ label: props.disabled ? null : undefined });
    const tree = useFloatingTree();
    const handleRef = useMergeRefs([item.ref, forwardedRef]);
    const isActive = item.index === menuItemContext.activeIndex;

    const renderListItem = (): React.ReactNode => (
      <ListItem
        {...getStyles('root')}
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        interactions={{ hovered: isActive }}
        {...menuItemContext.getItemProps({
          // ...other,
          // onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          //   other.onClick?.(event);
          //   if (!keepOpenOnClick) {
          //     tree?.events.emit('click');
          //   }
          // },
        })}
        ref={handleRef}
      >
        {label}
      </ListItem>
    );

    return children ? (
      <Menu trigger={() => <MenuNestedItem label={label} {...other} />}>
        {children}
      </Menu>
    ) : (
      renderListItem()
    );
  },
);
