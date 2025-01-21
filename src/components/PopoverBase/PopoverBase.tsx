import { useRef, useState } from 'react';
import { arrow, flip, offset, shift } from '@floating-ui/core';
import {
  autoUpdate,
  FloatingArrow,
  FloatingFocusManager,
  size,
  useClick,
  useDelayGroup,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';
import { RemoveScroll } from 'react-remove-scroll';

import type { IPopoverBaseThemeFactory } from './PopoverBase.css';
import type {
  IPopoverBaseFactory,
  IPopoverCloseEvents,
  IPopoverMiddlewares,
  IPopoverOpenEvents,
} from './PopoverBase.types';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { usePopoverCursor } from '~/hooks/usePopoverCursor';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { objectFromPlacement } from '~/utils/objectFromPlacement';
import { stringFromPlacement } from '~/utils/stringFromPlacement';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Motion } from '../Motion';
import { Portal } from '../Portal';
import { Scrim } from '../Scrim';
import { PreventAutoFocus } from './PreventAutoFocus';
import { popoverBaseTheme } from './PopoverBase.css';

const defaultOpenEvents: IPopoverOpenEvents = {
  hover: false,
  focus: false,
  click: false,
  touch: false,
};

const defaultCloseEvents: IPopoverCloseEvents = {
  clickOutside: true,
  focusOut: true,
  escapeKey: true,
};

const defaultMiddlewares: IPopoverMiddlewares = {
  offset: true,
  shift: true,
  flip: true,
  size: true,
};

const COMPONENT_NAME = 'PopoverBase';

export const PopoverBase = componentFactory<IPopoverBaseFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      contentRenderer,
      children,
      placement = { side: 'top' },
      opened: openedProp,
      defaultOpened,
      cursor: cursorType = false,
      onOpen,
      onClose,
      forwardProps,
      disabled,
      role: roleProp,
      trapFocus,
      matchTargetWidth,
      withScrim: withScrimProp,
      floatingFocusManagerProps,
      scrimMotionProps,
      floatingMotionProps,
      scrimProps,
      removeScrollProps,
      portalProps,
      middlewares: middlewaresProp,
      additionalMiddlewares,
      additionalInteractions,
      positioned,
      openEvents: openEventsProp,
      closeEvents: closeEventsProp,
      modal: modalProp,
      jail,
      keepMounted,
      popoverProps,
      preventAutoFocus,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const modal = modalProp || jail;
    const withScrim = withScrimProp ?? modal;
    const openEvents =
      openEventsProp !== false
        ? {
            ...defaultOpenEvents,
            ...openEventsProp,
          }
        : {};

    const closeEvents =
      closeEventsProp === false || jail
        ? undefined
        : modal
          ? {
              ...defaultCloseEvents,
              ...closeEventsProp,
            }
          : {
              escapeKey: true,
              ...closeEventsProp,
            };

    const middlewares =
      middlewaresProp !== false
        ? {
            ...defaultMiddlewares,
            ...middlewaresProp,
          }
        : {};
    const transitionOrigin = cursorType ? 'custom' : 'corner';

    const [isShaking, setIsShaking] = useState(false);
    const shakingTimeout = useRef<NodeJS.Timeout>(undefined);
    const { getStyles } = useComponentTheme<IPopoverBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: popoverBaseTheme,
      modifiers: {
        shake: isShaking,
        positioned,
        modal,
      },
    });

    const [opened, setOpened] = useControlledValue({
      controlled: openedProp,
      default: defaultOpened || false,
      name: COMPONENT_NAME,
      onValueChange: (newOpened) => {
        if (newOpened !== opened) {
          if (newOpened) {
            onOpen?.();
          } else {
            onClose?.();
          }
        }
      },
    });

    const arrowRef = useRef(null);
    const cursor = usePopoverCursor({ type: cursorType });
    const floating = useFloating({
      placement: stringFromPlacement(placement),
      open: opened,
      onOpenChange: setOpened,
      whileElementsMounted: autoUpdate,
      middleware: [
        !!middlewares.offset &&
          offset({
            // For the floating element to stay open when the mouse is hover,
            // the mouse leave event must be triggered on the reference element,
            // and the mouse enter event must be triggered on the floating
            // element. To do so, we must ensure that the floating element and
            // the reference element have a minimum distance between them.
            mainAxis: cursorType ? 6 + cursor.size.height : 8,
            ...(typeof middlewares.offset === 'boolean'
              ? undefined
              : typeof middlewares.offset === 'number'
                ? { mainAxis: middlewares.offset }
                : middlewares.offset),
          }),
        !!middlewares.flip &&
          flip({
            crossAxis: !!placement.alignment,
            fallbackAxisSideDirection: 'start',
            padding: 4,
            ...(typeof middlewares.flip === 'boolean'
              ? undefined
              : middlewares.flip),
          }),
        !!middlewares.shift &&
          shift({
            padding: 8,
            ...(typeof middlewares.shift === 'boolean'
              ? undefined
              : middlewares.shift),
          }),
        (!!cursorType || !!middlewares.arrow) &&
          arrow({
            element: arrowRef.current,
            ...(typeof middlewares.arrow === 'boolean'
              ? undefined
              : middlewares.arrow),
          }),
        !!middlewares.size &&
          size({
            apply: matchTargetWidth
              ? ({ rects, elements }) => {
                  Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                  });
                }
              : undefined,
            ...(typeof middlewares.size === 'boolean'
              ? undefined
              : middlewares.size),
          }),
        ...(additionalMiddlewares ?? []),
      ],
    });
    const delayGroup = useDelayGroup(floating.context, {
      id: openEvents.hover ? undefined : '__persistent',
    });
    const hover = useHover(floating.context, {
      enabled: !!children && !!openEvents.hover && !disabled,
      move: false,
      delay: delayGroup.delay,
      mouseOnly: !openEvents.touch,
    });
    const click = useClick(floating.context, {
      enabled: !!children && !!openEvents.click && !disabled,
    });
    const focus = useFocus(floating.context, {
      enabled: !!children && !!openEvents.focus && !disabled,
      visibleOnly: true,
    });
    const dismiss = useDismiss(floating.context, {
      outsidePress: !!closeEvents?.clickOutside,
      escapeKey: !!closeEvents?.escapeKey,
    });
    const role = useRole(floating.context, { role: roleProp });
    const interactions = useInteractions([
      hover,
      focus,
      click,
      dismiss,
      role,
      ...(additionalInteractions ?? []),
    ]);
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 150, // motionTokens.duration$short3
    });

    const renderCursor = (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ): React.ReactNode => (
      <FloatingArrow
        {...userProps}
        ref={arrowRef}
        context={floating.context}
        width={cursor.size.width}
        height={cursor.size.height}
        d={cursor.svgPath}
      />
    );

    const triggerElement = isFunction(children)
      ? children({
          opened,
          placement: objectFromPlacement(floating.placement),
          getProps: (props) => interactions.getReferenceProps(props),
          setRef: floating.refs.setReference,
          open: () => setOpened(true),
          close: () => setOpened(false),
        })
      : children;

    const floatingHandleRef = useMergeRefs(
      floating.refs.setFloating,
      forwardedRef,
    );

    const finalPlacement = positioned
      ? objectFromPlacement(floating.placement)
      : placement;

    return (
      <>
        {triggerElement}

        {(transitionStatus.isMounted || keepMounted) && (
          <Portal {...portalProps}>
            <FloatingFocusManager
              context={floating.context}
              modal={trapFocus !== undefined ? !!trapFocus : modal}
              closeOnFocusOut={closeEvents?.focusOut}
              disabled={trapFocus !== undefined ? !trapFocus : !modal}
              {...floatingFocusManagerProps}
            >
              <div
                {...getStyles('root')}
                {...(forwardProps ? undefined : other)}
              >
                {withScrim && (
                  <Motion
                    status={transitionStatus.status}
                    pattern="fade"
                    as={Scrim}
                    blurred={jail}
                    {...mergeProps(
                      {
                        onClick: () => {
                          if (jail) {
                            setIsShaking(true);
                            clearTimeout(shakingTimeout.current);
                            shakingTimeout.current = setTimeout(
                              () => setIsShaking(false),
                              300,
                            );
                          }
                        },
                      },
                      scrimMotionProps,
                      scrimProps,
                    )}
                  />
                )}
                <Motion
                  status={transitionStatus.status}
                  placement={finalPlacement}
                  origin={transitionOrigin}
                  customTransformOrigin={cursor.getTransformOrigin(floating)}
                  pattern={positioned ? 'enterExit' : 'enterExitOffScreen'}
                  {...mergeProps(
                    { ref: floatingHandleRef },
                    interactions.getFloatingProps(),
                    getStyles('popover', {
                      style: positioned
                        ? {
                            position: 'absolute',
                            left: floating.x,
                            top: floating.y,
                          }
                        : undefined,
                    }),
                    popoverProps,
                    floatingMotionProps,
                  )}
                >
                  <RemoveScroll
                    enabled={withScrim}
                    {...mergeProps(
                      getStyles('removeScroll'),
                      removeScrollProps,
                    )}
                  >
                    {preventAutoFocus && <PreventAutoFocus />}
                    {isFunction(contentRenderer) ? (
                      contentRenderer({
                        parentProps: props,
                        placement: finalPlacement,
                        close: () => setOpened(false),
                        forwardedProps: forwardProps ? other : undefined,
                        renderCursor: cursorType ? renderCursor : undefined,
                      })
                    ) : (
                      <>
                        {cursorType && renderCursor()}
                        {contentRenderer}
                      </>
                    )}
                  </RemoveScroll>
                </Motion>
              </div>
            </FloatingFocusManager>
          </Portal>
        )}
      </>
    );
  },
);
