import { forwardRef } from 'react';

import type { IElevationProps } from './Elevation.types';
import { useStyles } from '~/hooks/useStyles2';
import { Box } from '../Box';
import {
  elevationStyles,
  elevationTheme,
  type IElevationStyleName,
} from './Elevation.css';

export const Elevation = forwardRef<HTMLDivElement, IElevationProps>(
  function Elevation(props, forwardedRef) {
    const { className, styles, style, level, disabled, ...other } = props;

    const { getStyles } = useStyles({
      name: 'Elevation',
      className,
      style,
      stylesList: [elevationStyles, styles],
      theme: elevationTheme,
    });

    return (
      <Box
        {...other}
        {...getStyles('root')}
        aria-hidden
        modifiers={{ level, disabled }}
        ref={forwardedRef}
      />
    );
  },
);
