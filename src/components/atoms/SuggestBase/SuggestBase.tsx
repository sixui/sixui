import type { ISuggestBaseProps } from './SuggestBaseProps';
import { ListItem } from '@/components/atoms/ListItem';
import { TextInputField } from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import {
  useSingleFilterableListBase,
  FilterableListBaseFieldEnd,
} from '@/components/atoms/FilterableListBase';
import { FloatingFilterableListBase } from '@/components/atoms/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

export const SuggestBase = fixedForwardRef(function SuggestBase<TItem>(
  props: ISuggestBaseProps<TItem>,
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
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={singleFilterableListBase.itemRenderer}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      resetOnBlur
      closeOnSelect
      initialFocus={-1}
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
            renderProps.isOpen ||
            !!singleFilterableListBase.selectedItem ||
            !!renderProps.query
          }
          {...renderProps.getInputFilterProps(
            renderProps.getTriggerProps(renderProps.forwardedProps),
          )}
          value={
            renderProps.isOpen || renderProps.hasFocus
              ? renderProps.query
              : singleFilterableListBase.selectedItem
                ? itemLabel(singleFilterableListBase.selectedItem)
                : ''
          }
          placeholder={
            (renderProps.isOpen || renderProps.hasFocus) &&
            singleFilterableListBase.selectedItem
              ? itemLabel(singleFilterableListBase.selectedItem)
              : undefined
          }
          variant={variant}
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableListBase.selectedItem,
          )}
          sx={sx}
          styles={styles}
          ref={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
          spellCheck='false'
          autoComplete='off'
        />
      )}
    </FloatingFilterableListBase>
  );
});
