import { forwardRef } from 'react';

import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator.types';
import { useStyles } from '~/hooks/useStyles';
import { circularProgressIndicatorTheme } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';
import {
  circularProgressIndicatorStyles,
  type ICircularProgressIndicatorStylesKey,
} from '../CircularProgressIndicator';
import {
  indeterminateCircularProgressIndicatorStyles,
  type IIndeterminateCircularProgressIndicatorStyleKey,
} from './IndeterminateCircularProgressIndicator.styles';
import { Base } from '../Base';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circular-progress.ts

export const IndeterminateCircularProgressIndicator = forwardRef<
  HTMLDivElement,
  IIndeterminateCircularProgressIndicatorProps
>(function IndeterminateCircularProgressIndicator(props, forwardedRef) {
  const { styles, sx, disabled, children, ...other } = props;

  const { combineStyles, getStyles, globalStyles } = useStyles<
    | ICircularProgressIndicatorStylesKey
    | IIndeterminateCircularProgressIndicatorStyleKey
  >({
    componentName: 'CircularProgressIndicator',
    styles: [
      circularProgressIndicatorStyles,
      indeterminateCircularProgressIndicatorStyles,
      styles,
    ],
  });

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
      >
        <div {...getStyles('layer', 'spinner')}>
          <div {...getStyles('layer', 'left')}>
            <div
              {...getStyles(
                'layer',
                'circle',
                'leftCircle',
                disabled && 'circle$disabled',
              )}
            />
          </div>
          <div {...getStyles('layer', 'right')}>
            <div
              {...getStyles(
                'layer',
                'circle',
                'rightCircle',
                disabled && 'circle$disabled',
              )}
            />
          </div>
        </div>
      </div>
      {children ? <div {...getStyles('layer')}>{children}</div> : null}
    </Base>
  );
});
