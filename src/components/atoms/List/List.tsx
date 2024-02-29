import * as React from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { IListStyleKey, IListStyleVarKey } from './List.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IListProps = IContainerProps<IListStyleKey, IListStyleVarKey> & {
  children?: React.ReactNode;
};

export const List: React.FC<IListProps> = ({ children, ...props }) => {
  const theme = useComponentTheme('List');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IListStyleKey, IListStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return (
    <div {...styleProps(['host', props.sx], [props.theme])}>{children}</div>
  );
};
