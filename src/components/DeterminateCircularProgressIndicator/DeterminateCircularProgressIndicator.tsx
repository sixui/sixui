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
      const pct = Math.min((value - value0) / (max - value0), 1);
      const dashOffset = (1 - pct) * 100;
      const hasContent = withLabel || !!children;

      return (
        <Box
          {...getStyles('root')}
          ref={forwardedRef}
          role="progressbar"
          {...other}
        >
          XXX
        </Box>
      );

      return (
        <Box
          {...getStyles('root')}
          ref={forwardedRef}
          role="progressbar"
          {...other}
        >
          <div {...getStyles('inner')}>
            <div
              {...getStyles(['layer', 'progress'])}
              role="progressbar"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
            >
              {/* Note: dash-array/offset are relative to Setting `pathLength`
            but Chrome seems to render this inaccurately and using a large
            viewbox helps. */}
              <svg viewBox="0 0 4800 4800" {...getStyles(['layer', 'svg'])}>
                <circle
                  {...getStyles(['layer', 'svgCircle', 'track'])}
                  pathLength="100"
                />
                <circle
                  {...getStyles(['layer', 'svgCircle', 'activeTrack'])}
                  pathLength="100"
                  strokeDashoffset={dashOffset}
                />
              </svg>
              {hasContent ? (
                <div {...getStyles(['layer', 'label'])}>
                  {children ??
                    (labelFormatter
                      ? labelFormatter(value)
                      : `${Math.round(pct * 100)}%`)}
                </div>
              ) : null}
            </div>
          </div>
        </Box>
      );
    },
  );

DeterminateCircularProgressIndicator.theme =
  determinateCircularProgressIndicatorTheme;
DeterminateCircularProgressIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
