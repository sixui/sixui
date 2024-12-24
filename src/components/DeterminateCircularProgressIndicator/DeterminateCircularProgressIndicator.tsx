import type { IDeterminateCircularProgressIndicatorThemeFactory } from './DeterminateCircularProgressIndicator.css';
import type { IDeterminateCircularProgressIndicatorFactory } from './DeterminateCircularProgressIndicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { determinateCircularProgressIndicatorTheme } from './DeterminateCircularProgressIndicator.css';

const COMPONENT_NAME = 'DeterminateCircularProgressIndicator';

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

      const { getStyles } =
        useComponentTheme<IDeterminateCircularProgressIndicatorThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          theme: determinateCircularProgressIndicatorTheme,
          variant,
          modifiers: { disabled },
        });

      const value0 = zeroBased ? 0 : min;
      const progress = Math.min((value - value0) / (max - value0), 1);
      const hasContent = withLabel || !!children;
      const rotationDegrees = progress * 360;
      const formattedValue = labelFormatter
        ? labelFormatter(value)
        : `${Math.round(progress * 100)}%`;

      return (
        <Box
          {...getStyles('root')}
          ref={forwardedRef}
          role="progressbar"
          {...other}
        >
          <div
            {...getStyles(['ring', 'ring$progress'], {
              style: {
                background: `conic-gradient(currentColor ${rotationDegrees}deg, transparent ${rotationDegrees}deg 360deg)`,
              },
            })}
          />
          {hasContent && (
            <div {...getStyles(['layer', 'label'])}>
              {children ?? formattedValue}
            </div>
          )}
        </Box>
      );
    },
  );

DeterminateCircularProgressIndicator.theme =
  determinateCircularProgressIndicatorTheme;
DeterminateCircularProgressIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
