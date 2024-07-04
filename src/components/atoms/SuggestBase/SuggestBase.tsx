import type { IOmit } from '@/helpers/types';
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
};

export const SuggestBase = <TItem,>(
  props: ISuggestBaseProps<TItem>,
): React.ReactNode => {
  const {
    items,
    itemRenderer,
    itemLabel,
    value,
    defaultValue,
    onChange,
    getValueFieldProps,
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
      resetOnSelect
      resetOnClose
      resetOnBlur
      closeOnSelect
      initialFocus={-1}
      {...other}
    >
      {(renderProps) => (
        <TextInputField
          end={
            <FilterableListBaseFieldEnd
              onClear={
                singleFilterableListBase.selectedItem
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
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableListBase.selectedItem,
          )}
          ref={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
        />
      )}
    </FloatingFilterableListBase>
  );
};
