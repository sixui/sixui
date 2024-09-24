import type { Alignment, Placement, Side } from '@floating-ui/core';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IMotionThemeFactory } from './Motion.css';
import type { IMotionFactory, IPlacementObject } from './Motion.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { getCornerTransformOriginFromPlacement } from './getCornerTransformOriginFromPlacement';
import { getEdgeTransformOriginFromPlacement } from './getEdgeTransformOriginFromPlacement';
import { getPositionFromPlacement } from './getPositionFromPlacement';
import { resolveRtgStatus } from './resolveRtgStatus';
import { motionTheme } from './Motion.css';

const COMPONENT_NAME = 'Motion';

const getObjectFromPlacement = (
  placement: Placement | IPlacementObject,
): IPlacementObject => {
  if (typeof placement === 'string') {
    const side = placement.split('-')[0] as Side;
    const alignment = placement.split('-')[1] as Alignment | undefined;

    return {
      side,
      alignment,
    };
  }

  return placement;
};

export const Motion = componentFactory<IMotionFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      placement: placementProp = 'top',
      status,
      origin = 'center',
      cursorTransformOrigin,
      pattern = 'enterExit',
      orientation: orientationProp,
      positioned,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const placementObject = getObjectFromPlacement(placementProp);
    const alignment = placementObject.alignment;
    const side = placementObject.side ?? 'top';
    const placement: Placement = placementObject.alignment
      ? `${side}-${placementObject.alignment}`
      : side;

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
      theme: motionTheme,
      variant,
      modifiers: {
        status: resolvedStatus,
        side,
        alignment,
        orientation,
        pattern,
        positioned,
      },
    });

    const position = getPositionFromPlacement(placement);

    return (
      <Box
        {...other}
        {...getStyles('root', {
          style: positioned
            ? assignInlineVars({
                [motionTheme.tokens.position.top]: position.top,
                [motionTheme.tokens.position.bottom]: position.bottom,
                [motionTheme.tokens.position.left]: position.left,
                [motionTheme.tokens.position.right]: position.right,
                [motionTheme.tokens.position.transform]: position.transform,
              })
            : undefined,
        })}
        ref={forwardedRef}
      >
        <div
          {...getStyles(['motion', `motion$${resolvedStatus}`], {
            style: assignInlineVars({
              [motionTheme.tokens.transformOrigin]:
                origin === 'corner'
                  ? getCornerTransformOriginFromPlacement(placement)
                  : origin === 'edge'
                    ? getEdgeTransformOriginFromPlacement(placement)
                    : origin === 'cursor' && cursorTransformOrigin
                      ? cursorTransformOrigin
                      : 'center',
            }),
          })}
        >
          {children}
        </div>
      </Box>
    );
  },
);

Motion.theme = motionTheme;
Motion.displayName = `@sixui/${COMPONENT_NAME}`;
