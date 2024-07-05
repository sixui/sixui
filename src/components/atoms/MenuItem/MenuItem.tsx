import { forwardRef, useContext } from 'react';
import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';

import { ListItem, type IListItemOwnProps } from '@/components/atoms/ListItem';
import { Menu, MenuItemContext } from '@/components/atoms/Menu';
import { MenuNestedItem } from './MenuNestedItem';

export type IMenuItemProps = IListItemOwnProps &
  React.HTMLProps<HTMLButtonElement> & {
    label: React.ReactNode;
    keepOpenOnClick?: boolean;
  };

export const MenuItem = forwardRef<HTMLButtonElement, IMenuItemProps>(
  function MenuItem(props, forwardedRef) {
    const { children, label, keepOpenOnClick, ...other } = props;
    const menuItemContext = useContext(MenuItemContext);
    const item = useListItem({ label: props.disabled ? null : undefined });
    const tree = useFloatingTree();
    const handleRef = useMergeRefs([item.ref, forwardedRef]);
    const isActive = item.index === menuItemContext.activeIndex;

    const renderListItem = (): React.ReactNode => (
      <ListItem
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        visualState={{ hovered: isActive, strategy: 'replace' }}
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
      <Menu trigger={() => <MenuNestedItem label={label} {...other} />}>
        {children}
      </Menu>
    ) : (
      renderListItem()
    );
  },
);