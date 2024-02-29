import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  ICircularProgressIndicatorStyleVarKey,
  ICircularProgressIndicatorSize,
} from '../CircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/progress/internal/progress.ts
// https://github.com/material-components/material-web/blob/main/progress/internal/circular-progress.ts

export type IIndeterminateCircularProgressIndicatorProps = IContainerProps<
  IIndeterminateCircularProgressIndicatorStyleKey,
  ICircularProgressIndicatorStyleVarKey
> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    labelFormatter?: (value: number) => string;
    size?: ICircularProgressIndicatorSize;
    disabled?: boolean;
  };

export const IndeterminateCircularProgressIndicator: React.FC<
  IIndeterminateCircularProgressIndicatorProps
> = ({ size = 'md', disabled, ...props }) => {
  const theme = useComponentTheme('CircularProgressIndicator');
  const variantTheme = useComponentTheme(
    'IndeterminateCircularProgressIndicator',
  );

  const styleProps = useMemo(
    () =>
      stylePropsFactory<
        IIndeterminateCircularProgressIndicatorStyleKey,
        ICircularProgressIndicatorStyleVarKey
      >(
        stylesCombinatorFactory<IIndeterminateCircularProgressIndicatorStyleKey>(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        props.visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, props.visualState],
  );

  return (
    <div
      {...styleProps(
        ['host', `host$${size}`, props.sx],
        [theme.vars, props.theme],
      )}
    >
      <div
        {...styleProps(['layer', 'progress', `progress$${size}`])}
        role='progressbar'
        aria-label={props['aria-label'] || undefined}
      >
        <div {...styleProps(['layer', 'spinner'])}>
          <div {...styleProps(['layer', 'left'])}>
            <div
              {...styleProps([
                'layer',
                'circle',
                `circle$${size}`,
                'leftCircle',
                disabled && 'circle$disabled',
              ])}
            />
          </div>
          <div {...styleProps(['layer', 'right'])}>
            <div
              {...styleProps([
                'layer',
                'circle',
                `circle$${size}`,
                'rightCircle',
                disabled && 'circle$disabled',
              ])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
