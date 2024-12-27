import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IMotionThemeFactory } from './Motion.css';
import type { IMotionFactory } from './Motion.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { getCornerTransformOriginFromPlacement } from './getCornerTransformOriginFromPlacement';
import { getEdgeTransformOriginFromPlacement } from './getEdgeTransformOriginFromPlacement';
import { resolveRtgStatus } from './resolveRtgStatus';
import { motionTheme } from './Motion.css';

const COMPONENT_NAME = 'Motion';

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
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { side, alignment } = placement;

    const orientation =
      orientationProp ??
      ((origin !== 'center' && !alignment) || origin === 'edge'
        ? side === 'top' || side === 'bottom'
          ? 'vertical'
          : side === 'left' || side === 'right'
            ? 'horizontal'
            : undefined
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
        pattern,
      },
    });

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
Motion.displayName = `@sixui/${COMPONENT_NAME}`;
