import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { isFunction } from '~/helpers/isFunction';
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
} from '@floating-ui/react';

import type { IMenuProps } from './Menu.types';
import { useStyles } from '~/hooks/useStyles';
import { MenuList } from '../MenuList';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
import { MenuItemContext } from '../MenuItem';
import { MenuContext } from './Menu.context';
import { menuStyles } from './Menu.styles';

export const MenuLeaf = forwardRef<HTMLButtonElement, IMenuProps>(
  function MenuLeaf(props, forwardedRef) {
    const {
      styles,
      root,
      trigger,
      children,
      placement = 'bottom-start',
      orientation = 'vertical',
      matchTargetWidth,
      size: listItemSize = 'sm',
      ...other
    } = props;

    const [opened, setOpened] = useState(false);
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
      open: opened,
      onOpenChange: setOpened,
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
      duration: 150, // motionTokens.duration$short3
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
      onMatch: opened ? setActiveIndex : undefined,
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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Menu',
      styles: [menuStyles, styles],
    });

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    useEffect(() => {
      if (!tree) {
        return;
      }

      const handleTreeClick = (): void => {
        setOpened(false);
      };

      const onSubMenuOpen = (event: {
        nodeId: string;
        parentId: string;
      }): void => {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setOpened(false);
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
      userProps?: React.ComponentPropsWithoutRef<'button'>,
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
          opened,
          placement: floating.placement,
          getProps: getTriggerProps,
        })
      : trigger;

    return (
      <FloatingNode id={nodeId}>
        <MenuContext.Provider
          value={{
            opened: transitionStatus.isMounted,
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
                opened,
                placement: floating.placement,
              }}
            >
              <Portal root={root}>
                <FloatingFocusManager
                  context={floating.context}
                  modal={false}
                  initialFocus={isNested ? -1 : 0}
                  returnFocus={!isNested}
                >
                  <div
                    {...getStyles(globalStyles, 'host')}
                    {...interactions.getFloatingProps()}
                    ref={floating.refs.setFloating}
                    style={floating.floatingStyles}
                  >
                    <FloatingTransition
                      sx={combineStyles('inner')}
                      placement={floating.placement}
                      status={transitionStatus.status}
                      origin='edge'
                      orientation={orientation}
                      disabled={!!parentId}
                    >
                      <MenuList noFocusRing {...other} size={listItemSize}>
                        <FloatingList
                          elementsRef={elementsRef}
                          labelsRef={labelsRef}
                        >
                          {children}
                        </FloatingList>
                      </MenuList>
                    </FloatingTransition>
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
