import { useRef } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  offset,
  shift,
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
  type OpenChangeReason,
} from '@floating-ui/react';

import type { IPopoverBaseProps } from './PopoverBase.types';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { usePopoverCursor } from '~/hooks/usePopoverCursor';
import { useStyles } from '~/hooks/useStyles';
import { isObject } from '~/helpers/isObject';
import { commonStyles } from '~/helpers/commonStyles';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { FloatingTransition } from '../FloatingTransition';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { popoverBaseStyles } from './PopoverBase.styles';
import { PopoverBaseContextProvider } from './PopoverBase.context';

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
    transitionOrigin = 'cursor',
    isOpen: isOpenProp,
    defaultIsOpen,
    cursor: cursorType = false,
    onOpenChange,
    forwardProps,
    disabled,
    role: roleProp,
    openOnHover,
    openOnFocus,
    openOnClick,
    closeOnClickOutside = true,
    trapFocus,
    matchTargetWidth,
    withScrim,
    slotProps,
    middlewares: middlewaresProp,
    additionalMiddlewares,
    floatingStrategy = 'absolute',
    closeOnEscape = true,
    reference = 'trigger',
    closeOnFocusOut = true,
    ...other
  } = props;

  const defaultMiddlewares = {
    shift: true,
    flip: true,
    size: true,
  };
  const middlewares = {
    ...defaultMiddlewares,
    ...middlewaresProp,
  };

  const { getStyles, globalStyles } = useStyles({
    name: 'PopoverBase',
    styles: [popoverBaseStyles, styles],
  });

  const [isOpen, setIsOpen] = useControlledValue({
    controlled: isOpenProp,
    default: defaultIsOpen || false,
    name: 'PopoverBase',
    onValueChange: onOpenChange,
  });
  const arrowRef = useRef(null);
  const cursor = usePopoverCursor({ type: cursorType });
  const floating = useFloating({
    strategy: floatingStrategy,
    placement,
    open: isOpen,
    onOpenChange: (
      newIsOpen: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => {
      setIsOpen(newIsOpen);

      if (isOpen !== newIsOpen) {
        onOpenChange?.(newIsOpen, event, reason);
      }
    },
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
    id: openOnHover ? undefined : '__persistent',
  });
  const hover = useHover(floating.context, {
    move: false,
    delay: delayGroup.delay,
    enabled: !!openOnHover && !disabled,
  });
  const click = useClick(floating.context, {
    enabled: !!openOnClick && !disabled,
  });
  const focus = useFocus(floating.context, {
    enabled: !!openOnFocus && !disabled,
  });
  const dismiss = useDismiss(floating.context, {
    outsidePress: !!closeOnClickOutside,
    escapeKey: closeOnEscape,
  });
  const role = useRole(floating.context, { role: roleProp });
  const interactions = useInteractions([hover, focus, click, dismiss, role]);
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
        isOpen,
        placement: floating.placement,
        getProps: interactions.getReferenceProps,
        setRef: floating.refs.setReference,
        close: () => setIsOpen(false),
      })
    : children;

  const floatingHandleRef = useMergeRefs([
    floating.refs.setFloating,
    forwardedRef,
  ]);

  return (
    <PopoverBaseContextProvider
      value={{
        isOpen,
        placement: floating.placement,
        getTriggerProps: interactions.getReferenceProps,
        setTriggerRef: floating.refs.setReference,
        close: () => setIsOpen(false),
      }}
    >
      {triggerElement}

      {transitionStatus.isMounted ? (
        <Portal root={root}>
          {withScrim ? (
            <Scrim
              floatingContext={floating.context}
              lockScroll
              {...slotProps?.scrim}
            />
          ) : null}
          <FloatingFocusManager
            disabled={!trapFocus}
            context={floating.context}
            modal
            closeOnFocusOut={closeOnFocusOut}
            {...slotProps?.floatingFocusManager}
          >
            <div
              {...getStyles(
                globalStyles,
                'host',
                `host$${floatingStrategy}`,
                reference === 'trigger' &&
                  commonStyles.position(floating.x, floating.y),
                sx,
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
                  reference === 'trigger' ? 'enterExit' : 'enterExitOffScreen'
                }
                {...slotProps?.floatingTransition}
              >
                {isFunction(contentRenderer) ? (
                  contentRenderer({
                    isOpen,
                    placement: floating.placement,
                    close: () => setIsOpen(false),
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
          </FloatingFocusManager>
        </Portal>
      ) : null}
    </PopoverBaseContextProvider>
  );
});
