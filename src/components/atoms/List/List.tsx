import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IListStyleKey, IListStyleVarKey } from './List.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IListProps
  extends IContainer<IListStyleKey, IListStyleVarKey> {
  children?: React.ReactNode;
}

export const List: React.FC<IListProps> = ({ children, ...props }) => {
  const theme = useComponentTheme('List');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IListStyleKey, IListStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return (
    <div {...styleProps(['host'], [theme.vars, props.theme])}>{children}</div>
  );
};
