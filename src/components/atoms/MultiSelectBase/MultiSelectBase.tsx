import stylex from '@stylexjs/stylex';

import type { IMultiSelectBaseProps } from './MultiSelectBaseProps';
import { ListItem } from '@/components/atoms/ListItem';
import { TextInputField } from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import { InputChip } from '@/components/atoms/Chip';
import {
  useMultiFilterableListBase,
  FilterableListBaseFieldEnd,
} from '@/components/atoms/FilterableListBase';
import { FloatingFilterableListBase } from '@/components/atoms/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

// TODO: migrate in theme
const localStyles = stylex.create({
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
    sx,
    styles,
    items,
    itemRenderer,
    itemLabel,
    selectedItems,
    defaultItems,
    onItemsChange,
    getValueFieldProps,
    clearable,
    variant,
    noResults,
    ...other
  } = props;

  const multiFilterableListBase = useMultiFilterableListBase({
    items,
    itemRenderer,
    selectedItems,
    defaultItems,
    itemsEqual: other.itemsEqual,
    onItemsChange,
  });

  return (
    <FloatingFilterableListBase<TItem, HTMLElement>
      items={multiFilterableListBase.items}
      onItemSelect={multiFilterableListBase.handleItemSelect}
      onItemRemoveFocused={multiFilterableListBase.handleItemRemoveFocused}
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={multiFilterableListBase.itemRenderer}
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
      forwardProps
      noResults={noResults ?? <ListItem disabled>No results.</ListItem>}
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
          {...renderProps.getInputFilterProps(
            renderProps.getTriggerProps(renderProps.forwardedProps),
          )}
          sx={sx}
          styles={styles}
          ref={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
          start={
            multiFilterableListBase.selectedItems.length
              ? multiFilterableListBase.selectedItems.map(
                  (selectedItem, index) => (
                    <InputChip
                      sx={localStyles.chip}
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
                        onItemsChange?.(
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
          autoComplete='off'
        />
      )}
    </FloatingFilterableListBase>
  );
});
