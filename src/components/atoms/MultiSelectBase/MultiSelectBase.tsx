import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import type { IFilterableItemRenderer } from '@/components/atoms/FilterableListBase';
import { ListItem } from '@/components/atoms/ListItem';
import { TextInputField } from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import { InputChip, type IInputChipProps } from '@/components/atoms/Chip';
import {
  useMultiFilterableListBase,
  FilterableListBaseFieldEnd,
} from '@/components/atoms/FilterableListBase';
import {
  FloatingFilterableListBase,
  type IFloatingFilterableListBaseTriggerRenderProps,
  type IFloatingFilterableListBaseProps,
} from '@/components/atoms/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

export type IMultiSelectBaseProps<TItem> = IOmit<
  IFloatingFilterableListBaseProps<TItem, HTMLElement>,
  'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
> & {
  value?: Array<TItem>;
  defaultValue?: Array<TItem>;
  onChange?: (value: Array<TItem>) => void;
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, HTMLElement>;
  itemLabel: (item: TItem) => string;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem: TItem,
  ) => IInputChipProps;
  clearable?: boolean;
  variant?: IFieldBaseVariant | false;
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

export const MultiSelectBase = fixedForwardRef(function MultiSelectBase<TItem>(
  props: IMultiSelectBaseProps<TItem>,
  forwardedRef?: React.Ref<HTMLInputElement>,
) {
  const {
    items,
    itemRenderer,
    itemLabel,
    value,
    defaultValue,
    onChange,
    getValueFieldProps,
    clearable,
    variant,
    ...other
  } = props;

  const multiFilterableListBase = useMultiFilterableListBase({
    items,
    itemRenderer,
    value,
    defaultValue,
    itemsEqual: other.itemsEqual,
    onChange,
  });

  return (
    <FloatingFilterableListBase<TItem, HTMLElement>
      items={multiFilterableListBase.items}
      onItemSelect={multiFilterableListBase.handleItemSelect}
      onItemRemoveFocused={multiFilterableListBase.handleItemRemoveFocused}
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={multiFilterableListBase.itemRenderer}
      noResults={<ListItem disabled>No results.</ListItem>}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      initialFocus={-1}
      onItemFocusPreviousSelected={
        multiFilterableListBase.handleItemFocusPreviousSelected
      }
      onItemFocusNextSelected={
        multiFilterableListBase.handleItemFocusNextSelected
      }
      onQueryChange={multiFilterableListBase.handleQueryChange}
      {...other}
      ref={forwardedRef}
    >
      {(renderProps) => (
        <TextInputField
          end={
            <FilterableListBaseFieldEnd
              onClear={
                clearable && multiFilterableListBase.selectedItems.length
                  ? (event) =>
                      multiFilterableListBase.handleClear(
                        renderProps.afterItemsRemove,
                        event,
                      )
                  : undefined
              }
              isOpen={renderProps.isOpen}
            />
          }
          populated={
            renderProps.isOpen ||
            !!multiFilterableListBase.selectedItems.length ||
            !!renderProps.query
          }
          innerStyles={{ field: fieldStyles }}
          spellCheck='false'
          variant={variant}
          {...renderProps.getInputFilterProps(renderProps.getTriggerProps())}
          ref={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
          start={
            multiFilterableListBase.selectedItems.length
              ? multiFilterableListBase.selectedItems.map(
                  (selectedItem, index) => (
                    <InputChip
                      sx={styles.chip}
                      key={index}
                      visualState={{
                        focused:
                          multiFilterableListBase.focusedSelectedItemIndex ===
                          index
                            ? true
                            : undefined,
                      }}
                      onDelete={(event) => {
                        event.stopPropagation();
                        onChange?.(
                          multiFilterableListBase.deselectItemAtIndex(index),
                        );
                        renderProps.afterItemsRemove([selectedItem], event);
                      }}
                      label={itemLabel(selectedItem)}
                      {...getValueFieldProps?.(renderProps, selectedItem)}
                    />
                  ),
                )
              : undefined
          }
        />
      )}
    </FloatingFilterableListBase>
  );
});
