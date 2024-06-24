import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IMenuListStyleKey } from '@/components/atoms/MenuList';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './MenuList.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/menulist/internal/_menulist.scss

type IMenuListStyles = IStyles<IMenuListStyleKey>;
export const styles: MapNamespaces<IMenuListStyles> =
  stylex.create<IMenuListStyles>({
    host: {
      position: 'relative',
      borderRadius: vars.containerShape,
      inset: 'auto',
      borderStyle: 'unset',
      padding: 0,
      overflow: 'visible',
      flexGrow: 1,
      // [popover] adds a canvas background
      backgroundColor: 'transparent',
      color: 'inherit',
      zIndex: 20,
      userSelect: 'none',
      maxHeight: 'inherit',
      height: 'inherit',
      minWidth: '112px',
      maxWidth: 'inherit',
      width: 'fit-content',
    },
    items: {
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
      display: 'flex',
      flexDirection: 'column',
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
    [focusRingVars.shape]: vars.containerShape,
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    [elevationVars.boxShadow]: vars.containerElevation,
  },
});
