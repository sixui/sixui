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
  IFieldOwnProps &
  IUseSingleFilterableListBaseProps<TItem, HTMLElement> & {
    itemLabel: (item: TItem) => string | undefined;
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
    itemEmpty,
    onItemChange,
    canFilter,
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
      matchTargetWidth
      closeOnSelect
      resetOnClose
      {...other}
      forwardProps
      noResults={noResults ?? <ListItem disabled>No results.</ListItem>}
      ref={forwardedRef}
    >
      {(renderProps) => (
        <Field
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
          {...renderProps.forwardedProps}
        >
          {singleFilterableListBase.selectedItem
            ? itemLabel(singleFilterableListBase.selectedItem)
            : null}
        </Field>
      )}
    </FloatingFilterableListBase>
  );
});
