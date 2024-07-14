import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IMenuListStyleKey } from '@/components/atoms/MenuList';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IListStylesKey } from '@/components/atoms/List';
import { componentVars as vars } from './MenuList.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/menulist/internal/_menulist.scss

type IMenuListStyles = IStyles<IMenuListStyleKey>;
export const styles: MapNamespaces<IMenuListStyles> =
  stylex.create<IMenuListStyles>({
    host: {
      position: 'relative',
      borderRadius: vars.containerShape,
      backgroundColor: vars.containerColor,
      borderStyle: 'unset',
      flexGrow: 1,
      color: 'inherit',
      userSelect: 'none',
      height: 'inherit',
      width: 'fit-content',
    },
  });

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    [elevationVars.boxShadow]: vars.containerElevation,
    borderRadius: vars.containerShape,
  },
});

type IListStyles = IStyles<IListStylesKey>;
export const listStyles: MapNamespaces<IListStyles> = stylex.create<
  IStyles<IListStylesKey>
>({
  host: {
    height: '100%',
    overflowY: 'auto',
  },
  content: {
    maxHeight: vars.contentMaxHeight,
  },
});
