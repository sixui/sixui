import * as React from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { ICardActionsStyleKey } from './CardActions.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ICardActionsProps = IContainerProps<ICardActionsStyleKey> & {
  children: React.ReactNode;
};

export const CardActions: React.FC<ICardActionsProps> = ({
  children,
  ...props
}) => {
  const theme = useComponentTheme('CardActions');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICardActionsStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return <div {...styleProps(['host', props.sx])}>{children}</div>;
};
