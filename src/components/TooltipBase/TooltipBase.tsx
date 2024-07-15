import { useMemo, useRef } from 'react';
import { isFunction } from 'lodash';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  shift,
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

import type { ITooltipBaseProps } from './TooltipBase.types';
import { useControlledValue } from '@/hooks/useControlledValue';
import { Portal } from '@/components/Portal';
import { useTooltipCursor } from '@/hooks/useTooltipCursor';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { tooltipBaseStyles } from './TooltipBase.styles';
import { commonStyles } from '@/helpers/commonStyles';

export const TooltipBase = <TForwardedProps extends object = object>(
  props: ITooltipBaseProps<TForwardedProps>,
): React.ReactNode => {
  const {
    styles,
    sx,
    contentRenderer,
    children,
    placement = 'top',
    isOpen: isOpenProp,
    defaultIsOpen,
    cursor: cursorType = false,
    onOpenChange,
    forwardProps,
    persistent,
    disabled,
    ...other
  } = props;

  const { overridenStyles } = useComponentTheme('TooltipBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(tooltipBaseStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const [isOpen, setIsOpen] = useControlledValue({
    controlled: isOpenProp,
    default: defaultIsOpen ?? false,
    name: 'TooltipBase',
  });
  const arrowRef = useRef(null);
  const cursor = useTooltipCursor({ type: cursorType });
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
      offset(4 + (cursor?.height ?? 0)),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
      }),
    ],
  });
  const delayGroup = useDelayGroup(floating.context, {
    id: persistent ? '__persistent' : undefined,
  });
  const hover = useHover(floating.context, {
    move: false,
    delay: delayGroup.delay,
    enabled: !persistent && !disabled,
  });
  const focus = useFocus(floating.context, {
    enabled: !persistent && !disabled,
  });
  const dismiss = useDismiss(floating.context, {
    enabled: !persistent && !disabled,
  });
  const role = useRole(floating.context, { role: 'tooltip' });
  const interactions = useInteractions([hover, focus, dismiss, role]);
  const transitionStatus = useTransitionStatus(floating.context, {
    duration: 150, // motionTokens.duration$short3
  });

  const triggerElement = isFunction(children)
    ? children({
        isOpen: !!isOpen,
        placement: floating.placement,
      })
    : children;

  const renderCursor = cursor
    ? (userProps?: React.HTMLAttributes<SVGSVGElement>): React.ReactNode => (
        <FloatingArrow
          {...userProps}
          ref={arrowRef}
          context={floating.context}
          width={cursor.width}
          height={cursor.height}
          d={cursor.svgPath}
        />
      )
    : undefined;

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
            {...sxf(overridenStyles, 'host', sx)}
            {...interactions.getFloatingProps()}
            ref={floating.refs.setFloating}
            style={floating.floatingStyles}
          >
            <div
              {...sxf(
                'container',
                `transition$${transitionStatus.status}`,
                cursor
                  ? commonStyles.transformOrigin(
                      cursor.getTransformOrigin(floating),
                    )
                  : undefined,
              )}
              {...(forwardProps ? undefined : other)}
            >
              {isFunction(contentRenderer)
                ? contentRenderer({
                    forwardedProps: forwardProps
                      ? (other as TForwardedProps)
                      : undefined,
                    renderCursor,
                    onClose: (event) => {
                      setIsOpen(false);
                      if (isOpenProp !== undefined) {
                        onOpenChange?.(false, event?.nativeEvent, 'click');
                      }
                    },
                  })
                : contentRenderer}
            </div>
          </div>
        </Portal>
      ) : null}
    </>
  );
};
