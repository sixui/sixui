import stylex from '@stylexjs/stylex';

import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { paperBaseTokens } from './PaperBase.stylex';

// https://github.com/material-components/material-web/blob/main/labs/Paper/internal/_shared.scss

export type IPaperBaseStylesKey = keyof typeof paperBaseStyles;
export const paperBaseStyles = stylex.create({
  host: {
    borderTopLeftRadius: paperBaseTokens.containerShape$topLeft,
    borderTopRightRadius: paperBaseTokens.containerShape$topRight,
    borderBottomRightRadius: paperBaseTokens.containerShape$bottomRight,
    borderBottomLeftRadius: paperBaseTokens.containerShape$bottomLeft,
    position: 'relative',
    color: paperBaseTokens.textColor,
    zIndex: 0,
  },
  background: {
    backgroundColor: paperBaseTokens.containerColor,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    zIndex: -1,
  },
  outline: {
    zIndex: 1,
    inset: 0,
    pointerEvents: 'none',
    borderStyle: paperBaseTokens.outlineStyle,
    borderWidth: paperBaseTokens.outlineWidth,
    position: 'absolute',
    borderColor: paperBaseTokens.outlineColor,
    borderRadius: 'inherit',
  },
});

export const paperBaseElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: paperBaseTokens.containerElevation,

    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    zIndex: -1,
  },
});
