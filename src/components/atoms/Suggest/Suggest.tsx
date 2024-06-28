import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
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

export type ISuggestProps<TItem> = IOmit<
  IFloatingFilteredListProps<TItem, HTMLDivElement>,
  | 'onItemSelect'
  | 'renderer'
  | 'listRenderer'
  | 'itemRenderer'
  | 'children'
  | 'defaultQuery'
> & {
  items: Array<TItem>;
  itemRenderer: IFilteredItemRenderer<TItem, HTMLDivElement>;
  value?: TItem;
  defaultValue?: TItem;
  onChange: (value?: TItem) => void;
  getTextFieldProps?: (
    buttonProps: IFloatingFilteredListTriggerButtonRenderProps<TItem>,
    value?: TItem,
  ) => ITextFieldProps;
};

export const Suggest = <TItem,>(
  props: ISuggestProps<TItem>,
): React.ReactNode => {
  const {
    items: itemsProp,
    itemRenderer,
    value,
    defaultValue,
    onChange,
    getTextFieldProps,
    ...other
  } = props;
  const [items, setItems] = useState(itemsProp);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: value,
    default: defaultValue,
    name: 'FloatingFilteredListDemo',
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
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={itemRendererWrapper}
      noResults={<ListItem disabled>No results.</ListItem>}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      closeOnSelect
      initialFocus={-1}
      {...other}
    >
      {(buttonProps) => (
        <TextField
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
          variant='outlined'
          label='Label'
          populated={
            buttonProps.isOpen || !!selectedItem || !!buttonProps.query
          }
          {...buttonProps.getInputFilterAttributes(
            buttonProps.getButtonAttributes(),
          )}
          {...getTextFieldProps?.(buttonProps, selectedItem)}
          ref={buttonProps.buttonRef}
          inputRef={buttonProps.inputFilterRef}
        />
      )}
    </FloatingFilteredList>
  );
};
