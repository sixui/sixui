import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
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
  type Placement,
} from '@floating-ui/react';

import type {
  IRendererWithForwardedHtmlProps,
  IForwardableHtmlProps,
} from '@/helpers/react/forwardableHtmlPropsTypes';
import { useControlledValue } from '@/hooks/useControlledValue';
import { Portal } from '@/components/utils/Portal';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import {
  useTooltipCursor,
  type ITooltipCursorType,
} from '@/hooks/useTooltipCursor';

export type ITooltipBaseContentRendererProps = {
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
  onClose: (event?: React.MouseEvent) => void;
};

export type ITooltipBaseChildrenRendererProps = {
  isOpen: boolean;
  placement: Placement;
};

export type ITooltipBaseProps<TForwardedProps extends object = object> =
  IForwardableHtmlProps & {
    contentRenderer: IRendererWithForwardedHtmlProps<
      ITooltipBaseContentRendererProps,
      TForwardedProps
    >;
    children?:
      | React.ReactElement
      | ((props: ITooltipBaseChildrenRendererProps) => React.ReactElement);
    placement?: Placement;
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    cursor?: ITooltipCursorType;
    onOpenChange?: (
      isOpen: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;
    persistent?: boolean;
  };

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
  },
  container: {
    transformOrigin: 'center',
  },
  transition$unmounted: {},
  transition$initial: {
    transform: 'scale(0)',
    opacity: 0,
  },
  transition$open: {
    transform: 'scale(1)',
    opacity: 1,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionVars.duration$long1,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    transform: 'scale(0)',
    opacity: 0,
    transitionProperty: 'transform, opacity',
    transitionDuration: motionVars.duration$short1,
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
  transformOrigin: (transformOrigin: string) => ({
    transformOrigin,
  }),
});

export const TooltipBase = <TForwardedProps extends object = object>(
  props: ITooltipBaseProps<TForwardedProps>,
): React.ReactNode => {
  const {
    contentRenderer,
    children,
    placement = 'top',
    isOpen: isOpenProp,
    defaultIsOpen,
    cursor: cursorType = false,
    onOpenChange,
    forwardHtmlProps,
    persistent,
    ...other
  } = props;
  const [isOpen, setIsOpen] = useControlledValue({
    controlled: isOpenProp,
    default: defaultIsOpen ?? false,
    name: 'Tooltip',
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
    enabled: !persistent,
  });
  const focus = useFocus(floating.context, {
    enabled: !persistent,
  });
  const dismiss = useDismiss(floating.context, {
    enabled: !persistent,
  });
  const role = useRole(floating.context, { role: 'tooltip' });
  const interactions = useInteractions([hover, focus, dismiss, role]);
  const transitionStatus = useTransitionStatus(floating.context, {
    duration: 150, // motionVars.duration$short3
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
            {...stylex.props(styles.host)}
            {...interactions.getFloatingProps()}
            ref={floating.refs.setFloating}
            style={floating.floatingStyles}
          >
            <div
              {...stylex.props(
                styles.container,
                styles[`transition$${transitionStatus.status}`],
                cursor
                  ? styles.transformOrigin(cursor.getTransformOrigin(floating))
                  : undefined,
              )}
              {...(forwardHtmlProps ? undefined : other)}
            >
              {isFunction(contentRenderer)
                ? contentRenderer({
                    forwardedHtmlProps: forwardHtmlProps
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
