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
  useRole,
  useTransitionStatus,
  useTypeahead,
  type Placement,
} from '@floating-ui/react';

import type { IOmit } from '@/helpers/types';
import type { ICreateNewItemRenderer, IItemRenderer } from './ListItemProps';
import { Portal } from '@/components/utils/Portal';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { placementToOrigin } from '@/helpers/placementToOrigin';
import {
  QueryList,
  type IQueryListProps,
  type IQueryListRenderer,
} from './QueryList';

export type IFloatingQueryListTriggerButtonRenderProps<TItem> = {
  isOpen: boolean;
  buttonRef: React.Ref<HTMLButtonElement>;
  buttonAttributes: React.HTMLAttributes<HTMLButtonElement>;
  onItemRemove: (
    item: TItem,
    index: number,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;
};

export type IFloatingQueryListProps<TItem> = IOmit<
  IQueryListProps<TItem>,
  'onItemSelect'
> & {
  /**
   * Element which triggers the select popover. In most cases, you should display
   * the name or label of the curently selected item here.
   */
  children: (
    props: IFloatingQueryListTriggerButtonRenderProps<TItem>,
  ) => React.JSX.Element;

  onItemSelect: (
    item: TItem,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => number | undefined;

  /**
   * Callback invoked when an item from the list is removed.
   */
  onItemRemove?: (
    item: TItem,
    index: number,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  placement?: Placement;
  matchTargetWidth?: boolean;
  closeOnSelect?: boolean;

  /**
   * Whether the active item should be reset to the first matching item _when
   * the popover closes_. The query will also be reset to the empty string.
   *
   * @defaultValue false
   */
  resetOnClose?: boolean;
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

export const FloatingQueryList = <TItem,>(
  props: IFloatingQueryListProps<TItem>,
): React.ReactNode => {
  const {
    children,
    placement = 'bottom-start',
    matchTargetWidth: fill,
    renderer,
    itemRenderer,
    createNewItemRenderer,
    onItemSelect,
    onItemRemove,
    closeOnSelect,
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
            fill
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
  const dismiss = useDismiss(floating.context);
  const canFilter = !!other.itemPredicate || !!other.itemListPredicate;
  const listNavigation = useListNavigation(floating.context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    virtual: canFilter,
    loop: true,
    focusItemOnHover: canFilter,
  });
  const isTypingRef = useRef(false);
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
    onTypingChange: (isTyping) => {
      isTypingRef.current = isTyping;
    },
    enabled: !canFilter,
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
  const inputFilterRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (item: TItem): void => {
    if (closeOnSelect) {
      setIsOpen(false);
    } else {
      inputFilterRef.current?.focus();
    }

    const selectedIndex = onItemSelect(item) ?? activeIndex;
    setSelectedIndex(selectedIndex);
  };

  const rendererWrapper: IQueryListRenderer<TItem> = (listProps) =>
    renderer({
      ...listProps,
      handleQueryChange: (event) => {
        listProps.handleQueryChange(event);
        setActiveIndex(0);
      },
      inputFilterRef: inputFilterRef,
      inputFilterAttributes: {
        onKeyDown: (event) => {
          if (event.key === 'Enter' && activeIndex != null) {
            const selectedItem = listProps.filteredItems[activeIndex];
            const selectedOrCreatedItem =
              selectedItem ??
              (listProps.query
                ? other.createNewItemFromQuery?.(listProps.query)
                : undefined);
            if (selectedOrCreatedItem) {
              listProps.handleItemSelect(selectedOrCreatedItem, event);
            }
          }
        },
      },
    });

  const itemRendererWrapper: IItemRenderer<TItem> = (item, itemProps) => {
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
      interactions.getItemProps({
        role: 'option',
        tabIndex: active ? 0 : -1,
        'aria-selected': active,
        onClick: itemProps.handleClick,
      }),
    );
  };

  const createNewItemRendererWrapper: ICreateNewItemRenderer = (itemProps) => {
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
      interactions.getItemProps({
        role: 'option',
        tabIndex: active ? 0 : -1,
        'aria-selected': active,
        onClick: itemProps.handleClick,
      }),
    );
  };

  const onQueryChangeWrapper = (query: string): void => {
    queryRef.current = query;
    other.onQueryChange?.(query);
  };

  // Restore the query when the list is re-mounted.
  const queryRef = useRef<string>();
  const defaultQueryRef = useRef<string | undefined>(other.defaultQuery);
  useEffect(() => {
    if (!transitionStatus.isMounted) {
      defaultQueryRef.current = other.resetOnClose ? '' : queryRef.current;
      if (other.resetOnClose) {
        setSelectedIndex(0);
      }
    }
  }, [transitionStatus.isMounted, other.resetOnClose, selectedIndex]);

  return (
    <>
      {children({
        isOpen,
        buttonRef: floating.refs.setReference,
        buttonAttributes: {
          tabIndex: 0,
          'aria-autocomplete': 'none',
          ...interactions.getReferenceProps(),
        },
        onItemRemove: (item, event) => onItemRemove?.(item, event),
      })}
      {transitionStatus.isMounted && (
        <Portal>
          <FloatingFocusManager
            context={floating.context}
            visuallyHiddenDismiss
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
                  <QueryList
                    {...other}
                    defaultQuery={defaultQueryRef.current}
                    onQueryChange={onQueryChangeWrapper}
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
