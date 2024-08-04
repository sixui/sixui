import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IMenuListProps } from './MenuList.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Elevation } from '../Elevation';
import { List } from '../List';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import {
  menuListElevationStyles,
  menuListListStyles,
  menuListStyles,
} from './MenuList.styles';
import { menuListTheme } from './MenuList.stylex';

export const MenuList = forwardRef<HTMLDivElement, IMenuListProps>(
  function MenuList(props, forwardedRef) {
    const { styles, sx, innerStyles, children, ...other } = props;

    const componentTheme = useComponentTheme('MenuList');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(menuListStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(menuListTheme, componentTheme.overridenStyles, 'host', sx)}
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
      </div>
    );
  },
);
