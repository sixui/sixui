import type { IOmit } from '@/helpers/types';
import { ListItem } from '@/components/atoms/ListItem';
import { TextInputField } from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import { Field, type IFieldOwnProps } from '@/components/atoms/Field';
import {
  useSingleFilterableList,
  FilterableListFieldEnd,
  type IFilterableItemRenderer,
} from '@/components/atoms/FilterableList';
import {
  FloatingFilterableList,
  type IFloatingFilterableListTriggerRenderProps,
  type IFloatingFilterableListProps,
} from '@/components/atoms/FloatingFilterableList';

export type ISelectProps<TItem> = IOmit<
  IFloatingFilterableListProps<TItem, HTMLDivElement>,
  'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
> & {
  value?: TItem;
  defaultValue?: TItem;
  onChange?: (value?: TItem) => void;
  items: Array<TItem>;
  itemRenderer: IFilterableItemRenderer<TItem, HTMLDivElement>;
  itemLabel: (item: TItem) => string;
  canFilter?: boolean;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => IFieldOwnProps;
};

export const Select = <TItem,>(props: ISelectProps<TItem>): React.ReactNode => {
  const {
    items,
    itemRenderer,
    itemLabel,
    value,
    defaultValue,
    onChange,
    canFilter,
    getValueFieldProps,
    ...other
  } = props;

  const singleFilterableList = useSingleFilterableList({
    items,
    itemRenderer,
    value,
    defaultValue,
    itemsEqual: other.itemsEqual,
    onChange,
  });

  return (
    <FloatingFilterableList<TItem, HTMLDivElement>
      items={singleFilterableList.items}
      onItemSelect={singleFilterableList.handleItemSelect}
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
              />
            ) : undefined
          }
        >
          {listProps.filteredList}
        </MenuList>
      )}
      itemRenderer={singleFilterableList.itemRenderer}
      noResults={<ListItem disabled>No results.</ListItem>}
      closeOnSelect
      resetOnClose
      {...other}
    >
      {(renderProps) => (
        <Field
          end={
            <FilterableListFieldEnd
              renderProps={renderProps}
              onClear={
                singleFilterableList.selectedItem
                  ? (event) =>
                      singleFilterableList.handleClear(
                        renderProps.afterItemsRemove,
                        event,
                      )
                  : undefined
              }
            />
          }
          populated={renderProps.isOpen || !!singleFilterableList.selectedItem}
          disabled={other.disabled}
          {...renderProps.getTriggerProps()}
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableList.selectedItem,
          )}
          ref={renderProps.setTriggerRef}
        >
          {singleFilterableList.selectedItem
            ? itemLabel(singleFilterableList.selectedItem)
            : null}
        </Field>
      )}
    </FloatingFilterableList>
  );
};
