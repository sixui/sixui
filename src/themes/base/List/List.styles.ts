import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IListStyleKey } from '@/components/atoms/List';
import { componentVars as vars } from './List.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/_list.scss
type IListStyles = IStyles<IListStyleKey>;
export const styles: MapNamespaces<IListStyles> = stylex.create<IListStyles>({
  host: {
    backgroundColor: vars.containerColor,
    color: 'unset',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    padding: '8px 0',
    // Add position so the elevation overlay (which is absolutely positioned)
    // can be positioned relative to the list root.
    position: 'relative',
  },
});
