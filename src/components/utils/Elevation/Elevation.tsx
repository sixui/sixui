import { forwardRef, useMemo } from 'react';

import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from './Elevation.styledefs';
import type { IElevationProps } from './ElevationProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';

export const Elevation = forwardRef<HTMLDivElement, IElevationProps>(
  function Elevation(props, forwardedRef) {
    const { styles, sx, level, disabled, ...other } = props;

    const { theme } = useComponentThemeOld('Elevation');
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
