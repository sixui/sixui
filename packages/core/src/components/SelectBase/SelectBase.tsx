import type { ISelectBaseFactory } from './SelectBase.types';
import { FieldBase } from '~/components/FieldBase';
import {
  FilterableListBaseFieldTrailingIcon,
  useSingleFilterableListBase,
} from '~/components/FilterableListBase';
import { floatingFilterableListBaseFactory } from '~/components/FloatingFilterableListBase';
import { ListItem } from '~/components/List/ListItem';
import { MenuList } from '~/components/Menu/MenuList';
import { TextInputField } from '~/components/TextInputField';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { COMPONENT_NAME } from './SelectBase.constants';

export const selectBaseFactory = <
  TItem,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
>() => {
  const FloatingFilterableListBase = floatingFilterableListBaseFactory<TItem>();

  const SelectBase = componentFactory<ISelectBaseFactory<TItem>>(
    (props, forwardedRef) => {
      const {
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
        noResults,
        menuListProps,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

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
        <FloatingFilterableListBase
          items={singleFilterableListBase.items}
          onItemSelect={singleFilterableListBase.handleItemSelect}
          renderer={(listProps) => (
            <MenuList
              noFocusRing
              header={
                canFilter && (
                  <TextInputField
                    {...listProps.getInputFilterProps()}
                    clearable
                    type="text"
                    ref={listProps.inputFilterRef}
                    spellCheck="false"
                  />
                )
              }
              cols={listProps.filteredItems.length > 0 ? other.cols : undefined}
              {...menuListProps}
            >
              {listProps.filteredList}
            </MenuList>
          )}
          itemRenderer={singleFilterableListBase.itemRenderer}
          matchTargetWidth
          closeOnSelect
          resetOnClose={canFilter}
          forwardProps
          noResults={noResults ?? <ListItem disabled>No results.</ListItem>}
          {...other}
        >
          {(renderProps) => (
            <FieldBase
              endSlot={
                <FilterableListBaseFieldTrailingIcon
                  onClear={
                    clearable &&
                    singleFilterableListBase.selectedItem &&
                    !itemEmpty?.(singleFilterableListBase.selectedItem)
                      ? (event) => {
                          singleFilterableListBase.handleClear(
                            renderProps.afterItemsRemove,
                            event,
                          );
                        }
                      : undefined
                  }
                  opened={renderProps.opened}
                />
              }
              populated={
                renderProps.opened || !!singleFilterableListBase.selectedItem
              }
              disabled={other.disabled}
              withoutRippleEffect
              wrapperProps={renderProps.getTriggerProps()}
              containerRef={renderProps.setTriggerRef}
              interactions={{ focused: renderProps.opened && !canFilter }}
              ref={forwardedRef}
              {...renderProps.forwardedProps}
              {...getValueFieldProps?.(
                renderProps,
                singleFilterableListBase.selectedItem,
              )}
            >
              {singleFilterableListBase.selectedItem
                ? itemLabel(singleFilterableListBase.selectedItem)
                : null}
            </FieldBase>
          )}
        </FloatingFilterableListBase>
      );
    },
  );

  SelectBase.displayName = `@sixui/${COMPONENT_NAME}`;

  return SelectBase;
};
