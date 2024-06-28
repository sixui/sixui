import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import type { IFilteredItemRenderer } from '@/components/atoms/FilteredList';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { InputChip, type IInputChipProps } from '@/components/atoms/Chip';
import { useControlledValue } from '@/hooks/useControlledValue';
import { commonStyles } from '@/helpers/commonStyles';
import { IconButton } from '@/components/atoms/IconButton';
import {
  arrayContainsItem,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from '@/components/atoms/FilteredList';
import {
  FloatingFilteredList,
  type IFloatingFilteredListTriggerButtonRenderProps,
  type IFloatingFilteredListProps,
} from '@/components/atoms/FloatingFilteredList';

export type IMultiSelectProps<TItem> = IOmit<
  IFloatingFilteredListProps<TItem, HTMLDivElement>,
  'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
> & {
  value?: Array<TItem>;
  defaultValue?: Array<TItem>;
  onChange: (value: Array<TItem>) => void;
  items: Array<TItem>;
  itemRenderer: IFilteredItemRenderer<TItem, HTMLDivElement>;
  getInputChipProps?: (
    buttonProps: IFloatingFilteredListTriggerButtonRenderProps<TItem>,
    selectedItem: TItem,
  ) => IInputChipProps;
};

// TODO: migrate i n theme
const styles = stylex.create({
  chip: {
    marginRight: '0.5rem',
  },
});

// TODO: migrate i n theme
const fieldStyles = stylex.create({
  contentSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: '0.5rem',
    flexWrap: 'wrap',
  },
});

export const MultiSelect = <TItem,>(
  props: IMultiSelectProps<TItem>,
): React.ReactNode => {
  const {
    items: itemsProp,
    itemRenderer,
    value,
    defaultValue,
    onChange,
    getInputChipProps,
    ...other
  } = props;
  const [items, setItems] = useState(itemsProp);
  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const [selectedItems, setSelectedItems] = useControlledValue({
    controlled: value,
    default: defaultValue ?? [],
    name: 'MultiSelect',
  });
  const [focusedSelectedItemIndex, setFocusedSelectedItemIndex] =
    useState<number>();

  const getSelectedFilmIndex = (film: TItem): number => {
    const index = selectedItems.indexOf(film);

    return index !== undefined && index >= 0 ? index : -1;
  };

  const isFilmSelected = (film: TItem): boolean =>
    getSelectedFilmIndex(film) >= 0;

  const selectFilms = (filmsToSelect: Array<TItem>): Array<TItem> => {
    let nextCreatedItems = createdItems.slice();
    let nextFilms = selectedItems.slice();
    let nextItems = items.slice();

    filmsToSelect.forEach((filmToSelect) => {
      const results = maybeAddCreatedItemToArrays(
        other.itemsEqual,
        nextItems,
        nextCreatedItems,
        filmToSelect,
      );
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create Item"
      // option will be shown even if it matches an already selected item).
      nextFilms = !arrayContainsItem(other.itemsEqual, nextFilms, filmToSelect)
        ? [...nextFilms, filmToSelect]
        : nextFilms;
    });

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextFilms);
    setItems(nextItems);

    return nextFilms;
  };

  const selectFilm = (filmToSelect: TItem): Array<TItem> =>
    selectFilms([filmToSelect]);

  const deselectFilm = (index: number): Array<TItem> => {
    const film = selectedItems[index];
    const { createdItems: nextCreatedItems, items: nextItems } =
      maybeDeleteCreatedItemFromArrays(
        other.itemsEqual,
        items,
        createdItems,
        film,
      );
    const nextSelectedItems = selectedItems.filter((_film, i) => i !== index);

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextSelectedItems);
    setItems(nextItems);

    return nextSelectedItems;
  };

  const handleItemSelect = (selectedItem: TItem): undefined => {
    setFocusedSelectedItemIndex(undefined);

    if (isFilmSelected(selectedItem)) {
      const selectedIndex = getSelectedFilmIndex(selectedItem);
      if (selectedIndex !== undefined) {
        onChange(deselectFilm(selectedIndex));
        other.onItemsRemove?.([selectedItem]);
      }
    } else {
      onChange(selectFilm(selectedItem));
    }

    return undefined;
  };

  const itemRendererWrapper: IFilteredItemRenderer<TItem, HTMLDivElement> = (
    item,
    itemProps,
  ): React.JSX.Element | null => {
    const selected = arrayContainsItem(other.itemsEqual, selectedItems, item);

    return itemRenderer(item, {
      ...itemProps,
      modifiers: {
        ...itemProps.modifiers,
        selected,
      },
    });
  };

  const handleItemRemove = (item: TItem, index: number): void => {
    onChange(deselectFilm(index));
    other.onItemsRemove?.([item]);
  };

  const handleItemRemoveFocused = (): void => {
    if (focusedSelectedItemIndex === undefined) {
      setFocusedSelectedItemIndex(selectedItems.length - 1);

      return;
    }

    const item = selectedItems[focusedSelectedItemIndex];
    const isLastFocused = focusedSelectedItemIndex === selectedItems.length - 1;
    if (isLastFocused) {
      setFocusedSelectedItemIndex(selectedItems.length - 2);
    }

    handleItemRemove(item, focusedSelectedItemIndex);
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

  const handleQueryChange = (): void => {
    setFocusedSelectedItemIndex(undefined);
  };

  const handleClear = (
    onItemsRemove: (
      items: Array<TItem>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event?.stopPropagation();
    if (selectedItems.length) {
      onChange?.([]);
      onItemsRemove(selectedItems, event);
      setSelectedItems([]);
    }
  };

  return (
    <FloatingFilteredList<TItem, HTMLDivElement>
      items={items}
      onItemSelect={handleItemSelect}
      onItemRemoveFocused={handleItemRemoveFocused}
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={itemRendererWrapper}
      noResults={<ListItem disabled>No results.</ListItem>}
      resetOnSelect
      resetOnClose
      initialFocus={-1}
      onItemFocusPreviousSelected={handleItemFocusPreviousSelected}
      onItemFocusNextSelected={handleItemFocusNextSelected}
      onQueryChange={handleQueryChange}
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
              {selectedItems.length ? (
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
            buttonProps.isOpen || !!selectedItems.length || !!buttonProps.query
          }
          innerStyles={{ field: fieldStyles }}
          {...buttonProps.getInputFilterAttributes(
            buttonProps.getButtonAttributes(),
          )}
          ref={buttonProps.buttonRef}
          inputRef={buttonProps.inputFilterRef}
        >
          {selectedItems.map((selectedItem, index) => (
            <InputChip
              sx={styles.chip}
              key={index}
              visualState={{
                focused: focusedSelectedItemIndex === index ? true : undefined,
              }}
              onDelete={(event) => {
                event.stopPropagation();
                onChange(deselectFilm(index));
                buttonProps.onItemsRemove([selectedItem], event);
              }}
              {...getInputChipProps?.(buttonProps, selectedItem)}
            />
          ))}
        </TextField>
      )}
    </FloatingFilteredList>
  );
};
