import { useEffect, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
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
  useRole,
  useTransitionStatus,
  useTypeahead,
} from '@floating-ui/react';

import type { IMenuFactory } from './Menu.types';
import type { IMenuLeafThemeFactory } from './MenuLeaf.css';
import { Motion } from '~/components/Motion';
import { Portal } from '~/components/Portal';
import { isFunction } from '~/helpers/isFunction';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { objectFromPlacement } from '~/utils/objectFromPlacement';
import { stringFromPlacement } from '~/utils/stringFromPlacement';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { MenuItemContextProvider, useMenuItemContext } from './MenuItem';
import { MenuList } from './MenuList';
import { menuLeafTheme } from './MenuLeaf.css';

const COMPONENT_NAME = 'MenuLeaf';

export const MenuLeaf = componentFactory<IMenuFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      trigger,
      placement = {
        side: 'bottom',
        alignment: 'start',
      },
      orientation = 'vertical',
      matchTargetWidth,
      floatingFocusManagerProps,
      motionProps,
      portalProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [opened, setOpened] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const menuItemContext = useMenuItemContext();

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const isNested = parentId != null;
    const item = useListItem();

    const floating = useFloating<HTMLButtonElement>({
      nodeId,
      open: opened,
      onOpenChange: setOpened,
      placement: isNested ? 'right-start' : stringFromPlacement(placement),
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

    const { getStyles } = useComponentTheme<IMenuLeafThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: menuLeafTheme,
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

    const triggerHandleRef = useMergeRefs(
      floating.refs.setReference,
      item.ref,
      forwardedRef,
    );

    const getTriggerProps = (
      userProps?: Record<string, unknown>,
    ): Record<string, unknown> =>
      interactions.getReferenceProps({
        ...userProps,
        ...(transitionStatus.isMounted
          ? { interactions: { hovered: true } }
          : undefined),
        tabIndex: isNested
          ? menuItemContext !== undefined &&
            menuItemContext.activeIndex === item.index
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

    const finalPlacement = objectFromPlacement(floating.placement);

    return (
      <FloatingNode id={nodeId}>
        {triggerElement}

        {transitionStatus.isMounted && (
          <MenuItemContextProvider
            value={{
              activeIndex,
              setActiveIndex,
              opened,
              getItemProps: interactions.getItemProps,
              placement: floating.placement,
            }}
          >
            <Portal {...portalProps}>
              <FloatingFocusManager
                context={floating.context}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
                {...floatingFocusManagerProps}
              >
                <div {...getStyles('root')}>
                  <Motion
                    placement={finalPlacement}
                    status={transitionStatus.status}
                    origin="edge"
                    orientation={orientation}
                    disabled={!!parentId}
                    {...mergeProps(
                      { ref: floating.refs.setFloating },
                      interactions.getFloatingProps(),
                      getStyles('floating', {
                        style: { left: floating.x, top: floating.y },
                      }),
                      motionProps,
                    )}
                  >
                    <MenuList noFocusRing {...other}>
                      <FloatingList
                        elementsRef={elementsRef}
                        labelsRef={labelsRef}
                      >
                        {children}
                      </FloatingList>
                    </MenuList>
                  </Motion>
                </div>
              </FloatingFocusManager>
            </Portal>
          </MenuItemContextProvider>
        )}
      </FloatingNode>
    );
  },
);

MenuLeaf.theme = menuLeafTheme;
MenuLeaf.displayName = `@sixui/${COMPONENT_NAME}`;
