import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IFloatingTransitionFactory } from './FloatingTransition.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { getPlacementTransformOrigin } from './getPlacementTransformOrigin';
import { getPlacementSideTransformOrigin } from './getPlacementSideTransformOrigin';
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
      placement,
      status,
      origin = 'center',
      cursorTransformOrigin,
      pattern = 'enterExit',
      orientation: orientationProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const orientation =
      orientationProp ??
      (['top', 'bottom'].includes(placement)
        ? 'vertical'
        : ['left', 'right'].includes(placement)
          ? 'horizontal'
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
        orientation,
        pattern: `${pattern}-${placement}`,
      },
    });

    return (
      <Box
        {...other}
        {...getStyles(['root', `root$${resolvedStatus}`], {
          style: assignInlineVars({
            [floatingTransitionTheme.tokens.transformOrigin]:
              origin === 'corner'
                ? getPlacementTransformOrigin(placement)
                : origin === 'edge'
                  ? getPlacementSideTransformOrigin(placement)
                  : origin === 'cursor' && cursorTransformOrigin
                    ? cursorTransformOrigin
                    : 'center',
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
