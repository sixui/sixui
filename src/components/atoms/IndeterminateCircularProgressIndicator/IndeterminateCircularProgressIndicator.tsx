import { forwardRef, useMemo } from 'react';

import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { circularProgressIndicatorTheme } from '@/components/atoms/CircularProgressIndicator/CircularProgressIndicator.stylex';
import {
  circularProgressIndicatorStyles,
  type ICircularProgressIndicatorStylesKey,
} from '@/components/atoms/CircularProgressIndicator';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  indeterminateCircularProgressIndicatorStyles,
  type IIndeterminateCircularProgressIndicatorStyleKey,
} from './IndeterminateCircularProgressIndicator.styles';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circular-progress.ts

export const IndeterminateCircularProgressIndicator = forwardRef<
  HTMLInputElement,
  IIndeterminateCircularProgressIndicatorProps
>(function IndeterminateCircularProgressIndicator(props, forwardedRef) {
  const { styles, sx, size = 'md', disabled, children, ...other } = props;

  const { overridenStyles } = useComponentTheme('CircularProgressIndicator');
  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<
        | ICircularProgressIndicatorStylesKey
        | IIndeterminateCircularProgressIndicatorStyleKey
      >(
        circularProgressIndicatorStyles,
        indeterminateCircularProgressIndicatorStyles,
        styles,
      ),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div
      {...sxf(
        circularProgressIndicatorTheme,
        overridenStyles,
        'host',
        `host$${size}`,
        sx,
      )}
      ref={forwardedRef}
      {...other}
    >
      <div
        {...sxf('layer', 'progress', `progress$${size}`)}
        role='progressbar'
        aria-label={props['aria-label'] ?? undefined}
      >
        <div {...sxf('layer', 'spinner')}>
          <div {...sxf('layer', 'left')}>
            <div
              {...sxf(
                'layer',
                'circle',
                `circle$${size}`,
                'leftCircle',
                disabled && 'circle$disabled',
              )}
            />
          </div>
          <div {...sxf('layer', 'right')}>
            <div
              {...sxf(
                'layer',
                'circle',
                `circle$${size}`,
                'rightCircle',
                disabled && 'circle$disabled',
              )}
            />
          </div>
        </div>
      </div>
      {children ? (
        <div {...sxf('layer', 'label', disabled && 'label$disabled')}>
          {children}
        </div>
      ) : null}
    </div>
  );
});
