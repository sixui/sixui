import { useRef } from 'react';
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
import stylex from '@stylexjs/stylex';

import type {
  IPopoverBaseProps,
  IPopoverCloseEvents,
  IPopoverMiddlewares,
  IPopoverOpenEvents,
} from './PopoverBase.types';
import { commonStyles } from '~/helpers/commonStyles';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { isFunction } from '~/helpers/isFunction';
import { isObject } from '~/helpers/isObject';
import { useControlledValue } from '~/hooks/useControlledValue';
import { usePopoverCursor } from '~/hooks/usePopoverCursor';
import { useStyles } from '~/hooks/useStyles';
import { FloatingTransition } from '../FloatingTransition';
import { Portal } from '../Portal';
import { Scrim } from '../Scrim';
import { popoverBaseStyles } from './PopoverBase.styles';
import { PreventAutoFocus } from './PreventAutoFocus';

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
  shift: true,
  flip: true,
  size: true,
};

export const PopoverBase = fixedForwardRef(function PopoverBase<
  TForwardedProps extends object = object,
>(
  props: IPopoverBaseProps<TForwardedProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const {
    styles,
    sx,
    root,
    contentRenderer,
    children,
    placement = 'top',
    transitionOrientation,
    transitionOrigin: transitionOriginProp,
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
    floatingStrategy = 'absolute',
    openEvents: openEventsProp,
    closeEvents: closeEventsProp,
    preventAutoFocus,
    ...other
  } = props;

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
  const transitionOrigin =
    transitionOriginProp ?? (cursorType ? 'cursor' : 'corner');

  const { getStyles, globalStyles } = useStyles({
    componentName: 'PopoverBase',
    styles: [popoverBaseStyles, styles],
  });

  const [opened, setOpened] = useControlledValue({
    controlled: openedProp,
    default: defaultOpened || false,
    name: 'PopoverBase',
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
    placement,
    open: opened,
    onOpenChange: setOpened,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(cursorType ? 4 + cursor.size.height : undefined),
      middlewares.flip &&
        flip({
          crossAxis: placement.includes('-'),
          fallbackAxisSideDirection: 'start',
          padding: 5,
          ...(isObject(middlewares.flip) ? middlewares.flip : undefined),
        }),
      middlewares.shift &&
        shift({
          padding: 8,
          ...(isObject(middlewares.shift) ? middlewares.shift : undefined),
        }),
      !!cursorType &&
        arrow({
          element: arrowRef,
        }),
      middlewares.size &&
        size({
          apply: matchTargetWidth
            ? ({ rects, elements }) => {
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                });
              }
            : undefined,
          ...(isObject(middlewares.size) ? middlewares.size : undefined),
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
    outsidePress: !!closeEvents.clickOutside,
    escapeKey: closeEvents.escapeKey,
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
        placement: floating.placement,
        getProps: interactions.getReferenceProps,
        setRef: floating.refs.setReference,
        close: () => setOpened(false),
      })
    : children;

  const floatingHandleRef = useMergeRefs([
    floating.refs.setFloating,
    forwardedRef,
  ]);

  return (
    <>
      {triggerElement}

      {transitionStatus.isMounted ? (
        <Portal root={root}>
          <FloatingFocusManager
            disabled={!trapFocus}
            context={floating.context}
            modal
            closeOnFocusOut={closeEvents.focusOut}
            {...slotProps?.floatingFocusManager}
          >
            <div {...stylex.props(globalStyles, sx)}>
              {withScrim ? (
                <Scrim
                  floatingContext={floating.context}
                  lockScroll
                  {...slotProps?.scrim}
                />
              ) : null}

              <div
                {...getStyles(
                  'floating',
                  floatingStrategy && `floating$${floatingStrategy}`,
                  floatingStrategy &&
                    commonStyles.position(floating.x, floating.y),
                )}
                ref={floatingHandleRef}
                {...interactions.getFloatingProps()}
              >
                <FloatingTransition
                  placement={floating.placement}
                  status={transitionStatus.status}
                  origin={transitionOrigin}
                  cursorTransformOrigin={cursor.getTransformOrigin(floating)}
                  orientation={transitionOrientation}
                  pattern={
                    floatingStrategy ? 'enterExit' : 'enterExitOffScreen'
                  }
                  {...slotProps?.floatingTransition}
                >
                  {preventAutoFocus ? <PreventAutoFocus /> : null}
                  {isFunction(contentRenderer) ? (
                    contentRenderer({
                      placement: floating.placement,
                      close: () => setOpened(false),
                      forwardedProps: forwardProps
                        ? (other as TForwardedProps)
                        : undefined,
                      renderCursor,
                    })
                  ) : (
                    <>
                      {renderCursor()}
                      {contentRenderer}
                    </>
                  )}
                </FloatingTransition>
              </div>
            </div>
          </FloatingFocusManager>
        </Portal>
      ) : null}
    </>
  );
});
