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
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { Portal } from '@/components/utils/Portal';
import { MenuContext } from './MenuContext';

const styles = stylex.create({
  host: {
    zIndex: 499,
  },
  transition$unmounted: {},
  transition$initial: {
    transform: 'scaleY(0)',
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

    const floating = useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? 'right-start' : placement,
      middleware: [flip(), shift()],
      whileElementsMounted: autoUpdate,
    });
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 150, // motionVars.duration$short3
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

    const interactions = useInteractions([
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
            getItemProps: interactions.getItemProps,
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
            ...interactions.getReferenceProps(
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
              <Portal>
                <FloatingFocusManager
                  context={floating.context}
                  modal={false}
                  initialFocus={isNested ? -1 : 0}
                  returnFocus={!isNested}
                >
                  <div
                    {...stylex.props(styles.host, sx)}
                    {...interactions.getFloatingProps()}
                    ref={floating.refs.setFloating}
                    style={floating.floatingStyles}
                  >
                    <div
                      {...stylex.props(
                        styles.transformOrigin(floating.placement),
                        styles[`transition$${transitionStatus.status}`],
                        parentId
                          ? styles[
                              `transition$${transitionStatus.status}$nested`
                            ]
                          : undefined,
                      )}
                    >
                      <MenuList>{children}</MenuList>
                    </div>
                  </div>
                </FloatingFocusManager>
              </Portal>
            ) : null}
          </FloatingList>
        </MenuContext.Provider>
      </FloatingNode>
    );
  },
);
