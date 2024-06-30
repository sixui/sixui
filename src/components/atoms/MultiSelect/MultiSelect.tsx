import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import type { IFilterableItemRenderer } from '@/components/atoms/FilterableList';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { InputChip, type IInputChipProps } from '@/components/atoms/Chip';
import {
  useMultiFilterableList,
  FilterableListFieldEnd,
} from '@/components/atoms/FilterableList';
import {
  FloatingFilterableList,
  type IFloatingFilterableListTriggerButtonRenderProps,
  type IFloatingFilterableListProps,
} from '@/components/atoms/FloatingFilterableList';

export type IMultiSelectProps<TItem> = IOmit<
  IFloatingFilterableListProps<TItem, HTMLDivElement>,
  'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
> & {
  value?: Array<TItem>;
  defaultValue?: Array<TItem>;
  onChange?: (value: Array<TItem>) => void;
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, HTMLDivElement>;
  itemLabel: (item: TItem) => string;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>,
    selectedItem: TItem,
  ) => IInputChipProps;
};

// TODO: migrate i n theme
const styles = stylex.create({
  chip: {
    marginRight: '0.5rem',
  },
});

// TODO: migrate in theme
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
    items,
    itemRenderer,
    itemLabel,
    value,
    defaultValue,
    onChange,
    getValueFieldProps,
    ...other
  } = props;

  const multiFilterableList = useMultiFilterableList({
    items,
    itemRenderer,
    value,
    defaultValue,
    itemsEqual: other.itemsEqual,
    onChange,
  });

  return (
    <FloatingFilterableList<TItem, HTMLDivElement>
      items={multiFilterableList.items}
      onItemSelect={multiFilterableList.handleItemSelect}
      onItemRemoveFocused={multiFilterableList.handleItemRemoveFocused}
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={multiFilterableList.itemRenderer}
      noResults={<ListItem disabled>No results.</ListItem>}
      resetOnSelect
      resetOnClose
      initialFocus={-1}
      onItemFocusPreviousSelected={
        multiFilterableList.handleItemFocusPreviousSelected
      }
      onItemFocusNextSelected={multiFilterableList.handleItemFocusNextSelected}
      onQueryChange={multiFilterableList.handleQueryChange}
      {...other}
    >
      {(renderProps) => (
        <TextField
          end={
            <FilterableListFieldEnd
              renderProps={renderProps}
              onClear={
                multiFilterableList.selectedItems.length
                  ? (event) =>
                      multiFilterableList.handleClear(
                        renderProps.afterItemsRemove,
                        event,
                      )
                  : undefined
              }
            />
          }
          populated={
            renderProps.isOpen ||
            !!multiFilterableList.selectedItems.length ||
            !!renderProps.query
          }
          innerStyles={{ field: fieldStyles }}
          {...renderProps.getInputFilterAttributes(
            renderProps.getButtonAttributes(),
          )}
          ref={renderProps.buttonRef}
          inputRef={renderProps.inputFilterRef}
        >
          {multiFilterableList.selectedItems.map((selectedItem, index) => (
            <InputChip
              sx={styles.chip}
              key={index}
              visualState={{
                focused:
                  multiFilterableList.focusedSelectedItemIndex === index
                    ? true
                    : undefined,
              }}
              onDelete={(event) => {
                event.stopPropagation();
                onChange?.(multiFilterableList.deselectItemAtIndex(index));
                renderProps.afterItemsRemove([selectedItem], event);
              }}
              label={itemLabel(selectedItem)}
              {...getValueFieldProps?.(renderProps, selectedItem)}
            />
          ))}
        </TextField>
      )}
    </FloatingFilterableList>
  );
};
