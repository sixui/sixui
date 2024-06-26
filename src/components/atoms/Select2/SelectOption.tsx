import { forwardRef, useContext } from 'react';
import { useListItem, useMergeRefs } from '@floating-ui/react';

import { ListItem, type IListItemOwnProps } from '@/components/atoms/ListItem';
import { composeFloatingProps } from '@/helpers/composeFloatingProps';
import { SelectContext } from './SelectContext';

export type ISelectOptionProps = IListItemOwnProps &
  Omit<React.HTMLProps<HTMLButtonElement>, 'value'> & {
    children?: React.ReactNode;
    value?: string | null;
    label?: string;
  };

export const SelectOption = forwardRef<HTMLButtonElement, ISelectOptionProps>(
  function SelectOption(props, forwardedRef) {
    const { value, children, label, ...other } = props;
    const selectContext = useContext(SelectContext);
    const listItem = useListItem({ label });
    const handleRef = useMergeRefs([listItem.ref, forwardedRef]);

    const isActive = selectContext.activeIndex === listItem.index;
    const isSelected = selectContext.selectedIndex === listItem.index;

    return (
      <ListItem
        role='option'
        aria-selected={isSelected}
        tabIndex={isActive ? 0 : -1}
        visualState={{ hovered: isActive }}
        selected={isSelected}
        data-cy={`selectOption-${value}`}
        {...composeFloatingProps<IListItemOwnProps, HTMLButtonElement>(
          selectContext.getItemProps,
          {
            ...other,
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
              props.onClick?.(event);
              selectContext.handleSelect(listItem.index, props);
            },
          },
        )}
        ref={handleRef}
      >
        {children ?? label}
      </ListItem>
    );
  },
);
