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
import { placementToOrigin } from '@/helpers/placementToOrigin';
import { MenuContext } from './MenuContext';

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
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
    const buttonElement = typeof button === 'function' ? button(bag) : button;
    const buttonProps =
      buttonElement.props as React.HTMLProps<HTMLButtonElement>;

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
          {cloneElement(buttonElement, {
            ...interactions.getReferenceProps({
              ...buttonProps,
              ...(transitionStatus.isMounted ? openProps : undefined),
              tabIndex: isNested
                ? parent.activeIndex === item.index
                  ? 0
                  : -1
                : undefined,
              role: isNested ? 'menuitem' : undefined,
              ...parent.getItemProps({
                onFocus: () => {
                  setHasFocusInside(false);
                  parent.setHasFocusInside(true);
                },
              }),
              ref: handleRef,
            }),
          })}

          {transitionStatus.isMounted ? (
            <Portal>
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <FloatingFocusManager
                  context={floating.context}
                  modal={false}
                  initialFocus={isNested ? -1 : 0}
                  returnFocus={!isNested}
                >
                  <div
                    {...stylex.props(styles.host)}
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
                      <MenuList sx={sx} {...other}>
                        {children}
                      </MenuList>
                    </div>
                  </div>
                </FloatingFocusManager>
              </FloatingList>
            </Portal>
          ) : null}
        </MenuContext.Provider>
      </FloatingNode>
    );
  },
);
