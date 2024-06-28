import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { Field, type IFieldOwnProps } from '@/components/atoms/Field';
import { useControlledValue } from '@/hooks/useControlledValue';
import { commonStyles } from '@/helpers/commonStyles';
import { IconButton } from '@/components/atoms/IconButton';
import {
  executeFilteredItemsEqual,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
  type IFilteredItemRenderer,
} from '@/components/atoms/FilteredList';
import {
  FloatingFilteredList,
  type IFloatingFilteredListTriggerButtonRenderProps,
  type IFloatingFilteredListProps,
} from '@/components/atoms/FloatingFilteredList';

export type ISelectProps<TItem> = IOmit<
  IFloatingFilteredListProps<TItem, HTMLDivElement>,
  'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
> & {
  items: Array<TItem>;
  itemRenderer: IFilteredItemRenderer<TItem, HTMLDivElement>;
  value?: TItem;
  defaultValue?: TItem;
  onChange: (value?: TItem) => void;
  canFilter?: boolean;
  getFieldProps?: (
    buttonProps: IFloatingFilteredListTriggerButtonRenderProps<TItem>,
    value?: TItem,
  ) => IFieldOwnProps;
};

export const Select = <TItem,>(props: ISelectProps<TItem>): React.ReactNode => {
  const {
    items: itemsProp,
    itemRenderer,
    value,
    defaultValue,
    onChange,
    canFilter,
    getFieldProps,
    ...other
  } = props;
  const [items, setItems] = useState(itemsProp);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: value,
    default: defaultValue,
    name: 'Select',
  });

  const handleItemSelect = (newSelectedItem: TItem): number | undefined => {
    setSelectedItem(newSelectedItem);

    // Delete the old film from the list if it was newly created.
    const step1Result = maybeDeleteCreatedItemFromArrays(
      other.itemsEqual,
      items,
      createdItems,
      selectedItem,
    );

    // Add the new film to the list if it is newly created.
    const step2Result = maybeAddCreatedItemToArrays(
      other.itemsEqual,
      step1Result.items,
      step1Result.createdItems,
      newSelectedItem,
    );

    setCreatedItems(step2Result.createdItems);
    setItems(step2Result.items);
    onChange?.(newSelectedItem);

    const createdIndex = step2Result.createdItems.indexOf(newSelectedItem);
    const selectedIndex =
      createdIndex >= 0
        ? step2Result.items.length - 1 + createdIndex
        : undefined;

    return selectedIndex;
  };

  const itemRendererWrapper: IFilteredItemRenderer<TItem, HTMLDivElement> = (
    item,
    itemProps,
  ): React.JSX.Element | null => {
    const selected = executeFilteredItemsEqual(
      other.itemsEqual,
      item,
      selectedItem,
    );

    return itemRenderer(item, {
      ...itemProps,
      modifiers: {
        ...itemProps.modifiers,
        selected,
      },
    });
  };

  const handleClear = (
    onItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event?.stopPropagation();
    if (selectedItem) {
      onChange?.(undefined);
      onItemsRemove([selectedItem], event);
      setSelectedItem(undefined);
    }
  };

  return (
    <FloatingFilteredList<TItem, HTMLDivElement>
      items={items}
      onItemSelect={handleItemSelect}
      renderer={(listProps) => (
        <MenuList
          noFocusRing
          header={
            canFilter ? (
              <TextField
                clearable
                {...listProps.getInputFilterAttributes()}
                inputRef={listProps.inputFilterRef}
              />
            ) : undefined
          }
        >
          {listProps.filteredList}
        </MenuList>
      )}
      itemRenderer={itemRendererWrapper}
      noResults={<ListItem disabled>No results.</ListItem>}
      closeOnSelect
      {...other}
    >
      {(buttonProps) => (
        <Field
          end={
            <div
              {...stylex.props(
                commonStyles.horizontalLayout,
                commonStyles.gap$none,
              )}
            >
              {selectedItem ? (
                <IconButton
                  icon={<XMarkIcon aria-hidden />}
                  onClick={(event) =>
                    handleClear(buttonProps.onItemsRemove, event)
                  }
                />
              ) : null}
              <IconButton
                tabIndex={-1}
                icon={
                  buttonProps.isOpen ? (
                    <TriangleUpIcon aria-hidden />
                  ) : (
                    <TriangleDownIcon aria-hidden />
                  )
                }
              />
            </div>
          }
          populated={buttonProps.isOpen || !!selectedItem}
          {...buttonProps.getButtonAttributes()}
          {...getFieldProps?.(buttonProps, selectedItem)}
          ref={buttonProps.buttonRef}
        />
      )}
    </FloatingFilteredList>
  );
};
