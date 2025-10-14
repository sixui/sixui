import type { ElementRects, Elements } from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  useRole,
  useTransitionStatus,
  useTypeahead,
} from '@floating-ui/react';

import type {
  IFilterableCreateNewListItemRenderer,
  IFilterableListBaseRenderer,
  IFilterableListItemRenderer,
  IFilterableListItemRendererProps,
} from '~/components/FilterableListBase';
import type { IElementProps } from '~/utils/types';
import type { IFloatingFilterableListBaseFactory } from './FloatingFilterableListBase.types';
import { filterableListBaseFactory } from '~/components/FilterableListBase';
import { Motion } from '~/components/Motion';
import { Portal } from '~/components/Portal';
import { useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { usePrevious } from '~/hooks/usePrevious';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { isFunction } from '~/utils/isFunction';
import { mergeProps } from '~/utils/mergeProps';
import { objectFromPlacement } from '~/utils/objectFromPlacement';
import { COMPONENT_NAME } from './FloatingFilterableListBase.constants';
import { useFocusManagement } from './hooks/useFocusManagement';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { floatingFilterableListBaseClassNames } from './FloatingFilterableListBase.css';

export const floatingFilterableListBaseFactory = <
  TItem,
  TItemElement extends HTMLElement = HTMLElement,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
>() => {
  const FloatingFilterableListBase = polymorphicComponentFactory<
    IFloatingFilterableListBaseFactory<TItem, TItemElement>
  >((props, forwardedRef) => {
    const {
      children,
      placement = 'bottom-start',
      orientation = 'vertical',
      matchTargetWidth,
      renderer,
      itemRenderer,
      createNewItemRenderer,
      onItemSelect,
      closeOnSelect,
      resetOnSelect,
      initialFocus = 0,
      query: queryProp,
      defaultQuery,
      onQueryChange,
      resetOnClose,
      resetOnBlur,
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
      cols = 1,
      itemFocus,
      onOpenChange,
      floatingFocusManagerProps,
      floatingMotionProps,
      portalProps,
      keepMounted,
      forwardForeignProps,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const [opened, setOpened] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const elementsRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const floating = useFloating({
      placement: placement,
      open: opened,
      onOpenChange: (opened, event, reason) => {
        setOpened(opened);
        onOpenChange?.(opened, event, reason);
      },
      whileElementsMounted: autoUpdate,
      middleware: [
        flip({
          padding: 48,
        }),
        size({
          apply: ({
            rects,
            elements,
          }: {
            rects: ElementRects;
            elements: Elements;
          }) => {
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
      keyboardHandlers: false,
    });
    const role = useRole(floating.context, { role: 'listbox' });
    const inputFilterRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLElement>(null);
    const buttonHandleRef = useMergeRefs(
      buttonRef,
      floating.refs.setReference,
      forwardedRef,
    );
    const dismiss = useDismiss(floating.context);
    const canFilter = !!inputFilterRef.current;
    const isGrid = cols > 1;
    const listNavigation = useListNavigation(floating.context, {
      listRef: elementsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      virtual: canFilter,
      loop: true,
      cols,
      orientation: isGrid ? 'both' : 'vertical',
      focusItemOnHover: false,
    });
    const typeahead = useTypeahead(floating.context, {
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      onMatch: opened ? setActiveIndex : setSelectedIndex,
      enabled: !canFilter,
      findMatch: itemPredicate
        ? (list, typedString) => {
            const normalizedTypedString = typedString.toLowerCase();
            const matchingItem = list.find((label) => {
              const normalizedLabel = label?.toLowerCase();
              const isMatching = normalizedLabel?.includes(
                normalizedTypedString,
              );

              return isMatching;
            });

            return matchingItem;
          }
        : undefined,
    });
    const [query, setQuery] = useControlledValue({
      controlled: queryProp,
      default: defaultQuery ?? '',
      name: COMPONENT_NAME,
    });
    const { getItemProps, getFloatingProps, getReferenceProps } =
      useInteractions([click, role, dismiss, listNavigation, typeahead]);
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 150, // motionTokens.duration$short3
    });

    const handleItemSelect = useCallback(
      (item: TItem): void => {
        // If both `resetOnSelect` and `closeOnSelect` are true, the user may
        // see a flash of the unfiltered list before it closes due to the
        // closing animation duration. If `resetOnClose` is true, we can avoid
        // this by not resetting the query until the list is actually closed.
        const shouldResetQuery =
          resetOnSelect && (!closeOnSelect || !resetOnClose);
        if (shouldResetQuery) {
          setQuery('');
        }

        if (closeOnSelect) {
          setOpened(false);
        } else {
          inputFilterRef.current?.focus();
        }

        const selectedIndex = onItemSelect(item) ?? activeIndex;
        setSelectedIndex(selectedIndex);
      },
      [
        activeIndex,
        closeOnSelect,
        onItemSelect,
        resetOnSelect,
        setQuery,
        inputFilterRef,
        resetOnClose,
      ],
    );

    const { hasFocus, getFocusProps, focusAfterOperation } = useFocusManagement(
      {
        resetOnBlur,
        opened,
        setQuery,
        autoFocusRef: inputFilterRef,
        triggerRef: buttonRef,
      },
    );

    const { getInputKeyDownHandler, getInputKeyUpHandler } =
      useKeyboardNavigation({
        opened,
        activeIndex,
        elementsRef,
        closeOnSelect,
        inputFilterRef,
        onItemSelect: handleItemSelect,
      });

    const handleAfterItemsRemove = useCallback((): void => {
      focusAfterOperation();

      if (closeOnSelect) {
        setOpened(false);
      }
    }, [focusAfterOperation, closeOnSelect]);

    const handleQueryChange = useCallback(
      (newQuery: string, event?: React.ChangeEvent<HTMLInputElement>): void => {
        if (query === newQuery) {
          return;
        }

        setQuery(newQuery);
        onQueryChange?.(newQuery, event);
        setActiveIndex(null);

        if (!opened) {
          setOpened(true);
        }
      },
      [opened, query, setQuery, onQueryChange],
    );

    const getInputFilterProps = useMemo(
      () =>
        (userProps?: IElementProps<'input'>): Record<string, unknown> => ({
          ...userProps,
          value: userProps?.value ?? query,
          disabled,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            handleQueryChange(event.target.value, event);
            userProps?.onChange?.(event);
          },
          onKeyDown: getInputKeyDownHandler(userProps?.onKeyDown),
          onKeyUp: getInputKeyUpHandler(userProps?.onKeyUp),
        }),
      [
        query,
        handleQueryChange,
        disabled,
        getInputKeyDownHandler,
        getInputKeyUpHandler,
      ],
    );

    const rendererWrapper = useMemo<IFilterableListBaseRenderer<TItem>>(
      () => (listProps) =>
        renderer({
          ...listProps,
          handleQueryChange: listProps.handleQueryChange,
          inputFilterRef,
          getInputFilterProps,
        }),
      [inputFilterRef, renderer, getInputFilterProps],
    );

    const getItemRendererProps = useMemo(
      () =>
        (
          itemProps: IFilterableListItemRendererProps<TItemElement>,
        ): IFilterableListItemRendererProps<TItemElement> => {
          const active = activeIndex === itemProps.index;
          const disabled = itemProps.modifiers.disabled;

          return {
            ...itemProps,
            modifiers: {
              ...itemProps.modifiers,
              active,
            },
            focus: itemFocus,
            buttonRef: (node) => {
              elementsRef.current[itemProps.index] = node;
              labelsRef.current[itemProps.index] = node?.textContent ?? null;
            },
            getButtonAttributes: (userProps) => ({
              ...getItemProps({
                ...userProps,
                role: 'option',
                tabIndex: active ? 0 : -1,
                'aria-disabled': disabled,
                'aria-selected': active,
                onClick: (event: React.MouseEvent<TItemElement>) => {
                  userProps?.onClick?.(event);
                  itemProps.handleClick(event);
                },
              }),
            }),
          };
        },
      [itemFocus, activeIndex, getItemProps],
    );

    const itemRendererWrapper: IFilterableListItemRenderer<
      TItem,
      TItemElement
    > = useMemo(
      () => (item, itemProps) =>
        itemRenderer(item, getItemRendererProps(itemProps)),
      [itemRenderer, getItemRendererProps],
    );

    const createNewItemRendererWrapper: IFilterableCreateNewListItemRenderer<TItemElement> =
      useMemo(
        () => (itemProps) =>
          createNewItemRenderer?.(getItemRendererProps(itemProps)),
        [createNewItemRenderer, getItemRendererProps],
      );

    // Restore the query when the list is re-mounted.
    const previousIsMounted = usePrevious(transitionStatus.isMounted);
    useEffect(() => {
      if (previousIsMounted && !transitionStatus.isMounted) {
        if (resetOnClose) {
          setQuery('');
          setSelectedIndex(null);
        }
      }
    }, [
      previousIsMounted,
      transitionStatus.isMounted,
      resetOnClose,
      selectedIndex,
      setQuery,
    ]);

    const FilterableListBase = useMemo(
      () => filterableListBaseFactory<TItem>(),
      [],
    );

    return (
      <>
        {isFunction(children)
          ? children({
              opened,
              hasFocus,
              setTriggerRef: buttonHandleRef,
              getTriggerProps: (userProps) => ({
                ...getReferenceProps(getFocusProps(userProps)),
                'aria-autocomplete': 'none',
              }),
              afterItemsRemove: handleAfterItemsRemove,
              query,
              inputFilterRef,
              getInputFilterProps,
              foreignProps: forwardForeignProps ? other : undefined,
            })
          : children}

        {(transitionStatus.isMounted || keepMounted) && (
          <Portal {...portalProps}>
            <FloatingFocusManager
              context={floating.context}
              initialFocus={disabled ? -1 : initialFocus}
              returnFocus
              restoreFocus
              modal={false}
              // When the floating element is opened, floating-ui immediately
              // set `aria-hidden` on the reference element. When the floating
              // element is closed, floating-ui remove `aria-hidden` from the
              // reference element once the transition is finished. In the
              // meantime, the FloatingFocusManager immediately try to focus
              // return the focus to reference element. This is problematic
              // because during the closing transition, the reference element is
              // not focusable because of the `aria-hidden` attribute. To fix
              // this, we need to disable the FloatingFocusManager immediately
              // when the floating element is closed.
              disabled={keepMounted ? !opened : undefined}
              {...floatingFocusManagerProps}
            >
              <div
                className={floatingFilterableListBaseClassNames.root}
                style={{
                  display: !transitionStatus.isMounted ? 'none' : undefined,
                }}
              >
                <Motion
                  placement={objectFromPlacement(floating.placement)}
                  status={transitionStatus.status}
                  origin="edge"
                  orientation={orientation}
                  {...mergeProps(
                    {
                      className: floatingFilterableListBaseClassNames.floating,
                      style: { left: floating.x, top: floating.y },
                      ref: floating.refs.setFloating,
                    },
                    getFloatingProps(),
                    floatingMotionProps,
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
                      cols={cols}
                      {...(forwardForeignProps ? undefined : other)}
                    />
                  </FloatingList>
                </Motion>
              </div>
            </FloatingFocusManager>
          </Portal>
        )}
      </>
    );
  });

  FloatingFilterableListBase.displayName = `@sixui/core/${COMPONENT_NAME}`;

  return FloatingFilterableListBase;
};
