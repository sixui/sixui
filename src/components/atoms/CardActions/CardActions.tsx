import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ICardActionsStyleKey } from './CardActions.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ICardActionsProps extends IContainer<ICardActionsStyleKey> {
  children: React.ReactNode;
}

export const CardActions: React.FC<ICardActionsProps> = ({
  children,
  ...props
}) => {
  const theme = useComponentTheme('CardActions');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICardActionsStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return <div {...styleProps(['host', props.sx])}>{children}</div>;
};
