import stylex from '@stylexjs/stylex';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { isFunction } from 'lodash';
import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  autoUpdate,
  flip,
  safePolygon,
  shift,
  size,
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

import type { IMenuProps } from './Menu';
import { MenuList } from '@/components/atoms/MenuList';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { Portal } from '@/components/utils/Portal';
import { placementToOrigin } from '@/helpers/placementToOrigin';
import { MenuItemContext } from './MenuItemContext';
import { MenuContext } from './MenuContext';

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
  },
  inner: {
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

export const MenuLeaf = forwardRef<HTMLButtonElement, IMenuProps>(
  function MenuLeaf(props, forwardedRef) {
    const {
      sx,
      trigger,
      children,
      placement = 'bottom-start',
      matchTargetWidth,
      ...other
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const menuItemContext = useContext(MenuItemContext);

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
        shift(),
      ],
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
      loop: true,
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

    const triggerHandleRef = useMergeRefs([
      floating.refs.setReference,
      item.ref,
      forwardedRef,
    ]);

    const getTriggerProps = (
      userProps?: React.HTMLProps<HTMLButtonElement>,
    ): Record<string, unknown> =>
      interactions.getReferenceProps({
        ...userProps,
        ...(transitionStatus.isMounted
          ? { visualState: { hovered: true, strategy: 'replace' } }
          : undefined),
        tabIndex: isNested
          ? menuItemContext.activeIndex === item.index
            ? 0
            : -1
          : undefined,
        role: isNested ? 'menuitem' : undefined,
        ref: triggerHandleRef,
      });

    const triggerElement = isFunction(trigger)
      ? trigger({
          isOpen,
          placement: floating.placement,
          getProps: getTriggerProps,
        })
      : trigger;

    return (
      <FloatingNode id={nodeId}>
        <MenuContext.Provider
          value={{
            isOpen: transitionStatus.isMounted,
            getTriggerProps,
            triggerRef: triggerHandleRef,
            placement: floating.placement,
          }}
        >
          {triggerElement}

          {transitionStatus.isMounted ? (
            <MenuItemContext.Provider
              value={{
                activeIndex,
                setActiveIndex,
                getItemProps: interactions.getItemProps,
                isOpen,
                placement: floating.placement,
              }}
            >
              <Portal>
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
                        styles.inner,
                        styles.transformOrigin(floating.placement),
                        styles[`transition$${transitionStatus.status}`],
                        parentId
                          ? styles[
                              `transition$${transitionStatus.status}$nested`
                            ]
                          : undefined,
                      )}
                    >
                      <MenuList sx={sx} noFocusRing {...other} size='sm'>
                        <FloatingList
                          elementsRef={elementsRef}
                          labelsRef={labelsRef}
                        >
                          {children}
                        </FloatingList>
                      </MenuList>
                    </div>
                  </div>
                </FloatingFocusManager>
              </Portal>
            </MenuItemContext.Provider>
          ) : null}
        </MenuContext.Provider>
      </FloatingNode>
    );
  },
);
