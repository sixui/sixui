import type { ISuggestBaseProps } from './SuggestBase.types';
import { ListItem } from '@/components/ListItem';
import { TextInputField } from '@/components/TextInputField';
import { MenuList } from '@/components/MenuList';
import {
  useSingleFilterableListBase,
  FilterableListBaseFieldEnd,
} from '@/components/FilterableListBase';
import { FloatingFilterableListBase } from '@/components/FloatingFilterableListBase';
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
          containerRef={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
          spellCheck='false'
          autoComplete='off'
        />
      )}
    </FloatingFilterableListBase>
  );
});
