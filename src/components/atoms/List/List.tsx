import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IListStyleKey, IListStyleVarKey } from './List.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IListProps = IContainerProps<IListStyleKey> & {
  children?: React.ReactNode;
};

export const List = forwardRef<HTMLDivElement, IListProps>(
  function List(props, ref) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentTheme('List');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () =>
        stylePropsFactory<IListStyleKey, IListStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div {...styleProps(['host', sx])} ref={ref} {...other}>
        {children}
      </div>
    );
  },
);
