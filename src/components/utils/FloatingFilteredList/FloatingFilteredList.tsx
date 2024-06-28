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
  type Placement,
} from '@floating-ui/react';

import type { IOmit } from '@/helpers/types';
import {
  FilteredList,
  type IFilteredCreateNewItemRenderer,
  type IFilteredItemRenderer,
  type IFilteredListProps,
  type IFilteredListRenderer,
} from '@/components/utils/FilteredList';
import { Portal } from '@/components/utils/Portal';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { placementToOrigin } from '@/helpers/placementToOrigin';
import { useControlledValue } from '@/hooks/useControlledValue';
import { usePrevious } from '@/hooks/usePrevious';

export type IFloatingFilteredListTriggerButtonRenderProps<TItem> = {
  isOpen: boolean;
  buttonRef: React.Ref<HTMLDivElement>;
  getButtonAttributes: (
    userProps?: React.HTMLProps<Element>,
  ) => Record<string, unknown>;
  onItemsRemove: (
    items: Array<TItem>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  /** The current query string. */
  query: string;

  inputFilterRef?: React.Ref<HTMLInputElement>;
  getInputFilterAttributes: (
    userProps?: React.HTMLProps<HTMLInputElement>,
  ) => Record<string, unknown>;
};

export type IFloatingFilteredListProps<
  TItem,
  TElement extends HTMLElement,
> = IOmit<IFilteredListProps<TItem, TElement>, 'onItemSelect'> & {
  /**
   * Element which triggers the select popover. In most cases, you should display
   * the name or label of the curently selected item here.
   */
  children: (
    props: IFloatingFilteredListTriggerButtonRenderProps<TItem>,
  ) => React.JSX.Element;

  onItemSelect: (
    item: TItem,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => number | undefined;

  /**
   * Callback invoked when an item from the list is removed.
   */
  onItemsRemove?: (
    item: Array<TItem>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  onItemRemoveFocused?: () => void;

  onItemFocusPreviousSelected?: (
    inputFilterRef: React.RefObject<HTMLInputElement>,
  ) => void;
  onItemFocusNextSelected?: (
    inputFilterRef: React.RefObject<HTMLInputElement>,
  ) => void;

  placement?: Placement;
  matchTargetWidth?: boolean;
  closeOnSelect?: boolean;

  /**
   * Whether the active item should be reset to the first matching item _when
   * an item is selected_. The query will also be reset to the empty string.
   *
   * @defaultvalue false
   */
  resetOnSelect?: boolean;

  /**
   * Whether the active item should be reset to the first matching item _when
   * the popover closes_. The query will also be reset to the empty string.
   *
   * @defaultValue false
   */
  resetOnClose?: boolean;

  initialFocus?: number;
};

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
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
  transformOrigin: (placement: Placement) => ({
    transformOrigin: placementToOrigin(placement),
  }),
});

export const FloatingFilteredList = <TItem, TElement extends HTMLElement>(
  props: IFloatingFilteredListProps<TItem, TElement>,
): React.ReactNode => {
  const {
    children,
    placement = 'bottom-start',
    matchTargetWidth,
    renderer,
    itemRenderer,
    createNewItemRenderer,
    onItemSelect,
    onItemsRemove,
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
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(
            elements.floating.style,
            {
              maxHeight: `${availableHeight}px`,
              display: 'flex',
            },
            matchTargetWidth
              ? { width: `${rects.reference.width}px` }
              : { width: 'fit-content', maxWidth: '400px' },
          );
        },
      }),
      flip(),
    ],
  });
  const click = useClick(floating.context, {
    event: 'click',
  });
  const role = useRole(floating.context, { role: 'listbox' });
  const inputFilterRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const buttonHandleRef = useMergeRefs([buttonRef, floating.refs.setReference]);
  const dismiss = useDismiss(floating.context);
  const canFilter = !!inputFilterRef.current;
  const listNavigation = useListNavigation(floating.context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    virtual: canFilter,
    loop: true,
    focusItemOnHover: canFilter,
  });
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
    enabled: !canFilter,
  });
  const [query, setQuery] = useControlledValue({
    controlled: queryProp,
    default: defaultQuery ?? '',
    name: 'FloatingFilteredList',
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

  const handleSelect = (item: TItem): void => {
    // If both `resetOnSelect` and `closeOnSelect` are true, the user may see a flash of the unfiltered list before it closes due to the closing animation duration. If `resetOnClose` is true, we can avoid this by not resetting the query until the list is actually closed.
    const shouldResetQuery = resetOnSelect && (!closeOnSelect || !resetOnClose);
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

  const handleItemsRemove = (items: Array<TItem>): void => {
    onItemsRemove?.(items);
    if (inputFilterRef.current) {
      inputFilterRef.current?.focus();
    } else {
      buttonRef.current?.focus();
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
  const getInputFilterAttributes = (
    userProps?: React.HTMLProps<HTMLInputElement>,
  ): Record<string, unknown> => ({
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

  const rendererWrapper: IFilteredListRenderer<TItem> = (listProps) =>
    renderer({
      ...listProps,
      handleQueryChange: listProps.handleQueryChange,
      inputFilterRef,
      getInputFilterAttributes,
    });

  const itemRendererWrapper: IFilteredItemRenderer<TItem, TElement> = (
    item,
    itemProps,
  ) => {
    const active = activeIndex === itemProps.index;

    return itemRenderer(
      item,
      {
        ...itemProps,
        modifiers: {
          ...itemProps.modifiers,
          active,
        },
      },
      (node) => {
        elementsRef.current[itemProps.index] = node;
        labelsRef.current[itemProps.index] = node?.textContent ?? null;
      },
      (userProps) =>
        interactions.getItemProps({
          ...userProps,
          role: 'option',
          tabIndex: active ? 0 : -1,
          'aria-selected': active,
          onClick: itemProps.handleClick,
        }),
    );
  };

  const createNewItemRendererWrapper: IFilteredCreateNewItemRenderer<
    TElement
  > = (itemProps) => {
    const active = activeIndex === itemProps.index;

    return createNewItemRenderer?.(
      {
        ...itemProps,
        modifiers: {
          ...itemProps.modifiers,
          active,
        },
      },
      (node) => {
        elementsRef.current[itemProps.index] = node;
        labelsRef.current[itemProps.index] = null;
      },
      (userProps) =>
        interactions.getItemProps({
          ...userProps,
          role: 'option',
          tabIndex: active ? 0 : -1,
          'aria-selected': active,
          onClick: itemProps.handleClick,
        }),
    );
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
        buttonRef: buttonHandleRef,
        getButtonAttributes: (userProps?: React.HTMLProps<Element>) =>
          interactions.getReferenceProps({
            ...userProps,
            disabled: other.disabled,
            tabIndex: 0,
            'aria-autocomplete': 'none',
          }),
        onItemsRemove: handleItemsRemove,
        query,
        inputFilterRef,
        getInputFilterAttributes,
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
                  styles.transformOrigin(floating.placement),
                  styles[`transition$${transitionStatus.status}`],
                )}
              >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  <FilteredList
                    {...other}
                    query={query}
                    defaultQuery={defaultQuery}
                    onQueryChange={handleQueryChange}
                    onItemSelect={handleSelect}
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
};
