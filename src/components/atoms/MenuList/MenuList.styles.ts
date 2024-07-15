import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { menuListTokens as vars } from './MenuList.stylex';

// https://github.com/material-components/material-web/blob/main/menulist/internal/_menulist.scss

export type IMenuListStylesKey = keyof typeof menuListStyles;
export const menuListStyles = stylex.create({
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

export const menuListElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: vars.containerElevation,
    borderRadius: vars.containerShape,
  },
});

export const menuListListStyles = stylex.create({
  host: {
    height: '100%',
    overflowY: 'auto',
  },
  content: {
    maxHeight: vars.contentMaxHeight,
  },
});
