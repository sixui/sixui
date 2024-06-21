import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from './Elevation.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IElevationProps = IContainerProps<IElevationStyleKey> & {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};

export const Elevation = forwardRef<HTMLDivElement, IElevationProps>(
  function Elevation(props, forwardedRef) {
    const { styles, sx, level, disabled, ...other } = props;

    const { theme } = useComponentTheme('Elevation');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IElevationStyleKey, IElevationStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(
          'host',
          level !== undefined && `host$level${level}`,
          disabled && 'host$disabled',
          theme.vars,
          sx,
        )}
        ref={forwardedRef}
        aria-hidden
        {...other}
      />
    );
  },
);
