import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IMenuListProps } from './MenuList.types';
import { useStyles } from '~/hooks/useStyles';
import { Elevation } from '../Elevation';
import { List } from '../List';
import { Base } from '../Base';
import {
  menuListElevationStyles,
  menuListListStyles,
  menuListStyles,
} from './MenuList.styles';
import { menuListTheme } from './MenuList.stylex';

export const MenuList = forwardRef<HTMLDivElement, IMenuListProps>(
  function MenuList(props, forwardedRef) {
    const { styles, sx, innerStyles, children, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'MenuList',
      styles: [menuListStyles, styles],
    });

    return (
      <Base
        sx={[menuListTheme, globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        <Elevation
          styles={[menuListElevationStyles, ...asArray(innerStyles?.elevation)]}
        />
        <List
          styles={[menuListListStyles, ...asArray(innerStyles?.list)]}
          {...other}
        >
          {children}
        </List>
      </Base>
    );
  },
);
