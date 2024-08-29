import { forwardRef } from 'react';
import type { TransitionStatus } from 'react-transition-group';

import type {
  IFloatingTransitionProps,
  IFloatingTransitionStatus,
} from './FloatingTransition.types';
import { commonStyles } from '~/helpers/commonStyles';
import { useStyles } from '~/hooks/useStyles';
import { floatingTransitionStyles } from './FloatingTransition.styles';
import { getPlacementTransformOrigin } from './getPlacementTransformOrigin';
import { getPlacementSideTransformOrigin } from './getPlacementSideTransformOrigin';
import { Base } from '../Base';

const resolveStatus = (
  status: TransitionStatus | IFloatingTransitionStatus,
): IFloatingTransitionStatus => {
  switch (status) {
    case 'entering':
      return 'open';
    case 'entered':
      return 'open';
    case 'exiting':
      return 'close';
    case 'exited':
      return 'close';
    case 'unmounted':
      return 'unmounted';
  }

  return status;
};

export const FloatingTransition = forwardRef<
  HTMLDivElement,
  IFloatingTransitionProps
>(function FloatingTransition(props, forwardedRef) {
  const {
    styles,
    sx,
    children,
    placement,
    status,
    origin = 'center',
    cursorTransformOrigin,
    pattern = 'enterExit',
    orientation: orientationProp,
    disabled,
    ...other
  } = props;

  const { combineStyles, globalStyles } = useStyles({
    componentName: 'FloatingTransition',
    styles: [floatingTransitionStyles, styles],
  });

  const orientation =
    orientationProp ??
    (['top', 'bottom'].includes(placement)
      ? 'vertical'
      : ['left', 'right'].includes(placement)
        ? 'horizontal'
        : undefined);
  const resolvedStatus = resolveStatus(status);

  return (
    <Base
      {...other}
      data-pattern={`${pattern}-${placement}`}
      sx={[
        globalStyles,
        !disabled &&
          combineStyles(
            `transition$${resolvedStatus}`,
            !!orientation && `transition$${resolvedStatus}$${orientation}`,
          ),
        !disabled &&
          commonStyles.transformOrigin(
            origin === 'corner'
              ? getPlacementTransformOrigin(placement)
              : origin === 'edge'
                ? getPlacementSideTransformOrigin(placement)
                : origin === 'cursor' && cursorTransformOrigin
                  ? cursorTransformOrigin
                  : 'center',
          ),
        sx,
      ]}
      ref={forwardedRef}
    >
      {children}
    </Base>
  );
});
