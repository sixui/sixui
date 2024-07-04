import type { IOmit } from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import { ListItem } from '@/components/atoms/ListItem';
import {
  TextInputField,
  type ITextInputFieldProps,
} from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import {
  useSingleFilterableListBase,
  FilterableListBaseFieldEnd,
  type IFilterableItemRenderer,
} from '@/components/atoms/FilterableListBase';
import {
  FloatingFilterableListBase,
  type IFloatingFilterableListBaseTriggerRenderProps,
  type IFloatingFilterableListBaseProps,
} from '@/components/atoms/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

export type ISuggestBaseProps<TItem> = IOmit<
  IFloatingFilterableListBaseProps<TItem, HTMLElement>,
  | 'onItemSelect'
  | 'renderer'
  | 'listRenderer'
  | 'itemRenderer'
  | 'children'
  | 'defaultQuery'
> & {
  value?: TItem;
  defaultValue?: TItem;
  onChange: (value?: TItem) => void;
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, HTMLElement>;
  itemLabel: (item: TItem) => string;
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

  const singleFilterableListBase = useSingleFilterableListBase({
    items,
    itemRenderer,
    value,
    defaultValue,
    itemsEqual: other.itemsEqual,
    onChange,
  });

  return (
    <FloatingFilterableListBase<TItem, HTMLElement>
      items={singleFilterableListBase.items}
      onItemSelect={singleFilterableListBase.handleItemSelect}
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={singleFilterableListBase.itemRenderer}
      noResults={<ListItem disabled>No results.</ListItem>}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      resetOnBlur
      closeOnSelect
      initialFocus={-1}
      {...other}
      ref={forwardedRef}
    >
      {(renderProps) => (
        <TextInputField
          end={
            <FilterableListBaseFieldEnd
              onClear={
                clearable && singleFilterableListBase.selectedItem
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
              : renderProps.query ||
                (singleFilterableListBase.selectedItem
                  ? itemLabel(singleFilterableListBase.selectedItem)
                  : '')
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
          ref={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
          spellCheck='false'
        />
      )}
    </FloatingFilterableListBase>
  );
});
