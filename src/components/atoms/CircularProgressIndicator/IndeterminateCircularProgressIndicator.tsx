import * as React from 'react';
import stylex from '@stylexjs/stylex';

import type { IContainer } from '@/helpers/Container';
import type {
  ICircularProgressIndicatorStyleKey,
  ICircularProgressIndicatorStyleVarKey,
  ICircularProgressIndicatorSize,
} from '../CircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';

export interface IIndeterminateCircularProgressIndicatorProps
  extends IContainer<
      | ICircularProgressIndicatorStyleKey
      | IIndeterminateCircularProgressIndicatorStyleKey,
      ICircularProgressIndicatorStyleVarKey
    >,
    Pick<React.AriaAttributes, 'aria-label'> {
  labelFormatter?: (value: number) => string;
  size?: ICircularProgressIndicatorSize;
  disabled?: boolean;
}

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circular-progress.ts
export const IndeterminateCircularProgressIndicator: React.FC<
  IIndeterminateCircularProgressIndicatorProps
> = ({ size = 'md', disabled, ...props }) => {
  const theme = useComponentTheme('CircularProgressIndicator');
  const { styles: variantStyles } = useComponentTheme(
    'IndeterminateCircularProgressIndicator',
  );

  const combineStyles = React.useMemo(
    () =>
      stylesCombinatorFactory<
        | ICircularProgressIndicatorStyleKey
        | IIndeterminateCircularProgressIndicatorStyleKey
      >(theme.styles, variantStyles, props.styles),
    [theme.styles, variantStyles, props.styles],
  );

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
      >
        <div {...stylex.props(combineStyles('layer', 'spinner'))}>
          <div {...stylex.props(combineStyles('layer', 'left'))}>
            <div
              {...stylex.props(
                combineStyles(
                  'layer',
                  'circle',
                  `circle$${size}`,
                  'leftCircle',
                  disabled && 'circle$disabled',
                ),
              )}
            />
          </div>
          <div {...stylex.props(combineStyles('layer', 'right'))}>
            <div
              {...stylex.props(
                combineStyles(
                  'layer',
                  'circle',
                  `circle$${size}`,
                  'rightCircle',
                  disabled && 'circle$disabled',
                ),
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
