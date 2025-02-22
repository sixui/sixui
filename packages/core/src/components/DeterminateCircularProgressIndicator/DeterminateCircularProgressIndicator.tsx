import type { IDeterminateCircularProgressIndicatorThemeFactory } from './DeterminateCircularProgressIndicator.css';
import type { IDeterminateCircularProgressIndicatorFactory } from './DeterminateCircularProgressIndicator.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './DeterminateCircularProgressIndicator.constants';
import { determinateCircularProgressIndicatorTheme } from './DeterminateCircularProgressIndicator.css';

export const DeterminateCircularProgressIndicator =
  componentFactory<IDeterminateCircularProgressIndicatorFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        value,
        withLabel,
        min = 0,
        max = 1,
        zeroBased,
        labelFormatter,
        disabled,
        children,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const value0 = zeroBased ? 0 : min;
      const progress = (value - value0) / (max - value0);
      const normalizedProgress = Math.min(
        1,
        Math.max(zeroBased ? -1 : 0, progress),
      );
      const isNegative = normalizedProgress < 0;
      const absoluteProgress = Math.abs(normalizedProgress);
      const rotationDegrees = absoluteProgress * 360;

      const hasContent = withLabel || !!children;
      const formattedValue = labelFormatter
        ? labelFormatter(value)
        : `${Math.round(normalizedProgress * 100)}%`;

      const { getStyles } =
        useComponentTheme<IDeterminateCircularProgressIndicatorThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          theme: determinateCircularProgressIndicatorTheme,
          variant,
          modifiers: {
            disabled,
            negative: isNegative,
          },
        });

      return (
        <Box
          {...getStyles('root')}
          ref={forwardedRef}
          role="progressbar"
          {...other}
        >
          <div {...getStyles('progress')}>
            <div
              {...getStyles('ring', {
                style: {
                  background: isNegative
                    ? `conic-gradient(transparent
                ${360 - rotationDegrees}deg, currentColor 0
                360deg)`
                    : `conic-gradient(currentColor
                ${rotationDegrees}deg, transparent ${rotationDegrees}deg
                360deg)`,
                },
              })}
            />
            {hasContent && (
              <div {...getStyles('label')}>{children ?? formattedValue}</div>
            )}
          </div>
        </Box>
      );
    },
  );

DeterminateCircularProgressIndicator.theme =
  determinateCircularProgressIndicatorTheme;
DeterminateCircularProgressIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
