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
  useRole,
  useTransitionStatus,
  type OpenChangeReason,
} from '@floating-ui/react';

import type { IPopoverBaseProps } from './PopoverBase.types';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { usePopoverCursor } from '~/hooks/usePopoverCursor';
import { useStyles } from '~/hooks/useStyles';
import { FloatingTransition } from '../FloatingTransition';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { popoverBaseStyles } from './PopoverBase.styles';
import { PopoverBaseContextProvider } from './PopoverBase.context';

export const PopoverBase = <TForwardedProps extends object = object>(
  props: IPopoverBaseProps<TForwardedProps>,
): React.ReactNode => {
  const {
    styles,
    sx,
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
    nonDismissable,
    trapFocus,
    matchTargetWidth,
    middleware,
    scrim,
    ...other
  } = props;

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
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
      }),
      matchTargetWidth
        ? size({
            apply: ({ rects, elements }) => {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          })
        : undefined,
      ...(middleware ?? []),
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
    enabled: !nonDismissable && !disabled,
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

  const renderPopover = (): JSX.Element => (
    <div
      {...getStyles(globalStyles, 'host', sx)}
      {...interactions.getFloatingProps()}
      ref={floating.refs.setFloating}
      style={floating.floatingStyles}
    >
      <FloatingFocusManager
        context={floating.context}
        modal={false}
        initialFocus={-1}
        disabled={!trapFocus}
      >
        <FloatingTransition
          placement={floating.placement}
          status={transitionStatus.status}
          origin={transitionOrigin}
          cursorTransformOrigin={cursor.getTransformOrigin(floating)}
          orientation={transitionOrientation}
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
              contentRenderer
            </>
          )}
        </FloatingTransition>
      </FloatingFocusManager>
    </div>
  );

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
        <Portal>
          {scrim ? (
            <Scrim floatingContext={floating.context} lockScroll />
          ) : null}
          {renderPopover()}
        </Portal>
      ) : null}
    </PopoverBaseContextProvider>
  );
};
