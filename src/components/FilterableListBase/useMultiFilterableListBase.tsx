import { useState } from 'react';

import type {
  IFilterableListItemRenderer,
  IFilterableListItemsEqualProp,
} from './FilterableListBase.types';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  arrayContainsItem,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './FilterableListBaseUtils';

export type IUseMultiFilterableListBaseProps<
  TItem,
  TElement extends HTMLElement,
> = {
  items: Array<TItem>;
  itemRenderer: IFilterableListItemRenderer<TItem, TElement>;
  selectedItems?: Array<TItem>;
  defaultItems?: Array<TItem>;
  itemsEqual?: IFilterableListItemsEqualProp<TItem>;
  onItemsChange?: (items: Array<TItem>) => void;
};

export type IUseMultiFilterableListBaseResult<
  TItem,
  TElement extends HTMLElement,
> = {
  itemRenderer: IFilterableListItemRenderer<TItem, TElement>;
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

export const useMultiFilterableListBase = <TItem, TElement extends HTMLElement>(
  props: IUseMultiFilterableListBaseProps<TItem, TElement>,
): IUseMultiFilterableListBaseResult<TItem, TElement> => {
  const [items, setItems] = useState(props.items);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItems, setSelectedItems] = useControlledValue({
    controlled: props.selectedItems,
    default: props.defaultItems ?? [],
    name: 'useMultiFilterableListBase',
  });
  const [focusedSelectedItemIndex, setFocusedSelectedItemIndex] =
    useState<number>();

  const itemRenderer: IFilterableListItemRenderer<TItem, TElement> = (
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
        props.onItemsChange?.(deselectItemAtIndex(selectedIndex));
      }
    } else {
      props.onItemsChange?.(selectItem(selectedItem));
    }

    return undefined;
  };

  const handleItemRemoveAtIndex = (index: number): void => {
    props.onItemsChange?.(deselectItemAtIndex(index));
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
      props.onItemsChange?.([]);
      afterItemsRemove(selectedItems, event);
      setSelectedItems([]);
    }
  };

  return {
    itemRenderer,
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
