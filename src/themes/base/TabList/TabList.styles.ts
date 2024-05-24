import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITabListStyleKey } from '@/components/atoms/TabList';

type ITabListStyles = IStyles<ITabListStyleKey>;
export const styles: MapNamespaces<ITabListStyles> =
  stylex.create<ITabListStyles>({
    host: {
      flexDirection: 'column',
      // overflow: 'auto',
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      position: 'relative',
      display: {
        default: 'flex',
        '::-webkit-scrollbar': 'none',
      },
    },
    tabList: {
      alignItems: 'end',
      height: '100%',
      overflow: 'inherit',
      justifyContent: 'space-between',
    },
    tabList$fullWidth: {
      display: 'flex',
      width: '100%',
    },
  });
