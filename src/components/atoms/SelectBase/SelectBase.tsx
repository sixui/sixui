import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import { ListItem } from '@/components/atoms/ListItem';
import { TextInputField } from '@/components/atoms/TextInputField';
import { MenuList } from '@/components/atoms/MenuList';
import {
  Field,
  type IFieldStyleKey,
  type IFieldOwnProps,
} from '@/components/atoms/Field';
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

export type ISelectBaseProps<TItem> = IContainerProps<IFieldStyleKey> &
  IOmit<
    IFloatingFilterableListBaseProps<TItem, HTMLElement>,
    | 'onItemSelect'
    | 'renderer'
    | 'listRenderer'
    | 'itemRenderer'
    | 'itemsEqual'
    | 'children'
  > &
  IUseSingleFilterableListBaseProps<TItem, HTMLElement> & {
    itemLabel: (item: TItem) => string;
    canFilter?: boolean;
    getValueFieldProps?: (
      renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
      selectedItem?: TItem,
    ) => IFieldOwnProps;
    clearable?: boolean;
    variant?: IFieldBaseVariant | false;
  };

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
    onItemChange,
    canFilter,
    getValueFieldProps,
    clearable,
    variant,
    emptyItem,
    canBeEmptied: canBeEmptiedProp,
    ...other
  } = props;

  const canBeEmptied = canBeEmptiedProp || clearable;
  const singleFilterableListBase = useSingleFilterableListBase({
    items,
    itemRenderer,
    selectedItem: selectedItem ?? emptyItem,
    defaultItem,
    itemsEqual: other.itemsEqual,
    onItemChange,
    emptyItem,
    canBeEmptied,
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
                clearable &&
                singleFilterableListBase.selectedItem &&
                singleFilterableListBase.selectedItem !== emptyItem
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
          {...renderProps.getTriggerProps()}
          {...getValueFieldProps?.(
            renderProps,
            singleFilterableListBase.selectedItem,
          )}
          sx={sx}
          styles={styles}
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
