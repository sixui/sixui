import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IListStyleKey } from '@/components/atoms/List';
import { componentVars as vars } from './List.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/_list.scss

type IListStyles = IStyles<IListStyleKey>;
export const styles: MapNamespaces<IListStyles> = stylex.create<IListStyles>({
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
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'inherit',
    overflowY: 'auto',
  },
  content$empty: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
