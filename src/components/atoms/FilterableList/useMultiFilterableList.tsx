import stylex from '@stylexjs/stylex';
import { useState } from 'react';

import type { IFloatingFilterableListTriggerButtonRenderProps } from '@/components/atoms/FloatingFilterableList';
import type {
  IFilterableItemRenderer,
  IFilterableItemsEqualProp,
} from './FilterableListProps';
import { useControlledValue } from '@/hooks/useControlledValue';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { IconButton } from '@/components/atoms/IconButton';
import { commonStyles } from '@/helpers/commonStyles';
import {
  arrayContainsItem,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './FilterableListUtils';

export type IUseMultiFilterableListProps<
  TItem,
  TElement extends HTMLElement,
> = {
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, TElement>;
  value?: Array<TItem>;
  defaultValue?: Array<TItem>;
  itemsEqual?: IFilterableItemsEqualProp<TItem>;
  onChange?: (value: Array<TItem>) => void;
};

export type IUseMultiFilterableListResult<
  TItem,
  TElement extends HTMLElement,
> = {
  itemRenderer: IFilterableItemRenderer<TItem, TElement>;
  fieldEndRenderer: (
    renderProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>,
  ) => React.JSX.Element;
  handleItemSelect: (newSelectedItem: TItem) => number | undefined;
  handleItemRemoveFocused: () => void;
  handleItemFocusPreviousSelected: () => void;
  handleItemFocusNextSelected: () => void;
  handleQueryChange: () => void;
  handleClear: (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLElement>,
  ) => void;
  items: Array<TItem>;
  selectedItems: Array<TItem>;
  focusedSelectedItemIndex?: number;
  deselectItemAtIndex: (index: number) => Array<TItem>;
};

export const useMultiFilterableList = <TItem, TElement extends HTMLElement>(
  props: IUseMultiFilterableListProps<TItem, TElement>,
): IUseMultiFilterableListResult<TItem, TElement> => {
  const [items, setItems] = useState(props.items);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItems, setSelectedItems] = useControlledValue({
    controlled: props.value,
    default: props.defaultValue ?? [],
    name: 'useMultiFilterableList',
  });
  const [focusedSelectedItemIndex, setFocusedSelectedItemIndex] =
    useState<number>();

  const itemRenderer: IFilterableItemRenderer<TItem, TElement> = (
    item,
    itemProps,
  ): React.JSX.Element | null => {
    const selected = arrayContainsItem(props.itemsEqual, selectedItems, item);

    return props.itemRenderer(item, {
      ...itemProps,
      modifiers: {
        ...itemProps.modifiers,
        selected,
      },
    });
  };

  const getSelectedItemIndex = (item: TItem): number =>
    selectedItems.indexOf(item);

  const isItemSelected = (item: TItem): boolean =>
    getSelectedItemIndex(item) >= 0;

  const selectItems = (itemsToSelect: Array<TItem>): Array<TItem> => {
    let nextCreatedItems = createdItems.slice();
    let nextSelectedItems = selectedItems.slice();
    let nextItems = items.slice();

    itemsToSelect.forEach((itemToSelect) => {
      const results = maybeAddCreatedItemToArrays(
        props.itemsEqual,
        nextItems,
        nextCreatedItems,
        itemToSelect,
      );
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create Item"
      // option will be shown even if it matches an already selected item).
      nextSelectedItems = !arrayContainsItem(
        props.itemsEqual,
        nextSelectedItems,
        itemToSelect,
      )
        ? [...nextSelectedItems, itemToSelect]
        : nextSelectedItems;
    });

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextSelectedItems);
    setItems(nextItems);

    return nextSelectedItems;
  };

  const selectItem = (itemToSelect: TItem): Array<TItem> =>
    selectItems([itemToSelect]);

  const deselectItemAtIndex = (index: number): Array<TItem> => {
    const selectedItem = selectedItems[index];
    const { createdItems: nextCreatedItems, items: nextItems } =
      maybeDeleteCreatedItemFromArrays(
        props.itemsEqual,
        items,
        createdItems,
        selectedItem,
      );
    const nextSelectedItems = selectedItems.filter((_item, i) => i !== index);

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextSelectedItems);
    setItems(nextItems);

    return nextSelectedItems;
  };

  const handleItemSelect = (selectedItem: TItem): undefined => {
    setFocusedSelectedItemIndex(undefined);

    if (isItemSelected(selectedItem)) {
      const selectedIndex = getSelectedItemIndex(selectedItem);
      if (selectedIndex !== undefined) {
        props.onChange?.(deselectItemAtIndex(selectedIndex));
      }
    } else {
      props.onChange?.(selectItem(selectedItem));
    }

    return undefined;
  };

  const handleItemRemoveAtIndex = (index: number): void => {
    props.onChange?.(deselectItemAtIndex(index));
  };

  const handleItemRemoveFocused = (): void => {
    if (focusedSelectedItemIndex === undefined) {
      setFocusedSelectedItemIndex(selectedItems.length - 1);

      return;
    }

    const isLastFocused = focusedSelectedItemIndex === selectedItems.length - 1;
    if (isLastFocused) {
      setFocusedSelectedItemIndex(selectedItems.length - 2);
    }

    handleItemRemoveAtIndex(focusedSelectedItemIndex);
  };

  const handleItemFocusPreviousSelected = (): void => {
    if (!selectedItems.length) {
      return;
    }

    const previousIndex =
      focusedSelectedItemIndex === undefined
        ? selectedItems.length - 1
        : Math.max(focusedSelectedItemIndex - 1, 0);

    setFocusedSelectedItemIndex(previousIndex);
  };

  const handleItemFocusNextSelected = (): void => {
    if (!selectedItems.length) {
      return;
    }

    const nextIndex =
      focusedSelectedItemIndex === undefined ||
      focusedSelectedItemIndex === selectedItems.length - 1
        ? undefined
        : focusedSelectedItemIndex + 1;

    setFocusedSelectedItemIndex(nextIndex);
  };

  const handleQueryChange = (): void => setFocusedSelectedItemIndex(undefined);

  const handleClear = (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLElement>,
  ): void => {
    event?.stopPropagation();

    if (selectedItems.length) {
      props.onChange?.([]);
      afterItemsRemove(selectedItems, event);
      setSelectedItems([]);
    }
  };

  const fieldEndRenderer = (
    renderProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>,
  ): React.JSX.Element => (
    <div
      {...stylex.props(commonStyles.horizontalLayout, commonStyles.gap$none)}
    >
      {selectedItems.length ? (
        <IconButton
          icon={<XMarkIcon aria-hidden />}
          onClick={(event) => handleClear(renderProps.afterItemsRemove, event)}
        />
      ) : null}
      <IconButton
        tabIndex={-1}
        icon={
          renderProps.isOpen ? (
            <TriangleUpIcon aria-hidden />
          ) : (
            <TriangleDownIcon aria-hidden />
          )
        }
      />
    </div>
  );

  return {
    itemRenderer,
    fieldEndRenderer,
    handleItemSelect,
    handleItemRemoveFocused,
    handleItemFocusPreviousSelected,
    handleItemFocusNextSelected,
    handleQueryChange,
    handleClear,
    deselectItemAtIndex,
    items,
    selectedItems,
    focusedSelectedItemIndex,
  };
};
