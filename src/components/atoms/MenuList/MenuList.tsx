import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type {
  IMenuListStyleKey,
  IMenuListStyleVarKey,
} from './MenuList.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';
import { MenuListDivider } from './MenuListDivider';

export type IMenuListProps = IContainerProps<IMenuListStyleKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  children?: React.ReactNode;
};

const MenuList = forwardRef<HTMLDivElement, IMenuListProps>(
  function MenuList(props, ref) {
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
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
        <Elevation
          styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
        />
        <div {...sxf('items')}>
          <div {...sxf('itemPadding')}>{children}</div>
        </div>
      </div>
    );
  },
);

const MenuListNamespace = Object.assign(MenuList, {
  Divider: MenuListDivider,
});

export { MenuListNamespace as MenuList };
