import { useMemo } from 'react';

import type { IMultiSelectBaseProps } from './MultiSelectBase.types';
import { ListItem } from '@/components/ListItem';
import { TextInputField } from '@/components/TextInputField';
import { MenuList } from '@/components/MenuList';
import { InputChip } from '@/components/Chip';
import {
  useMultiFilterableListBase,
  FilterableListBaseFieldEnd,
} from '@/components/FilterableListBase';
import { FloatingFilterableListBase } from '@/components/FloatingFilterableListBase';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import {
  multiSelectBaseFieldStyles,
  multiSelectBaseStyles,
} from './MultiSelectBase.styles';

export const MultiSelectBase = fixedForwardRef(function MultiSelectBase<TItem>(
  props: IMultiSelectBaseProps<TItem>,
  forwardedRef?: React.Ref<HTMLInputElement>,
) {
  const {
    sx,
    styles,
    innerStyles,
    items,
    itemRenderer,
    itemLabel,
    selectedItems,
    defaultItems,
    onItemsChange,
    getValueFieldProps,
    clearable,
    variant,
    noResults,
    ...other
  } = props;

  const componentTheme = useComponentTheme('MultiSelectBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(multiSelectBaseStyles, styles),
    [styles],
  );

  const multiFilterableListBase = useMultiFilterableListBase({
    items,
    itemRenderer,
    selectedItems,
    defaultItems,
    itemsEqual: other.itemsEqual,
    onItemsChange,
  });

  return (
    <FloatingFilterableListBase<TItem, HTMLElement>
      items={multiFilterableListBase.items}
      onItemSelect={multiFilterableListBase.handleItemSelect}
      onItemRemoveFocused={multiFilterableListBase.handleItemRemoveFocused}
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={multiFilterableListBase.itemRenderer}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      initialFocus={-1}
      onItemFocusPreviousSelected={
        multiFilterableListBase.handleItemFocusPreviousSelected
      }
      onItemFocusNextSelected={
        multiFilterableListBase.handleItemFocusNextSelected
      }
      onQueryChange={multiFilterableListBase.handleQueryChange}
      {...other}
      forwardProps
      noResults={noResults ?? <ListItem disabled>No results.</ListItem>}
      ref={forwardedRef}
    >
      {(renderProps) => (
        <TextInputField
          sx={[componentTheme.overridenStyles, sx]}
          styles={innerStyles?.textInputField}
          end={
            <FilterableListBaseFieldEnd
              onClear={
                clearable && multiFilterableListBase.selectedItems.length
                  ? (event) =>
                      multiFilterableListBase.handleClear(
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
            !!multiFilterableListBase.selectedItems.length ||
            !!renderProps.query
          }
          innerStyles={{ field: multiSelectBaseFieldStyles }}
          spellCheck='false'
          variant={variant}
          {...renderProps.getInputFilterProps(
            renderProps.getTriggerProps(renderProps.forwardedProps),
          )}
          containerRef={renderProps.setTriggerRef}
          inputRef={renderProps.inputFilterRef}
          start={
            multiFilterableListBase.selectedItems.length
              ? multiFilterableListBase.selectedItems.map(
                  (selectedItem, index) => (
                    <InputChip
                      sx={stylesCombinator('chip')}
                      key={index}
                      visualState={{
                        focused:
                          multiFilterableListBase.focusedSelectedItemIndex ===
                          index
                            ? true
                            : undefined,
                      }}
                      onDelete={(event) => {
                        event.stopPropagation();
                        onItemsChange?.(
                          multiFilterableListBase.deselectItemAtIndex(index),
                        );
                        renderProps.afterItemsRemove([selectedItem], event);
                      }}
                      label={itemLabel(selectedItem)}
                      {...getValueFieldProps?.(renderProps, selectedItem)}
                    />
                  ),
                )
              : undefined
          }
          autoComplete='off'
        />
      )}
    </FloatingFilterableListBase>
  );
});
