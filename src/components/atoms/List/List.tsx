import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IListStyleKey, IListStyleVarKey } from './List.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ListContext, type IListContextValue } from './ListContext';

export type IListProps = IContainerProps<IListStyleKey> &
  IListContextValue & {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };

export const List = forwardRef<HTMLDivElement, IListProps>(
  function List(props, forwardedRef) {
    const {
      styles,
      sx,
      size,
      noFocusRing,
      children,
      header,
      footer,
      ...other
    } = props;

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
      <ListContext.Provider value={{ size, noFocusRing }}>
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
