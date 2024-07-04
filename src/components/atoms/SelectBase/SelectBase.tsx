import type { IOmit } from '@/helpers/types';
import { ListItem } from '@/components/atoms/ListItem';
import { TextInputField } from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import { Field, type IFieldOwnProps } from '@/components/atoms/Field';
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

export type ISelectBaseProps<TItem> = IOmit<
  IFloatingFilterableListBaseProps<TItem, HTMLDivElement>,
  'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
> & {
  value?: TItem;
  defaultValue?: TItem;
  onChange?: (value?: TItem) => void;
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, HTMLElement>;
  itemLabel: (item: TItem) => string;
  canFilter?: boolean;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => IFieldOwnProps;
  clearable?: boolean;
};

export const SelectBase = fixedForwardRef(function SelectBase<TItem>(
  props: ISelectBaseProps<TItem>,
  forwardedRef?: React.Ref<HTMLElement>,
) {
  const {
    items,
    itemRenderer,
    itemLabel,
    value,
    defaultValue,
    onChange,
    canFilter,
    getValueFieldProps,
    clearable,
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
      noResults={<ListItem disabled>No results.</ListItem>}
      matchTargetWidth
      closeOnSelect
      resetOnClose
      {...other}
      ref={forwardedRef}
    >
      {(renderProps) => (
        <Field
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
            renderProps.isOpen || !!singleFilterableListBase.selectedItem
          }
          disabled={other.disabled}
          {...renderProps.getTriggerProps()}
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableListBase.selectedItem,
          )}
          ref={renderProps.setTriggerRef}
        >
          {singleFilterableListBase.selectedItem
            ? itemLabel(singleFilterableListBase.selectedItem)
            : null}
        </Field>
      )}
    </FloatingFilterableListBase>
  );
});
