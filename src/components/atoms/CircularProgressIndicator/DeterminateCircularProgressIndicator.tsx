import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  ICircularProgressIndicatorStyleVarKey,
  ICircularProgressIndicatorSize,
} from '../CircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circulardeterminate-progress.ts

export type IDeterminateCircularProgressIndicatorProps =
  IContainerProps<IDeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      value: number;
      withLabel?: boolean;
      min?: number;
      max?: number;
      zeroBased?: boolean;
      labelFormatter?: (value: number) => string;
      size?: ICircularProgressIndicatorSize;
      disabled?: boolean;
    };

export const DeterminateCircularProgressIndicator = forwardRef<
  HTMLDivElement,
  IDeterminateCircularProgressIndicatorProps
>(function DeterminateCircularProgressIndicator(props, ref) {
  const {
    styles,
    sx,
    value,
    withLabel,
    min = 0,
    max = 1,
    zeroBased,
    labelFormatter,
    size = 'md',
    disabled,
    ...other
  } = props;

  const { theme, variantTheme } = useComponentTheme(
    'CircularProgressIndicator',
    'DeterminateCircularProgressIndicator',
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<
        IDeterminateCircularProgressIndicatorStyleKey,
        ICircularProgressIndicatorStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

  const value0 = zeroBased ? 0 : min;
  const pct = Math.max(Math.min((value - value0) / (max - value0), 1), 0);
  const dashOffset = (1 - pct) * 100;

  return (
    <div
      {...styleProps(['host', `host$${size}`, sx], [theme.vars])}
      ref={ref}
      {...other}
    >
      <div
        {...styleProps(['layer', 'progress', `progress$${size}`])}
        role='progressbar'
        aria-label={props['aria-label'] || undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        {/* note, dash-array/offset are relative to Setting `pathLength` but Chrome seems to render this inaccurately and using a large viewbox
        helps. */}
        <svg viewBox='0 0 4800 4800' {...styleProps(['layer', 'svg'])}>
          <circle
            {...styleProps([
              'layer',
              'svgCircle',
              `svgCircle$${size}`,
              'track',
            ])}
            pathLength='100'
          />
          <circle
            {...styleProps([
              'layer',
              'svgCircle',
              `svgCircle$${size}`,
              'activeTrack',
              disabled && 'activeTrack$disabled',
            ])}
            pathLength='100'
            strokeDashoffset={dashOffset}
          />
        </svg>
        {withLabel && size === 'lg' ? (
          <div
            {...styleProps(['layer', 'label', disabled && 'label$disabled'])}
          >
            {labelFormatter
              ? labelFormatter(value)
              : `${Math.round(pct * 100)}%`}
          </div>
        ) : null}
      </div>
    </div>
  );
});
