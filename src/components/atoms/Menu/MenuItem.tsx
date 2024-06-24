import { forwardRef, useContext } from 'react';
import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';

import { ListItem, type IListItemOwnProps } from '@/components/atoms/ListItem';
import { getFloatingPropsWrapper } from '@/helpers/getFloatingPropsWrapper';
import { MenuContext } from './MenuContext';

export type IMenuItemProps = IListItemOwnProps &
  React.HTMLProps<HTMLButtonElement> & {
    children: React.ReactNode;
    keepOpenOnClick?: boolean;
  };

export const MenuItem = forwardRef<HTMLButtonElement, IMenuItemProps>(
  function MenuItem(props, forwardedRef) {
    const { disabled, keepOpenOnClick, ...other } = props;
    const menu = useContext(MenuContext);
    const item = useListItem({ label: disabled ? null : undefined });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;
    const handleRef = useMergeRefs([item.ref, forwardedRef]);

    return (
      <ListItem
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        size='sm'
        {...getFloatingPropsWrapper<IListItemOwnProps, HTMLButtonElement>(
          menu.getItemProps,
          {
            ...other,
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
              props.onClick?.(event);
              if (!keepOpenOnClick) {
                tree?.events.emit('click');
              }
            },
            onFocus: (event: React.FocusEvent<HTMLButtonElement>) => {
              props.onFocus?.(event);
              menu.setHasFocusInside(true);
            },
          },
        )}
        ref={handleRef}
      />
    );
  },
);
