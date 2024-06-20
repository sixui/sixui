import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react';
import { forwardRef, useContext } from 'react';

import type { IOmit } from '@/helpers/types';
import { ListItem, type IListItemProps } from '@/components//atoms/ListItem';
import { MenuContext } from './MenuContext';

export type IMenuItemProps = IOmit<IListItemProps, 'as'> & {
  as?: React.ElementType;
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
        type='button'
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        {...menu.getItemProps({
          onClick(event: React.MouseEvent<HTMLButtonElement>) {
            props.onClick?.(event);

            if (!keepOpenOnClick) {
              tree?.events.emit('click');
            }
          },
          onFocus(event: React.FocusEvent<HTMLButtonElement>) {
            props.onFocus?.(event);
            menu.setHasFocusInside(true);
          },
        })}
        {...other}
        ref={handleRef}
      />
    );
  },
);
