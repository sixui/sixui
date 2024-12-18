import { useRef } from 'react';

import type { IMultiSelectBaseFactory } from './MultiSelectBase.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { InputChip } from '../Chip';
import {
  FilterableListBaseFieldTrailingIcon,
  useMultiFilterableListBase,
} from '../FilterableListBase';
import { floatingFilterableListBaseFactory } from '../FloatingFilterableListBase';
import { ListItem } from '../ListItem';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';
import {
  IMultiSelectBaseThemeFactory,
  multiSelectBaseTheme,
} from './MultiSelectBase.css';

const COMPONENT_NAME = 'MultiSelectBase';

export const multiSelectBaseFactory = <
  TItem,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
>() => {
  const FloatingFilterableListBase = floatingFilterableListBaseFactory<
    TItem,
    HTMLElement
  >();

  const MultiSelectBase = componentFactory<IMultiSelectBaseFactory<TItem>>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
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
        menuListProps,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } = useComponentTheme<IMultiSelectBaseThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        theme: multiSelectBaseTheme,
        variant,
      });

      const multiFilterableListBase = useMultiFilterableListBase({
        items,
        itemRenderer,
        selectedItems,
        defaultItems,
        itemsEqual: other.itemsEqual,
        onItemsChange,
      });

      const isBackspaceKeyFreshlyPressed = useRef(true);
      const isArrowLeftKeyFreshlyPressed = useRef(true);

      return (
        <FloatingFilterableListBase
          items={multiFilterableListBase.items}
          onItemSelect={multiFilterableListBase.handleItemSelect}
          renderer={(listProps) => (
            <MenuList
              noFocusRing
              cols={listProps.filteredItems.length > 0 ? other.cols : undefined}
              {...menuListProps}
            >
              {listProps.filteredList}
            </MenuList>
          )}
          itemRenderer={multiFilterableListBase.itemRenderer}
          matchTargetWidth
          resetOnSelect
          resetOnClose
          initialFocus={-1}
          onQueryChange={multiFilterableListBase.handleQueryChange}
          {...other}
          forwardProps
          noResults={noResults ?? <ListItem disabled>No results.</ListItem>}
          ref={forwardedRef}
        >
          {(renderProps) => {
            const isGrid = other.cols !== undefined && other.cols > 1;
            const getInputProps = (
              userProps?: React.ComponentPropsWithoutRef<'input'>,
            ): React.ComponentPropsWithoutRef<'input'> => ({
              ...userProps,
              onBlur: (event) => {
                userProps?.onBlur?.(event);
                multiFilterableListBase.handleBlurChip();
                console.log('__BLUR');
              },
              // Selected items are displayed as chips. The user can navigate
              // between them and remove them using the keyboard.
              onKeyUp: (event) => {
                console.log('_UP');
                switch (event.key) {
                  case 'Backspace':
                    isBackspaceKeyFreshlyPressed.current = true;
                    break;

                  case 'ArrowLeft':
                    isArrowLeftKeyFreshlyPressed.current = true;
                    break;
                }

                userProps?.onKeyUp?.(event);
              },
              onKeyDown: (event) => {
                const { query, opened } = renderProps;
                const focusedChipIndex =
                  multiFilterableListBase.getFocusedChipIndex();
                const inputElement = renderProps.inputFilterRef?.current;
                const isTextCursorAtStart = inputElement?.selectionStart === 0;
                const isTextCursorAtEnd =
                  inputElement?.selectionEnd === query.length;
                const hasFocusedChip = focusedChipIndex !== undefined;

                switch (event.key) {
                  // If no query is present when the user presses the backspace key,
                  // we want to move the focus to the last chip. If the user keep
                  // the backspace key pressed (ie. to clear the query), this event
                  // will be triggered multiple times. In this case, we don't move
                  // the focus and wait for the user to release the key and press it
                  // again.
                  case 'Backspace':
                    if (!query && isBackspaceKeyFreshlyPressed.current) {
                      multiFilterableListBase.handleRemoveFocusedChip();
                    }
                    userProps?.onKeyDown?.(event);
                    isBackspaceKeyFreshlyPressed.current = false;
                    break;

                  // If the user presses the enter key while a chip is focused, we
                  // want to remove it instead of the default behavior.
                  case 'Enter':
                    if (hasFocusedChip) {
                      multiFilterableListBase.handleRemoveFocusedChip();
                    } else {
                      userProps?.onKeyDown?.(event);
                    }
                    break;

                  // If the user presses the up or down arrow keys, we want to blur
                  // the focused chip while preserving the default behavior.
                  case 'ArrowDown':
                  case 'ArrowUp':
                    multiFilterableListBase.handleBlurChip();
                    userProps?.onKeyDown?.(event);
                    break;

                  // When the user presses the left or the right arrow key, we want
                  // to move the focus to the previous chip if any of the following
                  // conditions are met:
                  // - A chip is currently focused ;
                  // - The query is empty (*) ;
                  // - The query is not empty and the text cursor is at an extremity
                  //   of the query field (*) ;
                  //
                  // (*) in case of a grid, only if the list is not open because the
                  //   user might want to navigate the grid.

                  case 'ArrowLeft':
                    if (
                      hasFocusedChip ||
                      ((!isGrid || !opened) &&
                        (!query ||
                          (query &&
                            isTextCursorAtStart &&
                            isArrowLeftKeyFreshlyPressed.current)))
                    ) {
                      multiFilterableListBase.handleFocusPreviousChip();
                      event.preventDefault();
                    } else {
                      if (isTextCursorAtStart) {
                        userProps?.onKeyDown?.(event);
                      }

                      if (isGrid) {
                        multiFilterableListBase.handleBlurChip();
                      }
                    }
                    isArrowLeftKeyFreshlyPressed.current = false;
                    break;

                  case 'ArrowRight':
                    if (
                      hasFocusedChip ||
                      ((!isGrid || !opened) &&
                        (!query ||
                          (query &&
                            isTextCursorAtEnd &&
                            isArrowLeftKeyFreshlyPressed.current)))
                    ) {
                      multiFilterableListBase.handleFocusNextChip();
                      event.preventDefault();
                    } else {
                      if (isTextCursorAtEnd) {
                        userProps?.onKeyDown?.(event);
                      }

                      if (isGrid) {
                        multiFilterableListBase.handleBlurChip();
                      }
                    }
                    isArrowLeftKeyFreshlyPressed.current = false;
                    break;

                  // If the user presses the escape key, we want to blur the focused
                  // chip while preserving the default behavior.
                  case 'Escape':
                    multiFilterableListBase.handleBlurChip();
                    userProps?.onKeyDown?.(event);
                    break;

                  default:
                    userProps?.onKeyDown?.(event);
                }
              },
            });

            return (
              <TextInputField
                end={
                  <FilterableListBaseFieldTrailingIcon
                    onClear={
                      clearable && multiFilterableListBase.selectedItems.length
                        ? (event) =>
                            multiFilterableListBase.handleClear(
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
                  !!multiFilterableListBase.selectedItems.length ||
                  !!renderProps.query
                }
                spellCheck="false"
                variant={variant}
                {...renderProps.forwardedProps}
                {...getInputProps(
                  renderProps.getInputFilterProps(
                    renderProps.getTriggerProps(),
                  ),
                )}
                containerRef={renderProps.setTriggerRef}
                ref={renderProps.inputFilterRef}
                autoComplete="off"
              >
                {multiFilterableListBase.selectedItems.length
                  ? multiFilterableListBase.selectedItems.map(
                      (selectedItem, index) => (
                        <InputChip
                          {...getStyles('chip')}
                          key={index}
                          interactions={{
                            focused:
                              multiFilterableListBase.focusedSelectedItemIndex ===
                              index
                                ? true
                                : undefined,
                          }}
                          onDelete={(event) => {
                            event.stopPropagation();
                            onItemsChange?.(
                              multiFilterableListBase.deselectItemAtIndex(
                                index,
                              ),
                            );
                            renderProps.afterItemsRemove([selectedItem], event);
                          }}
                          {...getValueFieldProps?.(renderProps, selectedItem)}
                        >
                          {itemLabel(selectedItem)}
                        </InputChip>
                      ),
                    )
                  : undefined}
              </TextInputField>
            );
          }}
        </FloatingFilterableListBase>
      );
    },
  );

  MultiSelectBase.displayName = `@sixui/${COMPONENT_NAME}`;

  return MultiSelectBase;
};
