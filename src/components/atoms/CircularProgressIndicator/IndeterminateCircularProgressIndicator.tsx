import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
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

export type IIndeterminateCircularProgressIndicatorProps =
  IContainerProps<IIndeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      size?: ICircularProgressIndicatorSize;
      disabled?: boolean;
    };

export const IndeterminateCircularProgressIndicator = forwardRef<
  HTMLInputElement,
  IIndeterminateCircularProgressIndicatorProps
>(function IndeterminateCircularProgressIndicator(props, ref) {
  const { styles, sx, size = 'md', disabled, ...other } = props;

  const theme = useComponentTheme('CircularProgressIndicator');
  const variantTheme = useComponentTheme(
    'IndeterminateCircularProgressIndicator',
  );

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme.styles, styles),
    [theme.styles, variantTheme.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<
        IIndeterminateCircularProgressIndicatorStyleKey,
        ICircularProgressIndicatorStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

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
});
