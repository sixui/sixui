import { useRef, useState } from 'react';
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

import {
  executeItemsEqual,
  type IItemsEqualProp,
  type ICreateNewItemRenderer,
  type IItemRenderer,
} from './ListItemProps';
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
  selectedItem?: TItem | null;
  buttonRef: React.Ref<HTMLButtonElement>;
  buttonAttributes: React.HTMLAttributes<HTMLButtonElement>;
};

export type IFloatingQueryListProps<TItem> = IQueryListProps<TItem> & {
  /**
   * Element which triggers the select popover. In most cases, you should display
   * the name or label of the curently selected item here.
   */
  children: (
    props: IFloatingQueryListTriggerButtonRenderProps<TItem>,
  ) => React.JSX.Element;

  placement?: Placement;
  fill?: boolean;
};

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
    flexGrow: 1,
    display: 'flex',
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

const arrayContainsItem = <TItem,>(
  itemsEqualProp: IItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  itemToFind: TItem,
): boolean =>
  items.some((item: TItem) =>
    executeItemsEqual(itemsEqualProp, item, itemToFind),
  );

const addItemToArray = <TItem,>(
  items: Array<TItem>,
  itemToAdd: TItem,
): Array<TItem> => [...items, itemToAdd];

const deleteItemFromArray = <TItem,>(
  items: Array<TItem>,
  itemToDelete: TItem,
): Array<TItem> => items.filter((item) => item !== itemToDelete);

const maybeAddCreatedItemToArrays = <TItem,>(
  itemsEqualProp: IItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  createdItems: Array<TItem>,
  item: TItem,
): { createdItems: Array<TItem>; items: Array<TItem> } => {
  const isNewlyCreatedItem = !arrayContainsItem(itemsEqualProp, items, item);

  return {
    createdItems: isNewlyCreatedItem
      ? addItemToArray(createdItems, item)
      : createdItems,
    // Add a created item to `items` so that the item can be deselected.
    items: isNewlyCreatedItem ? addItemToArray(items, item) : items,
  };
};

const maybeDeleteCreatedItemFromArrays = <TItem,>(
  itemsEqualProp: IItemsEqualProp<TItem> | undefined,
  items: Array<TItem>,
  createdItems: Array<TItem>,
  item: TItem | undefined,
): { createdItems: Array<TItem>; items: Array<TItem> } => {
  if (item === undefined) {
    return {
      createdItems,
      items,
    };
  }

  const wasItemCreatedByUser = arrayContainsItem(
    itemsEqualProp,
    createdItems,
    item,
  );

  // Delete the item if the user manually created it.
  return {
    createdItems: wasItemCreatedByUser
      ? deleteItemFromArray(createdItems, item)
      : createdItems,
    items: wasItemCreatedByUser ? deleteItemFromArray(items, item) : items,
  };
};

export const FloatingQueryList = <TItem,>(
  props: IFloatingQueryListProps<TItem>,
): React.ReactNode => {
  const {
    items: itemsProp,
    children,
    placement = 'bottom-start',
    fill,
    renderer,
    itemRenderer,
    createNewItemRenderer,
    ...other
  } = props;

  const [items, setItems] = useState(itemsProp);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<TItem>();
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
    event: 'mousedown',
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

  const [createdItems, setCreatedItems] = useState<Array<TItem>>([]);
  const handleSelect = (newSelectedItem: TItem): void => {
    // Delete the old film from the list if it was newly created.
    const step1Result = maybeDeleteCreatedItemFromArrays(
      other.itemsEqual,
      items,
      createdItems,
      selectedItem,
    );
    // Add the new film to the list if it is newly created.
    const step2Result = maybeAddCreatedItemToArrays(
      other.itemsEqual,
      step1Result.items,
      step1Result.createdItems,
      newSelectedItem,
    );
    setCreatedItems(step2Result.createdItems);
    setSelectedItem(newSelectedItem);
    setItems(step2Result.items);
    setIsOpen(false);
  };

  const rendererWrapper: IQueryListRenderer<TItem> = (listProps) =>
    renderer({
      ...listProps,
      handleQueryChange: (event) => {
        listProps.handleQueryChange(event);
        setActiveIndex(0);
      },
      inputFilterAttributes: {
        ...listProps.inputFilterAttributes,
        onKeyDown: (event) => {
          if (event.key === 'Enter' && activeIndex != null) {
            const selectedItem = listProps.filteredItems[activeIndex];
            const selectedOrCreatedItem =
              selectedItem ?? other.createNewItemFromQuery?.(listProps.query);
            if (selectedOrCreatedItem) {
              handleSelect(selectedOrCreatedItem);
            }
          }
        },
      },
    });

  const itemRendererWrapper: IItemRenderer<TItem> = (item, itemProps) => {
    const active = activeIndex === itemProps.index;
    const selected = executeItemsEqual(other.itemsEqual, item, selectedItem);

    return itemRenderer(
      item,
      {
        ...itemProps,
        modifiers: {
          ...itemProps.modifiers,
          active,
          selected,
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
        onClick: () => handleSelect(item),
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
        onClick: () => {
          const createdItem = other.createNewItemFromQuery?.(itemProps.query);
          if (createdItem) {
            handleSelect(createdItem);
          }
        },
      }),
    );
  };

  return (
    <>
      {children({
        selectedItem,
        isOpen,
        buttonRef: floating.refs.setReference,
        buttonAttributes: {
          tabIndex: 0,
          'aria-autocomplete': 'none',
          ...interactions.getReferenceProps(),
        },
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
                  styles.host,
                  styles.transformOrigin(floating.placement),
                  styles[`transition$${transitionStatus.status}`],
                )}
              >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  <QueryList
                    {...other}
                    items={items}
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
