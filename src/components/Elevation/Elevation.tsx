import { forwardRef } from 'react';

import type { IElevationProps } from './Elevation.types';
import { Base } from '../Base';
import { elevationStyles } from './Elevation.styles';
import { elevationTheme } from './Elevation.stylex';
import { useStyles } from '~/hooks/useStyles';

export const Elevation = forwardRef<HTMLDivElement, IElevationProps>(
  function Elevation(props, forwardedRef) {
    const { styles, sx, level, disabled, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'Elevation',
      styles: [elevationStyles, styles],
    });

    return (
      <Base
        aria-hidden
        {...other}
        sx={[
          elevationTheme,
          globalStyles,
          combineStyles(
            'host',
            level !== undefined && `host$level${level}`,
            disabled && 'host$disabled',
          ),
          sx,
        ]}
        ref={forwardedRef}
      />
    );
  },
);
