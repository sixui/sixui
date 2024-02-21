import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ICardContentStyleKey } from './CardContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ICardContentProps extends IContainer<ICardContentStyleKey> {
  children: React.ReactNode;
}

export const CardContent: React.FC<ICardContentProps> = ({
  children,
  ...props
}) => {
  const theme = useComponentTheme('CardContent');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICardContentStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return <div {...styleProps(['host', props.sx])}>{children}</div>;
};
