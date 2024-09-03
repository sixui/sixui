import type { IDeterminateCircularProgressIndicatorFactory } from './DeterminateCircularProgressIndicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useStyles } from '~/utils/styles/useStyles';
import { useProps } from '~/utils/component/useProps';
import { Box } from '../Box';
import {
  determinateCircularProgressIndicatorStyles,
  type IDeterminateCircularProgressIndicatorStylesFactory,
} from './DeterminateCircularProgressIndicator.css';

const COMPONENT_NAME = 'DeterminateCircularProgressIndicator';

export const DeterminateCircularProgressIndicator =
  componentFactory<IDeterminateCircularProgressIndicatorFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
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
        useStyles<IDeterminateCircularProgressIndicatorStylesFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles: determinateCircularProgressIndicatorStyles,
          style,
          variant,
          modifiers: { disabled },
        });

      const value0 = zeroBased ? 0 : min;
      const pct = Math.min((value - value0) / (max - value0), 1);
      const dashOffset = (1 - pct) * 100;
      const hasContent = withLabel || !!children;

      return (
        <Box
          {...other}
          {...getStyles('root')}
          ref={forwardedRef}
          role='progressbar'
        >
          <div
            {...getStyles(['layer', 'progress'])}
            role='progressbar'
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          >
            {/* Note: dash-array/offset are relative to Setting `pathLength`
            but Chrome seems to render this inaccurately and using a large
            viewbox helps. */}
            <svg viewBox='0 0 4800 4800' {...getStyles(['layer', 'svg'])}>
              <circle
                {...getStyles(['layer', 'svgCircle', 'track'])}
                pathLength='100'
              />
              <circle
                {...getStyles(['layer', 'svgCircle', 'activeTrack'])}
                pathLength='100'
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
        </Box>
      );
    },
  );
