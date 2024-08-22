import stylex from '@stylexjs/stylex';

import { listTokens as tokens } from './List.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/_list.scss

export type IListStylesKey = keyof typeof listStyles;
export const listStyles = stylex.create({
  host: {
    color: 'unset',
    outline: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    // Add position so the elevation overlay (which is absolutely positioned)
    // can be positioned relative to the list root.
    position: 'relative',
    maxHeight: 'inherit',
    borderRadius: 'inherit',
  },
  inner: {
    maxHeight: 'inherit',
    borderRadius: 'inherit',
  },
  header: {},
  footer: {},
  content: {
    paddingTop: tokens.topSpace,
    paddingBottom: tokens.bottomSpace,
    borderRadius: 'inherit',
    gap: tokens.gap,
  },
  content$empty: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  content$grid: {
    display: 'grid',
    gridAutoRows: '1fr',
    gap: tokens.gridSpace,
  },
});
