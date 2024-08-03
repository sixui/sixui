import { forwardRef, useMemo } from 'react';

import type { IElevationProps } from './Elevation.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { elevationStyles } from './Elevation.styles';
import { elevationTheme } from './Elevation.stylex';

export const Elevation = forwardRef<HTMLDivElement, IElevationProps>(
  function Elevation(props, forwardedRef) {
    const { styles, sx, level, disabled, ...other } = props;

    const componentTheme = useComponentTheme('Elevation');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(elevationStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        aria-hidden
        {...other}
        {...sxf(
          elevationTheme,
          componentTheme.overridenStyles,
          'host',
          level !== undefined && `host$level${level}`,
          disabled && 'host$disabled',
          sx,
        )}
        ref={forwardedRef}
      />
    );
  },
);
