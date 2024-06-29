import type { IOmit } from '@/helpers/types';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import {
  useSingleFilterableList,
  FilterableListFieldEnd,
  type IFilterableItemRenderer,
} from '@/components/atoms/FilterableList';
import {
  FloatingFilterableList,
  type IFloatingFilterableListTriggerButtonRenderProps,
  type IFloatingFilterableListProps,
} from '@/components/atoms/FloatingFilterableList';

export type ISuggestProps<TItem> = IOmit<
  IFloatingFilterableListProps<TItem, HTMLDivElement>,
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
  itemRenderer: IFilterableItemRenderer<TItem, HTMLDivElement>;
  getValueFieldProps?: (
    buttonProps: IFloatingFilterableListTriggerButtonRenderProps<TItem>,
    selectedItem?: TItem,
  ) => ITextFieldProps;
};

export const Suggest = <TItem,>(
  props: ISuggestProps<TItem>,
): React.ReactNode => {
  const {
    items,
    itemRenderer,
    value,
    defaultValue,
    onChange,
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
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={singleFilterableList.itemRenderer}
      noResults={<ListItem disabled>No results.</ListItem>}
      resetOnSelect
      resetOnClose
      closeOnSelect
      initialFocus={-1}
      {...other}
    >
      {(renderProps) => (
        <TextField
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
          populated={
            renderProps.isOpen ||
            !!singleFilterableList.selectedItem ||
            !!renderProps.query
          }
          {...renderProps.getInputFilterAttributes(
            renderProps.getButtonAttributes(),
          )}
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableList.selectedItem,
          )}
          ref={renderProps.buttonRef}
          inputRef={renderProps.inputFilterRef}
        />
      )}
    </FloatingFilterableList>
  );
};
