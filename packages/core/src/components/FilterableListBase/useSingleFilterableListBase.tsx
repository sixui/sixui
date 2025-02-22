import { useCallback, useState } from 'react';

import type {
  IFilterableListItemRenderer,
  IFilterableListItemsEqualProp,
} from './FilterableListBase.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import {
  executeFilterableItemsEqual,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './FilterableListBaseUtils';

export type IUseSingleFilterableListBaseProps<
  TItem,
  TItemElement extends HTMLElement,
> = {
  items: Array<TItem>;
  itemRenderer: IFilterableListItemRenderer<TItem, TItemElement>;
  selectedItem?: TItem;
  defaultItem?: TItem;
  itemEmpty?: (item: TItem) => boolean;
  itemsEqual?: IFilterableListItemsEqualProp<TItem>;
  onItemChange?: (item?: TItem) => void;
};

export type IUseSingleFilterableListBaseResult<
  TItem,
  TItemElement extends HTMLElement,
> = {
  itemRenderer: IFilterableListItemRenderer<TItem, TItemElement>;
  handleItemSelect: (newSelectedItem: TItem) => number | undefined;
  handleClear: (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent,
    ) => void,
    event?: React.MouseEvent,
  ) => void;
  items: Array<TItem>;
  selectedItem?: TItem;
};

export const useSingleFilterableListBase = <
  TItem,
  TItemElement extends HTMLElement,
>(
  props: IUseSingleFilterableListBaseProps<TItem, TItemElement>,
): IUseSingleFilterableListBaseResult<TItem, TItemElement> => {
  const {
    selectedItem: selectedItemProp,
    defaultItem,
    itemsEqual,
    itemRenderer: itemRendererProp,
    onItemChange,
    items,
    itemEmpty,
  } = props;
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: selectedItemProp,
    default: defaultItem,
    name: 'useSingleFilterableListBase',
  });

  const itemRenderer: IFilterableListItemRenderer<TItem, TItemElement> = (
    item,
    itemProps,
  ): React.JSX.Element | null => {
    const selected = executeFilterableItemsEqual(
      itemsEqual,
      item,
      selectedItem,
    );

    return itemRendererProp(item, {
      ...itemProps,
      modifiers: {
        ...itemProps.modifiers,
        selected,
      },
    });
  };

  const handleItemSelect = (newSelectedItem: TItem): number | undefined => {
    setSelectedItem(newSelectedItem);
    onItemChange?.(newSelectedItem);

    // Delete the old item from the list if it was newly created.
    const step1Result = maybeDeleteCreatedItemFromArrays(
      itemsEqual,
      items,
      createdItems,
      selectedItem,
    );

    // Add the new item to the list if it is newly created.
    const step2Result = maybeAddCreatedItemToArrays(
      itemsEqual,
      step1Result.items,
      step1Result.createdItems,
      newSelectedItem,
    );

    setCreatedItems(step2Result.createdItems);

    const createdIndex = step2Result.createdItems.indexOf(newSelectedItem);
    const selectedIndex =
      createdIndex >= 0
        ? step2Result.items.length - 1 + createdIndex
        : undefined;

    return selectedIndex;
  };

  const handleClear = useCallback(
    (
      afterItemsRemove?: (
        items: Array<TItem>,
        event?: React.SyntheticEvent,
      ) => void,
      event?: React.MouseEvent,
    ): void => {
      event?.stopPropagation();

      if (selectedItem && !itemEmpty?.(selectedItem)) {
        afterItemsRemove?.([selectedItem], event);
        const emptyItem = itemEmpty ? items.find(itemEmpty) : undefined;
        onItemChange?.(emptyItem);
        setSelectedItem(emptyItem);
      }
    },
    [selectedItem, itemEmpty, setSelectedItem, onItemChange, items],
  );

  return {
    itemRenderer,
    handleItemSelect,
    handleClear,
    items: [...items, ...createdItems],
    selectedItem,
  };
};
