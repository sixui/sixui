import type { ISuggestBaseFactory } from './SuggestBase.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import {
  FilterableListBaseFieldTrailingIcon,
  useSingleFilterableListBase,
} from '../FilterableListBase';
import { floatingFilterableListBaseFactory } from '../FloatingFilterableListBase';
import { ListItem } from '../ListItem';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';

const COMPONENT_NAME = 'SuggestBase';

export const suggestBaseFactory = <
  TItem,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
>() => {
  const FloatingFilterableListBase = floatingFilterableListBaseFactory<
    TItem,
    HTMLElement
  >();

  const SuggestBase = componentFactory<ISuggestBaseFactory<TItem>>(
    (props, forwardedRef) => {
      const {
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

      const selectedItemLabel = singleFilterableListBase.selectedItem
        ? itemLabel(singleFilterableListBase.selectedItem)
        : undefined;

      return (
        <FloatingFilterableListBase
          items={singleFilterableListBase.items}
          onItemSelect={singleFilterableListBase.handleItemSelect}
          renderer={(listProps) => (
            <MenuList
              noFocusRing
              cols={listProps.filteredItems.length > 0 ? other.cols : undefined}
              {...menuListProps}
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
              {...renderProps.getInputFilterProps(
                renderProps.getTriggerProps(),
              )}
              value={
                renderProps.opened || renderProps.hasFocus
                  ? renderProps.query
                  : ((typeof selectedItemLabel === 'string'
                      ? selectedItemLabel
                      : undefined) ?? '')
              }
              placeholder={
                (renderProps.opened || renderProps.hasFocus) &&
                selectedItemLabel
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
              containerRef={renderProps.setTriggerRef}
              ref={renderProps.inputFilterRef}
              spellCheck="false"
              autoComplete="off"
            />
          )}
        </FloatingFilterableListBase>
      );
    },
  );

  SuggestBase.displayName = `@sixui/${COMPONENT_NAME}`;

  return SuggestBase;
};
