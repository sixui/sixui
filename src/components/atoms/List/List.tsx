import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IListStyleKey, IListStyleVarKey } from './List.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { MenuListDivider } from '@/components/atoms/MenuList';
import { ListItem } from '@/components/atoms/ListItem';
import { ListContext, type IListContextValue } from './ListContext';

export type IListProps = IContainerProps<IListStyleKey> &
  IListContextValue & {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };

const List = forwardRef<HTMLDivElement, IListProps>(
  function List(props, forwardedRef) {
    const { styles, sx, size, children, header, footer, ...other } = props;

    const { theme } = useComponentTheme('List');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IListStyleKey, IListStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <ListContext.Provider value={{ size }}>
        <div {...sxf('host', sx)} ref={forwardedRef} {...other}>
          <div {...sxf('inner')}>
            <div {...sxf('header')}>{header}</div>
            <div {...sxf('content', !children && 'content$empty')}>
              {children}
            </div>
            <div {...sxf('footer')}>{footer}</div>
          </div>
        </div>
      </ListContext.Provider>
    );
  },
);

const ListNamespace = Object.assign(List, {
  Item: ListItem,
  Divider: MenuListDivider,
});

export { ListNamespace as List };
