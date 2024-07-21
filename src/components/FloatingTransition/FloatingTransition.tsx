import { forwardRef, useMemo } from 'react';

import type { IFloatingTransitionProps } from './FloatingTransition.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { commonStyles } from '@/helpers/commonStyles';
import { floatingTransitionStyles } from './FloatingTransition.styles';
import { getPlacementTransformOrigin } from './getPlacementTransformOrigin';
import { getPlacementSideTransformOrigin as getPlacementEdgeTransformOrigin } from './getPlacementSideTransformOrigin';

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
    ...other
  } = props;

  const componentTheme = useComponentTheme('FloatingTransition');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(floatingTransitionStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );
  const orientation = ['top', 'bottom'].includes(placement)
    ? 'vertical'
    : ['left', 'right'].includes(placement)
      ? 'horizontal'
      : undefined;

  return (
    <div
      {...sxf(
        componentTheme.overridenStyles,
        `transition$${pattern}$${status}`,
        orientation && `transition$${pattern}$${status}$${orientation}`,
        commonStyles.transformOrigin(
          origin === 'corner'
            ? getPlacementTransformOrigin(placement)
            : origin === 'edge'
              ? getPlacementEdgeTransformOrigin(placement)
              : origin === 'cursor' && cursorTransformOrigin
                ? cursorTransformOrigin
                : 'center',
        ),
        sx,
      )}
      {...other}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
});
