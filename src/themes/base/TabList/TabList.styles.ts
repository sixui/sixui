import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITabListStyleKey } from '@/components/atoms/TabList';

type ITabListStyles = IStyles<ITabListStyleKey>;
export const styles: MapNamespaces<ITabListStyles> =
  stylex.create<ITabListStyles>({
    host: {
      boxSizing: 'border-box',
      flexDirection: 'column',
      overflow: 'auto',
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      position: 'relative',
      display: {
        default: 'flex',
        '::-webkit-scrollbar': 'none',
      },
    },
    TabList: {
      alignItems: 'end',
      display: 'flex',
      height: '100%',
      overflow: 'inherit',
      justifyContent: 'space-between',
      width: '100%',
    },
    // TODO
    // ::slotted(*) {
    //   flex: 1;
    // }
    // // draw selected on top so its indicator can be transitioned from the
    // // previously selected tab, on top of it
    // ::slotted([active]) {
    //   z-index: 1;
    // }
  });
