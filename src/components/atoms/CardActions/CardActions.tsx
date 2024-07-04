import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { ICardActionsStyleKey } from './CardActions.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ICardActionsProps = IContainerProps<ICardActionsStyleKey> & {
  children: React.ReactNode;
};

export const CardActions: React.FC<ICardActionsProps> = forwardRef<
  HTMLDivElement,
  ICardActionsProps
>(function CardActions(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;

  const { theme } = useComponentTheme('CardActions');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory<ICardActionsStyleKey>(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div {...sxf('host', sx)} ref={forwardedRef} {...other}>
      {children}
    </div>
  );
});
