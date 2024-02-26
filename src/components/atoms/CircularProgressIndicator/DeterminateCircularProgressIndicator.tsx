import * as React from 'react';
import stylex from '@stylexjs/stylex';

import type { IContainer } from '@/helpers/Container';
import type {
  ICircularProgressIndicatorStyleKey,
  ICircularProgressIndicatorStyleVarKey,
  ICircularProgressIndicatorSize,
} from '../CircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circulardeterminate-progress.ts

export interface IDeterminateCircularProgressIndicatorProps
  extends IContainer<
      | ICircularProgressIndicatorStyleKey
      | IDeterminateCircularProgressIndicatorStyleKey,
      ICircularProgressIndicatorStyleVarKey
    >,
    Pick<React.AriaAttributes, 'aria-label'> {
  value: number;
  withLabel?: boolean;
  min?: number;
  max?: number;
  zeroBased?: boolean;
  labelFormatter?: (value: number) => string;
  size?: ICircularProgressIndicatorSize;
  disabled?: boolean;
}

export const DeterminateCircularProgressIndicator: React.FC<
  IDeterminateCircularProgressIndicatorProps
> = ({
  value,
  withLabel,
  min = 0,
  max = 1,
  zeroBased,
  labelFormatter,
  size = 'md',
  disabled,
  ...props
}) => {
  const theme = useComponentTheme('CircularProgressIndicator');
  const { styles: variantStyles } = useComponentTheme(
    'DeterminateCircularProgressIndicator',
  );

  const combineStyles = React.useMemo(
    () =>
      stylesCombinatorFactory<
        | ICircularProgressIndicatorStyleKey
        | IDeterminateCircularProgressIndicatorStyleKey
      >(theme.styles, variantStyles, props.styles),
    [theme.styles, variantStyles, props.styles],
  );

  const value0 = zeroBased ? 0 : min;
  const pct = (value - value0) / (max - value0);
  const dashOffset = (1 - pct) * 100;

  return (
    <div
      {...stylex.props(
        theme.vars,
        props.theme,
        combineStyles('host', `host$${size}`),
      )}
    >
      <div
        {...stylex.props(
          combineStyles('layer', 'progress', `progress$${size}`),
        )}
        role='progressbar'
        aria-label={props['aria-label'] || undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        {/* note, dash-array/offset are relative to Setting `pathLength` but Chrome seems to render this inaccurately and using a large viewbox
        helps. */}
        <svg
          viewBox='0 0 4800 4800'
          {...stylex.props(combineStyles('layer', 'svg'))}
        >
          <circle
            {...stylex.props(
              combineStyles('layer', 'svgCircle', `svgCircle$${size}`, 'track'),
            )}
            pathLength='100'
          />
          <circle
            {...stylex.props(
              combineStyles(
                'layer',
                'svgCircle',
                `svgCircle$${size}`,
                'activeTrack',
                disabled && 'activeTrack$disabled',
              ),
            )}
            pathLength='100'
            strokeDashoffset={dashOffset}
          />
        </svg>
        {withLabel && size === 'lg' ? (
          <div
            {...stylex.props(
              combineStyles('layer', 'label', disabled && 'label$disabled'),
            )}
          >
            {labelFormatter
              ? labelFormatter(value)
              : `${Math.round(pct * 100)}%`}
          </div>
        ) : null}
      </div>
    </div>
  );
};
