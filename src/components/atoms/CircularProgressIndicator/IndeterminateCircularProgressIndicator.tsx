import { forwardRef, useMemo } from 'react';

import type { ICircularProgressIndicatorStyleVarKey } from '../CircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicatorProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circular-progress.ts

export const IndeterminateCircularProgressIndicator = forwardRef<
  HTMLInputElement,
  IIndeterminateCircularProgressIndicatorProps
>(function IndeterminateCircularProgressIndicator(props, forwardedRef) {
  const { styles, sx, size = 'md', disabled, children, ...other } = props;

  const { theme, variantTheme } = useComponentTheme(
    'CircularProgressIndicator',
    'IndeterminateCircularProgressIndicator',
  );
  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<IIndeterminateCircularProgressIndicatorStyleKey>(
        theme.styles,
        variantTheme?.styles,
        styles,
      ),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IIndeterminateCircularProgressIndicatorStyleKey,
        ICircularProgressIndicatorStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div
      {...sxf('host', `host$${size}`, theme.vars, sx)}
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
