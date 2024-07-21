import { useMemo, useRef } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
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
import { isFunction } from '@/helpers/isFunction';
import { useControlledValue } from '@/hooks/useControlledValue';
import { Portal } from '@/components/Portal';
import { usePopoverCursor } from '@/hooks/usePopoverCursor';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { popoverBaseStyles } from './PopoverBase.styles';
import { FloatingTransition } from '@/components/FloatingTransition';

export const PopoverBase = <TForwardedProps extends object = object>(
  props: IPopoverBaseProps<TForwardedProps>,
): React.ReactNode => {
  const {
    styles,
    sx,
    contentRenderer,
    children,
    placement = 'top',
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
    matchTargetWidth,
    ...other
  } = props;

  const componentTheme = useComponentTheme('PopoverBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(popoverBaseStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const [isOpen, setIsOpen] = useControlledValue({
    controlled: isOpenProp,
    default: defaultIsOpen ?? false,
    name: 'PopoverBase',
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

  const triggerElement = isFunction(children)
    ? children({
        isOpen: !!isOpen,
        placement: floating.placement,
      })
    : children;

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

  return (
    <>
      <span
        {...interactions.getReferenceProps()}
        ref={floating.refs.setReference}
      >
        {triggerElement}
      </span>

      {transitionStatus.isMounted ? (
        <Portal>
          <div
            {...sxf(componentTheme.overridenStyles, 'host', sx)}
            {...interactions.getFloatingProps()}
            ref={floating.refs.setFloating}
            style={floating.floatingStyles}
          >
            <FloatingTransition
              placement={floating.placement}
              status={transitionStatus.status}
              origin={transitionOrigin}
              cursorTransformOrigin={cursor.getTransformOrigin(floating)}
            >
              {isFunction(contentRenderer) ? (
                contentRenderer({
                  forwardedProps: forwardProps
                    ? (other as TForwardedProps)
                    : undefined,
                  renderCursor,
                  close: (event) => {
                    setIsOpen(false);
                    if (isOpenProp !== undefined) {
                      onOpenChange?.(false, event?.nativeEvent, 'click');
                    }
                  },
                })
              ) : (
                <>
                  {renderCursor()}
                  contentRenderer
                </>
              )}
            </FloatingTransition>
          </div>
        </Portal>
      ) : null}
    </>
  );
};
