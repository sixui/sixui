import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import type { ITextFieldBaseStyleKey } from '@/components/atoms/TextFieldBase';
import { ListItem } from '@/components/atoms/ListItem';
import {
  TextInputField,
  type ITextInputFieldProps,
} from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import {
  useSingleFilterableListBase,
  FilterableListBaseFieldEnd,
  type IUseSingleFilterableListBaseProps,
} from '@/components/atoms/FilterableListBase';
import {
  FloatingFilterableListBase,
  type IFloatingFilterableListBaseTriggerRenderProps,
  type IFloatingFilterableListBaseProps,
} from '@/components/atoms/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

export type ISuggestBaseProps<TItem> = IContainerProps<ITextFieldBaseStyleKey> &
  IOmit<
    IFloatingFilterableListBaseProps<TItem, HTMLElement>,
    | 'onItemSelect'
    | 'renderer'
    | 'listRenderer'
    | 'itemRenderer'
    | 'itemsEqual'
    | 'children'
    | 'defaultQuery'
  > &
  ITextInputFieldProps &
  IUseSingleFilterableListBaseProps<TItem, HTMLElement> & {
    itemLabel: (item: TItem) => string | undefined;
    getValueFieldProps?: (
      renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
      selectedItem?: TItem,
    ) => ITextInputFieldProps;
    clearable?: boolean;
    variant?: IFieldBaseVariant;
  };

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
    itemEmpty: other.itemEmpty,
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
                !other.itemEmpty?.(singleFilterableListBase.selectedItem)
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
          {...renderProps.getInputFilterProps(renderProps.getTriggerProps())}
          value={
            renderProps.isOpen
              ? renderProps.query
              : renderProps.hasFocus
                ? renderProps.query
                : singleFilterableListBase.selectedItem
                  ? itemLabel(singleFilterableListBase.selectedItem)
                  : ''
          }
          placeholder={
            singleFilterableListBase.selectedItem
              ? itemLabel(singleFilterableListBase.selectedItem)
              : ''
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
          {...renderProps.forwardedProps}
        />
      )}
    </FloatingFilterableListBase>
  );
});
