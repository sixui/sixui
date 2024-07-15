import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { paperTokens } from './Paper.stylex';
import { paperStateTokens as paperstateTokens } from './Paper.state.stylex';

// https://github.com/material-components/material-web/blob/main/labs/Paper/internal/_shared.scss

export type IPaperStylesKey = keyof typeof paperStyles;
export const paperStyles = stylex.create({
  host: {
    borderRadius: paperTokens.containerShape,
    position: 'relative',
    zIndex: 0,
  },
  host$elevation0: {
    [paperstateTokens.elevation]: elevationTokens.boxShadow$level0,
  },
  host$elevation1: {
    [paperstateTokens.elevation]: elevationTokens.boxShadow$level1,
  },
  host$elevation2: {
    [paperstateTokens.elevation]: elevationTokens.boxShadow$level2,
  },
  host$elevation3: {
    [paperstateTokens.elevation]: elevationTokens.boxShadow$level3,
  },
  host$elevation4: {
    [paperstateTokens.elevation]: elevationTokens.boxShadow$level4,
  },
  host$elevation5: {
    [paperstateTokens.elevation]: elevationTokens.boxShadow$level5,
  },
  host$square: {
    borderRadius: 0,
  },
  background: {
    backgroundColor: paperTokens.containerColor,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    zIndex: -1,
  },
  content: {
    borderRadius: 'inherit',
    position: 'relative',
  },
  outline: {
    zIndex: 1,
    inset: 0,
    pointerEvents: 'none',
    borderStyle: paperTokens.outlineStyle,
    borderWidth: paperTokens.outlineWidth,
    position: 'absolute',
    borderColor: paperTokens.outlineColor,
    borderRadius: 'inherit',
  },
});

export const paperElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: paperstateTokens.elevation,

    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    zIndex: -1,
  },
});
