import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IPaperStyleKey } from '@/components/atoms/Paper';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import { componentVars as vars } from './Paper.stylex';
import { componentVars as paperStateVars } from './Paper.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/labs/Paper/internal/_shared.scss

type IPaperStyles = IStyles<IPaperStyleKey>;
export const styles: MapNamespaces<IPaperStyles> = stylex.create<IPaperStyles>({
  host: {
    borderRadius: vars.containerShape,
    position: 'relative',
    zIndex: 0,
  },
  host$elevation0: {
    [paperStateVars.elevation]: elevationVars.boxShadow$level0,
  },
  host$elevation1: {
    [paperStateVars.elevation]: elevationVars.boxShadow$level1,
  },
  host$elevation2: {
    [paperStateVars.elevation]: elevationVars.boxShadow$level2,
  },
  host$elevation3: {
    [paperStateVars.elevation]: elevationVars.boxShadow$level3,
  },
  host$elevation4: {
    [paperStateVars.elevation]: elevationVars.boxShadow$level4,
  },
  host$elevation5: {
    [paperStateVars.elevation]: elevationVars.boxShadow$level5,
  },
  host$square: {
    borderRadius: 0,
  },
  background: {
    backgroundColor: vars.containerColor,
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
    borderStyle: vars.outlineStyle,
    borderWidth: vars.outlineWidth,
    position: 'absolute',
    borderColor: vars.outlineColor,
    borderRadius: 'inherit',
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    [elevationVars.boxShadow]: paperStateVars.elevation,

    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    zIndex: -1,
  },
});
