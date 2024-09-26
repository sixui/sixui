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
  useMergeRefs,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';
import { mergeProps } from 'react-aria';
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
import { usePopoverCursor } from '~/hooks/usePopoverCursor';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { objectFromPlacement } from '~/utils/objectFromPlacement';
import { stringFromPlacement } from '~/utils/stringFromPlacement';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Motion } from '../Motion';
import { Portal } from '../Portal';
import { Scrim } from '../Scrim';
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
      target,
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
      withScrim,
      slotProps,
      middlewares: middlewaresProp,
      additionalMiddlewares,
      additionalInteractions,
      positioned,
      openEvents: openEventsProp,
      closeEvents: closeEventsProp,
      lockScroll,
      modal,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const openEvents = {
      ...defaultOpenEvents,
      ...openEventsProp,
    };

    const closeEvents = {
      ...defaultCloseEvents,
      ...closeEventsProp,
    };

    const middlewares = {
      ...defaultMiddlewares,
      ...middlewaresProp,
    };
    const transitionOrigin = cursorType ? 'custom' : 'corner';

    const [isShaking, setIsShaking] = useState(false);
    const shakingTimeout = useRef<NodeJS.Timeout>();
    const { getStyles } = useComponentTheme<IPopoverBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: popoverBaseTheme,
      variant,
      modifiers: {
        shake: isShaking,
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
      outsidePress: !modal && !!closeEvents.clickOutside,
      escapeKey: !modal && closeEvents.escapeKey,
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
          getProps: (props) =>
            mergeProps(interactions.getReferenceProps(), props),
          setRef: floating.refs.setReference,
          close: () => setOpened(false),
        })
      : children;

    const floatingHandleRef = useMergeRefs([
      floating.refs.setFloating,
      forwardedRef,
    ]);

    const finalPlacement = positioned
      ? objectFromPlacement(floating.placement)
      : placement;

    return (
      <>
        {triggerElement}

        {transitionStatus.isMounted && (
          <Portal target={target} {...slotProps?.portal}>
            <div {...getStyles('root')} {...(forwardProps ? undefined : other)}>
              {withScrim && (
                <Motion
                  status={transitionStatus.status}
                  pattern="fade"
                  as={Scrim}
                  onClick={() => {
                    if (modal) {
                      setIsShaking(true);
                      clearTimeout(shakingTimeout.current);
                      shakingTimeout.current = setTimeout(
                        () => setIsShaking(false),
                        300,
                      );
                    }
                  }}
                  blurred={modal}
                  {...slotProps?.scrimMotion}
                  {...slotProps?.scrim}
                />
              )}

              <FloatingFocusManager
                disabled={!trapFocus}
                context={floating.context}
                modal={!!trapFocus}
                closeOnFocusOut={closeEvents.focusOut}
                {...slotProps?.floatingFocusManager}
              >
                <Motion
                  {...getStyles('floating', {
                    style: positioned
                      ? { left: floating.x, top: floating.y }
                      : undefined,
                  })}
                  {...interactions.getFloatingProps()}
                  ref={floatingHandleRef}
                  status={transitionStatus.status}
                  placement={finalPlacement}
                  origin={transitionOrigin}
                  customTransformOrigin={cursor.getTransformOrigin(floating)}
                  pattern={positioned ? 'enterExit' : 'enterExitOffScreen'}
                  {...slotProps?.floatingMotion}
                >
                  <RemoveScroll
                    enabled={!!lockScroll}
                    {...slotProps?.removeScroll}
                  >
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
              </FloatingFocusManager>
            </div>
          </Portal>
        )}
      </>
    );
  },
);
