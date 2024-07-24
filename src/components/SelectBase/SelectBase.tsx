import type { ISelectBaseProps } from './SelectBase.types';
import { ListItem } from '@/components/ListItem';
import { TextInputField } from '@/components/TextInputField';
import { MenuList } from '@/components/MenuList';
import { Field } from '@/components/Field';
import {
  useSingleFilterableListBase,
  FilterableListBaseFieldEnd,
} from '@/components/FilterableListBase';
import { FloatingFilterableListBase } from '@/components/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

export const SelectBase = fixedForwardRef(function SelectBase<TItem>(
  props: ISelectBaseProps<TItem>,
  forwardedRef?: React.Ref<HTMLElement>,
) {
  const {
    sx,
    styles,
    items,
    itemRenderer,
    itemLabel,
    selectedItem,
    defaultItem,
    itemEmpty,
    onItemChange,
    canFilter,
    getValueFieldProps,
    clearable,
    variant,
    noResults,
    ...other
  } = props;

  const singleFilterableListBase = useSingleFilterableListBase({
    items,
    itemRenderer,
    selectedItem,
    defaultItem,
    itemEmpty,
    itemsEqual: other.itemsEqual,
    onItemChange,
  });

  return (
    <FloatingFilterableListBase<TItem, HTMLElement>
      items={singleFilterableListBase.items}
      onItemSelect={singleFilterableListBase.handleItemSelect}
      renderer={(listProps) => (
        <MenuList
          noFocusRing
          header={
            canFilter ? (
              <TextInputField
                clearable
                {...listProps.getInputFilterProps()}
                type='text'
                inputRef={listProps.inputFilterRef}
                spellCheck='false'
              />
            ) : undefined
          }
        >
          {listProps.filteredList}
        </MenuList>
      )}
      itemRenderer={singleFilterableListBase.itemRenderer}
      matchTargetWidth
      closeOnSelect
      resetOnClose={canFilter}
      {...other}
      forwardProps
      noResults={noResults ?? <ListItem disabled>No results.</ListItem>}
      ref={forwardedRef}
    >
      {(renderProps) => (
        <Field
          end={
            <FilterableListBaseFieldEnd
              onClear={
                clearable &&
                singleFilterableListBase.selectedItem &&
                !itemEmpty?.(singleFilterableListBase.selectedItem)
                  ? (event) =>
                      singleFilterableListBase.handleClear(
                        renderProps.afterItemsRemove,
                        event,
                      )
                  : undefined
              }
              isOpen={renderProps.isOpen}
            />
          }
          populated={
            renderProps.isOpen || !!singleFilterableListBase.selectedItem
          }
          disabled={other.disabled}
          variant={variant}
          {...renderProps.getTriggerProps(renderProps.forwardedProps)}
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableListBase.selectedItem,
          )}
          sx={sx}
          styles={styles}
          containerRef={renderProps.setTriggerRef}
        >
          {singleFilterableListBase.selectedItem
            ? itemLabel(singleFilterableListBase.selectedItem)
            : null}
        </Field>
      )}
    </FloatingFilterableListBase>
  );
});
