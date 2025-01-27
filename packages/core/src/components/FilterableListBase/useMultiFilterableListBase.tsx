import { useState } from 'react';

import type {
  IFilterableListItemRenderer,
  IFilterableListItemsEqualProp,
} from './FilterableListBase.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import {
  arrayContainsItem,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './FilterableListBaseUtils';

export type IUseMultiFilterableListBaseProps<
  TItem,
  TItemElement extends HTMLElement,
> = {
  items: Array<TItem>;
  itemRenderer: IFilterableListItemRenderer<TItem, TItemElement>;
  selectedItems?: Array<TItem>;
  defaultItems?: Array<TItem>;
  itemsEqual?: IFilterableListItemsEqualProp<TItem>;
  onItemsChange?: (items: Array<TItem>) => void;
};

export type IUseMultiFilterableListBaseResult<
  TItem,
  TItemElement extends HTMLElement,
> = {
  itemRenderer: IFilterableListItemRenderer<TItem, TItemElement>;
  handleItemSelect: (newSelectedItem: TItem) => number | undefined;
  handleRemoveFocusedChip: () => void;
  handleFocusPreviousChip: () => boolean;
  handleFocusNextChip: () => boolean;
  handleBlurChip: () => boolean;
  handleQueryChange: () => void;
  handleClear: (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent,
    ) => void,
    event?: React.MouseEvent,
  ) => void;
  getFocusedChipIndex: () => number | undefined;
  items: Array<TItem>;
  selectedItems: Array<TItem>;
  focusedSelectedItemIndex?: number;
  deselectItemAtIndex: (index: number) => Array<TItem>;
};

export const useMultiFilterableListBase = <
  TItem,
  TItemElement extends HTMLElement,
>(
  props: IUseMultiFilterableListBaseProps<TItem, TItemElement>,
): IUseMultiFilterableListBaseResult<TItem, TItemElement> => {
  const {
    selectedItems: selectedItemsProp,
    defaultItems,
    itemsEqual,
    itemRenderer: itemRendererProp,
    items,
    onItemsChange,
  } = props;
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItems, setSelectedItems] = useControlledValue({
    controlled: selectedItemsProp,
    default: defaultItems ?? [],
    name: 'useMultiFilterableListBase',
  });
  const [focusedSelectedItemIndex, setFocusedSelectedItemIndex] =
    useState<number>();

  const itemRenderer: IFilterableListItemRenderer<TItem, TItemElement> = (
    item,
    itemProps,
  ): React.JSX.Element | null => {
    const selected = arrayContainsItem(itemsEqual, selectedItems, item);

    return itemRendererProp(item, {
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
        itemsEqual,
        nextItems,
        nextCreatedItems,
        itemToSelect,
      );
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create Item"
      // option will be shown even if it matches an already selected item).
      nextSelectedItems = !arrayContainsItem(
        itemsEqual,
        nextSelectedItems,
        itemToSelect,
      )
        ? [...nextSelectedItems, itemToSelect]
        : nextSelectedItems;
    });

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextSelectedItems);

    return nextSelectedItems;
  };

  const selectItem = (itemToSelect: TItem): Array<TItem> =>
    selectItems([itemToSelect]);

  const deselectItemAtIndex = (index: number): Array<TItem> => {
    const selectedItem = selectedItems[index];
    const { createdItems: nextCreatedItems } = maybeDeleteCreatedItemFromArrays(
      itemsEqual,
      items,
      createdItems,
      selectedItem,
    );
    const nextSelectedItems = selectedItems.filter((_item, i) => i !== index);

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextSelectedItems);

    return nextSelectedItems;
  };

  const handleItemSelect = (selectedItem: TItem): undefined => {
    setFocusedSelectedItemIndex(undefined);

    if (isItemSelected(selectedItem)) {
      const selectedIndex = getSelectedItemIndex(selectedItem);
      onItemsChange?.(deselectItemAtIndex(selectedIndex));
    } else {
      onItemsChange?.(selectItem(selectedItem));
    }

    return undefined;
  };

  const handleItemRemoveAtIndex = (index: number): void => {
    onItemsChange?.(deselectItemAtIndex(index));
  };

  const handleRemoveFocusedChip = (): void => {
    if (focusedSelectedItemIndex === undefined) {
      const nextSelectedItemIndex = selectedItems.length - 1;
      setFocusedSelectedItemIndex(
        nextSelectedItemIndex < 0 ? undefined : nextSelectedItemIndex,
      );

      return;
    }

    const isLastFocused = focusedSelectedItemIndex === selectedItems.length - 1;
    const nextSelectedItemIndex = selectedItems.length - 2;
    if (isLastFocused) {
      setFocusedSelectedItemIndex(
        nextSelectedItemIndex < 0 ? undefined : nextSelectedItemIndex,
      );
    }

    handleItemRemoveAtIndex(focusedSelectedItemIndex);
  };

  const handleFocusPreviousChip = (): boolean => {
    if (!selectedItems.length) {
      return false;
    }

    const previousIndex =
      focusedSelectedItemIndex === undefined
        ? selectedItems.length - 1
        : focusedSelectedItemIndex - 1;

    setFocusedSelectedItemIndex(Math.max(previousIndex, 0));

    return previousIndex >= 0;
  };

  const handleFocusNextChip = (): boolean => {
    if (!selectedItems.length) {
      return false;
    }

    const nextIndex =
      focusedSelectedItemIndex === undefined ||
      focusedSelectedItemIndex === selectedItems.length - 1
        ? undefined
        : focusedSelectedItemIndex + 1;

    setFocusedSelectedItemIndex(nextIndex);

    return focusedSelectedItemIndex !== undefined || nextIndex !== undefined;
  };

  const handleBlurChip = (): boolean => {
    setFocusedSelectedItemIndex(undefined);

    return focusedSelectedItemIndex !== undefined;
  };

  const handleQueryChange = (): void => {
    setFocusedSelectedItemIndex(undefined);
  };

  const handleClear = (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent,
    ) => void,
    event?: React.MouseEvent,
  ): void => {
    event?.stopPropagation();

    if (selectedItems.length) {
      onItemsChange?.([]);
      afterItemsRemove(selectedItems, event);
      setSelectedItems([]);
    }
  };

  return {
    itemRenderer,
    handleItemSelect,
    handleRemoveFocusedChip,
    handleFocusPreviousChip,
    handleFocusNextChip,
    handleBlurChip,
    handleQueryChange,
    handleClear,
    getFocusedChipIndex: () => focusedSelectedItemIndex,
    deselectItemAtIndex,
    items: [...items, ...createdItems],
    selectedItems,
    focusedSelectedItemIndex,
  };
};
