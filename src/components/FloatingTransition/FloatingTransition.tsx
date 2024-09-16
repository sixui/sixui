import type { Alignment, Placement, Side } from '@floating-ui/core';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IFloatingTransitionFactory } from './FloatingTransition.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { getCornerTransformOriginFromPlacement } from './getCornerTransformOriginFromPlacement';
import { getEdgeTransformOriginFromPlacement } from './getEdgeTransformOriginFromPlacement';
import { getPositionFromPlacement } from './getPositionFromPlacement';
import {
  floatingTransitionTheme,
  type IFloatingTransitionThemeFactory,
} from './FloatingTransition.css';
import { resolveRtgStatus } from './resolveRtgStatus';

const COMPONENT_NAME = 'FloatingTransition';

export const FloatingTransition = componentFactory<IFloatingTransitionFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      placement: placementProp = 'top',
      side: sideProp,
      alignment: alignmentProp,
      status,
      origin = 'center',
      cursorTransformOrigin,
      pattern = 'enterExit',
      orientation: orientationProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const side = sideProp ?? (placementProp.split('-')[0] as Side);
    const alignment =
      alignmentProp ?? (placementProp.split('-')[1] as Alignment | undefined);
    const placement: Placement = alignment ? `${side}-${alignment}` : side;

    const orientation =
      orientationProp ??
      (origin !== 'center'
        ? side === 'top' || side === 'bottom'
          ? 'vertical'
          : side === 'left' || side === 'right'
            ? 'horizontal'
            : undefined
        : undefined);
    const resolvedStatus = resolveRtgStatus(status);

    const { getStyles } = useComponentTheme<IFloatingTransitionThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: floatingTransitionTheme,
      variant,
      modifiers: {
        status: resolvedStatus,
        side,
        alignment,
        orientation,
        pattern,
      },
    });

    const position = getPositionFromPlacement(placement);

    return (
      <Box
        {...other}
        {...getStyles(['root', `root$${resolvedStatus}`], {
          style: assignInlineVars({
            [floatingTransitionTheme.tokens.transformOrigin]:
              origin === 'corner'
                ? getCornerTransformOriginFromPlacement(placement)
                : origin === 'edge'
                  ? getEdgeTransformOriginFromPlacement(placement)
                  : origin === 'cursor' && cursorTransformOrigin
                    ? cursorTransformOrigin
                    : 'center',
            [floatingTransitionTheme.tokens.position.top]: position.top,
            [floatingTransitionTheme.tokens.position.bottom]: position.bottom,
            [floatingTransitionTheme.tokens.position.left]: position.left,
            [floatingTransitionTheme.tokens.position.right]: position.right,
          }),
        })}
        ref={forwardedRef}
      >
        {children}
      </Box>
    );
  },
);

FloatingTransition.theme = floatingTransitionTheme;
FloatingTransition.displayName = `@sixui/${COMPONENT_NAME}`;
