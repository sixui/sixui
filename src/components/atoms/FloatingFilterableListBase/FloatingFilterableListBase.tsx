import { useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
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

import type { IFloatingFilterableListBaseProps } from './FloatingFilterableListBaseProps';
import {
  FilterableListBase,
  type IFilterableCreateNewItemRenderer,
  type IFilterableItemRenderer,
  type IFilterableListBaseRenderer,
} from '@/components/atoms/FilterableListBase';
import { Portal } from '@/components/utils/Portal';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { useControlledValue } from '@/hooks/useControlledValue';
import { usePrevious } from '@/hooks/usePrevious';
import {
  extendFloatingProps,
  type IExtendedFloatingProps,
} from '@/helpers/extendFloatingProps';
import { commonStyles } from '@/helpers/commonStyles';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  transition$unmounted: {},
  transition$initial: {
    transform: 'scaleY(0.5)',
  },
  transition$open: {
    transform: 'scaleY(1)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    transform: 'scaleY(0)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
  transition$unmounted$nested: {},
  transition$initial$nested: {},
  transition$open$nested: {
    transition: 'none',
  },
  transition$close$nested: {
    transition: 'none',
  },
});

export const FloatingFilterableListBase = fixedForwardRef(
  function FloatingFilterableListBase<TItem, TItemElement extends HTMLElement>(
    props: IFloatingFilterableListBaseProps<TItem, TItemElement>,
    forwardedRef?: React.Ref<ReferenceType>,
  ) {
    const {
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
      ...other
    } = props;

    const [isOpen, setIsOpen] = useState(false);
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
      findMatch: other.itemPredicate
        ? (list, typedString) =>
            list.find((label) =>
              label && other.createNewItemFromQuery
                ? other.itemPredicate?.(
                    typedString,
                    other.createNewItemFromQuery(label),
                  )
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
      duration: 150, // motionVars.duration$short3
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
      disabled: other.disabled,
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

    const itemRendererWrapper: IFilterableItemRenderer<TItem, TItemElement> = (
      item,
      itemProps,
    ) => {
      const active = activeIndex === itemProps.index;

      return itemRenderer(item, {
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
            onClick: itemProps.handleClick,
          }),
      });
    };

    const createNewItemRendererWrapper: IFilterableCreateNewItemRenderer<
      TItemElement
    > = (itemProps) => {
      const active = activeIndex === itemProps.index;

      return createNewItemRenderer?.({
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
            onClick: itemProps.handleClick,
          }),
      });
    };

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

    return (
      <>
        {children({
          isOpen,
          setTriggerRef: buttonHandleRef,
          getTriggerProps: (userProps) => ({
            ...extendFloatingProps(interactions.getReferenceProps, {
              ...userProps,
              tabIndex: 0,
              onBlur: resetOnBlur ? () => setQuery('') : undefined,
            }),
            'aria-autocomplete': 'none',
          }),
          afterItemsRemove: handleAfterItemsRemove,
          query,
          inputFilterRef: inputFilterRef,
          getInputFilterProps,
        })}

        {transitionStatus.isMounted && (
          <Portal>
            <FloatingFocusManager
              context={floating.context}
              visuallyHiddenDismiss
              initialFocus={other.disabled ? -1 : initialFocus}
            >
              <div
                {...stylex.props(styles.host)}
                {...interactions.getFloatingProps()}
                ref={floating.refs.setFloating}
                style={floating.floatingStyles}
              >
                <div
                  {...stylex.props(
                    styles.container,
                    commonStyles.transformOrigin(floating.placement),
                    styles[`transition$${transitionStatus.status}`],
                  )}
                >
                  <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    <FilterableListBase
                      {...other}
                      query={query}
                      defaultQuery={defaultQuery}
                      onQueryChange={handleQueryChange}
                      onItemSelect={handleItemSelect}
                      renderer={rendererWrapper}
                      itemRenderer={itemRendererWrapper}
                      createNewItemRenderer={createNewItemRendererWrapper}
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
