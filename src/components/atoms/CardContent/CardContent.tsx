import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  ICardContentStyleKey,
  ICardContentStyleVarKey,
} from './CardContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useCardContext } from '../Card/useCardContext';

export type ICardContentProps = IContainer<
  ICardContentStyleKey,
  ICardContentStyleVarKey
> & {
  children?: React.ReactNode;
};

export const CardContent: React.FC<ICardContentProps> = ({
  children,
  ...props
}) => {
  const theme = useComponentTheme('CardContent');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICardContentStyleKey, ICardContentStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  const context = useCardContext();
  const { actionable } = context ?? {};

  return (
    <div
      {...styleProps(
        ['host', actionable ? 'host$actionable' : null, props.sx],
        [theme.vars, props.theme],
      )}
    >
      {children}
    </div>
  );
};
