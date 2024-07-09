import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IMenuListStyleKey,
  IMenuListStyleVarKey,
} from './MenuList.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/utils/Elevation';
import { List } from '@/components/atoms/List';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { IMenuListProps } from './MenuListProps';

export const MenuList = forwardRef<HTMLDivElement, IMenuListProps>(
  function MenuList(props, forwardedRef) {
    const { styles, sx, innerStyles, children, ...other } = props;

    const { theme } = useComponentTheme('MenuList');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IMenuListStyleKey, IMenuListStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', theme.vars, sx)} ref={forwardedRef}>
        <Elevation
          styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
        />
        <List
          styles={[theme.listStyles, ...asArray(innerStyles?.list)]}
          {...other}
        >
          {children}
        </List>
      </div>
    );
  },
);
