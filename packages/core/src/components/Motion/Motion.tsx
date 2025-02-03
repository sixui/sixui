import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IMotionThemeFactory } from './Motion.css';
import type { IMotionFactory } from './Motion.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { getCornerTransformOriginFromPlacement } from './getCornerTransformOriginFromPlacement';
import { getEdgeTransformOriginFromPlacement } from './getEdgeTransformOriginFromPlacement';
import { COMPONENT_NAME } from './Motion.constants';
import { resolveRtgStatus } from './resolveRtgStatus';
import { motionTheme } from './Motion.css';

export const Motion = polymorphicComponentFactory<IMotionFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      placement = { side: 'top' },
      status,
      origin = 'center',
      customTransformOrigin,
      pattern = 'enterExit',
      orientation: orientationProp,
      disabled,
      keepMounted,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { side, alignment } = placement;

    const orientation =
      orientationProp ??
      ((origin !== 'center' && !alignment) || origin === 'edge'
        ? side === 'top' || side === 'bottom'
          ? 'vertical'
          : 'horizontal'
        : undefined);
    const resolvedStatus = resolveRtgStatus(status);

    const { getStyles } = useComponentTheme<IMotionThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: motionTheme,
      modifiers: {
        status: resolvedStatus,
        side,
        alignment,
        orientation,
        pattern:
          typeof pattern === 'string'
            ? pattern
            : ['entered', 'exiting'].includes(status)
              ? pattern.exit
              : pattern.enter,
      },
    });

    if (!keepMounted && status === 'exited') {
      return null;
    }

    if (disabled) {
      return <Box {...getStyles('root')} ref={forwardedRef} {...other} />;
    }

    return (
      <Box
        {...getStyles(['root', 'motion', `motion$${resolvedStatus}`], {
          style: assignInlineVars({
            [motionTheme.tokens.transformOrigin]:
              origin === 'corner'
                ? getCornerTransformOriginFromPlacement(placement)
                : origin === 'edge'
                  ? getEdgeTransformOriginFromPlacement(placement)
                  : origin === 'custom' && customTransformOrigin
                    ? customTransformOrigin
                    : 'center',
          }),
        })}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

Motion.theme = motionTheme;
Motion.displayName = `@sixui/core/${COMPONENT_NAME}`;
