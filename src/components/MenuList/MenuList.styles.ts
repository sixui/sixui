import stylex from '@stylexjs/stylex';

import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { menuListTokens } from './MenuList.stylex';

// https://github.com/material-components/material-web/blob/main/menulist/internal/_menulist.scss

export type IMenuListStylesKey = keyof typeof menuListStyles;
export const menuListStyles = stylex.create({
  host: {
    position: 'relative',
    borderRadius: menuListTokens.containerShape,
    backgroundColor: menuListTokens.containerColor,
    borderStyle: 'unset',
    flexGrow: 1,
    color: 'inherit',
    userSelect: 'none',
    height: 'inherit',
    width: 'fit-content',
  },
});

export const menuListElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: menuListTokens.containerElevation,
    borderRadius: menuListTokens.containerShape,
  },
});

export const menuListListStyles = stylex.create({
  host: {
    height: '100%',
    overflowY: 'auto',
  },
  content: {
    maxHeight: menuListTokens.contentMaxHeight,
  },
});
