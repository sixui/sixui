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
  type Placement,
} from '@floating-ui/react';

import type { IMenuProps, IMenuRenderProps } from './Menu';
import { IVisualState } from '@/hooks/useVisualState';
import { MenuList } from '@/components/atoms/MenuList';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { MenuContext } from './MenuContext';

const styles = stylex.create({
  host: {
    zIndex: 499,
  },
  menuList$unmounted: {},
  menuList$initial: {
    opacity: 0,
    transform: 'scaleY(0)',
  },
  menuList$open: {
    opacity: 1,
    transform: 'scaleY(1)',
    transitionProperty: 'opacity, transform',
    transitionDuration: motionVars.duration$long2,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  menuList$close: {
    opacity: 0,
    transform: 'scaleY(0)',
    transitionProperty: 'opacity, transform',
    transitionDuration: motionVars.duration$short4,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
  menuList$unmounted$nested: {},
  menuList$initial$nested: {
    transform: 'scale(0)',
  },
  menuList$open$nested: {
    transform: 'scale(1)',
  },
  menuList$close$nested: {
    transform: 'scale(0)',
  },
  transformOrigin: (placement: Placement) => ({
    transformOrigin: placementToOrigin(placement),
  }),
});

const placementToOrigin = (placement: Placement): string => {
  switch (placement) {
    case 'top':
      return 'bottom';
    case 'top-start':
      return 'bottom left';
    case 'top-end':
      return 'bottom right';
    case 'bottom':
      return 'top';
    case 'bottom-start':
      return 'top left';
    case 'bottom-end':
      return 'top right';
    case 'left':
      return 'right';
    case 'left-start':
      return 'top right';
    case 'left-end':
      return 'bottom right';
    case 'right':
      return 'left';
    case 'right-start':
      return 'top left';
    case 'right-end':
      return 'bottom left';
    default:
      return 'top';
  }
};

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
    const [, setHasFocusInside] = useState(false);
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
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 1000,
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

    const bag: IMenuRenderProps = {
      open: isOpen,
      placement: floating.placement,
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
        <MenuContext.Provider
          value={{
            activeIndex,
            setActiveIndex,
            getItemProps: floatingInteractions.getItemProps,
            setHasFocusInside,
            isOpen,
            placement: floating.placement,
          }}
        >
          {cloneElement(typeof button === 'function' ? button(bag) : button, {
            ...(isOpen ? openProps : undefined),
            ref: handleRef,
            tabIndex: isNested
              ? parent.activeIndex === item.index
                ? 0
                : -1
              : undefined,
            role: isNested ? 'menuitem' : undefined,
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

          <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            {transitionStatus.isMounted ? (
              <FloatingPortal root={colorScheme.root}>
                <FloatingFocusManager
                  context={floating.context}
                  modal={false}
                  initialFocus={isNested ? -1 : 0}
                  returnFocus={!isNested}
                >
                  <div
                    {...stylex.props(styles.host, sx)}
                    {...floatingInteractions.getFloatingProps()}
                    ref={floating.refs.setFloating}
                    style={floating.floatingStyles}
                  >
                    <div
                      {...stylex.props(
                        styles.transformOrigin(floating.placement),
                        styles[`menuList$${transitionStatus.status}`],
                        parentId
                          ? styles[`menuList$${transitionStatus.status}$nested`]
                          : undefined,
                      )}
                    >
                      <MenuList>{children}</MenuList>
                    </div>
                  </div>
                </FloatingFocusManager>
              </FloatingPortal>
            ) : null}
          </FloatingList>
        </MenuContext.Provider>
      </FloatingNode>
    );
  },
);
