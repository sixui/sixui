import type { ElementRects, Elements } from '@floating-ui/react';
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
import type { IFloatingFilterableListBaseFactory } from './FloatingFilterableListBase.types';
import { filterableListBaseFactory } from '~/components/FilterableListBase';
import { Motion } from '~/components/Motion';
import { Portal } from '~/components/Portal';
import { useProps } from '~/components/ThemeProvider';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { usePrevious } from '~/hooks/usePrevious';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { isFunction } from '~/utils/isFunction';
import { mergeProps } from '~/utils/mergeProps';
import { objectFromPlacement } from '~/utils/objectFromPlacement';
import { IElementProps } from '~/utils/types';
import { COMPONENT_NAME } from './FloatingFilterableListBase.constants';
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
      forwardProps,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const [opened, setOpened] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
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
        setOpened(false);
      } else {
        inputFilterRef.current?.focus();
      }

      const selectedIndex = onItemSelect(item) ?? activeIndex;
      setSelectedIndex(selectedIndex);
    };

    const handleAfterItemsRemove = (): void => {
      if (inputFilterRef.current) {
        inputFilterRef.current.focus();
      } else {
        buttonRef.current?.focus();
      }

      if (closeOnSelect) {
        setOpened(false);
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
      setActiveIndex(null);

      if (!opened) {
        setOpened(true);
      }
    };

    const isEnterKeyPressedRef = useRef(false);
    const getInputFilterProps = (
      userProps?: IElementProps<'input'>,
    ): Record<string, unknown> => ({
      ...userProps,
      value: userProps?.value ?? query,
      disabled,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleQueryChange(event.target.value, event);
        userProps?.onChange?.(event);
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
          case 'Enter':
            if (opened) {
              event.preventDefault();
              isEnterKeyPressedRef.current = true;
            } else {
              userProps?.onKeyDown?.(event);
            }
            break;

          case ' ':
            break;

          default:
            userProps?.onKeyDown?.(event);
        }
      },
      onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (
          opened &&
          event.key === 'Enter' &&
          activeIndex != null &&
          isEnterKeyPressedRef.current
        ) {
          // We handle ENTER in keyup here to play nice with the Button
          // component's keyboard clicking. Button is commonly used as the only
          // child of Select. If we were to instead process ENTER on keydown,
          // then Button would click itself on keyup and the Select popover
          // would re-open.
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
        focus: itemFocus,
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
            onClick: (event: React.MouseEvent<TItemElement>) => {
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

    const handleFocus = (): void => {
      setHasFocus(true);
    };
    const handleBlur = (): void => {
      setHasFocus(false);

      if (resetOnBlur && !opened) {
        setQuery('');
      }
    };

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
                ...interactions.getReferenceProps({
                  ...userProps,
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
              inputFilterRef,
              getInputFilterProps,
              forwardedProps: forwardProps ? other : undefined,
            })
          : children}

        {(transitionStatus.isMounted || keepMounted) && (
          <Portal {...portalProps}>
            <FloatingFocusManager
              context={floating.context}
              initialFocus={disabled ? -1 : initialFocus}
              returnFocus
              restoreFocus
              modal
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
                    interactions.getFloatingProps(),
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
                      {...(forwardProps ? undefined : other)}
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

  FloatingFilterableListBase.displayName = `@sixui/${COMPONENT_NAME}`;

  return FloatingFilterableListBase;
};
