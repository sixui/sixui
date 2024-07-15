import stylex from '@stylexjs/stylex';

import { elevationTokens } from './Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/elevation/internal/_elevation.scss

export type IElevationStylesKey = keyof typeof elevationStyles;
export const elevationStyles = stylex.create({
  host: {
    display: 'flex',
    pointerEvents: 'none',
    transitionProperty: 'box-shadow',
    transitionDuration: elevationTokens.transitionDuration,
    transitionTimingFunction: elevationTokens.transitionTimingFunction,

    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    boxShadow: elevationTokens.boxShadow,
  },
  host$level0: { boxShadow: elevationTokens.boxShadow$level0 },
  host$level1: { boxShadow: elevationTokens.boxShadow$level1 },
  host$level2: { boxShadow: elevationTokens.boxShadow$level2 },
  host$level3: { boxShadow: elevationTokens.boxShadow$level3 },
  host$level4: { boxShadow: elevationTokens.boxShadow$level4 },
  host$level5: { boxShadow: elevationTokens.boxShadow$level5 },
  host$disabled: {
    transitionProperty: 'none',
  },
});
