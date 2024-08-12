import { forwardRef } from 'react';

import type { IFloatingTransitionProps } from './FloatingTransition.types';
import { commonStyles } from '~/helpers/commonStyles';
import { useStyles } from '~/hooks/useStyles';
import { floatingTransitionStyles } from './FloatingTransition.styles';
import { getPlacementTransformOrigin } from './getPlacementTransformOrigin';
import { getPlacementSideTransformOrigin } from './getPlacementSideTransformOrigin';
import { Base } from '../Base';

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
    name: 'FloatingTransition',
    styles: [floatingTransitionStyles, styles],
  });

  const orientation =
    orientationProp ??
    (['top', 'bottom'].includes(placement)
      ? 'vertical'
      : ['left', 'right'].includes(placement)
        ? 'horizontal'
        : undefined);

  return (
    <Base
      {...other}
      data-pattern={`${pattern}-${placement}`}
      sx={[
        globalStyles,
        !disabled &&
          combineStyles(
            `transition$${status}`,
            !!orientation && `transition$${status}$${orientation}`,
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
