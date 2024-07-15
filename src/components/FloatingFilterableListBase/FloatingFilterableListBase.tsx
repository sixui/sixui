import { useEffect, useMemo, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStatus,
  useTypeahead,
  type ReferenceType,
} from '@floating-ui/react';
import { isFunction } from 'lodash';

import type { IFloatingFilterableListBaseProps } from './FloatingFilterableListBase.types';
import {
  FilterableListBase,
  type IFilterableCreateNewListItemRenderer,
  type IFilterableListItemRenderer,
  type IFilterableListBaseRenderer,
  type IFilterableListItemRendererProps,
} from '@/components/FilterableListBase';
import { Portal } from '@/components/Portal';
import { useControlledValue } from '@/hooks/useControlledValue';
import { usePrevious } from '@/hooks/usePrevious';
import {
  extendFloatingProps,
  type IExtendedFloatingProps,
} from '@/helpers/extendFloatingProps';
import { commonStyles } from '@/helpers/commonStyles';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { floatingFilterableListBaseStyles } from './FloatingFilterableListBase.styles';

export const FloatingFilterableListBase = fixedForwardRef(
  function FloatingFilterableListBase<TItem, TItemElement extends HTMLElement>(
    props: IFloatingFilterableListBaseProps<TItem, TItemElement>,
    forwardedRef?: React.Ref<ReferenceType>,
  ) {
    const {
      styles,
      sx,
      children,
      placement = 'bottom-start',
      matchTargetWidth,
      renderer,
      itemRenderer,
      createNewItemRenderer,
      onItemSelect,
      onItemRemoveFocused,
      onItemFocusPreviousSelected,
      onItemFocusNextSelected,
      closeOnSelect,
      resetOnSelect,
      initialFocus = 0,
      query: queryProp,
      defaultQuery,
      onQueryChange,
      resetOnClose,
      resetOnBlur,
      forwardProps,
      disabled,
      items,
      itemsEqual,
      itemDisabled,
      listPredicate,
      itemPredicate,
      listRenderer,
      initialContent,
      noResults,
      createNewItemFromQuery,
      createNewItemPosition,
      ...other
    } = props;

    const { overridenStyles } = useComponentTheme('FloatingFilterableListBase');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(floatingFilterableListBaseStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const [isOpen, setIsOpen] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const elementsRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const floating = useFloating({
      placement: placement,
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        flip({
          padding: 48,
        }),
        size({
          apply: ({ rects, elements }) => {
            Object.assign(
              elements.floating.style,
              matchTargetWidth
                ? { width: `${rects.reference.width}px` }
                : { width: 'fit-content', maxWidth: '400px' },
            );
          },
        }),
      ],
    });
    const click = useClick(floating.context, {
      event: 'click',
    });
    const role = useRole(floating.context, { role: 'listbox' });
    const inputFilterRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLElement>(null);
    const buttonHandleRef = useMergeRefs([
      buttonRef,
      floating.refs.setReference,
      forwardedRef,
    ]);
    const dismiss = useDismiss(floating.context);
    const canFilter = !!inputFilterRef.current;
    const listNavigation = useListNavigation(floating.context, {
      listRef: elementsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      virtual: canFilter,
      loop: true,
    });
    const typeahead = useTypeahead(floating.context, {
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      onMatch: isOpen ? setActiveIndex : setSelectedIndex,
      enabled: !canFilter,
      findMatch: itemPredicate
        ? (list, typedString) =>
            list.find((label) =>
              label && createNewItemFromQuery
                ? itemPredicate?.(createNewItemFromQuery(label), typedString)
                : false,
            )
        : undefined,
    });
    const [query, setQuery] = useControlledValue({
      controlled: queryProp,
      default: defaultQuery ?? '',
      name: 'FloatingFilterableListBase',
    });
    const interactions = useInteractions([
      click,
      role,
      dismiss,
      listNavigation,
      typeahead,
    ]);
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 150, // motionTokens.duration$short3
    });

    const handleItemSelect = (item: TItem): void => {
      // If both `resetOnSelect` and `closeOnSelect` are true, the user may see a flash of the unfiltered list before it closes due to the closing animation duration. If `resetOnClose` is true, we can avoid this by not resetting the query until the list is actually closed.
      const shouldResetQuery =
        resetOnSelect && (!closeOnSelect || !resetOnClose);
      if (shouldResetQuery) {
        setQuery('');
      }

      if (closeOnSelect) {
        setIsOpen(false);
      } else {
        inputFilterRef.current?.focus();
      }

      const selectedIndex = onItemSelect(item) ?? activeIndex;
      setSelectedIndex(selectedIndex);
    };

    const handleAfterItemsRemove = (): void => {
      if (inputFilterRef.current) {
        inputFilterRef.current?.focus();
      } else {
        buttonRef.current?.focus();
      }

      if (closeOnSelect) {
        setIsOpen(false);
      }
    };

    const handleQueryChange = (
      newQuery: string,
      event?: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      if (query === newQuery) {
        return;
      }

      setQuery(newQuery);
      onQueryChange?.(newQuery, event);
      setActiveIndex(0);
    };

    const isEnterKeyPressedRef = useRef(false);
    const getInputFilterProps = (
      userProps?: IExtendedFloatingProps<React.HTMLProps<HTMLInputElement>>,
    ): IExtendedFloatingProps<React.HTMLProps<HTMLInputElement>> => ({
      ...userProps,
      value: userProps?.value ?? query,
      disabled,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleQueryChange(event.target.value, event);
        userProps?.onChange?.(event);
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
          case 'Backspace':
            if (!query) {
              onItemRemoveFocused?.();
            }
            break;

          case 'Enter':
            if (isOpen) {
              event.preventDefault();
              isEnterKeyPressedRef.current = true;
            } else {
              userProps?.onKeyDown?.(event);
            }
            break;

          case ' ':
            break;

          case 'ArrowLeft':
            if (!query) {
              onItemFocusPreviousSelected?.(inputFilterRef);
            }
            break;

          case 'ArrowRight':
            if (!query) {
              onItemFocusNextSelected?.(inputFilterRef);
            }
            break;

          default:
            userProps?.onKeyDown?.(event);
        }
      },
      onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (
          isOpen &&
          event.key === 'Enter' &&
          activeIndex != null &&
          isEnterKeyPressedRef.current
        ) {
          // We handle ENTER in keyup here to play nice with the Button component's keyboard clicking. Button is commonly used as the only child of Select. If we were to instead process ENTER on keydown, then Button would click itself on keyup and the Select popover would re-open.
          event.preventDefault();
          elementsRef.current[activeIndex]?.click();
          isEnterKeyPressedRef.current = false;
        } else {
          userProps?.onKeyUp?.(event);
        }
      },
    });

    const rendererWrapper: IFilterableListBaseRenderer<TItem> = (listProps) =>
      renderer({
        ...listProps,
        handleQueryChange: listProps.handleQueryChange,
        inputFilterRef,
        getInputFilterProps,
      });

    const getItemRendererProps = (
      itemProps: IFilterableListItemRendererProps<TItemElement>,
    ): IFilterableListItemRendererProps<TItemElement> => {
      const active = activeIndex === itemProps.index;

      return {
        ...itemProps,
        modifiers: {
          ...itemProps.modifiers,
          active,
        },
        buttonRef: (node) => {
          elementsRef.current[itemProps.index] = node;
          labelsRef.current[itemProps.index] = node?.textContent ?? null;
        },
        getButtonAttributes: (userProps) =>
          interactions.getItemProps({
            ...userProps,
            role: 'option',
            tabIndex: active ? 0 : -1,
            'aria-selected': active,
            onClick: (event: React.MouseEvent<TItemElement, MouseEvent>) => {
              userProps?.onClick?.(event);
              itemProps.handleClick(event);
            },
          }),
      };
    };

    const itemRendererWrapper: IFilterableListItemRenderer<
      TItem,
      TItemElement
    > = (item, itemProps) =>
      itemRenderer(item, getItemRendererProps(itemProps));

    const createNewItemRendererWrapper: IFilterableCreateNewListItemRenderer<
      TItemElement
    > = (itemProps) => createNewItemRenderer?.(getItemRendererProps(itemProps));

    // Restore the query when the list is re-mounted.
    const previousIsMounted = usePrevious(transitionStatus.isMounted);
    useEffect(() => {
      if (previousIsMounted && !transitionStatus.isMounted) {
        if (resetOnClose) {
          setQuery('');
          setSelectedIndex(0);
        }
      }
    }, [
      previousIsMounted,
      transitionStatus.isMounted,
      resetOnClose,
      selectedIndex,
      setQuery,
    ]);

    const handleFocus = (): void => setHasFocus(true);
    const handleBlur = (): void => {
      setHasFocus(false);

      if (resetOnBlur && !isOpen) {
        setQuery('');
      }
    };

    return (
      <>
        {isFunction(children)
          ? children({
              isOpen,
              hasFocus,
              setTriggerRef: buttonHandleRef,
              getTriggerProps: (userProps) => ({
                ...extendFloatingProps(interactions.getReferenceProps, {
                  ...userProps,
                  tabIndex: 0,
                  onFocus: (...args) => {
                    handleFocus();
                    userProps?.onFocus?.(...args);
                  },
                  onBlur: (...args) => {
                    handleBlur();
                    userProps?.onBlur?.(...args);
                  },
                }),
                'aria-autocomplete': 'none',
              }),
              afterItemsRemove: handleAfterItemsRemove,
              query,
              inputFilterRef: inputFilterRef,
              getInputFilterProps,
              forwardedProps: forwardProps ? other : undefined,
            })
          : children}

        {transitionStatus.isMounted && (
          <Portal>
            <FloatingFocusManager
              context={floating.context}
              visuallyHiddenDismiss
              initialFocus={disabled ? -1 : initialFocus}
            >
              <div
                {...sxf(overridenStyles, 'host', sx)}
                {...interactions.getFloatingProps()}
                ref={floating.refs.setFloating}
                style={floating.floatingStyles}
              >
                <div
                  {...sxf(
                    commonStyles.placementToTransformOrigin(floating.placement),
                    'container',
                    `transition$${transitionStatus.status}`,
                  )}
                >
                  <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    <FilterableListBase
                      query={query}
                      defaultQuery={defaultQuery}
                      onQueryChange={handleQueryChange}
                      onItemSelect={handleItemSelect}
                      renderer={rendererWrapper}
                      itemRenderer={itemRendererWrapper}
                      createNewItemRenderer={createNewItemRendererWrapper}
                      disabled={disabled}
                      items={items}
                      itemsEqual={itemsEqual}
                      itemDisabled={itemDisabled}
                      listPredicate={listPredicate}
                      itemPredicate={itemPredicate}
                      listRenderer={listRenderer}
                      initialContent={initialContent}
                      noResults={noResults}
                      createNewItemFromQuery={createNewItemFromQuery}
                      createNewItemPosition={createNewItemPosition}
                      {...(forwardProps ? undefined : other)}
                    />
                  </FloatingList>
                </div>
              </div>
            </FloatingFocusManager>
          </Portal>
        )}
      </>
    );
  },
);
