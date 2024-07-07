import { useState } from 'react';

import type {
  IFilterableListItemRenderer,
  IFilterableListItemsEqualProp,
} from './FilterableListBaseProps';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  executeFilterableItemsEqual,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './FilterableListBaseUtils';

export type IUseSingleFilterableListBaseProps<
  TItem,
  TElement extends HTMLElement,
> = {
  items: Array<TItem>;
  itemRenderer: IFilterableListItemRenderer<TItem, TElement>;
  selectedItem?: TItem;
  defaultItem?: TItem;
  itemEmpty?: (item: TItem) => boolean;
  itemsEqual?: IFilterableListItemsEqualProp<TItem>;
  onItemChange?: (item?: TItem) => void;
};

export type IUseSingleFilterableListBaseResult<
  TItem,
  TElement extends HTMLElement,
> = {
  itemRenderer: IFilterableListItemRenderer<TItem, TElement>;
  handleItemSelect: (newSelectedItem: TItem) => number | undefined;
  handleClear: (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLElement>,
  ) => void;
  items: Array<TItem>;
  selectedItem?: TItem;
};

export const useSingleFilterableListBase = <
  TItem,
  TElement extends HTMLElement,
>(
  props: IUseSingleFilterableListBaseProps<TItem, TElement>,
): IUseSingleFilterableListBaseResult<TItem, TElement> => {
  const [items, setItems] = useState(props.items);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: props.selectedItem,
    default: props.defaultItem,
    name: 'useSingleFilterableListBase',
  });

  const itemRenderer: IFilterableListItemRenderer<TItem, TElement> = (
    item,
    itemProps,
  ): React.JSX.Element | null => {
    const selected = executeFilterableItemsEqual(
      props.itemsEqual,
      item,
      selectedItem,
    );

    return props.itemRenderer(item, {
      ...itemProps,
      modifiers: {
        ...itemProps.modifiers,
        selected,
      },
    });
  };

  const handleItemSelect = (newSelectedItem: TItem): number | undefined => {
    setSelectedItem(newSelectedItem);
    props.onItemChange?.(newSelectedItem);

    // Delete the old item from the list if it was newly created.
    const step1Result = maybeDeleteCreatedItemFromArrays(
      props.itemsEqual,
      items,
      createdItems,
      selectedItem,
    );

    // Add the new item to the list if it is newly created.
    const step2Result = maybeAddCreatedItemToArrays(
      props.itemsEqual,
      step1Result.items,
      step1Result.createdItems,
      newSelectedItem,
    );

    setCreatedItems(step2Result.createdItems);
    setItems(step2Result.items);

    const createdIndex = step2Result.createdItems.indexOf(newSelectedItem);
    const selectedIndex =
      createdIndex >= 0
        ? step2Result.items.length - 1 + createdIndex
        : undefined;

    return selectedIndex;
  };

  const handleClear = (
    afterItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLElement>,
  ): void => {
    event?.stopPropagation();

    if (selectedItem) {
      afterItemsRemove([selectedItem], event);
      const emptyItem = props.itemEmpty
        ? items.find(props.itemEmpty)
        : undefined;
      props.onItemChange?.(emptyItem);
      setSelectedItem(emptyItem);
    }
  };

  return {
    itemRenderer,
    handleItemSelect,
    handleClear,
    items,
    selectedItem,
  };
};
