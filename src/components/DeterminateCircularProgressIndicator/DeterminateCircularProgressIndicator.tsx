import { forwardRef } from 'react';

import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { useStyles } from '~/hooks/useStyles';
import {
  circularProgressIndicatorStyles,
  type ICircularProgressIndicatorStylesKey,
} from '../CircularProgressIndicator';
import { Base } from '../Base';
import { circularProgressIndicatorTheme } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';
import {
  determinateCircularProgressIndicatorStyles,
  type IDeterminateCircularProgressIndicatorStylesKey,
} from './DeterminateCircularProgressIndicator.styles';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circulardeterminate-progress.ts

export const DeterminateCircularProgressIndicator = createPolymorphicComponent<
  'div',
  IDeterminateCircularProgressIndicatorProps
>(
  forwardRef<HTMLDivElement, IDeterminateCircularProgressIndicatorProps>(
    function DeterminateCircularProgressIndicator(props, forwardedRef) {
      const {
        styles,
        sx,
        value,
        withLabel,
        min = 0,
        max = 1,
        zeroBased,
        labelFormatter,
        disabled,
        children,
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles<
        | ICircularProgressIndicatorStylesKey
        | IDeterminateCircularProgressIndicatorStylesKey
      >({
        componentName: 'CircularProgressIndicator',
        styles: [
          circularProgressIndicatorStyles,
          determinateCircularProgressIndicatorStyles,
          styles,
        ],
      });

      const value0 = zeroBased ? 0 : min;
      const pct = Math.max(Math.min((value - value0) / (max - value0), 1), 0);
      const dashOffset = (1 - pct) * 100;
      const hasContent = withLabel || !!children;

      return (
        <Base
          {...other}
          sx={[
            circularProgressIndicatorTheme,
            globalStyles,
            combineStyles('host'),
            sx,
          ]}
          ref={forwardedRef}
        >
          <div
            {...getStyles('layer', 'progress')}
            role='progressbar'
            aria-label={props['aria-label'] ?? undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          >
            {/* note, dash-array/offset are relative to Setting `pathLength` but Chrome seems to render this inaccurately and using a large viewbox
        helps. */}
            <svg viewBox='0 0 4800 4800' {...getStyles('layer', 'svg')}>
              <circle
                {...getStyles('layer', 'svgCircle', 'track')}
                pathLength='100'
              />
              <circle
                {...getStyles(
                  'layer',
                  'svgCircle',
                  'activeTrack',
                  disabled && 'activeTrack$disabled',
                )}
                pathLength='100'
                strokeDashoffset={dashOffset}
              />
            </svg>
            {hasContent ? (
              <div
                {...getStyles('layer', 'label', disabled && 'label$disabled')}
              >
                {children ??
                  (labelFormatter
                    ? labelFormatter(value)
                    : `${Math.round(pct * 100)}%`)}
              </div>
            ) : null}
          </div>
        </Base>
      );
    },
  ),
);
