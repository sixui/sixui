import stylex from '@stylexjs/stylex';
import { useState } from 'react';

import type {
  IFilterableItemRenderer,
  IFilterableItemsEqualProp,
} from './FilterableListProps';
import type { IFloatingFilterableListTriggerButtonRenderProps } from '@/components/atoms/FloatingFilterableList';
import { useControlledValue } from '@/hooks/useControlledValue';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { IconButton } from '@/components/atoms/IconButton';
import { commonStyles } from '@/helpers/commonStyles';
import {
  executeFilterableItemsEqual,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './FilterableListUtils';

export type IUseSingleFilterableListProps<
  TItem,
  TElement extends HTMLElement,
> = {
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, TElement>;
  value?: TItem;
  defaultValue?: TItem;
  itemsEqual?: IFilterableItemsEqualProp<TItem>;
  onChange?: (value?: TItem) => void;
};

export type IUseSingleFilterableListResult<
  TItem,
  TElement extends HTMLElement,
> = {
  itemRenderer: IFilterableItemRenderer<TItem, TElement>;
  fieldEndRenderer: (
    renderProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>,
  ) => React.JSX.Element;
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

export const useSingleFilterableList = <TItem, TElement extends HTMLElement>(
  props: IUseSingleFilterableListProps<TItem, TElement>,
): IUseSingleFilterableListResult<TItem, TElement> => {
  const [items, setItems] = useState(props.items);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: props.value,
    default: props.defaultValue,
    name: 'useSingleFilterableList',
  });

  const itemRenderer: IFilterableItemRenderer<TItem, TElement> = (
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
    props.onChange?.(newSelectedItem);

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
      props.onChange?.(undefined);
      afterItemsRemove([selectedItem], event);
      setSelectedItem(undefined);
    }
  };

  const fieldEndRenderer = (
    renderProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>,
  ): React.JSX.Element => (
    <div
      {...stylex.props(commonStyles.horizontalLayout, commonStyles.gap$none)}
    >
      {selectedItem ? (
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
    handleClear,
    items,
    selectedItem,
  };
};
