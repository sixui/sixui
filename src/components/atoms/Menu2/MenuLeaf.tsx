import stylex from '@stylexjs/stylex';
import {
  cloneElement,
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
  autoUpdate,
  flip,
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
  useTransitionStatus,
  useTypeahead,
} from '@floating-ui/react';

import type { IMenuProps } from './Menu';
import { IVisualState } from '@/hooks/useVisualState';
import { MenuList } from '@/components/atoms/MenuList';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { MenuContext } from './MenuContext';

const styles = stylex.create({
  menuList: {
    zIndex: 499,
    transitionProperty: 'opacity, transform',
    transformOrigin: 'top',
    opacity: {
      default: 0,
      ':is([data-status=initial])': 0,
      ':is([data-status=open])': 1,
      ':is([data-status=close])': 0,
    },
    transitionDuration: {
      default: 'unset',
      ':is([data-status=open])': '2500ms',
      ':is([data-status=close])': '2500ms',
    },
    transform: {
      default: 'scaleY(0)',
      ':is([data-status=initial])': 'scaleY(0)',
      ':is([data-status=open])': 'scaleY(1)',
      ':is([data-status=close])': 'scaleY(0)',
    },
  },
});

export const MenuLeaf = forwardRef<HTMLButtonElement, IMenuProps>(
  function Menu(props, forwardedRef) {
    const {
      sx,
      button,
      children,
      placement = 'bottom-start',
      ...other
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [hasFocusInside, setHasFocusInside] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const parent = useContext(MenuContext);

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
      placement: isNested ? 'right-start' : placement,
      middleware: [flip(), shift()],
      whileElementsMounted: autoUpdate,
    });
    const transitionStatus = useTransitionStatus(floating.context);
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

      const handleTreeClick = (): void => {
        setIsOpen(false);
      };

      const onSubMenuOpen = (event: {
        nodeId: string;
        parentId: string;
      }): void => {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      };

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

    const handleRef = useMergeRefs([
      floating.refs.setReference,
      item.ref,
      forwardedRef,
    ]);

    return (
      <FloatingNode id={nodeId}>
        {cloneElement(typeof button === 'function' ? button(bag) : button, {
          ...(isOpen ? openProps : undefined),
          ref: handleRef,
          tabIndex: isNested
            ? parent.activeIndex === item.index
              ? 0
              : -1
            : undefined,
          role: isNested ? 'menuitem' : undefined,
          'data-open': isOpen ? 'true' : undefined,
          'data-nested': isNested ? 'true' : undefined,
          'data-focus-inside': hasFocusInside ? 'true' : undefined,
          ...floatingInteractions.getReferenceProps(
            parent.getItemProps({
              ...other,
              onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                other.onFocus?.(event);
                setHasFocusInside(false);
                parent.setHasFocusInside(true);
              },
            }),
          ),
        })}

        {transitionStatus.isMounted ? (
          <MenuContext.Provider
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
                      {...stylex.props(styles.menuList, sx)}
                      {...floatingInteractions.getFloatingProps()}
                      ref={floating.refs.setFloating}
                      style={floating.floatingStyles}
                      data-status={transitionStatus.status}
                    >
                      <MenuList>{children}</MenuList>
                    </div>
                  </FloatingFocusManager>
                </FloatingPortal>
              )}
            </FloatingList>
          </MenuContext.Provider>
        ) : null}
      </FloatingNode>
    );
  },
);
