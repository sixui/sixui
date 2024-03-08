import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IMenuStyleKey } from '@/components/atoms/Menu';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Menu.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/menu/internal/_menu.scss

type IMenuStyles = IStyles<IMenuStyleKey>;
export const styles: MapNamespaces<IMenuStyles> = stylex.create<IMenuStyles>({
  host: {
    minWidth: '112px',
    color: 'unset',
    display: 'contents',
  },
  menu: {
    position: 'relative',
    borderRadius: vars.containerShape,
    inset: 'auto',
    borderStyle: 'unset',
    padding: 0,
    overflow: 'visible',
    // [popover] adds a canvas background
    backgroundColor: 'transparent',
    color: 'inherit',
    display: 'none',
    zIndex: 20,
    userSelect: 'none',
    maxHeight: 'inherit',
    height: 'inherit',
    minWidth: 'inherit',
    maxWidth: 'inherit',
  },
  menu$open: {
    display: 'block',
    position: 'absolute',
  },
  items: {
    display: 'block',
    listStyleType: 'none',
    margin: 0,
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: vars.containerColor,
    height: 'inherit',
    maxHeight: 'inherit',
    overflow: 'auto',
    minWidth: 'inherit',
    maxWidth: 'inherit',
    borderRadius: vars.containerShape,
  },
  itemPadding: {
    paddingBlock: '8px',
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: vars.containerShape,
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [elevationVars.boxShadow]: vars.containerElevation,
  },
});
