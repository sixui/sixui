import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IDeterminateLinearProgressIndicatorThemeFactory } from './DeterminateLinearProgressIndicator.css';
import type { IDeterminateLinearProgressIndicatorFactory } from './DeterminateLinearProgressIndicator.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './DeterminateLinearProgressIndicator.constants';
import { determinateLinearProgressIndicatorTheme } from './DeterminateLinearProgressIndicator.css';

export const DeterminateLinearProgressIndicator =
  componentFactory<IDeterminateLinearProgressIndicatorFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        value,
        min = 0,
        max = 1,
        disabled,
        children,
        hideInactiveTrack,
        hideStopIndicator,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const value0 = min;
      const progress = (value - value0) / (max - value0);
      const normalizedProgress = Math.min(1, Math.max(0, progress));

      const { getStyles } =
        useComponentTheme<IDeterminateLinearProgressIndicatorThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: determinateLinearProgressIndicatorTheme,
          modifiers: {
            disabled,
          },
        });

      return (
        <Box
          {...getStyles('root', {
            style: assignInlineVars({
              [determinateLinearProgressIndicatorTheme.tokens.progress]:
                String(normalizedProgress),
            }),
          })}
          ref={forwardedRef}
          {...other}
        >
          <div {...getStyles('activeIndicator')} />
          {!hideInactiveTrack && <div {...getStyles('inactiveTrack')} />}
          {!hideStopIndicator && <div {...getStyles('stopIndicator')} />}

          {children}
        </Box>
      );
    },
  );

DeterminateLinearProgressIndicator.theme =
  determinateLinearProgressIndicatorTheme;
DeterminateLinearProgressIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
