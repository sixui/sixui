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
  const { styles, sx, size = 'md', disabled, children, ...other } = props;

  const { combineStyles, getStyles, globalStyles } = useStyles<
    | ICircularProgressIndicatorStylesKey
    | IIndeterminateCircularProgressIndicatorStyleKey
  >({
    name: 'CircularProgressIndicator',
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
        combineStyles('host', `host$${size}`),
        sx,
      ]}
      ref={forwardedRef}
    >
      <div
        {...getStyles('layer', 'progress', `progress$${size}`)}
        role='progressbar'
        aria-label={props['aria-label'] ?? undefined}
      >
        <div {...getStyles('layer', 'spinner')}>
          <div {...getStyles('layer', 'left')}>
            <div
              {...getStyles(
                'layer',
                'circle',
                `circle$${size}`,
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
                `circle$${size}`,
                'rightCircle',
                disabled && 'circle$disabled',
              )}
            />
          </div>
        </div>
      </div>
      {children ? (
        <div {...getStyles('layer', 'label', disabled && 'label$disabled')}>
          {children}
        </div>
      ) : null}
    </Base>
  );
});
