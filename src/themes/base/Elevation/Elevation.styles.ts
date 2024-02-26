import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import { componentVars as vars } from './Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/elevation/internal/_elevation.scss

type IElevationStyles = IStyles<IElevationStyleKey>;
export const styles: MapNamespaces<IElevationStyles> =
  stylex.create<IElevationStyles>({
    host: {
      display: 'flex',
      pointerEvents: 'none',
      transitionProperty: 'box-shadow',
      transitionDuration: vars.transitionDuration,
      transitionTimingFunction: vars.transitionTimingFunction,

      borderRadius: 'inherit',
      inset: 0,
      position: 'absolute',
      boxShadow: vars.boxShadow,
    },
    host$level0: { boxShadow: vars.boxShadow$level0 },
    host$level1: { boxShadow: vars.boxShadow$level1 },
    host$level2: { boxShadow: vars.boxShadow$level2 },
    host$level3: { boxShadow: vars.boxShadow$level3 },
    host$level4: { boxShadow: vars.boxShadow$level4 },
    host$level5: { boxShadow: vars.boxShadow$level5 },
    host$disabled: {
      transitionProperty: 'none',
    },
  });
