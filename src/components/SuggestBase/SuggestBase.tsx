import type { ISuggestBaseProps } from './SuggestBase.types';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import {
  FilterableListBaseFieldTrailingIcon,
  useSingleFilterableListBase,
} from '../FilterableListBase';
import { FloatingFilterableListBase } from '../FloatingFilterableListBase';
import { ListItem } from '../ListItem';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';

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
    placeholder,
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

  const selectedItemLabel = singleFilterableListBase.selectedItem
    ? itemLabel(singleFilterableListBase.selectedItem)
    : undefined;

  return (
    <FloatingFilterableListBase<TItem, HTMLElement>
      items={singleFilterableListBase.items}
      onItemSelect={singleFilterableListBase.handleItemSelect}
      renderer={(listProps) => (
        <MenuList
          noFocusRing
          cols={listProps.filteredItems.length > 0 ? other.cols : undefined}
        >
          {listProps.filteredList}
        </MenuList>
      )}
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
          trailingIcon={
            <FilterableListBaseFieldTrailingIcon
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
              opened={renderProps.opened}
            />
          }
          populated={
            renderProps.opened ||
            !!singleFilterableListBase.selectedItem ||
            !!renderProps.query
          }
          {...renderProps.forwardedProps}
          {...renderProps.getInputFilterProps(renderProps.getTriggerProps())}
          value={
            renderProps.opened || renderProps.hasFocus
              ? renderProps.query
              : ((typeof selectedItemLabel === 'string'
                  ? selectedItemLabel
                  : undefined) ?? '')
          }
          placeholder={
            (renderProps.opened || renderProps.hasFocus) && selectedItemLabel
              ? typeof selectedItemLabel === 'string'
                ? selectedItemLabel
                : undefined
              : placeholder
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
          spellCheck="false"
          autoComplete="off"
        />
      )}
    </FloatingFilterableListBase>
  );
});
