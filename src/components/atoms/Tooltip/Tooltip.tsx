import { forwardRef, useRef } from 'react';
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
  type Placement,
} from '@floating-ui/react';

import { useControlledValue } from '@/hooks/useControlledValue';
import { Portal } from '@/components/utils/Portal';
import { PlainTooltipContent } from '@/components/atoms/PlainTooltipContent';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import {
  placementToArrowTip,
  type IPlacementToArrowTipProps,
} from '@/helpers/placementToArrowTip';

const TOOLTIP_ARROW_WIDTH = 14;
const TOOLTIP_ARROW_HEIGHT = 7;

export type ITooltipRenderProps = {
  isOpen: boolean;
  placement: Placement;
};

export type ITooltipProps = {
  content: React.ReactNode;
  children?:
    | React.ReactElement
    | ((props: ITooltipRenderProps) => React.ReactElement);
  placement?: Placement;
  isOpen?: boolean;
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
  transformOrigin: (
    placement: Placement,
    props: IPlacementToArrowTipProps,
  ) => ({
    transformOrigin: placementToArrowTip(placement, props),
  }),
});

export const Tooltip = forwardRef<HTMLDivElement, ITooltipProps>(
  function Tooltip(props, forwardedRef) {
    const {
      content,
      children,
      placement = 'top',
      isOpen: isOpenProp,
      ...other
    } = props;
    const [isOpen, setIsOpen] = useControlledValue({
      controlled: isOpenProp,
      default: false,
      name: 'Tooltip',
    });
    const arrowRef = useRef(null);
    const floating = useFloating({
      placement,
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4 + TOOLTIP_ARROW_HEIGHT),
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
    const delayGroup = useDelayGroup(floating.context);
    const arrowX = floating.middlewareData.arrow?.x ?? 0;
    const arrowY = floating.middlewareData.arrow?.y ?? 0;
    const transformX = arrowX + TOOLTIP_ARROW_WIDTH / 2;
    const transformY = arrowY + TOOLTIP_ARROW_HEIGHT;
    const hover = useHover(floating.context, {
      move: false,
      delay: delayGroup.delay,
    });
    const focus = useFocus(floating.context);
    const dismiss = useDismiss(floating.context);
    const role = useRole(floating.context, { role: 'tooltip' });
    const interactions = useInteractions([hover, focus, dismiss, role]);
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 150, // motionVars.duration$short3
    });

    const triggerElement = isFunction(children)
      ? children({
          isOpen,
          placement: floating.placement,
        })
      : children;

    const renderArrow = (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ): React.ReactNode => (
      <FloatingArrow
        {...userProps}
        ref={arrowRef}
        context={floating.context}
        width={TOOLTIP_ARROW_WIDTH}
        height={TOOLTIP_ARROW_HEIGHT}
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
              {...stylex.props(styles.host)}
              {...interactions.getFloatingProps()}
              ref={floating.refs.setFloating}
              style={floating.floatingStyles}
            >
              <div
                {...stylex.props(
                  styles.container,
                  styles[`transition$${transitionStatus.status}`],
                  styles.transformOrigin(floating.placement, {
                    transformX,
                    transformY,
                    arrowWidth: TOOLTIP_ARROW_WIDTH,
                    arrowHeight: TOOLTIP_ARROW_HEIGHT,
                  }),
                )}
              >
                <PlainTooltipContent
                  {...other}
                  ref={forwardedRef}
                  renderArrow={renderArrow}
                >
                  {content}
                </PlainTooltipContent>
              </div>
            </div>
          </Portal>
        ) : null}
      </>
    );
  },
);
