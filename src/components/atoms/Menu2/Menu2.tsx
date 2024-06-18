import stylex from '@stylexjs/stylex';
import {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import { IVisualState } from '@/hooks/useVisualState';
import { MenuList } from '@/components/atoms/MenuList';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { ReactComponent as ChevronRight } from '@/assets/ChevronRight.svg';
import { IListItemProps, ListItem } from '../ListItem';
import { Button } from '../Button';

export type IMenu2RenderProps = {
  open: boolean;
};

export type IMenu2Props = IOmit<IContainerProps, 'styles'> & {
  action:
    | React.ReactElement
    | ((props: IMenu2RenderProps) => React.ReactElement);
  children: Array<React.ReactNode>;
};

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    position: 'relative',
  },
  items: {
    zIndex: 999,
  },
});

const Menu2Context = createContext<{
  getItemProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  isOpen: false,
});

export type IMenu2ItemProps = IOmit<IListItemProps, 'as'> & {
  as?: React.ElementType;
  children: React.ReactNode;
};

const Menu2Item = forwardRef<HTMLButtonElement, IMenu2ItemProps>(
  function Menu2Item(props, forwardedRef) {
    const { disabled, ...other } = props;
    const menu = useContext(Menu2Context);
    const item = useListItem({ label: disabled ? null : other.value });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;

    return (
      <ListItem
        {...other}
        ref={useMergeRefs([item.ref, forwardedRef])}
        type='button'
        role='menuitem'
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        // onFocus, onClick, onMouseMove, onPointerLeave
        {...menu.getItemProps({
          onClick(event: React.MouseEvent<HTMLButtonElement>) {
            props.onClick?.(event);
            tree?.events.emit('click');
          },
          onFocus(event: React.FocusEvent<HTMLButtonElement>) {
            props.onFocus?.(event);
            menu.setHasFocusInside(true);
          },
        })}
      />
    );
  },
);

const Menu2 = forwardRef<
  HTMLButtonElement,
  IMenu2Props & React.HTMLProps<HTMLButtonElement>
>(function Menu2Parent(props, forwardedRef) {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <Menu2Component {...props} ref={forwardedRef} />
      </FloatingTree>
    );
  }

  return <Menu2Component {...props} ref={forwardedRef} />;
});

const Menu2Component = forwardRef<HTMLButtonElement, IMenu2Props>(
  function Menu2(props, forwardedRef) {
    const { sx, action, children } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [hasFocusInside, setHasFocusInside] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const parent = useContext(Menu2Context);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const isNested = parentId != null;
    const item = useListItem();

    const colorScheme = useColorScheme();
    const floating = useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? 'right-start' : 'bottom-start',
      middleware: [
        offset({
          mainAxis: isNested ? 0 : 4,
          alignmentAxis: isNested ? -4 : 0,
        }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });
    const hover = useHover(floating.context, {
      enabled: isNested,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(floating.context, {
      event: 'mousedown',
      toggle: !isNested,
      ignoreMouse: isNested,
    });
    const role = useRole(floating.context, { role: 'menu' });
    const dismiss = useDismiss(floating.context, { bubbles: true });
    const listNavigation = useListNavigation(floating.context, {
      listRef: elementsRef,
      activeIndex,
      nested: isNested,
      onNavigate: setActiveIndex,
      focusItemOnHover: false,
      focusItemOnOpen: 'auto',
    });
    const typeahead = useTypeahead(floating.context, {
      listRef: labelsRef,
      onMatch: isOpen ? setActiveIndex : undefined,
      activeIndex,
    });

    const floatingInteractions = useInteractions([
      hover,
      click,
      role,
      dismiss,
      listNavigation,
      typeahead,
    ]);

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    useEffect(() => {
      if (!tree) {
        return;
      }

      function handleTreeClick(): void {
        setIsOpen(false);
      }

      function onSubMenuOpen(event: {
        nodeId: string;
        parentId: string;
      }): void {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      }

      tree.events.on('click', handleTreeClick);
      tree.events.on('menuopen', onSubMenuOpen);

      return () => {
        tree.events.off('click', handleTreeClick);
        tree.events.off('menuopen', onSubMenuOpen);
      };
    }, [tree, nodeId, parentId]);

    const bag = {
      open: isOpen,
    };
    const openVisualState: IVisualState = { hovered: true };
    const openProps = { visualState: openVisualState };

    const mref = useMergeRefs([
      floating.refs.setReference,
      item.ref,
      forwardedRef,
    ]);

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    useEffect(() => {
      if (!tree) {
        return;
      }

      function handleTreeClick(): void {
        setIsOpen(false);
      }

      function onSubMenuOpen(event: {
        nodeId: string;
        parentId: string;
      }): void {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      }

      tree.events.on('click', handleTreeClick);
      tree.events.on('menuopen', onSubMenuOpen);

      return () => {
        tree.events.off('click', handleTreeClick);
        tree.events.off('menuopen', onSubMenuOpen);
      };
    }, [tree, nodeId, parentId]);

    useEffect(() => {
      if (isOpen && tree) {
        tree.events.emit('menuopen', { parentId, nodeId });
      }
    }, [tree, isOpen, nodeId, parentId]);

    return (
      <FloatingTree>
        <FloatingNode id={nodeId}>
          {parentId ? (
            <Menu2Item
              ref={mref}
              tabIndex={parent.activeIndex === item.index ? 0 : -1}
              role='menuitem'
              data-open={isOpen ? '' : undefined}
              data-nested='nested'
              data-focus-inside={hasFocusInside ? '' : undefined}
              // aria-controls, aria-expanded, aria-haspopup, id, onClick, onFocus, onKeyDown, onKeyUp, onMouseDown, onPointerDown
              {...floatingInteractions.getReferenceProps(
                parent.getItemProps({
                  ...props,
                  onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                    props.onFocus?.(event);
                    setHasFocusInside(false);
                    parent.setHasFocusInside(true);
                  },
                }),
              )}
              trailingIcon={<ChevronRight aria-hidden />}
            >
              XXX
            </Menu2Item>
          ) : (
            <Button
              ref={mref}
              data-open={isOpen ? '' : undefined}
              data-nested={undefined}
              data-focus-inside={hasFocusInside ? '' : undefined}
              // aria-controls, aria-expanded, aria-haspopup, id, onClick, onFocus, onKeyDown, onKeyUp, onMouseDown, onPointerDown
              {...floatingInteractions.getReferenceProps(
                parent.getItemProps({
                  ...props,
                  onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                    props.onFocus?.(event);
                    setHasFocusInside(false);
                    parent.setHasFocusInside(true);
                  },
                }),
              )}
            >
              ACTION
            </Button>
          )}

          <Menu2Context.Provider
            value={{
              activeIndex,
              setActiveIndex,
              getItemProps: floatingInteractions.getItemProps,
              setHasFocusInside,
              isOpen,
            }}
          >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              {isOpen && (
                <FloatingPortal root={colorScheme.root}>
                  <FloatingFocusManager
                    context={floating.context}
                    modal={false}
                    initialFocus={isNested ? -1 : 0}
                    returnFocus={!isNested}
                  >
                    <div
                      {...stylex.props(styles.items, sx)}
                      ref={floating.refs.setFloating}
                      style={floating.floatingStyles}
                      // aria-labelledby, aria-orientation, id, onKeyDown, onKeyUp, onMouseDown, onMouseUp, onPointerDownCapture, onPointerMove, role, tabIndex
                      {...floatingInteractions.getFloatingProps()}
                    >
                      <MenuList>{children}</MenuList>
                    </div>
                  </FloatingFocusManager>
                </FloatingPortal>
              )}
            </FloatingList>
          </Menu2Context.Provider>
        </FloatingNode>
      </FloatingTree>
    );
  },
);

const Menu2Namespace = Object.assign(Menu2, {
  Item: Menu2Item,
  Divider: MenuListDivider,
});

export { Menu2Namespace as Menu2 };
